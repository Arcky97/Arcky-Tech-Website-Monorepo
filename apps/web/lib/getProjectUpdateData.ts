export type ProjectUpdate = {
  id: number,
  project: string;
  title: string;
  content: string;
  date: string;
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