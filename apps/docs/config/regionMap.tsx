import { HomeIcon } from "@heroicons/react/24/outline";

export const regionMap = {
  name: "region-map",
  path: "",
  icon: <HomeIcon className="w-6 h-6"/>,
  text: "Arcky's Region Map",
  subItems: [
    {
      path: "features",
      text: "Features Overview"
    },
    {
      path: "update-history",
      text: "Update History"
    },
    {
      path: "installation",
      text: "Installation"
    },
    {
      path: "updating",
      text: "Updating"
    },
    {
      path: "basic-setup",
      text: "Basic Setup",
      noPage: true,
      subItems: [
        {
          path: "highlight-graphics",
          text: "Highlight Graphics"
        },
        {
          path: "unvisited-graphics",
          text: "Unvisited Graphics"
        },
        {
          path: "town-map-pbs-file",
          text: "Town_Map.txt PBS file",
          subItems: [
            {
              path: "manual-editing",
              text: "Manual PBS Editing"
            },
            {
              path: "townmapgen-html-file",
              text: "Townmapgen.html file"
            }
          ]
        },
        {
          path: "location-preview",
          text: "Location Preview"
        },
        {
          path: "extended-location-preview",
          text: "Extended Location Preview"
        },
        {
          path: "trainer-preview",
          text: "Trainer Rematch Preview"
        }
      ]
    },
    {
      path: "plugin-setup",
      text: "Setup for other Plugins",
      noPage: true,
      subItems: [
        {
          path: "quest-icons-and-preview",
          text: "Quest Icons and Preview"
        },
        {
          path: "poke-gear-themes",
          text: "Poke Gear Themes"
        },
        {
          path: "weather-preview",
          text: "Weather Preview"
        },
        {
          path: "set-the-controls-screen",
          text: "Set the Controls Screen"
        },
        {
          path: "berry-icons-and-preview",
          text: "Berry Icons and Preview"
        },
        {
          path: "modular-ui-scenes",
          text: "Modular UI Scenes"
        }
      ]
    },
    {
      path: "settings",
      text: "Settings File",
      noPage: true,
      subItems: [
        {
          path: "grid",
          text: "Grid Settings"
        },
        {
          path: "progress-counter",
          text: "Progress Counter Settings"
        },
        {
          path: "location",
          text: "Location Settings",
          noPage: true,
          subItems: [
            {
              path: "no-unvisited-info",
              text: "No Unvisted Location Info"
            },
            {
              path: "fake-locations",
              text: "Fake Locations"
            },
            {
              path: "hidden-locations",
              text: "Hidden Location Settings"
            },
            {
              path: "location-search",
              text: "Location Search Settings"
            },
            {
              path: "highlight",
              text: "Highlight Settings"
            },
            {
              path: "decoration",
              text: "Decoration Settings"
            },
            {
              path: "region-district",
              text: "Region District Settings"
            },
            {
              path: "region-map-connecting",
              text: "Region Map Connecting"
            }
          ]
        },
        {
          path: "fly",
          text: "Fly Settings"
        },
        {
          path: "mode",
          text: "Mode Settings"
        },
        {
          path: "music",
          text: "Music Settings"
        },
        {
          path: "ui",
          text: "UI Settings",
          noPage: true,
          subItems: [
            {
              path: "map-ui",
              text: "Map UI Settings"
            },
            { 
              path: "zoom",
              text: "Map Zoom Settings"
            },
            {
              path: "region-changing",
              text: "Region Changing Settings"
            },
            {
              path: "text-position",
              text: "Text Position Settings"
            },
            {
              path: "text-color",
              text: "Text Color Settings"
            },
            {
              path: "menu",
              text: "Menu Settings"
            },
            {
              path: "cursor",
              text: "Cursor Settings"
            },
            {
              path: "mouse-support",
              text: "Mouse Support Settings"
            }
          ]
        },
        {
          path: "preview",
          text: "Preview Settings",
          noPage: true,
          subItems: [
            {
              path: "general",
              text: "General Preview Settings"
            },
            {
              path: "button",
              text: "Button Preview Settings"
            },
            {
              path: "location",
              text: "Location Preview Settings"
            },
            {
              path: "extended",
              text: "Extended Preview Settings"
            },
            {
              path: "weather",
              text: "Weather Preview Settings"
            },
            {
              path: "quest",
              text: "Quest Preview Settings"
            },
            {
              path: "berry",
              text: "Berry Preview Settings"
            },
            {
              path: "roaming",
              text: "Roaming Preview Settings"
            },
            {
              path: "trainer",
              text: "Trainer Preview Settings"
            }
          ]
        },
        {
          path: "pokedex",
          text: "Pokedex Settings",
        }
      ]
    }
  ]
}