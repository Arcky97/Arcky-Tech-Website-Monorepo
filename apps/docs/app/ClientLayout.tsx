"use client";
import { useRef } from "react";
import { MainLayoutWrapper, Sidebar, Footer } from "ui";
import { arckyTutorials, graphicsTransparency, pbsEditor, pokeMarket, regionMap, vendingMachine  } from "@/config";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  const menuItems = [
    pbsEditor,
    regionMap,
    pokeMarket,
    graphicsTransparency,
    vendingMachine,
    arckyTutorials
  ];

  const menuItemToUse = pathname.startsWith('/documentation/') 
    ? menuItems.filter(menuItem => pathname.includes(menuItem.name))
    : menuItems.map(({ ...rest }) => rest )
  return (
    <MainLayoutWrapper
      navbar={{
        variant: "web",
        enableShrink: true,
        mainRef
      }}
    >
      <main
        ref={mainRef}
        className="flex flex-col flex-1 min-h-0 bg-gray-900"
      >
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </main>
    </MainLayoutWrapper>
  );
}