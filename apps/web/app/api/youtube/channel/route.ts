import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${env.API_BASE_URL}/v1/youtube/channel`, {
      headers: {
        "x-api-key": env.API_KEY_WEBSITE!
      },
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Failed to fetch channel:", error);
    return NextResponse.json(
      { error: "Failed to fetch channel" },
      { status: 500 }
    );
  }
}