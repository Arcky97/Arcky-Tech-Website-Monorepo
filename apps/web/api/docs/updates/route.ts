import { env } from "@/config/env";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit") ?? "3"
    const res = await fetch(
      `${env.API_BASE_URL}/api/updates/v1/latest?limit=${limit}`,
      {
        headers: {
          "x-api-key": env.API_KEY_WEBSITE!
        }
      }
    );

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("Failed to fetch updates:", error);
    return Response.json(
      { error: "Failed to fetch updates" },
      { status: 500 }
    );
  }
}