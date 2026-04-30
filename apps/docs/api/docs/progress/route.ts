import { getDocProgress } from "@/lib/getDocProgress";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const progress = await getDocProgress();

    return NextResponse.json(progress);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to calculate documentation progess: ${error}`},
      { status: 500 }
    );
  }
}