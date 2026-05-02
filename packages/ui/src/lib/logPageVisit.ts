import { env } from "@/config/env";

export async function logPageVisit(path: string) {
  try {
    await fetch(`${env.API_BASE_URL}/api/visits`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.API_KEY_WEBSITE!,
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
