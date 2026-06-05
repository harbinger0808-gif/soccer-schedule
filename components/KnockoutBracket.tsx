"use client";

import { useEffect, useState } from "react";
import { Match, STAGE_LABELS } from "@/lib/football";

// 表示するステージの順序
const STAGE_ORDER = [
  "LAST_32",
  "LAST_16",
  "QUARTER_FINALS",
  "SEMI_FINALS",
  "THIRD_PLACE",
  "FINAL",
];

function jst(utcDate: string) {
  return new Date(utcDate).toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "long",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function gcalUrl(match: Match, stageLabel: string) {
  const start =
    new Date(match.utcDate).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const end =
    new Date(new Date(match.utcDate).getTime() + 120 * 60000)
      .toISOString()
      .replace(/[-:]/g, "")
      .split(".")[0] + "Z";
  const home = match.homeTeam?.shortName ?? match.homeTeam?.name;
  const away = match.awayTeam?.shortName ?? match.awayTeam?.name;
  const label = home && away ? `${home} vs ${away}` : stageLabel;
  const title = encodeURIComponent(`⚽ ${label} | W杯2026`);
  const details = encodeURIComponent(
    `W杯2026 ${stageLabel}\n会場：${match.venue || "未定"}\n放送：DAZN / NHK / ABEMA`
  );
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}`;
}

export default function KnockoutBracket() {
  const [knockout, setKnockout] = useState<Match[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/matches")
      .then((r) => r.json())
      .then((d) => setKnockout(d.knockout ?? []))
      .catch(() => setError(true));
  }, []);

  if (error) return null;

  if (knockout === null) {
    return (
      <div className="text-center py-8 text-white/40 text-sm">
        <span className="inline-block animate-spin mr-2">⚽</span>試合表を読み込み中...
      </div>
    );
  }

  if (knockout.length === 0) return null;

  // ステージごとにグループ化
  const byStage = STAGE_ORDER.map((stage) => ({
    stage,
    label: STAGE_LABELS[stage] ?? stage,
    matches: knockout
      .filter((m) => m.stage === stage)
      .sort((a, b) => new Date(a.utcDate).getTime() - new Date(b.utcDate).getTime()),
  })).filter((s) => s.matches.length > 0);

  return (
    <div className="space-y-5">
      {byStage.map((s) => (
        <div key={s.stage}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-bold text-yellow-300">{s.label}</span>
            <span className="text-xs text-white/30">{s.matches.length}試合</span>
          </div>
          <div className="space-y-2">
            {s.matches.map((m) => {
              const home = m.homeTeam?.shortName ?? m.homeTeam?.name ?? "未定";
              const away = m.awayTeam?.shortName ?? m.awayTeam?.name ?? "未定";
              return (
                <div
                  key={m.id}
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-semibold text-white">
                      {home} <span className="text-white/30 mx-1">vs</span> {away}
                    </div>
                    <a
                      href={gcalUrl(m, s.label)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 text-[11px] text-blue-300 hover:text-blue-200 whitespace-nowrap"
                    >
                      📅 追加
                    </a>
                  </div>
                  <div className="text-[11px] text-white/40 mt-1">
                    {jst(m.utcDate)}
                    {m.venue ? ` · ${m.venue}` : ""}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <p className="text-xs text-white/40">
        ※ 対戦カードはグループステージ終了後に確定します。日程・会場が決まり次第、自動で反映されます。
      </p>
    </div>
  );
}
