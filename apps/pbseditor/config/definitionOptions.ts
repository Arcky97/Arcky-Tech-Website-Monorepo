import { DefinitionOptionKey } from "@/types/definitions-options.type";
import { defaultDefinitions } from "./defaultDefinitions";

export type DefinitionOption = { label: DefinitionOptionKey, value: keyof typeof defaultDefinitions | string };

export const definitionOptions: DefinitionOption[] = [
    {
      label: "abilitypbs",
      value: "abilities"
    },
    {
      label: "abilityflags",
      value: "abilityflags"
    },
    {
      label: "encounterpbs",
      value: "encounters"
    },
    {
      label: "encountertypes",
      value: "encountertypes"
    },
    {
      label: "itempbs",
      value: "items"
    },
    {
      label: "fielduses",
      value: "fielduses"
    },
    {
      label: "battleuses",
      value: "battleuses"
    },
    {
      label: "itemflags",
      value: "itemflags"
    },
    {
      label: "mapmetadatapbs",
      value: "map"
    },
    {
      label: "weathers",
      value: "weathers"
    },
    {
      label: "environments",
      value: "environments"
    },
    {
      label: "mapflags",
      value: "mapflags"
    },
    {
      label: "movepbs",
      value: "moves"
    },
    {
      label: "targets",
      value: "targets"
    },
    {
      label: "moveflags",
      value: "moveflags"
    },
    {
      label: "speciespbs",
      value: "pokemon"
    },
    {
      label: "genderratios",
      value: "genderratios"
    },
    {
      label: "growthrates",
      value: "growthrates"
    },
    {
      label: "egggroups",
      value: "egggroups"
    },
    {
      label: "colors",
      value: "colors"
    },
    {
      label: "shapes",
      value: "shapes"
    },
    {
      label: "habitats",
      value: "habitats"
    },
    {
      label: "pokemonflags",
      value: "speciesflags"
    },
    {
      label: "evolutions",
      value: "evolutions"
    },
    {
      label: "trainertypepbs",
      value: "trainers"
    },
    {
      label: "trainertypeflags",
      value: "trainertypeflags"
    },
    {
      label: "typepbs",
      value: "types"
    },
    {
      label: "typeflags",
      value: "typeflags"
    }
  ]