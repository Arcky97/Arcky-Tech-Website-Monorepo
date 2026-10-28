import { defaultDefinitions } from "./defaultDefinitions";
import { PairListProps, StringListProps } from "@/types/props/editable-config-list.type";

type DefinitionConfigType = keyof typeof defaultDefinitions;

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
      label: "Abilities Flags",
      placeholder: "Add Ability",
      filters: ["abilities", "abilityflags"]
    },
    {
      defKey: "encounterTypes",
      label: "Encounter Types",
      placeholder: "Add Encounter Types",
      filters: ["encounters", "encountertypes"]
    },
    {
      defKey: "fieldUses",
      label: "Field Uses",
      placeholder: "Add Field Uses",
      filters: ["items", "fielduses"]
    },
    {
      defKey: "battleUses",
      label: "Battle Uses",
      placeholder: "Add Battle Uses",
      filters: ["items", "battleuses"]
    },
    {
      defKey: "itemFlags",
      label: "Item Flags",
      placeholder: "Add Item Flags",
      filters: ["items", "itemflags"]
    },
    {
      defKey: "weathers",
      label: "Weathers",
      placeholder: "Add Weathers",
      filters: ["map", "weathers"]
    },
    {
      defKey: "environments",
      label: "Environments",
      placeholder: "Add Environments",
      filters: ["map", "environments"]
    },
    {
      defKey: "mapFlags",
      label: "Map Flags",
      placeholder: "Add Map Flags",
      filters: ["map", "mapflags"]
    },
    {
      defKey: "targets",
      label: "Targets",
      placeholder: "Add Targets",
      filters: ["moves", "targets"]
    },
    {
      defKey: "moveFlags",
      label: "Move Flags",
      placeholder: "Add Move Flags",
      filters: ["moves", "moveflags"]
    },
    {
      defKey: "genderRatios",
      label: "Gender Ratios",
      placeholder: "Add Gender Ratios",
      filters: ["pokemon", "genderratios"]
    },
    {
      defKey: "growthRates",
      label: "Growth Rates",
      placeholder: "Add Growth Rates",
      filters: ["pokemon", "growthrates"]
    },
    {
      defKey: "eggGroups",
      label: "Egg Groups",
      placeholder: "Add Egg Groups",
      filters: ["pokemon", "egggroups"]
    },
    {
      defKey: "colors",
      label: "Colors",
      placeholder: "Add Colors",
      filters: ["pokemon", "colors"]
    },
    {
      defKey: "shapes",
      label: "Shapes",
      placeholder: "Add Shapes",
      filters: ["pokemon", "shapes"]
    },
    {
      defKey: "habitats",
      label: "Habitats",
      placeholder: "Add Habitats",
      filters: ["pokemon", "habitats"]
    },
    {
      defKey: "speciesFlags",
      label: "Pokémon Flags",
      placeholder: "Add Pokémon Flags",
      filters: ["pokemon", "pokemonflags"]
    },
    {
      defKey: "evolutions",
      label: "Evolutions",
      placeholder: ["Evolution", "Parameter"],
      filters: ["pokemon", "evolutions"],
      doubleInput: true
    },
    {
      defKey: "trainerTypeFlags",
      label: "Trainer Type Flags",
      placeholder: "Add Trainer Type Flags",
      filters: ["trainertypes", "trainertypeflags"]
    },
    {
      defKey: "typeFlags",
      label: "Type Flags",
      placeholder: "Add Type Flags",
      filters: ["types", "typeflags"]
    }
  ];