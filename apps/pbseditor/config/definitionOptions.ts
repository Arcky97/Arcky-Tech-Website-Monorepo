import { defaultDefinitions } from "./defaultDefinitions";

  export const definitionOptions: { label: string, value: keyof typeof defaultDefinitions | string}[] = [
    {
      label: "Ability PBS",
      value: "abilities"
    },
    {
      label: "Ability Flags",
      value: "abilityflags"
    },
    {
      label: "Encounter PBS",
      value: "encounters"
    },
    {
      label: "Encounter Types",
      value: "encountertypes"
    },
    {
      label: "Item PBS",
      value: "items"
    },
    {
      label: "Field Uses",
      value: "fielduses"
    },
    {
      label: "Battle Uses",
      value: "battleuses"
    },
    {
      label: "Item Flags",
      value: "itemflags"
    },
    {
      label: "Map Metadata PBS",
      value: "map"
    },
    {
      label: "Weathers",
      value: "weathers"
    },
    {
      label: "Environments",
      value: "environments"
    },
    {
      label: "Map Flags",
      value: "mapflags"
    },
    {
      label: "Moves",
      value: "moves"
    },
    {
      label: "Targets",
      value: "targets"
    },
    {
      label: "Move Flags",
      value: "moveflags"
    },
    {
      label: "Pokémon and Forms",
      value: "pokemon"
    },
    {
      label: "Gender Ratios",
      value: "genderratios"
    },
    {
      label: "Growth Rates",
      value: "growthrates"
    },
    {
      label: "Egg Groups",
      value: "egggroups"
    },
    {
      label: "Colors",
      value: "colors"
    },
    {
      label: "Shapes",
      value: "shapes"
    },
    {
      label: "Habitats",
      value: "habitats"
    },
    {
      label: "Pokémon Flags",
      value: "speciesflags"
    },
    {
      label: "Evolutions",
      value: "evolutions"
    },
    {
      label: "Trainer Types",
      value: "trainertypes"
    },
    {
      label: "Trainer Type Flags",
      value: "trainertypeflags"
    },
    {
      label: "Types",
      value: "types"
    },
    {
      label: "Type Flags",
      value: "typeflags"
    }
  ]