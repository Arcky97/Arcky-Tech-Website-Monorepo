import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ videoId: string }> }
) {
  const { videoId } = await params;
  const date = new URL(req.url).searchParams.get("date");

  const res = await fetch(
    `${env.API_BASE_URL}/v1/youtube/sync/fill/${videoId}${date ? `/${date}` : ""}`,
    {
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
