import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = await fetch(
    `${env.API_BASE_URL}/v1/youtube/profiles`, {
      headers: {
        "x-api-key": env.API_KEY_WEBSITE!,
        cookie: req.headers.get("cookie") ?? ""
      }
    }
  );

  return NextResponse.json(await res.json(), {
    status: res.status
  });
}