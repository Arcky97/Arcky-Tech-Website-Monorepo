import { publicEnv } from "./env.public";

export const ROUTES = {
  home: publicEnv.WEB_URL,
  projects: `${publicEnv.WEB_URL}/projects`,
  discord: publicEnv.DISCORD_URL,
  docs: "/",
  about: `${publicEnv.WEB_URL}/about`,
  contact: `${publicEnv.WEB_URL}/contact`
};