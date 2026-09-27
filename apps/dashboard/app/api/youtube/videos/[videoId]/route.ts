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
        cookie: req.headers.get("cookie") ?? ""
      }
    }
  );

  return NextResponse.json(await res.json(), {
    status: res.status
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ videoId: string }> }
) {
  try {
    console.log("[Next.js] PATCH route reached");

    const body = await req.json();
    const { videoId } = await params;

    const url = `${env.API_BASE_URL}/v1/youtube/videos/${videoId}`;

    console.log("[Next.js] Forwarding PATCH request:", url);

    const res = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.API_KEY_WEBSITE!,
        cookie: req.headers.get("cookie") ?? "",
      },
      body: JSON.stringify(body),
    });

    console.log("[Next.js] API response status:", res.status);

    const responseText = await res.text();

    console.log("[Next.js] API response body:", responseText);

    return new Response(responseText, {
      status: res.status,
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "application/json",
      },
    });
  } catch (error) {
    console.error("[Next.js] PATCH route error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to forward PATCH request",
      },
      { status: 500 }
    );
  }
}