"use client"

import { logPageVisit } from "ui";
import { useCookieConsent } from "./cookies/CookieConsentContext";
import { usePathname } from "next/navigation"
import { useEffect } from "react";

export default function PageVisitTracker() {
  const pathname = usePathname();
  const { consent, isLoaded } = useCookieConsent();

  useEffect(() => {
    if (!isLoaded || consent?.analytics !== true) return;

    logPageVisit(pathname);
  }, [consent?.analytics, isLoaded, pathname]);

  return null;
}