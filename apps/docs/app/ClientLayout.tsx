"use client";
import { useEffect, useRef, useState } from "react";
import { MainLayoutWrapper, Sidebar, Footer } from "ui";
import { arckyTutorials, graphicsTransparency, pbsEditor, pokeMarket, regionMap, vendingMachine  } from "@/config";
import { usePathname } from "next/navigation";
import { ROUTES as routes } from "@/config/routes";
import { MainRefContext } from "ui";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= 1024;
    setSidebarOpen(isDesktop);
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
        {/* ✅ ÉÉN flex container */}
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
            <div className="flex flex-col min-h-[calc(100vh-48px)]">
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </main>
        </div>
      </MainLayoutWrapper>
    </MainRefContext.Provider>

  );
}