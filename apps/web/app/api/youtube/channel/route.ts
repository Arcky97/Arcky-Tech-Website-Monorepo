import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch(`${env.API_BASE_URL}/v1/youtube/channel`, {
    headers: {
      "x-api-key": env.API_KEY_WEBSITE!,
    },
  });

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}