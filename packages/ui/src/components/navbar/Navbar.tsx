"use client";
import { useEffect, useRef, useState } from "react"
import Link from "next/link";
import { NavbarItem } from "./NavbarItem";
import { useMainRef } from "../MainRefContext";

export type NavbarProps = {
  routes: { home: string, projects: string, discord: string, docs: string, about: string, contact: string }
  variant?: "web" | "docs" | "doggo-bot" | "scoreboard";
  enableShrink?: boolean;
  hasSidenav?: boolean;
  isSidebarOpen?: boolean;
  onToggleSideNav?: () => void;
}

export function Navbar({ variant = "web", enableShrink, hasSidenav, isSidebarOpen, onToggleSideNav, routes }: NavbarProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false || !enableShrink);
  const navRef = useRef<HTMLElement>(null);
  const mainRef = useMainRef();

  useEffect(() => {
    const mainEl = mainRef?.current;
    if (!mainEl) return;

    const handleScroll = () => {
      const scrollTop = mainEl.scrollTop;
      setHasScrolled(scrollTop > 50);
      setIsShrunk(Math.round(scrollTop / 5) * 5 >= 100 || hasSidenav || variant === "scoreboard" || window.innerWidth <= 320);
    };

    mainEl.addEventListener("scroll", handleScroll);

    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, [mainRef, enableShrink]);

useEffect(() => {
  const el = navRef.current;
  if (!el) return;

  const setHeightVar = () => {
    const height = el.offsetHeight;
    document.documentElement.style.setProperty(
      "--navbar-height",
      `${height}px`
    );
  };

  setHeightVar();
}, [isShrunk]);

  return (
    <nav 
      id="navbar"
      ref={navRef}
      className={`sticky top-0 w-full bg-gray-900 text-white ${
        hasScrolled ? "shadow-md transition-shadow duration-300 ease-in-out" : ""
      } z-50`}
    >
      {/* Main Navbar */}
      <div
        className={`w-full px-4 lg:px-10 flex justify-between items-center transition-all duration-300 ease-in-out ${
          isShrunk ? "h-12" : "h-20"
        } ${hasSidenav ? "pl-14 lg:pl-14" : "" }`}
      >
        {/* Sidebar toggle */}
        {hasSidenav && (
          <div className="h-0 flex items-center transition-opacity duration-300 ease-in-out">
            <button
              className="p-2 rounded-md flex flex-col justify-center items-center space-y-1 group"
              onClick={onToggleSideNav}
            >
              <span
                className={`block w-6 h-1 bg-white transition-all duration-300 ease-in-out ${
                    isSidebarOpen
                      ? "group-hover:-rotate-45 group-hover:translate-y-0"
                      : "group-hover:rotate-45 group-hover:translate-y-0"
                  } group-hover:scale-110 group-hover:bg-gray-400`
                }
              />
              <span
                className={"block w-6 h-1 bg-white transition-opacity duration-300 ease-in-out group-hover:opacity-0 group-hover:bg-gray-400"}
              />
              <span
                className={`block w-6 h-1 bg-white transition-all duration-300 ease-in-out ${
                    isSidebarOpen
                      ? "group-hover:rotate-45 group-hover:translate-y-0"
                      : "group-hover:-rotate-45 group-hover:translate-y-0"
                  } group-hover:scale-110 group-hover:bg-gray-400`
                }
              />
            </button>
          </div>
        )}
        {/* Logo (Arcky-Tech) */}
        <h1
          className={`${
            isShrunk || variant === "docs"
              ? "lg:text-2xl sm:text-xl text-base"
              : "lg:text-3xl sm:text-2xl text-base"
          } font-bold transition-all duration-300 ease-in-out text-left ${
            variant !== "docs"
              ? hasScrolled
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-5"
              : "opacity-100"
          }`}
        >
          <Link 
            href="/"
            className="hover:text-gray-400 transition-all duration-300 ease-in-out sm:inline hidden"
          >
            Arcky-Tech
          </Link>
        </h1>
        {/* Icons and Name */}
        <div className="flex md:space-x-5 space-x-4">
          <NavbarItem
            href={routes.home}
            icon="HomeIcon"
            text="Home"
            isShrunk={isShrunk}
          />
          <NavbarItem
            href={routes.projects}
            icon="BriefcaseIcon"
            text="Projects"
            isShrunk={isShrunk}
          />
          <NavbarItem
            href={routes.discord}
            icon="ChatBubbleLeftRightIcon"
            text="Discord"
            isShrunk={isShrunk}
          />
          <NavbarItem
            href={routes.docs}
            icon="BookOpenIcon"
            text="Documentation"
            isShrunk={isShrunk}
          />
          <NavbarItem
            href={routes.about}
            icon="InformationCircleIcon"
            text="About"
            isShrunk={isShrunk}
          />
          <NavbarItem
            href={routes.contact}
            icon="UsersIcon"
            text="Contact"
            isShrunk={isShrunk}
          />
        </div>
      </div>
    </nav>
  )
}