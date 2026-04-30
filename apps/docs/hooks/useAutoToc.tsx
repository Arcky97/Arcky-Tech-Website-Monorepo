"use client";

import { RefObject, useEffect } from "react";
import { slugify, useTOC } from "ui";

export function useAutoTOC(containerRef: RefObject<HTMLElement | null>) {
  const { setItems } = useTOC();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const headings = Array.from(el.querySelectorAll("h2, h3, h4, h5, h6")) as HTMLHeadingElement[];

    const items = headings.map(h => {
      const level = h.tagName === "H2" ? 2 : h.tagName === "H3" ? 3 : h.tagName === "H4" ? 4 : h.tagName === "H5" ? 5 : 6;
      const title = h.textContent ?? "";

      let id: string | undefined;
      id = h.id || slugify(title);
      h.id = id;

      return {
        title,
        anchorId: id,
        level
      };
    });

    console.log(items);

    setItems(items);
    return () => setItems([]);
  }, [containerRef, setItems])
}