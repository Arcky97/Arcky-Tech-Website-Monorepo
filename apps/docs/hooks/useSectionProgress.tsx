"use client";
import { useEffect, useState } from "react";
import { useMainRef, useTOC } from "ui";

export function useTOCSectionProgress() {
  const mainRef = useMainRef();
  const { items } = useTOC();
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const h2Items = items.filter(i => i.level === 2 && i.anchorId);

    const onScroll = () => {
      const containerTop = container.getBoundingClientRect().top;
      const scrollTop = container.scrollTop;
      const nextMap: Record<string, number> = {};

      h2Items.forEach((item, index) => {
        const el = document.getElementById(item.anchorId!);
        if (!el) return;

        const start =
          el.getBoundingClientRect().top +
          scrollTop -
          containerTop;

        const next = h2Items[index + 1]
          ? document.getElementById(h2Items[index + 1].anchorId!)
          : null;

        const end = next
          ? next.getBoundingClientRect().top + scrollTop - containerTop
          : container.scrollHeight;

        let progress = 0;

        if (scrollTop >= end) progress = 1;
        else if (scrollTop <= start) progress = 0;
        else progress = (scrollTop - start) / (end - start);

        nextMap[item.anchorId!] = Math.min(Math.max(progress, 0), 1);
      });

      setProgressMap(nextMap);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => container.removeEventListener("scroll", onScroll);
  }, [items, mainRef]);

  return progressMap;
}