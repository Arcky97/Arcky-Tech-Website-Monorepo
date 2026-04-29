"use client";

import { createContext, ReactNode, useContext, useState } from "react";

export type TOCItem = {
  title: string;
  anchorId?: string;
  level: number;
};

type TOCContextType = {
  items: TOCItem[];
  setItems: (items: TOCItem[]) => void;
};

const TOCContext = createContext<TOCContextType | null>(null); 

export function TOCProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<TOCItem[]>([]);

  return (
    <TOCContext.Provider value={{ items, setItems }}>
      {children}
    </TOCContext.Provider>
  );
}

export function useTOC() {
  const ctx = useContext(TOCContext);
  if (!ctx) throw new Error("useTOC must be used inside TOCProvider");
  return ctx;
}