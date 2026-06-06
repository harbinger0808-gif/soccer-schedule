"use client";

import { useEffect, useRef, useState } from "react";
import IMobileAd from "@/components/IMobileAd";

// 画面下に固定表示するアンカー広告（視認性が高くRPMが上がりやすい）
// i-mobileが広告を返さない（在庫切れ）場合は、自動でアフィリ広告にフォールバック。
const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "syunchan0529-22";
const ELGOLAZO_URL = `https://www.amazon.co.jp/dp/B0GY68MZ85?tag=${AMAZON_TAG}`;

export default function StickyAdBanner() {
  const [closed, setClosed] = useState(false);
  const [fallback, setFallback] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  // 一定時間内に i-mobile がiframeを描画しなければ、フォールバック表示
  useEffect(() => {
    const t = setTimeout(() => {
      const filled = adRef.current?.querySelector("iframe, ins img");
      if (!filled) setFallback(true);
    }, 2500);
    return () => clearTimeout(t);
  }, []);

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

        {/* i-mobile（埋まればこちらが表示） */}
        <div ref={adRef} style={{ display: fallback ? "none" : "block" }}>
          <IMobileAd />
        </div>

        {/* フォールバック：エルゴラッソ アフィリ */}
        {fallback && (
          <a
            href={ELGOLAZO_URL}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-3 py-1.5"
          >
            <span className="flex-shrink-0 text-xl">📕</span>
            <span className="min-w-0 flex-1">
              <span className="block text-xs font-bold text-white leading-tight truncate">
                2026 W杯 48カ国選手名鑑（エル・ゴラッソ）
              </span>
              <span className="block text-[10px] text-white/50 leading-tight">
                ベストセラー1位 · 候補1,542人掲載
              </span>
            </span>
            <span className="flex-shrink-0 text-[11px] font-bold text-black bg-yellow-400 rounded-full px-2.5 py-1">
              Amazon →
            </span>
          </a>
        )}
      </div>
    </div>
  );
}
