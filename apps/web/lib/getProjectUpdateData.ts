import { env } from "@/config/env";
import { publicEnv } from "@/config/env.public";

export type ProjectUpdate = {
  id: number,
  project: string;
  title: string;
  content: string;
  date: string;
};

export async function getProjectUpdateData(limit = 3): Promise<ProjectUpdate[]> {
  const res = await fetch(`${publicEnv.WEB_URL}/api/updates?limit=${limit}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch updates: ${res.status}`);
  }

  return res.json();
}