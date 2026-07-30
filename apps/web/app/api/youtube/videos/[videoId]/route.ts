import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await params;

  const res = await fetch(
    `${env.API_BASE_URL}/v1/youtube/videos/${videoId}`,
    {
      headers: {
        "x-api-key": env.API_KEY_WEBSITE!,
      },
    }
  );

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ videoId: string }> }
) {
  const body = await req.json();
  const { videoId } = await params;

  const res = await fetch(
    `${env.API_BASE_URL}/v1/youtube/video/${videoId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.API_KEY_WEBSITE!,
      },
      body: JSON.stringify(body),
    }
  );

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}