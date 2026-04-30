// Good example of Scroll Spy: https://linear.app/docs/triage#overview
"use client";
import { useEffect, useState } from "react";
import { useMainRef } from "ui";

export function useActiveHeading(items: { anchorId?: string, level: number }[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const mainRef = useMainRef();

  useEffect(() => {
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const handler = () => {
      const mainTop = mainEl.getBoundingClientRect().top;

      const threshold = 96;

      const h2Items = items.filter(i => i.anchorId);
      const offsets = h2Items
        .map(item => {
          const el = document.getElementById(item.anchorId!);
          if (!el) return null;

          const top = el.getBoundingClientRect().top - mainTop;
          return { id: item.anchorId!, top };
        })
        .filter(Boolean) as { id: string, top: number }[];

      const passed = offsets
        .filter(o => o.top <= threshold)
        .sort((a, b) => b.top - a.top);

      if (passed[0]) setActiveId(passed[0].id);
    };

    mainEl.addEventListener("scroll", handler, { passive: true });
    handler();

    return () => {
      mainEl.removeEventListener("scroll", handler);
      setActiveId(null);
    };
  }, [items]);

  return activeId;
}