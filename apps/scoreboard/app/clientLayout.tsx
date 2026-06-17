"use client";
import { useEffect, useRef } from "react";
import { MainRefContext } from "ui"; 

export default function ClientLayout({ children}: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.style.setProperty("--navbar-height", "80px");
  }, []);

  return (
    <MainRefContext.Provider value={mainRef}>
      <main
        ref={mainRef}
        className="flex flex-col flex-1 min-h-0 bg-gray-900 px-2"
      >
        <div className="flex-1">
          {children}
        </div>
      </main>
    </MainRefContext.Provider>
  )
}