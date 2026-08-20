"use client";
import { ROUTES as routes } from "@/config/routes";
import { usePathname, useRouter } from "next/navigation";
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
  const pathname = usePathname();
  const router = useRouter();
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

  useEffect(() => {
    if (pathname === "/youtube" && authStatus === "signed-out") {
      router.replace("/");
    }
  }, [authStatus, pathname, router]);

  function handleLogin() {
    setAuthStatus("logging-in");

    window.location.assign("/api/auth/login?provider=youtube&redirect=/youtube");
  }

  async function handleLogout() {
    setAuthStatus("logging-out");

    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      setAuthStatus("signed-out");
      window.location.assign("/");
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