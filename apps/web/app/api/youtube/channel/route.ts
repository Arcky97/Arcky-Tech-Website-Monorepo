import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await fetch(`${env.API_BASE_URL}/v1/youtube/channel`, {
    headers: {
      "x-api-key": env.API_KEY_WEBSITE!,
      cookie: request.headers.get("cookie") ?? "",
    },
  });

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}