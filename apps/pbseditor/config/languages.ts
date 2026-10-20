export const LANGUAGE_COOKIE = "i18next";

// keep in sync with supportedLngs in i18n.config.ts
export const LANGUAGE_LABELS: Record<string, string> = {
  en: "English",
  nl: "Nederlands"
};

export const SUPPORTED_LANGUAGES = Object.keys(LANGUAGE_LABELS);

export function setLanguageCookie(lng: string) {
  document.cookie = `${LANGUAGE_COOKIE}=${lng}; path=/; max-age=31536000; samesite=lax`;
}
