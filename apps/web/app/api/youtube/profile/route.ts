import { env } from "@/config/env";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("The body we are receiving:", body);
    const res = await fetch(`${env.API_BASE_URL}/v1/youtube/profile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.API_KEY_WEBSITE!
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    console.log(data);
    
    return NextResponse.json(data, { 
      status: res.status,
    });
  } catch (error) {
    console.error("Failed to post a new goalProfile", error);
    return NextResponse.json(
      { error: "Failed to post GoalProfile" },
      { status: 500 }
    );
  }

}

export async function PATCH(req: Request) {

}

export async function GET(req: Request) {

}

export async function REMOVE(req: Request) {

}