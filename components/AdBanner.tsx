"use client";

import { useEffect } from "react";

interface AdBannerProps {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal";
  className?: string;
}

// Google AdSense バナー
// NEXT_PUBLIC_ADSENSE_CLIENT_ID に "ca-pub-XXXXXXXXXX" を設定すると有効化
export default function AdBanner({ slot, format = "auto", className = "" }: AdBannerProps) {
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  useEffect(() => {
    if (!clientId) return;
    try {
      // @ts-expect-error adsbygoogle is injected by Google
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {}
  }, [clientId]);

  if (!clientId) {
    // AdSense未設定時はプレースホルダー（本番では非表示）
    if (process.env.NODE_ENV !== "development") return null;
    return (
      <div className={`bg-white/5 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-white/20 text-xs py-6 ${className}`}>
        広告枠（AdSense設定後に表示）
      </div>
    );
  }

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
