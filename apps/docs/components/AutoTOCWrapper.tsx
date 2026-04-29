// components/AutoTOCWrapper.tsx
"use client";

import { useRef } from "react";
import { useAutoTOC } from "@/hooks/useAutoToc";

export function AutoTOCWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useAutoTOC(ref);

  return (
    <div ref={ref} className="flex-1 flex">
      {children}
    </div>
  );
}