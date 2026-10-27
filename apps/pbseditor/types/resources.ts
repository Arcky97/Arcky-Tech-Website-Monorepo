import common from '../app/i18n/locales/en/common.json'
import abilities from '../app/i18n/locales/en/abilities.json';
import buttons from '../app/i18n/locales/en/buttons.json';
import settings from '../app/i18n/locales/en/settings.json'

export const resources = {
  common,
  abilities,
  buttons,
  settings,
} as const;

export type AvailableNameSpaces = keyof typeof resources;