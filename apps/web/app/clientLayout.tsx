"use client";
import { useRef } from "react";
import { MainLayoutWrapper } from "../../../packages/ui/src"
import { Footer } from "../../../packages/ui/src";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const mainRef = useRef<HTMLElement | null>(null);

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