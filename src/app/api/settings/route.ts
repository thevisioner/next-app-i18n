import { NextResponse } from "next/server";
import { pages } from "@/data/settings";

export async function GET() {
  return NextResponse.json({ pages });
}
