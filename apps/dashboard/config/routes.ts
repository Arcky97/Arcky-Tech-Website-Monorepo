import { publicEnv } from "./env.public";

export const ROUTES = {
  home: publicEnv.WEB_URL,
  discord: publicEnv.DISCORD_URL,
  docs: `${publicEnv.DOCS_URL}/youtube`,
  about: `${publicEnv.WEB_URL}/about`,
  contact: `${publicEnv.WEB_URL}/contact`
}