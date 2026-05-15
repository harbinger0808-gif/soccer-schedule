import { NextRequest, NextResponse } from "next/server";
import { getMatchesByTeams, getKnockoutTBDMatches, Match } from "@/lib/football";

export const revalidate = 3600;
export const dynamic = "force-dynamic";

const byDate = (a: { utcDate: string }, b: { utcDate: string }) =>
  new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime();

// テスト用ダミー試合（30分後）
function getTestMatch(): Match {
  const soon = new Date(Date.now() + 30 * 60 * 1000).toISOString();
  return {
    id: 99999,
    utcDate: soon,
    stage: "GROUP_STAGE",
    group: "GROUP_A",
    venue: "テストスタジアム（通知テスト用）",
    homeTeam: { id: 766, name: "Japan", shortName: "日本", tla: "JPN", crest: "" },
    awayTeam: { id: 8, name: "Germany", shortName: "ドイツ", tla: "GER", crest: "" },
    score: { winner: null, fullTime: { home: null, away: null } },
  };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teamsParam = searchParams.get("teams") ?? String(766);
  const teamIds = teamsParam.split(",").filter(Boolean);
  const isTest = searchParams.get("test") === "1";

  try {
    const [matches, knockout] = await Promise.all([
      getMatchesByTeams(teamIds),
      getKnockoutTBDMatches(),
    ]);

    const allMatches = isTest ? [getTestMatch(), ...matches] : matches;

    return NextResponse.json({
      matches: allMatches.sort(byDate),
      knockout: knockout.sort(byDate),
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch matches" }, { status: 500 });
  }
}
