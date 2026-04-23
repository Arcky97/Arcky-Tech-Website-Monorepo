import { HomeIcon } from "@heroicons/react/24/outline";

export const pbsEditor = {
  name: "pbs-editor",
  path: "",
  icon: <HomeIcon className="w-6 h-6"/>,
  text: "Arcky's PBS Editor",
  subItems: [
    {
      path: "update-history",
      text: "Update History"
    },
    {
      path: "pages",
      text: "Editor Pages",
      noPage: true,
      subItems: [
        {
          path: "home",
          text: "Home"
        },
        {
          path: "abilities",
          text: "Abilities",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-abilities",
              text: "Import Abilities"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#ability-selection",
              text: "Ability Selection"
            },
            {
              path: "#id",
              text: "ID"
            },
            {
              path: "#name",
              text: "Name"
            },
            {
              path: "#description",
              text: "Description"
            },
            {
              path: "#flags",
              text: "Flags"
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#ability-overwrite",
              text: "Ability Overwrite"
            }
          ]
        },
        {
          path: "berry-plants",
          text: "Berry Plants",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-berry-plants",
              text: "Import Berry Plants"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#berry-plant-selection",
              text: "Berry Plant Selection"
            },
            {
              path: "#id",
              text: "ID"
            },
            {
              path: "#hours-per-stage",
              text: "Hours per Stage"
            },
            {
              path: "#drying-per-hour",
              text: "Drying per Hour"
            },
            {
              path: "#yield",
              text: "Yield"
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#berry-plant-overwrite",
              text: "Berry Plant Overwrite"
            }
          ]
        },
        {
          path: "encounters",
          text: "Encounters",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "settings"
            },
            {
              path: "#import-encounters",
              text: "Import Encounters"
            }, 
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#encounter-selection",
              text: "Encounter Selection"
            },
            {
              path: "#id-and-version",
              text: "ID and Version"
            },
            {
              path: "#encounter-type-selection",
              text: "Encounter Type Selection"
            },
            {
              path: "#encounter-type-and-chance",
              text: "Encounter Type and Chance"
            },
            {
              path: "slots",
              text: "Encounter Slots",
              subItems: [
                {
                  path: "#overview",
                  text: "Overview"
                },
                {
                  path: "#probability",
                  text: "Probability"
                },
                {
                  path: "#species",
                  text: "Species"
                },
                {
                  path: "#level-threshold",
                  text: "Level Threshold"
                }
              ]
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#encounter-overwrite",
              text: "Encounter Overwrite"
            }
          ]
        },
        {
          path: "items",
          text: "Items",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-items",
              text: "Import Items"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#item-selection",
              text: "Item Selection"
            },
            {
              path: "#id",
              text: "ID"
            },
            {
              path: "#name",
              text: "Name"
            },
            {
              path: "#plural-name",
              text: "Plural Name"
            },
            {
              path: "#portion-name",
              text: "Portion Name"
            },
            {
              path: "#plural-portion-name",
              text: "Plural Portion Name"
            },
            {
              path: "#description",
              text: "Description"
            },
            {
              path: "#pocket",
              text: "Pocket"
            },
            {
              path: "#price",
              text: "Price"
            },
            {
              path: "#sell-price",
              text: "Sell Price"
            },
            {
              path: "#bp-price",
              text: "BP Price"
            },
            {
              path: "#sell-bp-price",
              text: "Sell BP Price"
            },
            {
              path: "#coin-price",
              text: "Coin Price"
            },
            {
              path: "#sell-coin-price",
              text: "Sell Coin Price"
            },
            {
              path: "#field-use",
              text: "Field Use"
            },
            {
              path: "#battle-use",
              text: "Battle Use"
            },
            {
              path: "#flags",
              text: "Flags"
            },
            {
              path: "#consumable",
              text: "Consumable"
            },
            {
              path: "#show-quantity",
              text: "Show Quantity"
            },
            {
              path: "#item-move",
              text: "Item Move"
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#item-overwrite",
              text: "Item Overwrite"
            }
          ]
        },
        {
          path: "map-metadata",
          text: "Map Metadata",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-map-metadata",
              text: "Import Map Metadata"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#map-metadata-selection",
              text: "Map Metadata Selection"
            },
            {
              path: "#id",
              text: "ID"
            },
            {
              path: "#name",
              text: "Name"
            },
            {
              path: "#map-position",
              text: "Map Position"
            },
            {
              path: "#map-size",
              text: "Map Size"
            },
            {
              path: "#outdoor",
              text: "Outdoor"
            },
            {
              path: "#weather-and-probability",
              text: "Weather and Probability"
            },
            {
              path: "#show-area",
              text: "Show Area"
            },
            {
              path: "#bicycle",
              text: "Bicycle"
            },
            {
              path: "#always-bicycle",
              text: "Always Bicycle"
            },
            {
              path: "#healing-spot",
              text: "Healing Spot"
            },
            {
              path: "#dive-map",
              text: "Dive Map"
            },
            {
              path: "#dark-map",
              text: "Dark Map"
            },
            {
              path: "#safari-map",
              text: "Safari Map"
            },
            {
              path: "#dungeon",
              text: "Dungeon"
            },
            {
              path: "#snap-edges",
              text: "Snap Edges"
            },
            {
              path: "#battle-background",
              text: "Battle Background"
            },
            {
              path: "#environment",
              text: "Environment"
            },
            {
              path: "#wild-battle-bgm",
              text: "Wild Battle BGM"
            },
            {
              path: "#wild-victory-bgm",
              text: "Wild Victory BGM"
            },
            {
              path: "#trainer-battle-bgm",
              text: "Trainer Battle BGM"
            },
            {
              path: "#trainer-victory-bgm",
              text: "Trainer Victory BGM"
            },
            {
              path: "#wild-capture-me",
              text: "Wild Capture ME"
            },
            {
              path: "#flags",
              text: "Flags"
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#map-metadata-overwrite",
              text: "Map Metadata Overwrite"
            }
          ]
        },
        {
          path: "moves",
          text: "Move",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-moves",
              text: "Import Moves"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#move-selection",
              text: "Move Selection"
            },
            {
              path: "#id",
              text: "ID"
            },
            {
              path: "#name",
              text: "Name"
            },
            {
              path: "#type",
              text: "Type"
            },
            {
              path: "#category",
              text: "Category"
            },
            {
              path: "#power",
              text: "Power"
            },
            {
              path: "#accuracy",
              text: "Accuracy"
            },
            {
              path: "#total-pp",
              text: "Total PP"
            },
            {
              path: "#target",
              text: "Target"
            },
            {
              path: "#priority",
              text: "Priority"
            },
            {
              path: "#function-code",
              text: "Function Code"
            },
            {
              path: "#flags",
              text: "Flags"
            },
            {
              path: "#effect-chance",
              text: "Effect Chance"
            },
            {
              path: "#description",
              text: "Description"
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#move-overwrite",
              text: "Move Overwrite"
            }
          ]
        },
        {
          path: "pokemon",
          text: "Pokémon",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-pokemon",
              text: "Import Pokémon"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#pokemon-selection",
              text: "Pokémon Selection"
            },
            {
              path: "#id",
              text: "ID"
            },
            {
              path: "#name",
              text: "Name"
            },
            {
              path: "#form-name",
              text: "Form Name"
            },
            {
              path: "#types",
              text: "Types"
            },
            {
              path: "#base-stats",
              text: "Base Stats"
            },
            {
              path: "#gender-ratio",
              text: "Gender Ratio"
            },
            {
              path: "#growth-rate",
              text: "Growth Rate"
            },
            {
              path: "#base-exp",
              text: "Base Exp"
            },
            {
              path: "#evs",
              text: "EVs"
            },
            {
              path: "#catch-rate",
              text: "Catch Rate"
            },
            {
              path: "#happiness",
              text: "Happiness"
            },
            {
              path: "#abilities",
              text: "Abilities"
            },
            {
              path: "#hidden-abilities",
              text: "Hidden Abilities"
            },
            {
              path: "#moves",
              text: "Moves"
            },
            {
              path: "#tutor-moves",
              text: "Tutor Moves"
            },
            {
              path: "#egg-moves",
              text: "Egg Moves"
            },
            {
              path: "#egg-groups",
              text: "Egg Groups"
            },
            {
              path: "#hatch-steps",
              text: "Hatch Steps"
            },
            {
              path: "#incense",
              text: "Incense"
            },
            {
              path: "#offspring",
              text: "Offspring"
            },
            {
              path: "#height",
              text: "Height"
            },
            {
              path: "#weight",
              text: "Weight"
            },
            {
              path: "#color",
              text: "Color"
            },
            {
              path: "#shape",
              text: "Shape"
            },
            {
              path: "#habitat",
              text: "Habitat"
            },
            {
              path: "#category",
              text: "Category"
            },
            {
              path: "#pokedex",
              text: "Pokedex"
            },
            {
              path: "#generation",
              text: "Generation"
            },
            {
              path: "#flags",
              text: "Flags"
            },
            {
              path: "#wild-items-common",
              text: "Wild Items Common"
            },
            {
              path: "#wild-items-uncommon",
              text: "Wild Items Uncommon"
            },
            {
              path: "#wild-items-rare",
              text: "Wild Items Rare"
            },
            {
              path: "#evolutions",
              text: "Evolutions"
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#pokemon-overwrite",
              text: "Pokémon Overwrite"
            }
          ]
        },
        {
          path: "pokemon-forms",
          text: "Pokémon Forms",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-pokemon-forms",
              text: "Import Pokémon Forms"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#pokemon-form-selection",
              text: "Pokémon Form Selection"
            },
            {
              path: "#id-and-form",
              text: "ID and Form"
            },
            {
              path: "#name",
              text: "Name"
            },
            {
              path: "#form-name",
              text: "Form Name"
            },
            {
              path: "#pokedex-form",
              text: "Pokedex Form"
            },
            {
              path: "#types",
              text: "Types"
            },
            {
              path: "#base-stats",
              text: "Base Stats"
            },
            {
              path: "#gender-ratio",
              text: "Gender Ratio"
            },
            {
              path: "#growth-rate",
              text: "Growth Rate"
            },
            {
              path: "#base-exp",
              text: "Base Exp"
            },
            {
              path: "#evs",
              text: "EVs"
            },
            {
              path: "#catch-rate",
              text: "Catch Rate"
            },
            {
              path: "#happiness",
              text: "Happiness"
            },
            {
              path: "#abilities",
              text: "Abilities"
            },
            {
              path: "#hidden-abilities",
              text: "Hidden Abilities"
            },
            {
              path: "#moves",
              text: "Moves"
            },
            {
              path: "#tutor-moves",
              text: "Tutor Moves"
            },
            {
              path: "#egg-moves",
              text: "Egg Moves"
            },
            {
              path: "#egg-groups",
              text: "Egg Groups"
            },
            {
              path: "#hatch-steps",
              text: "Hatch Steps"
            },
            {
              path: "#incense",
              text: "Incense"
            },
            {
              path: "#offspring",
              text: "Offspring"
            },
            {
              path: "#height",
              text: "Height"
            },
            {
              path: "#weight",
              text: "Weight"
            },
            {
              path: "#color",
              text: "Color"
            },
            {
              path: "#shape",
              text: "Shape"
            },
            {
              path: "#habitat",
              text: "Habitat"
            },
            {
              path: "#category",
              text: "Category"
            },
            {
              path: "#pokedex",
              text: "Pokedex"
            },
            {
              path: "#generation",
              text: "Generation"
            },
            {
              path: "#flags",
              text: "Flags"
            },
            {
              path: "#wild-items-common",
              text: "Wild Items Common"
            },
            {
              path: "#wild-items-uncommon",
              text: "Wild Items Uncommon"
            },
            {
              path: "#wild-items-rare",
              text: "Wild Items Rare"
            },
            {
              path: "#evolutions",
              text: "Evolutions"
            },
            {
              path: "#mega-stone",
              text: "Mega Stone"
            },
            {
              path: "#mega-move",
              text: "Mega Move"
            },
            {
              path: "#mega-message",
              text: "Mega Message"
            },
            {
              path: "#unmega-form",
              text: "Unmega Form"
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#pokemon-form-overwrite",
              text: "Pokémon Form Overwrite"
            }
          ]
        },
        {
          path: "town-map",
          text: "Town Map",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-town-maps",
              text: "Import Town Maps"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#town-map-selection",
              text: "Town Map Selection"
            },
            {
              path: "#id",
              text: "ID"
            },
            {
              path: "#name",
              text: "Name"
            },
            {
              path: "#file-name",
              text: "File Name"
            },
            {
              path: "points",
              text: "Points",
              subItems: [
                {
                  path: "#overview",
                  text: "Overview"
                },
                {
                  path: "#current-position",
                  text: "Current Position"
                },
                {
                  path: "#name",
                  text: "Name"
                },
                {
                  path: "#point-of-interest",
                  text: "Point of Interest"
                },
                {
                  path: "#fly-destination",
                  text: "Fly Destination"
                },
                {
                  path: "#game-switch",
                  text: "Game Switch"
                },
                {
                  path: "#graphic-name",
                  text: "Graphic Name"
                }
              ]
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#town-map-overwrite",
              text: "Town Map Overwrite"
            }
          ]
        },
        {
          path: "trainers",
          text: "Trainers",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-trainers",
              text: "Import Trainers"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#trainer-selection",
              text: "Trainer Selection"
            },
            {
              path: "#id",
              text: "ID"
            },
            {
              path: "pokemon",
              text: "Trainer Pokémon",
              subItems: [
                {
                  path: "#overview",
                  text: "Overview"
                },
                {
                  path: "#species-and-level",
                  text: "Species and Level"
                },
                {
                  path: "#name",
                  text: "Name"
                },
                {
                  path: "#form",
                  text: "Form"
                },
                {
                  path: "#gender",
                  text: "Gender"
                },
                {
                  path: "#shiny",
                  text: "Shiny"
                },
                {
                  path: "#super-shiny",
                  text: "Super Shiny"
                },
                {
                  path: "#shadow",
                  text: "Shadow"
                },
                {
                  path: "#moves",
                  text: "Moves"
                },
                {
                  path: "#ability",
                  text: "Ability"
                },
                {
                  path: "#ability-index",
                  text: "Ability Index"
                },
                {
                  path: "#item",
                  text: "Item"
                },
                {
                  path: "#nature",
                  text: "Nature"
                },
                {
                  path: "#ivs",
                  text: "IVs"
                },
                {
                  path: "#evs",
                  text: "EVs"
                },
                {
                  path: "#happiness",
                  text: "Happiness"
                },
                {
                  path: "#ball",
                  text: "Ball"
                }
              ]
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#trainer-overwrite",
              text: "Trainer Overwrite"
            }
          ]
        },
        {
          path: "trainer-types",
          text: "Trainer Types",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-trainer-types",
              text: "Import Trainer Types"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#trainer-type-selection",
              text: "Trainer Type Selection"
            },
            {
              path: "#id",
              text: "ID"
            },
            {
              path: "#name",
              text: "Name"
            },
            {
              path: "#gender",
              text: "Gender"
            },
            {
              path: "#base-money",
              text: "Base Money"
            },
            {
              path: "#skill-level",
              text: "Skill Level"
            },
            {
              path: "#flags",
              text: "Flags"
            },
            {
              path: "#intro-bgm",
              text: "Intro BGM"
            },
            {
              path: "#battle-bgm",
              text: "Battle BGM"
            },
            {
              path: "#vitory-bgm",
              text: "Victory BGM"
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#trainer-type-overwrite",
              text: "Trainer Type Overwrite"
            }
          ]
        },
        {
          path: "types",
          text: "Types",
          subItems: [
            {
              path: "#overview",
              text: "Overview"
            },
            {
              path: "#wiki",
              text: "Wiki"
            },
            {
              path: "#settings",
              text: "Settings"
            },
            {
              path: "#import-types",
              text: "Import Types"
            },
            {
              path: "#file-selection",
              text: "File Selection"
            },
            {
              path: "#type-selection",
              text: "Type Selection"
            },
            {
              path: "#id",
              text: "ID"
            },
            {
              path: "#name",
              text: "Name"
            },
            {
              path: "#icon-position",
              text: "Icon Position"
            },
            {
              path: "#is-special-type",
              text: "Is Special Type"
            },
            {
              path: "#is-pseudo-type",
              text: "Is Pseudo Type"
            },
            {
              path: "#flags",
              text: "Flags"
            },
            {
              path: "#weaknesses",
              text: "Weaknesses"
            },
            {
              path: "#resistances",
              text: "Resistances"
            },
            {
              path: "#immunities",
              text: "Immunities"
            },
            {
              path: "#other-parameters",
              text: "Other Parameters"
            },
            {
              path: "#type-overwrite",
              text: "Type Overwrite"
            }
          ]
        }
      ]
    },
    {
      path: "import",
      text: "Importing Entries"
    }
  ]
}