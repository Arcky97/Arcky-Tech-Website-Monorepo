"use client";
import { ROUTES as routes } from "@/config/routes";
import { useRef } from "react";
import { MainLayoutWrapper, Footer, MainRefContext } from "ui";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);

  return (
    <MainRefContext.Provider value={mainRef}>
      <MainLayoutWrapper
        navbar={{
          variant: "web",
          enableShrink: true,
          routes
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
    </MainRefContext.Provider>
  );
}