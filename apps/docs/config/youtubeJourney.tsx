import { HomeIcon } from "@heroicons/react/24/outline";

export const youtubeJourney = {
  name: "youtube-journey",
  path: "",
  icon: <HomeIcon className="w-6 h-6"/>,
  text: "YouTube Journey",
  subItems: [
    {
      path: "2026",
      text: "2026",
      noPage: true,
      subItems: [
        {
          path: "july",
          text: "July"
        },
        {
          path: "june",
          text: "June"
        },
        {
          path: "may",
          text: "May"
        }
      ]
    }
  ]
}