export interface PBSUserPreferences {
  language: string;
  autosave: boolean;
  unitSystem: "Metric" | "Imperial";
  noTypeLimit: boolean;
}

export interface PBSProjectConfig {
  fileAccess: boolean;
  pbsFolder: string;
  arckyPMPlugin: boolean;
  arckyRMPlugin: boolean;
}

export interface PBSCustomDefinitions {
  abilityFlags: string[];
  encounterTypes: string[];
  fieldUses: string[];
  battleUses: string[];
  itemFlags: string[];
  weathers: string[];
  environments: string[];
  mapFlags: string[];
  targets: string[];
  moveFlags: string[];
  genderRatios: string[];
  growthRates: string[];
  eggGroups: string[];
  colors: string[];
  shapes: string[];
  habitats: string[];
  speciesFlags: string[];
  evolutions: [string, string?][];
  trainerPokemonNatures: string[];
  trainerTypeFlags: string[];
  typeFlags: string[];
}

export interface PBSConfig {
  version: number;
  preferences: PBSUserPreferences;
  project: PBSProjectConfig;
  definitions: PBSCustomDefinitions;
}