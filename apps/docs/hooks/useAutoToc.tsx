"use client";

import { RefObject, useEffect } from "react";
import { slugify, useTOC } from "ui";

export function useAutoTOC(containerRef: RefObject<HTMLElement | null>) {
  const { setItems } = useTOC();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const headings = Array.from(el.querySelectorAll("h2, h3")) as HTMLHeadingElement[];

    const items = headings.map(h => {
      const level = h.tagName === "H2" ? 2 : 3;
      const title = h.textContent ?? "";

      let id: string | undefined;
      if (level === 2) {
        id = h.id || slugify(title);
        h.id = id;
      }

      return {
        title,
        anchorId: id,
        level
      };
    });

    setItems(items);
    return () => setItems([]);
  }, [containerRef, setItems])
}