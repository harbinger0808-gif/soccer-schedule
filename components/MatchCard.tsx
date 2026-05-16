"use client";

import { Match, STAGE_LABELS, BROADCASTER_MAP, googleCalendarUrl, toJST, JAPAN_TEAM_ID, WC_TEAMS } from "@/lib/football";
import { TEAM_META } from "@/lib/teamData";

const DAZN_URL = process.env.NEXT_PUBLIC_DAZN_AFFILIATE_URL || "https://www.dazn.com/ja-JP/welcome";
const JAPAN_ID = JAPAN_TEAM_ID;

const BROADCASTER_STYLE: Record<string, string> = {
  DAZN: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
  NHK: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  ABEMA: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
};

interface MatchCardProps {
  match: Match;
  isNext?: boolean;
  isTBD?: boolean;
  selectedTeamIds?: number[];
}

export default function MatchCard({ match, isNext, isTBD, selectedTeamIds }: MatchCardProps) {
  const isJapan =
    !isTBD &&
    (match.homeTeam?.id === JAPAN_ID || match.awayTeam?.id === JAPAN_ID);

  // 複数国選択時：この試合に含まれる選択済みチームのバッジを表示
  const trackingBadges = !isTBD && selectedTeamIds && selectedTeamIds.length > 1
    ? WC_TEAMS.filter(
        (t) =>
          selectedTeamIds.includes(t.id) &&
          (match.homeTeam?.id === t.id || match.awayTeam?.id === t.id)
      )
    : [];
  const broadcasters = BROADCASTER_MAP[match.stage] ?? ["DAZN", "ABEMA"];
  const gcUrl = googleCalendarUrl(match);
  const jst = toJST(match.utcDate);
  const stageLabel = STAGE_LABELS[match.stage] ?? match.stage;
  const groupLabel = match.group ? ` ${match.group}` : "";

  // 両チームの注目選手
  const homeMeta = !isTBD && match.homeTeam?.id ? TEAM_META[match.homeTeam.id] : null;
  const awayMeta = !isTBD && match.awayTeam?.id ? TEAM_META[match.awayTeam.id] : null;
  const hasPlayers = homeMeta?.players?.length || awayMeta?.players?.length;

  return (
    <div
      className={`rounded-xl border p-4 transition-all ${
        isTBD
          ? "border-white/10 bg-white/3 opacity-80"
          : isJapan
          ? "border-[#bc002d]/60 bg-gradient-to-r from-[#bc002d]/10 to-[#0a1628]"
          : "border-white/10 bg-white/5"
      } ${isNext ? "ring-2 ring-[#1a9e3f]" : ""}`}
    >
      {/* バッジ行 */}
      <div className="flex flex-wrap gap-2 mb-3 items-center">
        {isJapan && (
          <span className="text-xs font-bold bg-[#bc002d] text-white px-2 py-0.5 rounded-full">
            🇯🇵 日本代表
          </span>
        )}
        {trackingBadges.map((t) => (
          <span key={t.id} className="text-xs bg-[#f97316]/20 text-orange-300 border border-orange-500/30 px-2 py-0.5 rounded-full">
            {t.flag} {t.name}
          </span>
        ))}
        {isNext && (
          <span className="text-xs font-bold bg-[#1a9e3f] text-white px-2 py-0.5 rounded-full">
            NEXT MATCH
          </span>
        )}
        <span className="text-xs text-white/40">
          {stageLabel}{groupLabel}
        </span>
      </div>

      {/* 日時 */}
      <div className="text-sm text-white/60 mb-3 font-medium">{jst}</div>

      {/* チーム＋スコア */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <TeamDisplay team={match.homeTeam} meta={homeMeta} winner={match.score?.winner === "HOME_TEAM"} />
        <ScoreDisplay match={match} />
        <TeamDisplay team={match.awayTeam} meta={awayMeta} align="right" winner={match.score?.winner === "AWAY_TEAM"} />
      </div>

      {/* 会場 */}
      {match.venue && (
        <div className="text-xs text-white/40 mb-3">📍 {match.venue}</div>
      )}

      {/* 過去最高成績 + 注目選手 */}
      {(hasPlayers || homeMeta?.bestResult || awayMeta?.bestResult) && (
        <div className="bg-white/5 rounded-lg px-3 py-2 mb-3 space-y-2">
          {[
            { meta: homeMeta, team: match.homeTeam },
            { meta: awayMeta, team: match.awayTeam },
          ].map(({ meta, team }) =>
            meta ? (
              <div key={team?.id ?? Math.random()} className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/30 font-medium">
                    {team?.shortName ?? team?.name}
                  </span>
                  {meta.bestResult && (
                    <span className="text-[10px] text-white/40">{meta.bestResult}</span>
                  )}
                </div>
                {meta.players?.length ? (
                  <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                    {meta.players.map((p) => (
                      <span key={p.name} className="text-[11px] text-white/70">
                        ⭐ {p.nameJa}
                        <span className="text-white/30 ml-1">{p.position}</span>
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null
          )}
        </div>
      )}

      {/* 放送局 */}
      <div className="flex flex-wrap gap-1 mb-3">
        {broadcasters.map((b) => (
          <span key={b} className={`text-xs px-2 py-0.5 rounded-full ${BROADCASTER_STYLE[b] ?? "bg-white/10 text-white/60"}`}>
            {b}
          </span>
        ))}
      </div>

      {/* アクションボタン */}
      <div className="flex gap-2 flex-wrap">
        <a
          href={gcUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors"
        >
          📅 Googleカレンダー
        </a>
        <a
          href={DAZN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 px-3 py-1.5 rounded-lg transition-colors font-medium"
        >
          ▶ DAZNで見る
        </a>
      </div>
    </div>
  );
}

function ScoreDisplay({ match }: { match: Match }) {
  const { status, score } = match;
  const home = score?.fullTime?.home;
  const away = score?.fullTime?.away;

  if (status === "FINISHED" && home !== null && away !== null) {
    return (
      <div className="flex flex-col items-center shrink-0">
        <div className="text-2xl font-bold tracking-widest text-white">
          {home} <span className="text-white/30">-</span> {away}
        </div>
        <span className="text-[10px] text-white/40 mt-0.5">終了</span>
      </div>
    );
  }

  if (status === "IN_PLAY" || status === "PAUSED") {
    return (
      <div className="flex flex-col items-center shrink-0">
        <div className="text-2xl font-bold tracking-widest text-[#1a9e3f]">
          {home ?? 0} <span className="text-white/30">-</span> {away ?? 0}
        </div>
        <span className="text-[10px] text-[#1a9e3f] mt-0.5 animate-pulse font-bold">● LIVE</span>
      </div>
    );
  }

  return <div className="text-white/30 text-lg font-light shrink-0">vs</div>;
}

function TeamDisplay({
  team,
  meta,
  align,
  winner,
}: {
  team: Match["homeTeam"] | null;
  meta: { fifaRank?: number } | null;
  align?: "right";
  winner?: boolean;
}) {
  const name = team?.shortName || team?.name || "未定";
  const crest = team?.crest;

  return (
    <div className={`flex flex-col items-center gap-1 w-2/5 ${align === "right" ? "items-end" : "items-start"}`}>
      {crest ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={crest} alt={name} className="w-10 h-10 object-contain" />
      ) : (
        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-lg text-white/40">
          ?
        </div>
      )}
      <span className={`text-sm font-semibold leading-tight text-center ${!team?.id ? "text-white/40 italic" : ""} ${winner ? "text-[#1a9e3f]" : ""}`}>
        {name}
      </span>
      {meta?.fifaRank && (
        <span className="text-[10px] text-white/30">FIFA {meta.fifaRank}位</span>
      )}
    </div>
  );
}
