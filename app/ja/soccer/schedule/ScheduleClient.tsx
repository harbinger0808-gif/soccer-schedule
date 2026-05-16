"use client";

import { useEffect, useState, useCallback, Fragment } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Match, StandingGroup, WC_TEAMS, JAPAN_TEAM_ID } from "@/lib/football";
import MatchCard from "@/components/MatchCard";
import Countdown from "@/components/Countdown";
import GoogleCalendarButton from "@/components/GoogleCalendarButton";
import Standings from "@/components/Standings";
import ViewingGuide from "@/components/ViewingGuide";
import AdBanner from "@/components/AdBanner";
import NativeAdCard from "@/components/NativeAdCard";

const JAPAN_ID = JAPAN_TEAM_ID;

export default function ScheduleClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const teamParam = searchParams.get("teams") ?? String(JAPAN_ID);
  const isTest = searchParams.get("test") === "1";
  const teamIds = teamParam.split(",").map(Number);

  const [matches, setMatches] = useState<Match[]>([]);
  const [knockout, setKnockout] = useState<Match[]>([]);
  const [standings, setStandings] = useState<StandingGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showKnockout, setShowKnockout] = useState(false);

  const fetchMatches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [matchRes, standingsRes] = await Promise.all([
        fetch(`/api/matches?teams=${teamParam}${isTest ? "&test=1" : ""}`),
        fetch("/api/standings"),
      ]);
      if (!matchRes.ok) throw new Error(`HTTP ${matchRes.status}`);
      const matchData = await matchRes.json();
      setMatches(matchData.matches ?? []);
      setKnockout(matchData.knockout ?? []);
      if (standingsRes.ok) {
        const standingsData = await standingsRes.json();
        setStandings(standingsData.standings ?? []);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  }, [teamParam]);

  useEffect(() => { fetchMatches(); }, [fetchMatches]);

  const now = Date.now();
  const upcoming = matches.filter((m) => new Date(m.utcDate).getTime() > now);
  const nextMatch = upcoming[0] ?? null;

  const selectedTeamNames = WC_TEAMS.filter((t) => teamIds.includes(t.id)).map((t) => `${t.flag} ${t.name}`);

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-[#0a1628] via-[#0d2040] to-[#0a1628] border-b border-white/10 px-4 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push("/ja/soccer")}
            className="text-white/60 hover:text-white text-sm transition-colors"
          >
            ← 国を変更
          </button>
          <h1 className="text-lg font-bold">⚽ W杯2026 日程</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* 選択中の国 */}
        <div className="flex flex-wrap gap-1 mb-4">
          {selectedTeamNames.map((name) => (
            <span key={name} className="text-xs bg-white/10 text-white/70 px-2 py-1 rounded-full">
              {name}
            </span>
          ))}
        </div>

        {/* カレンダー一括追加 */}
        <div className="space-y-2 mb-6">
          <GoogleCalendarButton teamsParam={teamParam} matchCount={matches.length} isTest={isTest} />
          <a
            href={`/api/calendar?teams=${teamParam}`}
            download="worldcup2026.ics"
            className="w-full block text-center bg-[#1a9e3f] hover:bg-[#15803d] text-white font-bold py-3 px-4 rounded-xl transition-colors text-sm"
          >
            📅 .icsでダウンロード（iPhone・Outlook対応）
          </a>
        </div>

        {/* 広告バナー */}
        <AdBanner slot="1234567890" format="horizontal" className="mb-4" />

        {/* ローディング / エラー */}
        {loading && (
          <div className="text-center py-16 text-white/60">
            <div className="text-4xl mb-4 animate-spin inline-block">⚽</div>
            <p>試合データを取得中...</p>
          </div>
        )}
        {error && (
          <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-4 mb-4 text-red-300 text-sm">
            ⚠️ {error}
            <button onClick={fetchMatches} className="ml-3 underline">再試行</button>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* 次の試合 カウントダウン */}
            {nextMatch && (
              <div className="bg-gradient-to-br from-[#1a9e3f]/20 to-[#0a1628] border border-[#1a9e3f]/40 rounded-2xl p-5 mb-6 text-center">
                <div className="text-xs text-[#1a9e3f] font-bold uppercase tracking-widest mb-2">
                  Next Match
                </div>
                <div className="text-base font-bold mb-1">
                  {nextMatch.homeTeam.shortName || nextMatch.homeTeam.name} vs {nextMatch.awayTeam.shortName || nextMatch.awayTeam.name}
                </div>
                <div className="text-white/50 text-xs mb-4">
                  {new Date(nextMatch.utcDate).toLocaleString("ja-JP", {
                    timeZone: "Asia/Tokyo",
                    month: "long",
                    day: "numeric",
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <Countdown targetDate={nextMatch.utcDate} />
              </div>
            )}

            {/* グループステージ 試合リスト */}
            {matches.length === 0 ? (
              <div className="text-center py-12 text-white/40">
                <p>該当する試合が見つかりませんでした</p>
              </div>
            ) : (
              <div className="space-y-3">
                {matches.map((match, index) => (
                  <Fragment key={match.id}>
                    <MatchCard
                      match={match}
                      isNext={nextMatch?.id === match.id}
                      selectedTeamIds={teamIds}
                    />
                    {(index + 1) % 3 === 0 && index !== matches.length - 1 && (
                      <NativeAdCard />
                    )}
                  </Fragment>
                ))}
              </div>
            )}

            {/* 順位表 */}
            {standings.length > 0 && (
              <Standings standings={standings} selectedTeamIds={teamIds} />
            )}

            {/* 観戦のお供 */}
            <ViewingGuide />

            {/* 決勝トーナメント（対戦相手未定）セクション */}
            {knockout.length > 0 && (
              <div className="mt-8">
                <button
                  onClick={() => setShowKnockout((v) => !v)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mb-3"
                >
                  <div className="text-left">
                    <div className="text-sm font-bold text-white/80">🏆 決勝トーナメント</div>
                    <div className="text-xs text-white/40 mt-0.5">
                      対戦相手は決まり次第更新 · {knockout.length}試合
                    </div>
                  </div>
                  <span className="text-white/40 text-lg">{showKnockout ? "▲" : "▼"}</span>
                </button>

                {showKnockout && (
                  <>
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5 mb-3 text-xs text-amber-300/80">
                      ⏳ 対戦チームはグループステージ終了後に確定します。カレンダー登録は今すぐ可能です。
                    </div>
                    <div className="space-y-3">
                      {knockout.map((match) => (
                        <MatchCard key={match.id} match={match} isTBD />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
