"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SidebarItem, MenuItem } from "./SidebarItem";

type SidebarSection = string;

export function Sidebar({ menuItems, docType, mainDocs, basePath, isOpen, onClose }: { menuItems: MenuItem[]; docType?: SidebarSection, mainDocs?: boolean, basePath?: string, isOpen: boolean, onClose: () => void }) {
  const pathname = usePathname();
  const hasScrolledToActive = useRef(false);

  const validBasePaths = menuItems.map(item => item.name);

  const resolvedBasePath = basePath ?? (() => {
    if (pathname === "/") {
      return "";
    }

    const segments = pathname.split("/").filter(Boolean);
    const first = segments[0];

    if (validBasePaths.some(path => path === first)) {
      return `/${first}`;
    } else if (docType !== "main") {
      return `/${docType}`
    } else {
      return "/"
    }
  })();

  useEffect(() => {
    if (hasScrolledToActive.current) return;
    const scrollSidebarToActiveItem = () => {
      const sidebar = document.getElementById("side-scroll");
      if (!sidebar) return;
      const activeItems = Array.from(sidebar.querySelectorAll(".bg-blue-900"));
      if (activeItems.length === 0) return;
      const deepestActive = activeItems[activeItems.length - 1];
      const sidebarRect = sidebar.getBoundingClientRect();
      const activeRect = deepestActive.getBoundingClientRect();
      const offsetTop = activeRect.top - sidebarRect.top + sidebar.scrollTop - 100;
      sidebar.scrollTo({ top: offsetTop, behavior: "smooth" });
      hasScrolledToActive.current = true;
    };
    setTimeout(scrollSidebarToActiveItem, 100);
  }, [pathname]);

  const handleClick = () => {
    if (window.innerWidth < 1024) {
      onClose();
    }
  }

  return (
    <div className="flex h-full transition-all duration-300 ease-in-out">
      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          fixed left-0 z-51
          bg-gray-900 text-white
          border-y lg:border-y-0 border-r border-gray-700
          rounded-tr-lg rounded-br-lg lg:rounded-none
          overflow-hidden
          transition-all duration-300 ease-in-out w-80 ${
            isOpen ? "translate-x-0 opacity-100" : "-translate-x-full"
          }`}
        style={{ height: "calc(100vh - 48px)" }}
      >
        {/* Scroll container */}
        <div id="side-scroll" className="h-full overflow-y-scroll pt-4 pb-16">
          {menuItems.map((item, index) => (
            <SidebarItem
              key={`${item.path}-${index}`}
              item={item}
              parentPath=""
              basePath={resolvedBasePath}
              pathname={pathname}
              mainDocs={mainDocs}
              onClick={handleClick}
            />
          ))}
        </div>
      </aside>
      {/* Overlay on Small Screens */}
      <div
        className={`fixed inset-0 bg-black/50 lg:hidden z-40 transition-opacity duration-300 ease-in-out w-full ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Main Content Wrapper */}
      <div
        className="flex-1 transition-all duration-300 ease-in-out lg:inline hidden "
        style={{
          marginLeft:
            isOpen ? "320px" : "0",
        }}
      />
    </div>
  );
}