"use client";
import { ROUTES as routes } from "@/config/routes";
import { useEffect, useRef } from "react";
import { MainLayoutWrapper, Footer, MainRefContext, CookieBanner, CookieConsentProvider } from "ui";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--navbar-height", "80px");
  }, []);

  return (
    <CookieConsentProvider>
      <MainRefContext.Provider value={mainRef}>
        <MainLayoutWrapper
        navbar={{
          variant: "web",
          enableShrink: true,
          routes
        }}
        >
          <CookieBanner/>
          <main
            ref={mainRef}
            className="flex flex-col flex-1 min-h-0 bg-gray-900 px-2"
          >
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </main>
        </MainLayoutWrapper>
      </MainRefContext.Provider>
    </CookieConsentProvider>
  );
}