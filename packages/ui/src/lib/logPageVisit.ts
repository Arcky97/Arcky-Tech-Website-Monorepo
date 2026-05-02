import { publicEnv } from "@/config/env.public";

export async function logPageVisit(path: string) {
  try {
    await fetch(`${publicEnv.WEB_URL}/api/visits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        path,
        referrer: document.referrer || null,
        userAgent: navigator.userAgent
      })
    });
  } catch(error) {
    // fail silently
  }
}
