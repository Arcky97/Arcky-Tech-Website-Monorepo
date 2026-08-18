"use client";
import { ROUTES as routes } from "@/config/routes";
import { useEffect, useRef, useState } from "react"
import { Footer, MainLayoutWrapper, MainRefContext } from "ui";

type AuthStatus =
  | "checking"
  | "signed-out"
  | "signed-in"
  | "logging-in"
  | "logging-out";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch("/api/auth/me");

        setAuthStatus(response.ok ? "signed-in" : "signed-out")
      } catch (error) {
        setAuthStatus("signed-out");
      }
    }

    loadSession();
  }, []);

  function handleLogin() {
    setAuthStatus("logging-in");

    window.location.assign("YOUR_LOGIN_URL");
  }

  async function handleLogout() {
    setAuthStatus("logging-out");

    try {
      await fetch("YOUR_LOGOUT_URL", {
        method: "POST",
        credentials: "include"
      });

      setAuthStatus("signed-out");
    } catch (error) {
      setAuthStatus("signed-in");
    }
  }
  
  useEffect(() => {
    document.documentElement.style.setProperty("--navbar-height", "80px");
  }, []);

  return (
    <MainRefContext.Provider value={mainRef}>
      <MainLayoutWrapper
        navbar={{
          variant: "dashboard",
          enableShrink: false,
          routes,
          auth: {
            status: authStatus,
            onLogin: handleLogin,
            onLogout: handleLogout
          }
        }}
      >
        <main
          ref={mainRef}
          className="flex flex-col flex-1 min-h-0 bg-gray-900 px-2"
        >
          <div className="flex-1">
            {children}
          </div>
          <Footer/>
        </main>
      </MainLayoutWrapper>
    </MainRefContext.Provider>
  )
}