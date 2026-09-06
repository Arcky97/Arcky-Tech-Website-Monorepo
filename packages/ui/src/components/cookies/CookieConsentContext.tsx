"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "../../lib/cookies";

declare global {
  interface Window {
    cookieConsent?: Consent;
  }
}

export const COOKIE_CONSENT_VERSION = 1;

export type Consent = {
  analytics: boolean;
  preferences: boolean;
};

type StoredConsent = Consent & {
  version: number;
};

export const defaultConsent: Consent = {
  analytics: false,
  preferences: false
};

function parseConsent(value: string | undefined): Consent | null {
  if (!value) return null;

  try {
    const parsed = JSON.parse(value) as Partial<StoredConsent>;
    if (parsed.version !== COOKIE_CONSENT_VERSION) return null;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.preferences !== "boolean") {
      return null;
    }

    return {
      analytics: parsed.analytics,
      preferences: parsed.preferences
    };
  } catch {
    return null;
  }
}

type CookieConsentContextValue = {
  consent: Consent | null;
  hasConsent: boolean;
  isLoaded: boolean;
  saveConsent: (values: Consent) => void;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<Consent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedConsent = parseConsent(getCookie("cookieConsent"));
    setConsent(storedConsent);
    window.cookieConsent = storedConsent ?? undefined;
    setIsLoaded(true);
  }, []);

  const saveConsent = (values: Consent) => {
    const storedConsent: StoredConsent = {
      version: COOKIE_CONSENT_VERSION,
      ...values
    };

    setCookie("cookieConsent", JSON.stringify(storedConsent));
    setConsent(values);
    window.cookieConsent = values;
  };

  return (
    <CookieConsentContext.Provider value={{ consent, hasConsent: consent !== null, isLoaded, saveConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error("useCookieConsent must be used inside CookieConsentProvider");
  }

  return context;
}
