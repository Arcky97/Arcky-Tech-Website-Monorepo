import { HomeIcon } from "@heroicons/react/24/outline";

export const graphicsTransparency = {
  name: "graphic-transparency",
  path: "",
  icon: <HomeIcon className="w-6 h-6"/>,
  text: "Arcky's Graphic Transparency",
  subItems: [
    {
      path: "update-history",
      text: "Update History"
    },
    {
      path: "installation",
      text: "Installation"
    },
    {
      path: "setup",
      text: "Setup",
      subItems: [
        {
          path: "setup-event",
          text: "Setup Event"
        },
        {
          path: "setup-file",
          text: "Setup File"
        }
      ]
    }
  ]
}