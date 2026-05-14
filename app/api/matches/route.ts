import { NextRequest, NextResponse } from "next/server";
import { getMatchesByTeams, getKnockoutTBDMatches } from "@/lib/football";

export const revalidate = 3600;

const byDate = (a: { utcDate: string }, b: { utcDate: string }) =>
  new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teamsParam = searchParams.get("teams") ?? String(766);
  const teamIds = teamsParam.split(",").filter(Boolean);

  try {
    const [matches, knockout] = await Promise.all([
      getMatchesByTeams(teamIds),
      getKnockoutTBDMatches(),
    ]);
    return NextResponse.json({
      matches: matches.sort(byDate),
      knockout: knockout.sort(byDate),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}
