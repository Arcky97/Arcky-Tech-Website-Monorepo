import { getProjectUpdateData } from "@/lib/getProjectUpdateData";

export async function ProjectUpdateCards() {
  const updates = await getProjectUpdateData(5);

  return(
    <>
      {updates}
    </>
  )
}