import { NextResponse } from "next/server";
import { getStandings } from "@/lib/football";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const standings = await getStandings();
    const groupStandings = standings.filter(
      (s) => s.type === "TOTAL" && s.stage === "GROUP_STAGE"
    );
    return NextResponse.json({ standings: groupStandings });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch standings" }, { status: 500 });
  }
}
