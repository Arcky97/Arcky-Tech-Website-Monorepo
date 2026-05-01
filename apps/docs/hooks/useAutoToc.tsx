"use client";
import { RefObject, useEffect } from "react";
import { slugify, useTOC } from "ui";

function getHeadingLevel(tagName: string): 2 | 3 | 4 | 5 | 6 {
  switch (tagName) {
    case "H2":
      return 2;
    case "H3":
      return 3;
    case "H4":
      return 4;
    case "H5":
      return 5;
    default:
      return 6;
  }
}

function getParentSlug(level: number, slugParent: Map<number, string>) {
  for (let l = level - 1; l >= 2; l--) {
    const parent = slugParent.get(l);
    if (parent) return parent;
  }
  return "";
}

export function useAutoTOC(containerRef: RefObject<HTMLElement | null>) {
  const { setItems } = useTOC();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const headings = Array.from(
      el.querySelectorAll("h2, h3, h4, h5, h6")
    ) as HTMLHeadingElement[];

    const slugParent = new Map<number, string>();
    const slugCount = new Map<string, number>();

    const items = headings.map(h => {
      const level = getHeadingLevel(h.tagName);
      const title = h.textContent?.trim() ?? "";

      if (h.id) {
        slugParent.set(level, h.id);
        return {
          title,
          anchorId: h.id,
          level
        };
      }


      const baseSlug = slugify(title);

      const parentSlug = 
        level === 2
          ? "" 
          : getParentSlug(level, slugParent);

      let id = 
        level === 2 
          ? baseSlug 
          : parentSlug
            ? `${parentSlug}-${baseSlug}`
            : baseSlug;

      const count = slugCount.get(id) ?? 0;
      if (count > 0) {
        id = `${id}-${count}`;
      }
      slugCount.set(id, count + 1);

      h.id = id;

      slugParent.set(level, id);

      return {
        title,
        anchorId: h.id,
        level
      };
    });

    setItems(items);
    return () => setItems([]);
  }, [containerRef, setItems])
}