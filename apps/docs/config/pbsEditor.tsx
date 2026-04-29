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
          text: "Abilities"
        },
        {
          path: "berry-plants",
          text: "Berry Plants"
        },
        {
          path: "encounters",
          text: "Encounters"
        },
        {
          path: "items",
          text: "Items"
        },
        {
          path: "map-metadata",
          text: "Map Metadata"
        },
        {
          path: "moves",
          text: "Move"
        },
        {
          path: "pokemon",
          text: "Pokémon"
        },
        {
          path: "pokemon-forms",
          text: "Pokémon Forms"
        },
        {
          path: "town-map",
          text: "Town Map"
        },
        {
          path: "trainers",
          text: "Trainers"
        },
        {
          path: "trainer-types",
          text: "Trainer Types"
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