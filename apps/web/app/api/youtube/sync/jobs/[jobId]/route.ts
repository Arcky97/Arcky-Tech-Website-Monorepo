import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ jobId: string }> }
) {
  const { jobId } = await params;

  const res = await fetch(`${env.API_BASE_URL}/v1/youtube/sync/jobs/${jobId}`, {
    headers: {
      "x-api-key": env.API_KEY_WEBSITE!,
    },
  });

  return NextResponse.json(await res.json(), {
    status: res.status,
  });
}
