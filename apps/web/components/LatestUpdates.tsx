import { publicEnv } from "@/config/env.public";

export default async function LatestUpdates() {
  const res = await fetch(publicEnv.DOCS_URL, { 
    next: { revalidate: 36000 }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch updates");
  }

  return res.json();
}