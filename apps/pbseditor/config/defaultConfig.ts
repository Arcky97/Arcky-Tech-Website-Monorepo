import { PBSConfig } from "@/types/pbsConfig";

export const DEFAULT_CONFIG: PBSConfig = {
  version: 1,
  setupCompleted: false,
  preferences: {
    language: "en",
    autosave: true,
    unitSystem: "Metric",
    noTypeLimit: false
  },
  project: {
    fileAccess: false,
    pbsFolder: "",
    arckyRMPlugin: false,
    arckyPMPlugin: false
  },
  definitions: {
    abilityFlags: [],
    encounterTypes: [],
    fieldUses: [],
    battleUses: [],
    itemFlags: [],
    weathers: [],
    environments: [],
    mapFlags: [],
    targets: [],
    moveFlags: [],
    genderRatios: [],
    growthRates: [],
    eggGroups: [],
    colors: [],
    shapes: [],
    habitats: [],
    speciesFlags: [],
    evolutions: [],
    trainerPokemonNatures: [],
    trainerTypeFlags: [],
    typeFlags: []
  }
}