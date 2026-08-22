import { HomeIcon } from "@heroicons/react/24/outline";

export const youtubeDashboard = {
  name: "youtube-dashboard",
  path: "",
  icon: <HomeIcon className="w-6 h-6"/>,
  text: "YouTube Dashboard",
  subItems: [
    {
      path: "home",
      text: "Home"
    },
    {
      path: "videos",
      text: "Your Videos"
    }
  ]
}