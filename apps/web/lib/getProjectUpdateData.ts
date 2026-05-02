export type ProjectUpdate = {
  id: number,
  project: string;
  title: string;
  content: string;
  date: string;
};

export async function getProjectUpdateData(limit = 3): Promise<ProjectUpdate[]> {
  const res = await fetch(
    `${process.env.API_BASE_URL!}/api/updates/v1/latest?limit=${limit}`,
    {
      headers: {
        "x-api-key": process.env.API_KEY_WEBSITE!,
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch updates: ${res.status}`);
  }

  return res.json();
}