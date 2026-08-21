import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestedRedirect = new URL(request.url).searchParams.get("redirect");
  const redirect = requestedRedirect === "/" ? requestedRedirect : "/";
  const response = await fetch(
    `${env.API_BASE_URL}/v1/auth/youtube/login?redirect=${encodeURIComponent(redirect)}`,
    {
    headers: {
      "x-api-key": env.API_KEY_WEBSITE!
    },
    cache: "no-store"
    }
  );

  if (!response.ok) {
    return NextResponse.json(
      { success: false, message: "Unable to start YouTube login." },
      { status: 502 }
    );
  }

  const data = await response.json() as { url?: string };

  if (!data.url) {
    return NextResponse.json(
      { success: false, message: "YouTube login URL was not returned." },
      { status: 502 }
    );
  }

  const nextResponse = NextResponse.redirect(data.url);
  const stateCookie = response.headers.get("set-cookie");

  if (stateCookie) {
    nextResponse.headers.append("set-cookie", stateCookie);
  }

  return nextResponse;
}