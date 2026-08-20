import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const response = await fetch(`${env.API_BASE_URL}/v1/auth/logout`, {
    method: "POST",
    headers: {
      "x-api-key": env.API_KEY_WEBSITE!,
      cookie: request.headers.get("cookie") ?? ""
    },
    cache: "no-store"
  });

  const data = await response.json();
  const nextResponse = NextResponse.json(data, { status: response.status });
  const clearedCookie = response.headers.get("set-cookie");

  if (clearedCookie) {
    nextResponse.headers.append("set-cookie", clearedCookie);
  }

  return nextResponse;
}