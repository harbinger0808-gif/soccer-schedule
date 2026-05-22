"use client";

import { Match, googleCalendarUrl, toJST, JAPAN_TEAM_ID } from "@/lib/football";

// 注目カードとして表示するマッチアップ（チームIDペア）
const MARQUEE_PAIRS = [
  [764, 762],   // ブラジル vs アルゼンチン
  [773, 770],   // フランス vs イングランド
  [760, 759],   // スペイン vs ドイツ
  [765, 805],   // ポルトガル vs ベルギー
  [764, 773],   // ブラジル vs フランス
  [762, 760],   // アルゼンチン vs スペイン
];

function isMarquee(match: Match): boolean {
  const h = match.homeTeam?.id;
  const a = match.awayTeam?.id;
  if (!h || !a) return false;
  return MARQUEE_PAIRS.some(
    ([x, y]) => (h === x && a === y) || (h === y && a === x)
  );
}

interface Props {
  matches: Match[];
}

export default function FeaturedMatches({ matches }: Props) {
  const now = Date.now();

  // 日本戦 + 注目カード（終了済み除外）
  const featured = matches.filter((m) => {
    if (new Date(m.utcDate).getTime() < now - 2 * 60 * 60 * 1000) return false; // 2時間前まで
    const isJapan = m.homeTeam?.id === JAPAN_TEAM_ID || m.awayTeam?.id === JAPAN_TEAM_ID;
    return isJapan || isMarquee(m);
  }).slice(0, 5);

  if (featured.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
        🔥 注目試合
      </h2>
      <div className="space-y-2">
        {featured.map((match) => {
          const isJapan =
            match.homeTeam?.id === JAPAN_TEAM_ID ||
            match.awayTeam?.id === JAPAN_TEAM_ID;
          const gcUrl = googleCalendarUrl(match);
          const jst = toJST(match.utcDate);
          const home = match.homeTeam?.shortName || match.homeTeam?.name || "未定";
          const away = match.awayTeam?.shortName || match.awayTeam?.name || "未定";
          const homeFlag = match.homeTeam?.id === JAPAN_TEAM_ID ? "🇯🇵" : "";
          const awayFlag = match.awayTeam?.id === JAPAN_TEAM_ID ? "🇯🇵" : "";

          return (
            <div
              key={match.id}
              className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border transition-all ${
                isJapan
                  ? "border-[#bc002d]/40 bg-[#bc002d]/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {/* 試合情報 */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white leading-tight">
                  {homeFlag}{home} <span className="text-white/30 font-normal">vs</span> {awayFlag}{away}
                </div>
                <div className="text-xs text-white/40 mt-0.5">{jst}</div>
              </div>

              {/* カレンダー追加ボタン */}
              <a
                href={gcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-shrink-0 text-xs font-bold px-3 py-2 rounded-lg transition-colors ${
                  isJapan
                    ? "bg-[#bc002d] hover:bg-[#9a0024] text-white"
                    : "bg-[#1a9e3f] hover:bg-[#15803d] text-white"
                }`}
              >
                📅 追加
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
