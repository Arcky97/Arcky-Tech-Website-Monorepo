"use client";
import { useMainRef, useTOC } from "ui";
import { useActiveHeading } from "./../hooks/useActiveHeading";
import { useEffect, useRef, useState } from "react";

export function DocsTOC() {
  const { items } = useTOC();
  const activeId = useActiveHeading(items);
  const mainRef = useMainRef();
  const tocRef = useRef<HTMLDivElement | null>(null);
  const [indicator, setIndicator] = useState<{top: number, height: number}>({top: 0, height: 0})

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);
    const mainEl = mainRef.current;
    if (!mainEl) return;

    const el = document.getElementById(id);
    if (!el) return;

    const offset = 48;

    const top =
      el.getBoundingClientRect().top +
      mainEl.scrollTop -
      offset;
    
    mainEl.scrollTo({ top });

    history.replaceState(null, "", `${hash}`);
  }, [mainRef]);

  useEffect(() => {
    if (!activeId || !tocRef.current) return;

    const container = tocRef.current;
    const activeEl = container.querySelector(
      `[data-anchor="${activeId}"]`
    ) as HTMLElement | null;

    if (!activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = activeEl.getBoundingClientRect();

    const relativeTop =
      itemRect.top -
      containerRect.top +
      container.scrollTop;

    setIndicator({
      top: Math.max(0, relativeTop - 46),
      height: itemRect.height,
    });

    const isInView =
      itemRect.top >= containerRect.top + 96 &&
      itemRect.bottom <= containerRect.bottom - 96;

    if (isInView) return;

    const offset =
      itemRect.top -
      containerRect.top -
      container.clientHeight / 2 +
      itemRect.height / 2;

    container.scrollBy({
      top: offset,
      behavior: "smooth",
    });
  }, [activeId]);

  const scrollTo = (id: string, level: number) => {
    const mainEl = mainRef.current;
    if (!mainEl) return;
    const el = document.getElementById(id);
    if (!el) return;

    const offset = level === 2 ? 48 : 96;
    const top = 
      el.getBoundingClientRect().top + 
      mainEl.scrollTop - 
      offset;

    mainEl.scrollTo({ top, behavior: "smooth" });

    history.replaceState(null, "", `#${id}`);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <aside ref={tocRef} className="w-52 sticky top-0 h-[calc(100vh-48px)] overflow-auto border-l border-gray-700/40 px-3 py-4 hidden lg:inline">
      <div className="text-white text-xs uppercase opacity-60 mb-3">On this page</div>

      <nav className="space-y-1 relative">
        <div className="absolute bg-blue-500 w-0.5 transition-all duration-150 ease-out" style={{ top: indicator.top, height: indicator.height }}/>
        {items.map((item, index) => {
          const isActive = activeId === item.anchorId || (!activeId && index === 0);

          return (
            <div key={`${item.anchorId}-${index}`} className="relative pl-3">
              <button
                key={`${item.anchorId}-${index}`}
                data-anchor={item.anchorId}
                onClick={() => {
                  if (!item.anchorId) return;
                  scrollTo(item.anchorId, item.level)
                }}
                className={`
                  block text-left w-full text-sm transition-all duration-300 ease-in-out font-semibold not-last-of-type:
                  ${item.level === 3 ? "pl-4 text-xs opacity-70" : item.level === 4 ? "pl-8 text-xs opacity-60" : ""}
                  ${isActive ? "text-white" : "text-gray-400 hover:text-white"}
                `}
              >
                {item.title}
              </button>
            </div>
          )
        })}
      </nav>
    </aside>
  )
} 