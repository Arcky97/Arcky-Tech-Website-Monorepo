"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SidebarItem, MenuItem } from "./SidebarItem"; // ← nieuw: import subcomponent

type DocType = "main" | "region-map" | "arcky-tutorials" | "pbs-editor" | "poke-market" | "vending-machine" | string;

export function Sidebar({ menuItems, docType, mainDocs }: { menuItems: MenuItem[];  docType?: DocType, mainDocs?: boolean }) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarFrozen, setIsSidebarFrozen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const previousPathRef = useRef<string | null>(null);
  const hasScrolledToActive = useRef(false);
  const activeItem = menuItems.find(item => item.name === docType)?.name;

  const isDashboard = pathname.startsWith("/doggo-bot/dashboard");
  const isDocumentation = pathname.startsWith("/documentation");
  const isDatabasePage = pathname.startsWith("/doggo-bot/database");

  const basePath = (() => {
    if (isDocumentation || isDatabasePage) {
      const segments = pathname.split("/").filter(Boolean);
      return `/${segments.slice(0, 2).join("/")}`; // bv. "/documentation/doggo-bot"
    } else {
      const segments = pathname.split("/").filter(Boolean);
      return `/${segments.slice(0, 3).join("/")}`;
    }
  })();

  useEffect(() => {
    const updateIsSmallScreen = () => {
      setIsSmallScreen(window.innerWidth < 1024);
      setIsSidebarVisible(window.innerWidth >= 1024 || (isDocumentation && window.innerWidth >= 1024));
      setIsSidebarFrozen(isDocumentation && window.innerWidth >= 1024);
    };
    window.addEventListener("resize", updateIsSmallScreen);
    updateIsSmallScreen();
    return () => {
      window.removeEventListener("resize", updateIsSmallScreen);
    };
  }, [pathname, isDocumentation]);

  useEffect(() => {
    if (hasScrolledToActive.current) return;
    const scrollSidebarToActiveItem = () => {
      const sidebar = document.getElementById("sidebar");
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

  useEffect(() => {
    if (isSmallScreen) {
      if (isSidebarVisible) {
        previousPathRef.current = pathname;
        const scrollY = window.scrollY * -1;
        document.body.style.top = `${scrollY}px`;
        document.body.classList.add("lock-scrollbar");
      } else {
        const scrollY = parseInt(document.body.style.top) * -1;
        document.body.style.top = "";
        document.body.classList.remove("lock-scrollbar");
        document.body.style.overflow = "";
        if (previousPathRef.current === pathname) {
          window.scrollTo({ top: scrollY || 0, behavior: "instant" });
        }
        previousPathRef.current = null;
      }
    }
  }, [isSidebarVisible, isSmallScreen, pathname]);

  const toggleSidebarVisibility = () => {
    if ((isDocumentation && window.innerWidth < 1024) || isDashboard) {
      setIsSidebarVisible((prev) => !prev);
    }
  };

  const handleClick = async (e: React.MouseEvent<HTMLElement>, path: string, subPath: string) => {
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
      return;
    }
    if (target) {
      const offset = 60;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
      applyHighlightEffect(subPath.replace("#", ""));
    }
    if (window.innerWidth < 1024) {
      setIsSidebarVisible(false);
    }
    history.pushState(null, "", path);
  };

  return (
    <nav className="flex transition-all duration-300 ease-in-out">
      {/* Sidebar */}
      <div id="sidebar"
        className={`border-r border-y rounded-r-lg border-gray-700 top-0 mt-12 fixed left-0 z-51 bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarVisible ? "translate-x-0 opacity-100" : "-translate-x-full"
        } overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-200`}
        style={{ height: `calc(100vh - 47px)` }}
      >
        <div className="flex-1 pt-4 pb-16">
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
      </div>

      {/* Overlay on Small Screens */}
      <div
        className={`fixed inset-0 bg-black/50 lg:hidden z-40 transition-opacity duration-300 ease-in-out ${
          isSidebarVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarVisible(false)}
      />

      {/* Main Content Wrapper */}
      <div
        className="flex-1 transition-all duration-300 ease-in-out"
        style={{
          marginLeft:
            isSidebarVisible
              ? isDashboard && !isSmallScreen
                ? "232px"
                : isDocumentation && !isSmallScreen
                ? "275px"
                : isDatabasePage && !isSmallScreen
                ? "252px"
                : "0px"
              : "0px",
        }}
      >
        {/* Sidebar Toggle Button */}
        <div className="h-0 bg-gray-900 flex items-center transition-opacity duration-300 ease-in-out">
          <button
            className="fixed top-1.5 left-2 z-50 bg-gray-900 p-2 rounded-md flex flex-col justify-center items-center space-y-1 group"
            onClick={toggleSidebarVisibility}
          >
            <span
              className={`block w-6 h-1 bg-white transition-all duration-300 ease-in-out ${
                isSidebarFrozen
                  ? ""
                  : `${
                      isSidebarVisible
                        ? "group-hover:-rotate-45 group-hover:translate-y-0"
                        : "group-hover:rotate-45 group-hover:translate-y-0"
                    } group-hover:scale-110 group-hover:bg-gray-400`
              }`}
            />
            <span
              className={`block w-6 h-1 bg-white transition-opacity duration-300 ease-in-out ${
                isSidebarFrozen ? "" : "group-hover:opacity-0 group-hover:bg-gray-400"
              }`}
            />
            <span
              className={`block w-6 h-1 bg-white transition-all duration-300 ease-in-out ${
                isSidebarFrozen
                  ? ""
                  : `${
                      isSidebarVisible
                        ? "group-hover:rotate-45 group-hover:translate-y-0"
                        : "group-hover:-rotate-45 group-hover:translate-y-0"
                    } group-hover:scale-110 group-hover:bg-gray-400`
              }`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}