import { publicEnv } from "./env.public";

export const ROUTES = {
  home: publicEnv.WEB_URL,
  docs: `${publicEnv.DOCS_URL!}/pbs-editor`,
  discord: publicEnv.DISCORD_URL,
  about: `${publicEnv.WEB_URL}/about`,
  contact: `${publicEnv.WEB_URL}/contact`
};