"use client";

import { useEffect, useState } from "react";

const DAZN_URL =
  process.env.NEXT_PUBLIC_DAZN_AFFILIATE_URL ?? "https://www.dazn.com/ja-JP/welcome";
const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "syunchan0529-22";
const FIRE_TV_URL = `https://www.amazon.co.jp/dp/B09SWJXZ9Y?tag=${AMAZON_TAG}`;

const TOTAL = 5;

interface Props {
  open: boolean;
  onComplete: () => void;
}

export default function AdModal({ open, onComplete }: Props) {
  const [remaining, setRemaining] = useState(TOTAL);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    if (!open) {
      setRemaining(TOTAL);
      setShowSkip(false);
      return;
    }

    const skipTimer = setTimeout(() => setShowSkip(true), 3000);

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(skipTimer);
    };
  }, [open]);

  useEffect(() => {
    if (open && remaining === 0) {
      onComplete();
    }
  }, [open, remaining, onComplete]);

  if (!open) return null;

  // SVG circle dimensions
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progress = remaining / TOTAL;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="relative w-full max-w-sm rounded-2xl bg-[#0d1f3c] border border-white/10 p-6 shadow-2xl">
        {/* スキップボタン */}
        {showSkip && (
          <button
            onClick={onComplete}
            className="absolute top-3 right-3 text-xs text-white/40 hover:text-white/70 transition-colors bg-white/10 px-2 py-1 rounded-full"
          >
            スキップ ✕
          </button>
        )}

        {/* タイトル */}
        <h2 className="text-center text-base font-bold text-white mb-4">
          ⚽ W杯2026 カレンダーに追加中...
        </h2>

        {/* 円形カウントダウン */}
        <div className="flex justify-center mb-5">
          <div className="relative flex items-center justify-center w-24 h-24">
            <svg width="96" height="96" className="absolute inset-0 -rotate-90">
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="6"
              />
              <circle
                cx="48"
                cy="48"
                r={radius}
                fill="none"
                stroke="#facc15"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 0.9s linear" }}
              />
            </svg>
            <span className="text-3xl font-bold text-white z-10">{remaining}</span>
          </div>
        </div>

        {/* DAZN CTA バナー */}
        <a
          href={DAZN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full rounded-xl bg-yellow-400 hover:bg-yellow-300 transition-colors px-4 py-3 mb-3"
        >
          <div>
            <div className="text-sm font-extrabold text-black">📺 W杯を見るならDAZN</div>
            <div className="text-xs text-black/60 mt-0.5">全試合ライブ配信 · 初月無料</div>
          </div>
          <span className="text-black font-bold text-sm">▶ 見る →</span>
        </a>

        {/* Fire TV Stick リンク */}
        <a
          href={FIRE_TV_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between w-full rounded-xl bg-orange-500/20 border border-orange-500/30 hover:bg-orange-500/30 transition-colors px-4 py-3 mb-4"
        >
          <div>
            <div className="text-sm font-bold text-orange-300">🔥 テレビで観るならFire TV Stick</div>
            <div className="text-xs text-orange-300/60 mt-0.5">大画面で迫力の観戦体験</div>
          </div>
          <span className="text-orange-300 text-sm">Amazon →</span>
        </a>

        {/* 広告表示 */}
        <p className="text-center text-[10px] text-white/20">広告</p>
      </div>
    </div>
  );
}
