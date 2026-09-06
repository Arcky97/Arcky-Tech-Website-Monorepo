"use client";
import { ROUTES as routes } from "@/config/routes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react"
import { CookieBanner, CookieConsentProvider, Footer, MainLayoutWrapper, MainRefContext } from "ui";
import QueryClientWrapper from "./QueryClientLayout";
import SmallScreenError from "@/components/SmallScreen";
import DashboardNav from "@/components/DashboardNav";

type AuthStatus =
  | "checking"
  | "signed-out"
  | "signed-in"
  | "logging-in"
  | "logging-out";

export type SessionUser = {
  youtube?: {
    channelId?: string;
  } | null;
};

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [authStatus, setAuthStatus] = useState<AuthStatus>("checking");
  const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    async function loadSession() {
      try {
        const response = await fetch("/api/auth/me");

        if (!response.ok) {
          setAuthStatus("signed-out");
          return;
        }

        const data = await response.json() as { user?: SessionUser };
        setSessionUser(data.user ?? null);
        setAuthStatus("signed-in");
      } catch (error) {
        setAuthStatus("signed-out");
      }
    }

    loadSession();
  }, []);

  useEffect(() => {
    if (
      authStatus === "checking" ||
      pathname === "/access-denied" ||
      pathname === "/coming-soon"
    ) {
      return;
    }

    const pathParts = pathname.split("/").filter(Boolean);
    const channelId = sessionUser?.youtube?.channelId;

    if (pathname === "/") {
      if (authStatus === "signed-in" && channelId) {
        const initialSyncJobId = searchParams.get("initialSyncJobId");
        const initialSyncSearch = initialSyncJobId
          ? `?initialSyncJobId=${encodeURIComponent(initialSyncJobId)}`
          : "";
        router.replace(`/youtube/${channelId}/home${initialSyncSearch}`);
      }
      return;
    }

    const isYoutubeRoute = pathname === "/youtube" || pathParts.length > 0;

    if (!isYoutubeRoute) return;

    if (authStatus === "signed-out" || !channelId) {
      router.replace("/");
      return;
    }

    if (pathname === "/youtube") {
      router.replace(`/youtube/${channelId}/home`);
      return;
    }

    if (pathParts[0] !== "youtube" || pathParts[1] !== channelId) {
      router.replace(`/access-denied?redirect=${encodeURIComponent(`/youtube/${channelId}/home`)}`);
      return;
    }

    if (pathParts.length === 2) {
      router.replace(`/youtube/${channelId}/home`);
    }
  }, [authStatus, pathname, router, searchParams, sessionUser]);

  function handleLogin() {
    setAuthStatus("logging-in");

    window.location.assign("/api/auth/login?provider=youtube&redirect=/");
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

  return (
    <CookieConsentProvider>
      <QueryClientWrapper>
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
            <div className="relative flex min-h-[calc(100dvh-48px)]">
              <CookieBanner/>
              <main
                ref={mainRef}
                className="flex min-w-0 flex-1 flex-col bg-gray-900"
              >
                <DashboardNav user={sessionUser}/>
                <div className="hidden lg:block flex-1 px-2">
                  {children}
                </div>
                <div className="lg:hidden flex-1 px-2">
                  <SmallScreenError/>
                </div>
                <Footer />
              </main>
            </div>
          </MainLayoutWrapper>
        </MainRefContext.Provider>
      </QueryClientWrapper>
    </CookieConsentProvider>
  )
}