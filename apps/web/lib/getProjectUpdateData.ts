export type ProjectUpdate = {
  id: number,
  project: string;
  title: string;
  content: string;
  date: string;
};

export async function getProjectUpdateData(limit = 3): Promise<ProjectUpdate[]> {
  return fetch(`api/docs/updates?limit=${limit}`)
    .then(res => res.json());
}