"use client";

import { useState } from "react";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "syunchan0529-22";
const DAZN_URL =
  process.env.NEXT_PUBLIC_DAZN_AFFILIATE_URL ?? "https://www.dazn.com/ja-JP/welcome";

interface AdItem {
  label: string;
  sub: string;
  url: string;
  gradient: string;
  textColor: string;
  subColor: string;
  arrowColor: string;
}

const ADS: AdItem[] = [
  {
    label: "📺 W杯全試合ライブ配信中 | DAZN",
    sub: "月額4,200円〜 · 初月無料キャンペーンあり",
    url: DAZN_URL,
    gradient: "from-yellow-500/20 to-yellow-600/10",
    textColor: "text-yellow-300",
    subColor: "text-yellow-300/60",
    arrowColor: "text-yellow-300",
  },
  {
    label: "🔥 Fire TV Stick 4Kで大画面観戦",
    sub: "テレビをスマートTVに · Amazonプライム対応",
    url: `https://www.amazon.co.jp/dp/B09SWJXZ9Y?tag=${AMAZON_TAG}`,
    gradient: "from-orange-500/20 to-orange-600/10",
    textColor: "text-orange-300",
    subColor: "text-orange-300/60",
    arrowColor: "text-orange-300",
  },
  {
    label: "🪑 観戦をもっと快適に | Yogibo",
    sub: "究極のビーズソファで試合を楽しもう",
    url: `https://www.amazon.co.jp/s?k=Yogibo&tag=${AMAZON_TAG}`,
    gradient: "from-purple-500/20 to-purple-600/10",
    textColor: "text-purple-300",
    subColor: "text-purple-300/60",
    arrowColor: "text-purple-300",
  },
  {
    label: "🔋 外出先でも観戦できる | Ankerバッテリー",
    sub: "大容量モバイルバッテリーで試合を最後まで",
    url: `https://www.amazon.co.jp/s?k=Anker+%E3%83%A2%E3%83%90%E3%82%A4%E3%83%AB%E3%83%90%E3%83%83%E3%83%86%E3%83%AA%E3%83%BC&tag=${AMAZON_TAG}`,
    gradient: "from-blue-500/20 to-blue-600/10",
    textColor: "text-blue-300",
    subColor: "text-blue-300/60",
    arrowColor: "text-blue-300",
  },
];

export default function NativeAdCard() {
  const [ad] = useState<AdItem>(() => ADS[Math.floor(Math.random() * ADS.length)]);

  return (
    <a
      href={ad.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`relative flex items-center justify-between rounded-xl bg-gradient-to-r ${ad.gradient} border border-white/10 px-4 py-3 hover:border-white/20 transition-colors`}
    >
      <span className="absolute top-2 right-2 text-[9px] text-white/25 font-medium">PR</span>
      <div>
        <div className={`text-sm font-bold ${ad.textColor}`}>{ad.label}</div>
        <div className={`text-xs mt-0.5 ${ad.subColor}`}>{ad.sub}</div>
      </div>
      <span className={`text-sm font-semibold ${ad.arrowColor} ml-3 shrink-0`}>→</span>
    </a>
  );
}
