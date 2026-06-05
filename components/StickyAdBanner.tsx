"use client";

import { useState } from "react";
import IMobileAd from "@/components/IMobileAd";

// 画面下に固定表示するアンカー広告（視認性が高くRPMが上がりやすい）
// 閉じるボタン付き。AdSense審査通過後は中身をAdSenseアンカーに差し替え可能。
export default function StickyAdBanner() {
  const [closed, setClosed] = useState(false);

  if (closed) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div className="pointer-events-auto relative w-full max-w-2xl bg-[#0a1830]/95 backdrop-blur border-t border-white/10 px-2 pt-4 pb-1 shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
        <button
          type="button"
          onClick={() => setClosed(true)}
          aria-label="広告を閉じる"
          className="absolute -top-3 right-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs text-white/70 hover:bg-white/25 hover:text-white transition-colors"
        >
          ✕
        </button>
        <span className="absolute top-0.5 left-2 text-[9px] text-white/25">広告</span>
        <IMobileAd />
      </div>
    </div>
  );
}
