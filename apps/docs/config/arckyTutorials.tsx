import { HomeIcon } from "@heroicons/react/24/outline";

export const arckyTutorials = {
  name: "arckys-tutorials",
  path: "",
  icon: <HomeIcon className="w-6 h-6"/>,
  text: "Arcky's Tutorials",
  subItems: [
    {
      path: "vaultwarden-self-host-vps",
      text: "Vaultwarden Self Host on VPS"
    },
    {
      path: "discord-bot",
      text: "Discord Bot Tutorial",
      subItems: [
        {
          path: "episode-1",
          text: "Episode 1"
        },
        {
          path: "episode-2",
          text: "Episode 2"
        }
      ]
    }
  ]
}