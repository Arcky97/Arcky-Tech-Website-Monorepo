import type { I18nConfig } from 'next-i18next/proxy';

const resourceLoader: I18nConfig['resourceLoader'] = 
  process.env.NODE_ENV === "development"
    ? async (language, namespace) => {
        const fs = await import('fs/promises');
        const path = await import('path');
        const content = await fs.readFile(
          path.resolve(process.cwd(), `app/i18n/locales/${language}/${namespace}.json`),
          'utf8'
        );
        return JSON.parse(content);
    } 
    : (language, namespace) => import(`./app/i18n/locales/${language}/${namespace}.json`)


const i18nConfig: I18nConfig = {
  supportedLngs: ["en", "nl"],
  fallbackLng: "en",
  defaultNS: "abilities",
  ns: ['abilities'],
  resourceLoader,
  reloadOnPrerender: process.env.NODE_ENV === "development"
}

export default i18nConfig;