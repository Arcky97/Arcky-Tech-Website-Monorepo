"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarItem, MenuItem } from "./SidebarItem"; // ← nieuw: import subcomponent
import { useMainRef } from "../MainRefContext";

type DocType = "main" | "region-map" | "arcky-tutorials" | "pbs-editor" | "poke-market" | "vending-machine" | string;

export function Sidebar({ menuItems, docType, mainDocs, isOpen, onClose }: { menuItems: MenuItem[];  docType?: DocType, mainDocs?: boolean, isOpen: boolean, onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const hasScrolledToActive = useRef(false);
  const mainRef = useMainRef()

  const basePath = (() => {
    const segments = pathname.split("/").filter(Boolean);
    return `/${segments.slice(0, 1).join("/")}`;
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

  const handleClick = async (e: React.MouseEvent<HTMLElement>, path: string, subPath: string) => {
    const mainEl = mainRef?.current;
    if (!mainEl) return;

    e.preventDefault();
    const applyHighlightEffect = (id: string) => {
      const target = document.getElementById(id);
      if (target) {
        target.classList.add("highlight-blink");
        setTimeout(() => target.classList.remove("highlight-blink"), 2000);
      }
    };
    const target = document.getElementById(subPath.replace("#", ""));
    const fullPath = path.replace(subPath, "");
    if (pathname !== fullPath) {
      router.push(path);
      if (window.innerWidth < 1024) {
        onClose()
      }
      return;
    }
    if (target) {
      const offset = 60;
      const targetPosition = target.getBoundingClientRect().top + mainEl.scrollTop - offset;
      mainEl.scrollTo({ top: targetPosition, behavior: "smooth" });
      applyHighlightEffect(subPath.replace("#", ""));
    }
    if (window.innerWidth < 1024) {
      onClose()
    }
    history.pushState(null, "", path);
  };

  return (
    <div className="flex h-full transition-all duration-300 ease-in-out">
      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`
          fixed left-0 z-51
          bg-gray-800 text-white
          border-y border-r border-gray-700
          rounded-tr-lg rounded-br-lg
          overflow-hidden
          transition-all duration-300 ease-in-out ${
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
              basePath={basePath}
              pathname={pathname}
              mainDocs={mainDocs}
              onLeafClick={handleClick}
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
            isOpen ? "336px" : "0",
        }}
      />
    </div>
  );
}