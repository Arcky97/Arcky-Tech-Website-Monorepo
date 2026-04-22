"use client";
import { useEffect, useState } from "react"
import Link from "next/link";
import { NavbarItem } from "./NavbarItem";

export type NavbarProps = {
  variant?: "web" | "docs" | "doggo-bot" | "scoreboard";
  enableShrink?: boolean;
  hasSidenav?: boolean;
  mainRef?: React.RefObject<HTMLElement | null>;
}

export function Navbar({ variant = "web", enableShrink, hasSidenav, mainRef }: NavbarProps) {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);

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

  return (
    <nav 
      id="navbar"
      
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
        {/* Logo (Arcky-Tech) */}
        <h1
          className={`${
            isShrunk
              ? "lg:text-2xl sm:text-xl text-base"
              : "lg:text-3xl sm:text-2xl text-base"
          } font-bold transition-all duration-300 ease-in-out ${
            variant === "web"
              ? hasScrolled
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-5"
              : "opacity-100"
          }`}
        >
          <Link 
            href="/"
            className="hover:text-gray-400 transition-all duration-300 ease-in-out md:inline hidden"
          >
            {!hasSidenav ? "Arcky-Tech" : ""}
          </Link>
        </h1>
        {/* Icons and Name */}
        <div className="flex md:space-x-5 space-x-4">
          <NavbarItem
            href="/"
            icon="HomeIcon"
            text="Home"
            isShrunk={isShrunk}
          />
          <NavbarItem
            href="/projects"
            icon="BriefcaseIcon"
            text="Projects"
            isShrunk={isShrunk}
          />
          <NavbarItem
            href="https://discord.gg/HK99jTNqS2"
            icon="ChatBubbleLeftRightIcon"
            text="Discord"
            isShrunk={isShrunk}
          />
          <NavbarItem
            href="/documentation"
            icon="BookOpenIcon"
            text="Documentation"
            isShrunk={isShrunk}
          />
          <NavbarItem
            href="/about"
            icon="InformationCircleIcon"
            text="About"
            isShrunk={isShrunk}
          />
          <NavbarItem
            href="/contact"
            icon="UsersIcon"
            text="Contact"
            isShrunk={isShrunk}
          />
        </div>
      </div>
    </nav>
  )
}