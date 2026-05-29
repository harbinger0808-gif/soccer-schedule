"use client";

import { useEffect, useId, useRef } from "react";

declare global {
  interface Window {
    adsbyimobile: unknown[];
  }
}

export default function IMobileAd() {
  const uid = useId().replace(/:/g, "");
  const elementId = `im-${uid}`;
  const injected = useRef(false);

  useEffect(() => {
    if (injected.current) return;
    injected.current = true;

    // spot.js をまだ読み込んでなければ追加
    if (!document.querySelector('script[src*="spot.js"]')) {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://imp-adedge.i-mobile.co.jp/script/v1/spot.js?20220104";
      document.head.appendChild(s);
    }

    // 少し待ってからpush（spot.js の初期化を待つ）
    setTimeout(() => {
      window.adsbyimobile = window.adsbyimobile || [];
      window.adsbyimobile.push({
        pid: 84984,
        mid: 593266,
        asid: 1933128,
        type: "banner",
        display: "inline",
        elementid: elementId,
      });
    }, 300);
  }, [elementId]);

  return (
    <div className="flex justify-center my-3">
      <div id={elementId} />
    </div>
  );
}
