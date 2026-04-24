import { publicEnv } from "./env.public";

export const ROUTES = {
  home: "/",
  projects: "/projects",
  discord: publicEnv.DISCORD_URL,
  docs: publicEnv.DOCS_URL,
  about: "/about",
  contact: "/contact"
};