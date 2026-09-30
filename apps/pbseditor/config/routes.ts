import { publicEnv } from "./env.public";

export const ROUTES = {
  home: publicEnv.WEB_URL,
  discord: publicEnv.DISCORD_URL,
  about: `${publicEnv.WEB_URL}/about`,
  contact: `${publicEnv.WEB_URL}/contact`
};