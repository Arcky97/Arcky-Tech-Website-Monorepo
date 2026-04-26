"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  title: string;
  children: React.ReactNode;
  containerRef?: React.RefObject<HTMLElement | null>;
};

type TooltipState = {
  left: number;
  top: number;
  position: "top" | "bottom";
  width: number;
  arrowLeft: number;
};

export function LinkWithPreview({
  href,
  title,
  children,
  containerRef,
  ...rest
}: Props) {
  const [preview, setPreview] = useState<React.ReactNode | null>(null);
  const [visible, setVisible] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>({
    left: 0,
    top: 0,
    position: "bottom",
    width: 300,
    arrowLeft: 16
  });

  const wrapperRef = useRef<HTMLSpanElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLSpanElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ✅ Fetch preview
  useEffect(() => {
    if (!href) return;

    const isExternal = href.startsWith("http");
    const isAnchor = href.startsWith("#");

    if (isExternal) {
      setPreview(
        <>
          <strong className="block">External link:</strong>
          <span className="text-gray-300 wrap-break-word">{href}</span>
        </>
      );
    } else if (isAnchor) {
      setPreview(
        <>
          <strong className="block">Jump to section:</strong>
          <span className="text-gray-300">{title}</span>
        </>
      );
    } else {
      fetch(href)
        .then((res) => res.text())
        .then((html) => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const h1 =
            doc.querySelector("main header h1")?.textContent || "No title";
          const p =
            doc.querySelector("main header p")?.textContent ||
            "No description";

          setPreview(
            <>
              <strong className="block">{h1}</strong>
              <span className="text-gray-300 mt-1 block">{p}</span>
            </>
          );
        })
        .catch(() => {
          setPreview(
            <span className="text-gray-400">Failed to load preview</span>
          );
        });
    }
  }, [href, title]);

  // ✅ Smart positioning
  const updatePosition = () => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const containerRect = containerRef?.current?.getBoundingClientRect();

    const bounds = containerRect ?? {
      left: 0,
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight
    };

    let width = 300;

    if (measureRef.current) {
      width = Math.min(measureRef.current.offsetWidth + 24, 400);
    }

    let left = rect.left;
    let top = rect.bottom + 8;
    let position: "top" | "bottom" = "bottom";

    if (left + width > bounds.right - 8) {
      left = bounds.right - width - 8;
    }

    if (left < bounds.left + 8) {
      left = bounds.left + 8;
    }

    if (rect.bottom + 120 > bounds.bottom) {
      position = "top";
      top = rect.top - 8;
    }

    if (position === "top" && rect.top - 120 < bounds.top) {
      position = "bottom";
      top = rect.bottom + 8;
    }

    const arrowLeft = Math.min(
      width - 16,
      Math.max(
        16,
        rect.left - left + rect.width / 2
      )
    );

    setTooltip({ left, top, position, width, arrowLeft });
  };

  // ✅ Hover logic
  const show = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    updatePosition();
    timerRef.current = setTimeout(() => setVisible(true), 100);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(false), 150);
  };

  return (
    <>
      <span
        ref={wrapperRef}
        className="relative inline-block text-blue-400 hover:text-blue-500"
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        <Link href={href} {...rest}>
          {children}
        </Link>
      </span>

      {preview && (
        <span
          ref={tooltipRef}
          className={`fixed z-9999 bg-[#1e1e1e] border border-gray-700 text-white text-sm rounded-xl px-4 py-3 shadow-lg transition-all duration-200 ease-in-out 
            ${visible ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
            ${tooltip.position === "top" ? "-translate-y-full" : "translate-y-2"}`}
          style={{
            left: tooltip.left,
            top: tooltip.top,
            width: tooltip.width,
          }}
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          {preview}

          {/* Arrow */}
          <span
            className={`absolute w-3 h-3 bg-[#1e1e1e] border border-gray-700 rotate-45 ${
              tooltip.position === "bottom"
                ? "-top-1.5 border-b-0 border-r-0"
                : "-bottom-1.5 border-t-0 border-l-0"
            }`}
            style={{ left: tooltip.arrowLeft }}
          />
        </span>
      )}

      {/* Hidden measurer */}
      <span
        ref={measureRef}
        className="fixed invisible whitespace-nowrap"
        style={{ left: -9999, top: -9999 }}
      >
        {preview}
      </span>
    </>
  );
}