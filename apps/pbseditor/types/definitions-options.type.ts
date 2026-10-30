import settings from "@/app/i18n/locales/en/settings.json";

type DefinitionOptions = typeof settings.definitions.options;

/**
 * Keys of `definitions.options` in settings.json that provide a `singular`/`plural`
 * pair, i.e. the ones usable to build a dynamic `definitions.options.<key>.plural`
 * (or `.singular`) translation key.
 */
export type DefinitionOptionKey = {
  [K in keyof DefinitionOptions]: DefinitionOptions[K] extends { plural: string } ? K : never;
}[keyof DefinitionOptions];

/**
 * Keys of `definitions.options` in settings.json that provide a `singular` form,
 * i.e. the ones usable to build a dynamic `definitions.options.<key>.singular`
 * translation key (this includes category-only entries like `abilitypbs` that
 * have no `plural` form).
 */
export type DefinitionSingularKey = {
  [K in keyof DefinitionOptions]: DefinitionOptions[K] extends { label: string } ? K : never;
}[keyof DefinitionOptions];
