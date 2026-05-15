import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { google } from "googleapis";
import { getMatchesByTeams, WC_TEAMS, STAGE_LABELS } from "@/lib/football";

// チームID → 日本語名のマップ
const teamNameJa = new Map(WC_TEAMS.map((t) => [t.id, `${t.flag} ${t.name}`]));

function formatGoogleDate(utcDate: string) {
  return {
    dateTime: utcDate,
    timeZone: "Asia/Tokyo",
  };
}

function getEndDate(utcDate: string) {
  const end = new Date(new Date(utcDate).getTime() + 120 * 60000);
  return {
    dateTime: end.toISOString(),
    timeZone: "Asia/Tokyo",
  };
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token?.accessToken) {
    return NextResponse.json({ error: "未ログイン" }, { status: 401 });
  }

  const { teamsParam, isTest } = await request.json();
  const teamIds = (teamsParam ?? "766").split(",").filter(Boolean);

  const matches = await getMatchesByTeams(teamIds);

  // テストモード：30分後のダミー試合を先頭に追加
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

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: token.accessToken as string });
  const calendar = google.calendar({ version: "v3", auth });

  const results = await Promise.allSettled(
    matches.map((match) =>
      calendar.events.insert({
        calendarId: "primary",
        requestBody: {
          summary: `⚽ ${teamNameJa.get(match.homeTeam?.id ?? 0) ?? match.homeTeam?.name ?? "未定"} vs ${teamNameJa.get(match.awayTeam?.id ?? 0) ?? match.awayTeam?.name ?? "未定"} | W杯2026`,
          description: `W杯2026 ${STAGE_LABELS[match.stage] ?? match.stage}${match.group ? ` ${match.group}` : ""}\n放送：DAZN / NHK / ABEMA`,
          location: match.venue ?? "アメリカ・カナダ・メキシコ",
          start: formatGoogleDate(match.utcDate),
          end: getEndDate(match.utcDate),
          reminders: {
            useDefault: false,
            overrides: [
              { method: "popup", minutes: 1440 }, // 前日
              { method: "popup", minutes: 30 },   // 30分前
            ],
          },
        },
      })
    )
  );

  const succeeded = results.filter((r) => r.status === "fulfilled").length;
  const failed = results.filter((r) => r.status === "rejected").length;

  return NextResponse.json({ succeeded, failed, total: matches.length });
}
