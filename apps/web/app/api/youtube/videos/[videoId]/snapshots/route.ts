import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await params;

  const res = await fetch(
    `${env.API_BASE_URL}/v1/youtube/videos/${videoId}/snapshots`,
    {
      headers: {
        "x-api-key": env.API_KEY_WEBSITE!,
        cookie: req.headers.get("cookie") ?? "",
      },
    }
  );

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}