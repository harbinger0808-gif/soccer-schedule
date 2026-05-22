"use client";

import { Match, googleCalendarUrl, toJST, JAPAN_TEAM_ID } from "@/lib/football";
// JAPAN_TEAM_IDは日本戦除外フィルタで使用
import { TEAM_META } from "@/lib/teamData";

// 両チームのFIFAランク合計が低い（＝強豪同士）ほどスコアが低い
function marqueeScore(match: Match): number {
  const h = TEAM_META[match.homeTeam?.id ?? 0]?.fifaRank ?? 99;
  const a = TEAM_META[match.awayTeam?.id ?? 0]?.fifaRank ?? 99;
  return h + a;
}

interface Props {
  matches: Match[];
}

export default function FeaturedMatches({ matches }: Props) {
  const now = Date.now();

  // 日本戦除く・終了済み除く・FIFA合計ランク上位4試合
  const featured = matches
    .filter((m) => {
      if (new Date(m.utcDate).getTime() < now - 2 * 60 * 60 * 1000) return false;
      if (m.homeTeam?.id === JAPAN_TEAM_ID || m.awayTeam?.id === JAPAN_TEAM_ID) return false;
      return true;
    })
    .sort((a, b) => marqueeScore(a) - marqueeScore(b))
    .slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
        🔥 注目試合
      </h2>
      <div className="space-y-2">
        {featured.map((match) => {
          const gcUrl = googleCalendarUrl(match);
          const jst = toJST(match.utcDate);
          const home = match.homeTeam?.shortName || match.homeTeam?.name || "未定";
          const away = match.awayTeam?.shortName || match.awayTeam?.name || "未定";
          const homeRank = TEAM_META[match.homeTeam?.id ?? 0]?.fifaRank;
          const awayRank = TEAM_META[match.awayTeam?.id ?? 0]?.fifaRank;

          return (
            <div
              key={match.id}
              className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-white/10 bg-white/5 transition-all hover:bg-white/10"
            >
              {/* 試合情報 */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-white leading-tight">
                  {home}
                  {homeRank && <span className="text-[10px] text-white/30 font-normal ml-1">FIFA {homeRank}位</span>}
                  <span className="text-white/30 font-normal mx-1">vs</span>
                  {away}
                  {awayRank && <span className="text-[10px] text-white/30 font-normal ml-1">FIFA {awayRank}位</span>}
                </div>
                <div className="text-xs text-white/40 mt-0.5">{jst}</div>
              </div>

              {/* カレンダー追加ボタン */}
              <a
                href={gcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-xs font-bold px-3 py-2 rounded-lg transition-colors bg-[#1a9e3f] hover:bg-[#15803d] text-white"
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
