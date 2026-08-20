import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = await fetch(`${env.API_BASE_URL}/v1/auth/me`, {
    headers: {
      "x-api-key": env.API_KEY_WEBSITE!,
      cookie: request.headers.get("cookie") ?? ""
    },
    cache: "no-store"
  });

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}