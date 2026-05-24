import { env } from "@/config/env";

export type ProjectUpdate = {
  id: number,
  project: string;
  date: string;
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export async function getProjectUpdateData(limit = 3): Promise<ProjectUpdate[]> {
  const res = await fetch(
    `${env.API_BASE_URL}/v1/project-updates/latest?limit=${limit}`,
    {
      headers: {
        "x-api-key": env.API_KEY_WEBSITE!
      },
      next: { revalidate: 3600 }
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch updates: ${res.status}`);
  }

  return res.json();
}