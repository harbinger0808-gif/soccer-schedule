"use client";

import { Match, googleCalendarUrl, toJST, JAPAN_TEAM_ID, WC_TEAMS } from "@/lib/football";
import { TEAM_META } from "@/lib/teamData";

// 強い方のチームのランクで並び替え（フランスvs誰でも上位に来る）
function marqueeScore(match: Match): number {
  const h = TEAM_META[match.homeTeam?.id ?? 0]?.fifaRank ?? 99;
  const a = TEAM_META[match.awayTeam?.id ?? 0]?.fifaRank ?? 99;
  return Math.min(h, a);
}

function getFlag(teamId?: number): string {
  if (!teamId) return "";
  return WC_TEAMS.find((t) => t.id === teamId)?.flag ?? "";
}

interface Props {
  matches: Match[];
}

export default function FeaturedMatches({ matches }: Props) {
  const now = Date.now();

  const featured = matches
    .filter((m) => {
      if (!m.homeTeam?.id || !m.awayTeam?.id) return false;
      if (new Date(m.utcDate).getTime() < now - 2 * 60 * 60 * 1000) return false;
      if (m.homeTeam?.id === JAPAN_TEAM_ID || m.awayTeam?.id === JAPAN_TEAM_ID) return false;
      return true;
    })
    .sort((a, b) => marqueeScore(a) - marqueeScore(b))
    .slice(0, 5);

  // ノルウェー(8872) vs フランス(773) の激アツカード
  const hotMatch = matches.find(
    (m) =>
      (m.homeTeam?.id === 8872 && m.awayTeam?.id === 773) ||
      (m.homeTeam?.id === 773 && m.awayTeam?.id === 8872)
  );

  if (featured.length === 0 && !hotMatch) return null;

  return (
    <div className="mb-6">
      {/* 激アツ特別枠 */}
      {hotMatch && (
        <div className="mb-4">
          <div className="text-xs text-white/40 mb-2 font-medium">⚡ 個人的激アツカード</div>
          <div className="relative px-3 py-3 rounded-xl border border-[#f97316]/40 bg-gradient-to-r from-[#f97316]/10 to-[#ef4444]/10 overflow-hidden">
            <div className="absolute top-1 right-2 text-[10px] text-orange-400/60 font-bold">FIFA 2位 強豪が格下に挑む</div>
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1.5 flex-1">
                <span className="text-2xl">{getFlag(hotMatch.homeTeam?.id)}</span>
                <div>
                  <div className="text-sm font-bold text-white">{hotMatch.homeTeam?.shortName || hotMatch.homeTeam?.name}</div>
                  <div className="text-[10px] text-white/30">FIFA {TEAM_META[hotMatch.homeTeam?.id ?? 0]?.fifaRank}位</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white/40">vs</div>
                <div className="text-[10px] text-white/30 mt-0.5">{toJST(hotMatch.utcDate).split(" ")[0]}</div>
              </div>
              <div className="flex items-center gap-1.5 flex-1 justify-end">
                <div className="text-right">
                  <div className="text-sm font-bold text-white">{hotMatch.awayTeam?.shortName || hotMatch.awayTeam?.name}</div>
                  <div className="text-[10px] text-white/30">FIFA {TEAM_META[hotMatch.awayTeam?.id ?? 0]?.fifaRank}位</div>
                </div>
                <span className="text-2xl">{getFlag(hotMatch.awayTeam?.id)}</span>
              </div>
              <a
                href={googleCalendarUrl(hotMatch)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-[#f97316] hover:bg-[#ea6a00] text-white transition-colors"
              >
                📅
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-white/40 mb-2 font-medium">🔥 注目試合</div>
      <div className="space-y-2">
        {featured.map((match) => {
          const gcUrl = googleCalendarUrl(match);
          const jst = toJST(match.utcDate);
          const homeFlag = getFlag(match.homeTeam?.id);
          const awayFlag = getFlag(match.awayTeam?.id);
          const home = match.homeTeam?.shortName || match.homeTeam?.name || "未定";
          const away = match.awayTeam?.shortName || match.awayTeam?.name || "未定";
          const homeRank = TEAM_META[match.homeTeam?.id ?? 0]?.fifaRank;
          const awayRank = TEAM_META[match.awayTeam?.id ?? 0]?.fifaRank;

          return (
            <div
              key={match.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all"
            >
              {/* ホーム */}
              <div className="flex items-center gap-1.5 flex-1 min-w-0">
                <span className="text-xl">{homeFlag}</span>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-white truncate">{home}</div>
                  {homeRank && <div className="text-[10px] text-white/30">FIFA {homeRank}位</div>}
                </div>
              </div>

              {/* 日時 */}
              <div className="text-center flex-shrink-0">
                <div className="text-[10px] text-white/30 font-medium">vs</div>
                <div className="text-[10px] text-white/40 mt-0.5 whitespace-nowrap">{jst.split(" ")[0]}</div>
              </div>

              {/* アウェイ */}
              <div className="flex items-center gap-1.5 flex-1 min-w-0 justify-end">
                <div className="min-w-0 text-right">
                  <div className="text-xs font-bold text-white truncate">{away}</div>
                  {awayRank && <div className="text-[10px] text-white/30">FIFA {awayRank}位</div>}
                </div>
                <span className="text-xl">{awayFlag}</span>
              </div>

              {/* 追加ボタン */}
              <a
                href={gcUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 text-xs font-bold px-2.5 py-1.5 rounded-lg bg-[#1a9e3f] hover:bg-[#15803d] text-white transition-colors"
              >
                📅
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
