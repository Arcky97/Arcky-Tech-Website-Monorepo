import { env } from "@/config/env";

export type ProjectUpdate = {
  id: number,
  project: string;
  title: string;
  content: string;
  date: string;
};

const API_BASE_URL = process.env.API_BASE_URL || env.API_BASE_URL;
const API_KEY_WEBSITE = process.env.API_KEY_WEBSITE || env.API_KEY_WEBSITE;
if (!API_BASE_URL || !API_KEY_WEBSITE) {
  throw new Error("Missing API environment variables");
}

export async function getProjectUpdateData(limit = 3): Promise<ProjectUpdate[]> {
  const res = await fetch(
    `${API_BASE_URL!}/api/updates/v1/latest?limit=${limit}`,
    {
      headers: {
        "x-api-key": API_KEY_WEBSITE!,
      },
      cache: "no-store"
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch updates: ${res.status}`);
  }

  return res.json();
}