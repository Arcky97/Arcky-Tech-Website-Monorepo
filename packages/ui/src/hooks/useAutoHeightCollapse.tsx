
import { useCallback, useEffect, useRef, useState } from "react";

type Height = number | "auto";

export interface UseAutoHeightCollapseOptions {
  defaultOpen?: boolean;
  observeContentResize?: boolean;
}

export function useAutoHeightCollapse(
  options: UseAutoHeightCollapseOptions = {}
) {
  const { defaultOpen = false, observeContentResize = false } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
  const [height, setHeight] = useState<Height>(defaultOpen ? "auto" : 0);
  const [animating, setAnimating] = useState<boolean>(false); // ✅ nieuw

  const setRef = useCallback((el: HTMLDivElement | null) => {
    ref.current = el;
    if (!el) return;
    setHeight(defaultOpen ? "auto" : 0);
  }, [defaultOpen]);

  const open = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    setAnimating(true);              // ✅ start animatie
    setHeight(0);
    // force reflow
    el.offsetHeight;

    setIsOpen(true);
    requestAnimationFrame(() => {
      setHeight(el.scrollHeight);
    });
  }, []);

  const close = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    setAnimating(true);              // ✅ start animatie
    setHeight(el.scrollHeight);
    requestAnimationFrame(() => {
      setHeight(0);
      setIsOpen(false);
    });
  }, []);

  const toggle = useCallback(() => {
    // Optioneel: voorkom togglen tijdens animatie
    if (animating) return;
    if (isOpen) close();
    else open();
  }, [animating, isOpen, open, close]);

  const onTransitionEnd = useCallback((e?: React.TransitionEvent<HTMLDivElement>) => {
    // Filter alleen height-transities
    if (e && e.propertyName !== "height") return;
    if (isOpen) setHeight("auto");
    setAnimating(false);            // ✅ animatie klaar
  }, [isOpen]);

  useEffect(() => {
    if (!observeContentResize) return;
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(() => {
      if (!isOpen) return;
      const full = el.scrollHeight;
      setHeight(full);
      requestAnimationFrame(() => setHeight("auto"));
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [observeContentResize, isOpen]);

  return {
    isOpen,
    animating,       // ✅ expose
    open,
    close,
    toggle,
    setRef,
    panelStyle: { height: height === "auto" ? "auto" : height },
    onTransitionEnd,
  };
}
