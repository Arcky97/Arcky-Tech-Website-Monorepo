import { defaultDefinitions } from "./defaultDefinitions";
import { PairListProps, StringListProps } from "@/types/props/editable-config-list.type";

export type DefinitionConfigType = keyof typeof defaultDefinitions;

type SingleDefinitionConfig = {
  defKey: Exclude<DefinitionConfigType, "evolutions">;
  filters: string[];
} & Omit<StringListProps, "data" | "fixedData" | "setData">;

type DoubleDefinitionConfig = {
  defKey: "evolutions";
  filters: string[];
} & Omit<PairListProps, "data" | "fixedData" | "setData">;

type DefinitionConfig =
  | SingleDefinitionConfig
  | DoubleDefinitionConfig;

export const definitionsConfig: DefinitionConfig[] = [
    {
      defKey: "abilityFlags",
      label: "abilityflags",
      placeholder: "Add Ability",
      filters: ["abilities", "abilityflags"]
    },
    {
      defKey: "encounterTypes",
      label: "encountertypes",
      placeholder: "Add Encounter Types",
      filters: ["encounters", "encountertypes"]
    },
    {
      defKey: "fieldUses",
      label: "fielduses",
      placeholder: "Add Field Uses",
      filters: ["items", "fielduses"]
    },
    {
      defKey: "battleUses",
      label: "battleuses",
      placeholder: "Add Battle Uses",
      filters: ["items", "battleuses"]
    },
    {
      defKey: "itemFlags",
      label: "itemflags",
      placeholder: "Add Item Flags",
      filters: ["items", "itemflags"]
    },
    {
      defKey: "weathers",
      label: "weathers",
      placeholder: "Add Weathers",
      filters: ["map", "weathers"]
    },
    {
      defKey: "environments",
      label: "environments",
      placeholder: "Add Environments",
      filters: ["map", "environments"]
    },
    {
      defKey: "mapFlags",
      label: "mapflags",
      placeholder: "Add Map Flags",
      filters: ["map", "mapflags"]
    },
    {
      defKey: "targets",
      label: "targets",
      placeholder: "Add Targets",
      filters: ["moves", "targets"]
    },
    {
      defKey: "moveFlags",
      label: "moveflags",
      placeholder: "Add Move Flags",
      filters: ["moves", "moveflags"]
    },
    {
      defKey: "genderRatios",
      label: "genderratios",
      placeholder: "Add Gender Ratios",
      filters: ["pokemon", "genderratios"]
    },
    {
      defKey: "growthRates",
      label: "growthrates",
      placeholder: "Add Growth Rates",
      filters: ["pokemon", "growthrates"]
    },
    {
      defKey: "eggGroups",
      label: "egggroups",
      placeholder: "Add Egg Groups",
      filters: ["pokemon", "egggroups"]
    },
    {
      defKey: "colors",
      label: "colors",
      placeholder: "Add Colors",
      filters: ["pokemon", "colors"]
    },
    {
      defKey: "shapes",
      label: "shapes",
      placeholder: "Add Shapes",
      filters: ["pokemon", "shapes"]
    },
    {
      defKey: "habitats",
      label: "habitats",
      placeholder: "Add Habitats",
      filters: ["pokemon", "habitats"]
    },
    {
      defKey: "speciesFlags",
      label: "pokemonflags",
      placeholder: "Add Pokémon Flags",
      filters: ["pokemon", "pokemonflags"]
    },
    {
      defKey: "evolutions",
      label: "evolutions",
      placeholder: ["Evolution", "Parameter"],
      filters: ["pokemon", "evolutions"],
      doubleInput: true
    },
    {
      defKey: "trainerTypeFlags",
      label: "trainertypeflags",
      placeholder: "Add Trainer Type Flags",
      filters: ["trainertypes", "trainertypeflags"]
    },
    {
      defKey: "typeFlags",
      label: "typeflags",
      placeholder: "Add Type Flags",
      filters: ["types", "typeflags"]
    }
  ];