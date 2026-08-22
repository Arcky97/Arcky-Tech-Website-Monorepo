import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json(
      {
        success: false,
        message: "Job ID is required"
      },
      {
        status: 400
      }
    );
  }

  const res = await fetch(
    `${env.API_BASE_URL}/v1/youtube/sync/jobs/${jobId}`, 
    {
      headers: {
        "x-api-key": env.API_KEY_WEBSITE!,
        cookie: req.headers.get("cookie") ?? ""
      }
    }
  );

  return NextResponse.json(await res.json(), {
    status: res.status
  })
}