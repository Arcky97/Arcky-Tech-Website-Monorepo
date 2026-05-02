"use client";
import { useEffect, useRef, useState } from "react";
import { MainLayoutWrapper, Sidebar, Footer, TOCProvider } from "ui";
import { arckyTutorials, graphicsTransparency, pbsEditor, pokeMarket, regionMap, vendingMachine  } from "@/config";
import { usePathname } from "next/navigation";
import { ROUTES as routes } from "@/config/routes";
import { MainRefContext } from "ui";
import { DocsTOC } from "@/components/DocsToc";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    document.documentElement.style.setProperty("--navbar-height", "48px");

    let lastIsDesktop = window.innerWidth >= 1024;
    console.log(lastIsDesktop);

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop !== lastIsDesktop) {
        setSidebarOpen(isDesktop);
        lastIsDesktop = isDesktop;
        console.log(lastIsDesktop);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    pbsEditor,
    regionMap,
    pokeMarket,
    graphicsTransparency,
    vendingMachine,
    arckyTutorials
  ];

  const menuItemToUse = pathname !== "/" 
    ? menuItems.filter(menuItem => pathname.includes(menuItem.name))
    : menuItems.map(({ ...rest }) => rest )

  return (
    <MainRefContext.Provider value={mainRef}>
      <TOCProvider>
        <MainLayoutWrapper
          navbar={{
            variant: "docs",
            enableShrink: false,
            onToggleSideNav: () => setSidebarOpen(s => !s),
            isSidebarOpen: sidebarOpen,
            hasSidenav: true,
            routes
          }}
        >
          <div className="relative flex overflow-hidden">
            <Sidebar
              menuItems={menuItemToUse}
              docType={menuItemToUse.length === 1 ? menuItemToUse[0].name : "main"}
              mainDocs={pathname === "/"}
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
            <main
              ref={mainRef}
              className="flex-1 bg-gray-900 h-full"
            >
              <div className="flex min-h-[calc(100vh-48px)] px-2">
                {children}
                <DocsTOC/>
              </div>
              <Footer />
            </main>
          </div>
        </MainLayoutWrapper>
      </TOCProvider>
    </MainRefContext.Provider>
  );
}