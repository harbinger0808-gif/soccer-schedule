"use client";

import { useState } from "react";
import { StandingGroup, StandingEntry, WC_TEAMS } from "@/lib/football";

const DAZN_URL =
  process.env.NEXT_PUBLIC_DAZN_AFFILIATE_URL ?? "https://www.dazn.com/ja-JP/welcome";

const teamFlagMap = new Map(WC_TEAMS.map((t) => [t.id, t.flag]));

interface Props {
  standings: StandingGroup[];
  selectedTeamIds?: number[];
}

export default function Standings({ standings, selectedTeamIds }: Props) {
  // 選択チームが含まれるグループを先頭に
  const sorted = [...standings].sort((a, b) => {
    const aHas = a.table.some((e) => selectedTeamIds?.includes(e.team.id));
    const bHas = b.table.some((e) => selectedTeamIds?.includes(e.team.id));
    if (aHas && !bHas) return -1;
    if (!aHas && bHas) return 1;
    return (a.group ?? "").localeCompare(b.group ?? "");
  });

  const [openGroups, setOpenGroups] = useState<Set<string>>(
    () => new Set(sorted.slice(0, 2).map((s) => s.group ?? ""))
  );

  function toggle(group: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  }

  if (standings.length === 0) return null;

  return (
    <div className="mt-8 mb-6">
      <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">
        🏆 グループ順位表
      </h2>

      <div className="space-y-3">
        {sorted.map((group) => {
          const groupKey = group.group ?? "unknown";
          const isOpen = openGroups.has(groupKey);
          const hasSelected = group.table.some((e) =>
            selectedTeamIds?.includes(e.team.id)
          );

          return (
            <div
              key={groupKey}
              className={`rounded-xl border overflow-hidden transition-all ${
                hasSelected ? "border-[#1a9e3f]/40" : "border-white/10"
              }`}
            >
              {/* グループヘッダー */}
              <button
                onClick={() => toggle(groupKey)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white/80">{groupKey}</span>
                  {hasSelected && (
                    <span className="text-[10px] bg-[#1a9e3f]/20 text-[#1a9e3f] px-2 py-0.5 rounded-full font-bold">
                      選択中
                    </span>
                  )}
                </div>
                <span className="text-white/40 text-sm">{isOpen ? "▲" : "▼"}</span>
              </button>

              {/* 順位テーブル */}
              {isOpen && (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="text-white/30 border-b border-white/10">
                        <th className="text-left px-3 py-2 font-medium w-6">#</th>
                        <th className="text-left px-2 py-2 font-medium">チーム</th>
                        <th className="text-center px-2 py-2 font-medium">試</th>
                        <th className="text-center px-2 py-2 font-medium">勝</th>
                        <th className="text-center px-2 py-2 font-medium">分</th>
                        <th className="text-center px-2 py-2 font-medium">敗</th>
                        <th className="text-center px-2 py-2 font-medium">得</th>
                        <th className="text-center px-2 py-2 font-medium">失</th>
                        <th className="text-center px-2 py-2 font-medium">差</th>
                        <th className="text-center px-3 py-2 font-bold text-white/50">PT</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.table.map((entry) => (
                        <StandingRow
                          key={entry.team.id}
                          entry={entry}
                          isSelected={selectedTeamIds?.includes(entry.team.id)}
                          isPromotion={entry.position <= 2}
                        />
                      ))}
                    </tbody>
                  </table>
                  <div className="px-3 py-2 flex items-center gap-3 border-t border-white/5">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-sm bg-[#1a9e3f]/40" />
                      <span className="text-[10px] text-white/30">決勝T進出圏</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* DAZNバナー */}
      <a
        href={DAZN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-between px-4 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/15 transition-colors"
      >
        <div>
          <div className="text-sm font-bold text-yellow-300">📺 W杯全試合 DAZNでライブ配信</div>
          <div className="text-xs text-yellow-300/60 mt-0.5">月額4,200円〜 · 初月無料キャンペーンあり</div>
        </div>
        <span className="text-yellow-300 text-sm">▶ 見る →</span>
      </a>
    </div>
  );
}

function StandingRow({
  entry,
  isSelected,
  isPromotion,
}: {
  entry: StandingEntry;
  isSelected?: boolean;
  isPromotion?: boolean;
}) {
  const flag = teamFlagMap.get(entry.team.id) ?? "🏳️";
  const name = entry.team.shortName || entry.team.name;

  return (
    <tr
      className={`border-b border-white/5 transition-colors ${
        isSelected
          ? "bg-[#1a9e3f]/10"
          : isPromotion
          ? "bg-[#1a9e3f]/5"
          : "hover:bg-white/5"
      }`}
    >
      <td className="px-3 py-2.5 text-white/50 text-center">
        <span
          className={`inline-flex w-5 h-5 items-center justify-center rounded text-[10px] font-bold ${
            isPromotion ? "bg-[#1a9e3f]/30 text-[#1a9e3f]" : "text-white/30"
          }`}
        >
          {entry.position}
        </span>
      </td>
      <td className="px-2 py-2.5">
        <div className="flex items-center gap-1.5">
          <span>{flag}</span>
          <span className={`font-medium ${isSelected ? "text-white" : "text-white/70"}`}>
            {name}
          </span>
        </div>
      </td>
      <td className="text-center px-2 py-2.5 text-white/50">{entry.playedGames}</td>
      <td className="text-center px-2 py-2.5 text-white/70">{entry.won}</td>
      <td className="text-center px-2 py-2.5 text-white/50">{entry.draw}</td>
      <td className="text-center px-2 py-2.5 text-white/50">{entry.lost}</td>
      <td className="text-center px-2 py-2.5 text-white/50">{entry.goalsFor}</td>
      <td className="text-center px-2 py-2.5 text-white/50">{entry.goalsAgainst}</td>
      <td className="text-center px-2 py-2.5 text-white/40">{entry.goalDifference > 0 ? `+${entry.goalDifference}` : entry.goalDifference}</td>
      <td className="text-center px-3 py-2.5 font-bold text-white">{entry.points}</td>
    </tr>
  );
}
