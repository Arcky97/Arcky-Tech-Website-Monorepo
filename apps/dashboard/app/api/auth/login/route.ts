import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const requestedRedirect = requestUrl.searchParams.get("redirect");
  const redirect = requestedRedirect === "/" ? requestedRedirect : "/";
  const account = requestUrl.searchParams.get("account") === "change" ? "change" : undefined;
  const response = await fetch(
    `${env.API_BASE_URL}/v1/auth/youtube/login?redirect=${encodeURIComponent(redirect)}${account ? `&account=${account}` : ""}`,
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
  // response.headers.get("set-cookie") only returns one merged/corrupted value when
  // the upstream response sets multiple cookies; getSetCookie() preserves each one.
  const setCookies = response.headers.getSetCookie?.() ?? [];

  for (const cookie of setCookies) {
    nextResponse.headers.append("set-cookie", cookie);
  }

  return nextResponse;
}