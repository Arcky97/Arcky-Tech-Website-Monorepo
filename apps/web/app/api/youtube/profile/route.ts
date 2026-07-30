import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${env.API_BASE_URL}/v1/youtube/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.API_KEY_WEBSITE!,
    },
    body: JSON.stringify(body),
  });

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}