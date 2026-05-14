"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { WC_TEAMS, JAPAN_TEAM_ID } from "@/lib/football";
import { TEAM_META } from "@/lib/teamData";

const JAPAN_ID = JAPAN_TEAM_ID;

export default function SoccerPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<number[]>([JAPAN_ID]);

  function toggle(id: number) {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  function handleSubmit() {
    if (selected.length === 0) return;
    router.push(`/ja/soccer/schedule?teams=${selected.join(",")}`);
  }

  function selectAll() {
    setSelected(WC_TEAMS.map((t) => t.id));
  }

  function clearAll() {
    setSelected([JAPAN_ID]);
  }

  const japan = WC_TEAMS.find((t) => t.id === JAPAN_ID)!;
  const others = WC_TEAMS.filter((t) => t.id !== JAPAN_ID);

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-[#0a1628] via-[#0d2040] to-[#0a1628] border-b border-white/10 px-4 py-6 text-center">
        <div className="text-4xl mb-2">⚽</div>
        <h1 className="text-2xl font-bold mb-1">W杯2026 日程＆カレンダー</h1>
        <p className="text-white/60 text-sm">応援する国を選んで、試合日程をチェック</p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* 日本代表ピックアップ */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">
            日本代表
          </h2>
          <button
            onClick={() => toggle(japan.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
              selected.includes(japan.id)
                ? "border-[#bc002d] bg-[#bc002d]/10"
                : "border-white/20 bg-white/5"
            }`}
          >
            <span className="text-4xl">{japan.flag}</span>
            <div className="text-left flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-lg">{japan.name}</span>
                <span className="text-xs bg-white/10 text-white/50 px-1.5 py-0.5 rounded-full">
                  FIFA {TEAM_META[japan.id]?.fifaRank}位
                </span>
              </div>
              {TEAM_META[japan.id]?.bestResult && (
                <div className="text-xs text-white/40 mt-0.5">
                  {TEAM_META[japan.id].bestResult}
                </div>
              )}
              <div className="text-xs text-white/50 mt-0.5">
                ⭐ {TEAM_META[japan.id]?.players?.map(p => p.nameJa).join("・")}
              </div>
            </div>
            {selected.includes(japan.id) && (
              <div className="text-[#bc002d] text-xl">✓</div>
            )}
          </button>
        </div>

        {/* 全カ国グリッド */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xs font-semibold text-white/40 uppercase tracking-widest">
            出場48カ国
          </h2>
          <div className="flex gap-2">
            <button
              onClick={selectAll}
              className="text-xs text-[#1a9e3f] hover:text-green-300 transition-colors"
            >
              全選択
            </button>
            <span className="text-white/20">|</span>
            <button
              onClick={clearAll}
              className="text-xs text-white/40 hover:text-white/70 transition-colors"
            >
              リセット
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          {others.map((team) => {
            const meta = TEAM_META[team.id];
            const topPlayer = meta?.players?.[0];
            const isSelected = selected.includes(team.id);
            return (
              <button
                key={team.id}
                onClick={() => toggle(team.id)}
                className={`flex flex-col items-center p-3 rounded-xl border transition-all text-center ${
                  isSelected
                    ? "border-[#f97316] bg-[#f97316]/10"
                    : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="text-3xl mb-1">{team.flag}</span>
                <span className="text-xs font-medium leading-tight">{team.name}</span>
                {meta?.fifaRank && (
                  <span className="text-[10px] text-white/30 mt-0.5">
                    FIFA {meta.fifaRank}位
                  </span>
                )}
                {meta?.bestResult && (
                  <span className="text-[10px] text-white/25 mt-0.5 leading-tight line-clamp-1">
                    {meta.bestResult}
                  </span>
                )}
                {isSelected && (
                  <span className="text-[#f97316] text-xs mt-1">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* 固定フッターボタン */}
        <div className="sticky bottom-4">
          <button
            onClick={handleSubmit}
            disabled={selected.length === 0}
            className="w-full bg-[#1a9e3f] hover:bg-[#15803d] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors shadow-lg shadow-green-900/40"
          >
            {selected.length === 0
              ? "国を選んでください"
              : `${selected.length}カ国の試合を見る →`}
          </button>
        </div>
      </div>
    </main>
  );
}
