const API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const BASE_URL = "https://api.football-data.org/v4";

export interface Team {
  id: number | null;
  name: string | null;
  shortName: string | null;
  tla: string | null;
  crest: string | null;
}

const GROUP_STAGE = "GROUP_STAGE";

export interface Match {
  id: number;
  utcDate: string;
  status: string;
  stage: string;
  group: string | null;
  homeTeam: Team;
  awayTeam: Team;
  score: {
    winner: string | null;
    fullTime: { home: number | null; away: number | null };
  };
  venue?: string;
}

export interface MatchesResponse {
  matches: Match[];
}

export async function getWorldCupMatches(): Promise<MatchesResponse> {
  const res = await fetch(`${BASE_URL}/competitions/WC/matches`, {
    headers: { "X-Auth-Token": API_KEY! },
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getTeamMatches(teamId: number): Promise<MatchesResponse> {
  const res = await fetch(
    `${BASE_URL}/teams/${teamId}/matches?competitions=WC&status=SCHEDULED`,
    {
      headers: { "X-Auth-Token": API_KEY! },
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export async function getMatchesByTeams(teamIds: string[]): Promise<Match[]> {
  const { matches } = await getWorldCupMatches();
  if (teamIds.includes("all")) return matches;
  const ids = teamIds.map(Number);
  return matches.filter(
    (m) =>
      (m.homeTeam?.id != null && ids.includes(m.homeTeam.id)) ||
      (m.awayTeam?.id != null && ids.includes(m.awayTeam.id))
  );
}

// ノックアウトステージで対戦チーム未確定の試合を返す
export async function getKnockoutTBDMatches(): Promise<Match[]> {
  const { matches } = await getWorldCupMatches();
  return matches.filter(
    (m) =>
      m.stage !== GROUP_STAGE &&
      (m.homeTeam?.id == null || m.awayTeam?.id == null)
  );
}

export function isTBDMatch(match: Match): boolean {
  return match.homeTeam?.id == null || match.awayTeam?.id == null;
}

export function toJST(utcDate: string): string {
  return new Date(utcDate).toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function toJSTDate(utcDate: string): Date {
  return new Date(new Date(utcDate).toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
}

export function googleCalendarUrl(match: Match): string {
  const start = new Date(match.utcDate)
    .toISOString()
    .replace(/[-:]/g, "")
    .split(".")[0] + "Z";
  const end = new Date(new Date(match.utcDate).getTime() + 120 * 60000)
    .toISOString()
    .replace(/[-:]/g, "")
    .split(".")[0] + "Z";

  const homeName = match.homeTeam?.name ?? "未定";
  const awayName = match.awayTeam?.name ?? "未定";
  const title = encodeURIComponent(
    `⚽ ${homeName} vs ${awayName} | W杯2026`
  );
  const details = encodeURIComponent(
    `W杯2026\n会場：${match.venue || "TBD"}\n放送：DAZN / NHK / ABEMA`
  );

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`;
}

export const STAGE_LABELS: Record<string, string> = {
  GROUP_STAGE: "グループステージ",
  LAST_32: "ラウンド32",
  LAST_16: "ラウンド16",
  QUARTER_FINALS: "準々決勝",
  SEMI_FINALS: "準決勝",
  THIRD_PLACE: "3位決定戦",
  FINAL: "決勝",
};

export const BROADCASTER_MAP: Record<string, string[]> = {
  GROUP_STAGE: ["DAZN", "NHK", "ABEMA"],
  LAST_16: ["DAZN", "NHK", "ABEMA"],
  QUARTER_FINALS: ["DAZN", "NHK", "ABEMA"],
  SEMI_FINALS: ["DAZN", "NHK"],
  THIRD_PLACE: ["DAZN", "NHK"],
  FINAL: ["DAZN", "NHK"],
};

// W杯2026出場48カ国（football-data.org 実際のチームID）
export const JAPAN_TEAM_ID = 766;

export const WC_TEAMS: { id: number; name: string; flag: string }[] = [
  { id: 766, name: "日本", flag: "🇯🇵" },
  { id: 762, name: "アルゼンチン", flag: "🇦🇷" },
  { id: 779, name: "オーストラリア", flag: "🇦🇺" },
  { id: 771, name: "アメリカ", flag: "🇺🇸" },
  { id: 759, name: "ドイツ", flag: "🇩🇪" },
  { id: 770, name: "イングランド", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { id: 773, name: "フランス", flag: "🇫🇷" },
  { id: 760, name: "スペイン", flag: "🇪🇸" },
  { id: 764, name: "ブラジル", flag: "🇧🇷" },
  { id: 765, name: "ポルトガル", flag: "🇵🇹" },
  { id: 828, name: "カナダ", flag: "🇨🇦" },
  { id: 769, name: "メキシコ", flag: "🇲🇽" },
  { id: 772, name: "韓国", flag: "🇰🇷" },
  { id: 788, name: "スイス", flag: "🇨🇭" },
  { id: 801, name: "サウジアラビア", flag: "🇸🇦" },
  { id: 815, name: "モロッコ", flag: "🇲🇦" },
  { id: 818, name: "コロンビア", flag: "🇨🇴" },
  { id: 758, name: "ウルグアイ", flag: "🇺🇾" },
  { id: 791, name: "エクアドル", flag: "🇪🇨" },
  { id: 763, name: "ガーナ", flag: "🇬🇭" },
  { id: 804, name: "セネガル", flag: "🇸🇳" },
  { id: 840, name: "イラン", flag: "🇮🇷" },
  { id: 799, name: "クロアチア", flag: "🇭🇷" },
  { id: 778, name: "アルジェリア", flag: "🇩🇿" },
  { id: 802, name: "チュニジア", flag: "🇹🇳" },
  { id: 8601, name: "オランダ", flag: "🇳🇱" },
  { id: 805, name: "ベルギー", flag: "🇧🇪" },
  { id: 761, name: "パラグアイ", flag: "🇵🇾" },
  { id: 1935, name: "コートジボワール", flag: "🇨🇮" },
  { id: 803, name: "トルコ", flag: "🇹🇷" },
  { id: 792, name: "スウェーデン", flag: "🇸🇪" },
  { id: 825, name: "エジプト", flag: "🇪🇬" },
  { id: 8873, name: "スコットランド", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  { id: 816, name: "オーストリア", flag: "🇦🇹" },
  { id: 798, name: "チェコ", flag: "🇨🇿" },
  { id: 8872, name: "ノルウェー", flag: "🇳🇴" },
  { id: 783, name: "ニュージーランド", flag: "🇳🇿" },
  { id: 8030, name: "カタール", flag: "🇶🇦" },
  { id: 836, name: "ハイチ", flag: "🇭🇹" },
  { id: 1836, name: "パナマ", flag: "🇵🇦" },
  { id: 1934, name: "コンゴDR", flag: "🇨🇩" },
  { id: 1930, name: "カーボベルデ", flag: "🇨🇻" },
  { id: 8062, name: "イラク", flag: "🇮🇶" },
  { id: 8049, name: "ヨルダン", flag: "🇯🇴" },
  { id: 8070, name: "ウズベキスタン", flag: "🇺🇿" },
  { id: 9460, name: "キュラソー", flag: "🇨🇼" },
];
