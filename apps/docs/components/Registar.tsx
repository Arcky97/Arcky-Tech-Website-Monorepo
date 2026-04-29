"use client";
import { useAutoTOC } from "@/hooks/useAutoToc";
import { useRef } from "react";

export function TOCRegister() {
  const contentRef = useRef<HTMLElement | null>(null);
  useAutoTOC(contentRef);

  return contentRef;
}