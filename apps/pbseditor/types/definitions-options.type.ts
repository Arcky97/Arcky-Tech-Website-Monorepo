import settings from "@/app/i18n/locales/en/settings.json";

type DefinitionOptions = typeof settings.definitions.options;

/**
 * Keys of `definitions.options` in settings.json, restricted to those that provide
 * a `label` field, i.e. the ones usable to build a dynamic
 * `definitions.options.<key>.label` translation key.
 */
export type DefinitionOptionKey = {
  [K in keyof DefinitionOptions]: DefinitionOptions[K] extends { label: string } ? K : never;
}[keyof DefinitionOptions];
