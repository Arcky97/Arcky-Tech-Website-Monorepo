"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type LabelAndTooltipProps = {
  label: string[];
  infoData: string[];
  noWidthLimit?: boolean;
}

export function LabelAndTooltip({ label, infoData, noWidthLimit = false}: LabelAndTooltipProps) {
  const [tooltipData, setTooltipData] = useState<{
    text: string,
    position: "top" | "bottom"
    left: number,
    top: number,
    visible: boolean,
    width: number
  }>({
    text: "",
    position: "bottom",
    left: 0,
    top: 33,
    visible: false,
    width: 400
  });

  const containerRef = useRef<HTMLHeadingElement>(null);
  const tooltipRef = useRef<HTMLElement>(null);
  const measureRef = useRef<HTMLElement>(null);
  const anchorRectRef = useRef<DOMRect | null>(null);
  const hideTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
  const fadeOutDelay = 300;
  const fadeDuration = 300;
  const tooltipMargin = 6;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const updateTooltipPostion = (labelEl: HTMLElement | null, text: string) => {
    if (!labelEl) return;

    // Coordinates are kept in viewport space since the tooltip is portaled/fixed-positioned.
    const labelRect = labelEl.getBoundingClientRect();
    anchorRectRef.current = labelRect;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    let naturalWidth = 400;
    if (measureRef.current) {
      measureRef.current.textContent = text;
      naturalWidth = measureRef.current.offsetWidth + 16;
    }

    let position: "bottom" | "top" = "bottom";
    let top = labelRect.bottom + tooltipMargin;
    let left = labelRect.left;

    let width = naturalWidth;
    const rightLimit = viewportWidth - 32;

    if (left + width > rightLimit) {
      width = rightLimit - left;
    }

    if (labelRect.bottom + 100 > viewportHeight - 64) {
      position = "top";
      top = labelRect.top - tooltipMargin;
    }

    setTooltipData({
      text,
      position,
      left,
      top,
      width,
      visible: true
    });
  };

  const showTooltip = (e: HTMLElement, text: string) => {
    if (!text) return;
    clearTimeout(hideTimeout.current);
    updateTooltipPostion(e, text);

  }

  const hidetooltip = () => {
    clearTimeout(hideTimeout.current);
    hideTimeout.current = setTimeout(() => {
      if (tooltipRef.current) {
        tooltipRef.current.classList.remove("show");
        hideTimeout.current = setTimeout(() => {
          setTooltipData(prev => ({ ...prev, visible: false }));
        }, fadeDuration);
      } else {
        setTooltipData(prev => ({ ...prev, visible: false}));
      }
    }, fadeOutDelay)
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tooltipData.visible) hidetooltip();
    };

    // capture:true also catches scrolling inside nested scrollable containers (e.g. the sidebar)
    window.addEventListener("scroll", handleScroll, true);

    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [tooltipData.visible]);

  useEffect(() => {
    if (tooltipData.visible && tooltipRef.current) {
      requestAnimationFrame(() => tooltipRef.current?.classList.add("show"));
    }
  }, [tooltipData.visible, tooltipData.text]);

  // Re-anchor "top" placement once the tooltip's real height is known so it sits flush above the label.
  useLayoutEffect(() => {
    if (!tooltipData.visible || tooltipData.position !== "top" || !tooltipRef.current || !anchorRectRef.current) return;

    const height = tooltipRef.current.offsetHeight;
    const correctedTop = anchorRectRef.current.top - height - tooltipMargin;

    if (Math.abs(correctedTop - tooltipData.top) > 1) {
      setTooltipData(prev => ({ ...prev, top: correctedTop }));
    }
  }, [tooltipData.visible, tooltipData.position, tooltipData.text]);

  const tooltipNode = infoData && (
    <span
      ref={tooltipRef}
      className={`tooltipText ${tooltipData.position} ${tooltipData.visible ? "show" : "hide"}`}
      style={{
        position: "fixed",
        left: tooltipData.left,
        top: tooltipData.top,
        width: noWidthLimit ? `${Math.min(tooltipData.width, 400)}px` : "auto",
        maxWidth: noWidthLimit ? "auto" : "400px",
        zIndex: 9999
      }}
    >
      {tooltipData.text}
    </span>
  );

  return (
    <>
      <div className="label-box" ref={containerRef}>
        {label.map((l, i) => (
          <h2
            key={l}
            className={`${infoData?.[i] ? "tooltip" : "" }`}
            onMouseEnter={(e) => showTooltip(e.currentTarget, infoData?.[i])}
            onMouseLeave={hidetooltip}
          >
            {l}
          </h2>
        ))}
        {mounted && infoData && typeof document !== "undefined"
          ? createPortal(tooltipNode, document.body)
          : null}
      </div>
      <span
        ref={measureRef}
        className="tooltipText measure"
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          maxWidth: "none",
          width: "auto",
          left: -9999,
          top: -9999
        }}
      >
        {tooltipData.text}
      </span>
    </>
  )
}