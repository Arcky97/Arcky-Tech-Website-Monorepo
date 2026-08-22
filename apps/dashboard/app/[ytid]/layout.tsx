"use client";
import { youtubeDashboard } from "@/config/youtubeDashboard";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from "ui";

export default function YoutubeLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty("--navbar-height", "48px");

    let lastIsDesktop = window.innerWidth >= 1024;

    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      if (isDesktop !== lastIsDesktop) {
        setSidebarOpen(isDesktop);
        lastIsDesktop = isDesktop;
        console.log(lastIsDesktop);
      }
    };

    setSidebarOpen(window.innerWidth >= 1024);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize)
  }, []);

  return (
    <div className="relative flex overflow-hidden">
      <Sidebar
        menuItems={[youtubeDashboard]}
        docType={youtubeDashboard.name}
        mainDocs={false}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main
        ref={mainRef}
        className="flex-1 bg-gray-900 h-full"
      >
        {children}
      </main>
    </div>
  )
}