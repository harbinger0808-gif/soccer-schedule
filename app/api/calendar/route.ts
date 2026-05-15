import { NextRequest, NextResponse } from "next/server";
import { getMatchesByTeams, Match, WC_TEAMS, STAGE_LABELS } from "@/lib/football";

export const revalidate = 3600;

const teamNameJa = new Map(WC_TEAMS.map((t) => [t.id, `${t.flag} ${t.name}`]));

function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function generateICS(matches: Match[]): string {
  const events = matches
    .map((match) => {
      const start = new Date(match.utcDate);
      const end = new Date(start.getTime() + 120 * 60000);
      const uid = `wc2026-${match.id}@harbinger.co.jp`;
      const homeName = teamNameJa.get(match.homeTeam?.id ?? 0) ?? match.homeTeam?.name ?? "未定";
      const awayName = teamNameJa.get(match.awayTeam?.id ?? 0) ?? match.awayTeam?.name ?? "未定";
      const stageLabel = STAGE_LABELS[match.stage] ?? match.stage;
      const summary = `⚽ ${homeName} vs ${awayName} | W杯2026`;
      const description = `W杯2026 ${stageLabel}${match.group ? ` ${match.group}` : ""} | DAZN・NHK・ABEMAで視聴可能`;

      return [
        "BEGIN:VEVENT",
        `UID:${uid}`,
        `DTSTART:${formatICSDate(start)}`,
        `DTEND:${formatICSDate(end)}`,
        `SUMMARY:${summary}`,
        `DESCRIPTION:${description}`,
        `LOCATION:${match.venue || "アメリカ・カナダ・メキシコ"}`,
        "END:VEVENT",
      ].join("\r\n");
    })
    .join("\r\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Harbinger//Soccer Schedule//JA",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:W杯2026",
    "X-WR-TIMEZONE:Asia/Tokyo",
    events,
    "END:VCALENDAR",
  ].join("\r\n");
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teamsParam = searchParams.get("teams") ?? "311";
  const teamIds = teamsParam.split(",").filter(Boolean);
  const isTest = searchParams.get("test") === "1";

  try {
    const matches = await getMatchesByTeams(teamIds);

    if (isTest) {
      const soon = new Date(Date.now() + 45 * 60 * 1000).toISOString();
      matches.unshift({
        id: 99999,
        utcDate: soon,
        status: "SCHEDULED",
        stage: "GROUP_STAGE",
        group: "GROUP_A",
        venue: "テストスタジアム（通知テスト用）",
        homeTeam: { id: 766, name: "Japan", shortName: "日本", tla: "JPN", crest: "" },
        awayTeam: { id: 8, name: "Germany", shortName: "ドイツ", tla: "GER", crest: "" },
        score: { winner: null, fullTime: { home: null, away: null } },
      });
    }
    const sorted = matches.sort(
      (a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()
    );
    const icsContent = generateICS(sorted);

    return new NextResponse(icsContent, {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="worldcup2026.ics"',
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to generate calendar" }, { status: 500 });
  }
}
