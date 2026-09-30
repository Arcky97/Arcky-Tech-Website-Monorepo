"use client";
import { usePathname } from "next/navigation";
import { ROUTES as routes } from "@/config/routes";
import { useEffect, useRef, useState } from "react";
import { CookieBanner, CookieConsentProvider, Footer, MainLayoutWrapper, MainRefContext, Sidebar, TOCProvider } from "ui"; 
import { menuItems } from "@/config/menuItems";
import { PBSTOC } from "@/components/PBSTOC";
import { AutoTOCWrapper } from "@/components/AutoTOCWrapper";

export default function ClientLayout({ children}: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--navbar-height", "48px");

    let lastIsDesktop = window.innerWidth >= 1024;

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop !== lastIsDesktop) {
        setSidebarOpen(isDesktop);
        lastIsDesktop = isDesktop;
      }
    };

    setSidebarOpen(window.innerWidth >= 1024);

    window.addEventListener("resise", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CookieConsentProvider>
      <MainRefContext.Provider value={mainRef}>
        <TOCProvider>
          <MainLayoutWrapper
            navbar={{
              variant: "pbseditor",
              enableShrink: false, 
              onToggleSideNav: () => setSidebarOpen(s => !s),
              isSidebarOpen: sidebarOpen,
              hasSidenav: true,
              routes
            }}
          >
            <div className="relative flex overflow-hidden">
              <Sidebar
                menuItems={menuItems.map(({ ...rest }) => rest )}
                docType="main"
                mainDocs={pathname === "/"}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
              <CookieBanner/>
              <main
                ref={mainRef}
                className="flex-1 bg-gray-900 h-full"
              >
                <div className="flex min-h-[calc(100dvh-168px)] px-2">
                  <AutoTOCWrapper>
                    {children}
                  </AutoTOCWrapper>
                  <PBSTOC/>
                </div>
                <Footer/>
              </main>
            </div>
          </MainLayoutWrapper>
        </TOCProvider>
      </MainRefContext.Provider>
    </CookieConsentProvider>
  )
}