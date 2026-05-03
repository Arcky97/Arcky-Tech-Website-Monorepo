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
    `/api/updates?limit=${limit}`,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch updates: ${res.status}`);
  }

  return res.json();
}