"use client";

// 観戦のお供おすすめ
// リンクURLは .env.local の NEXT_PUBLIC_AMAZON_TAG でアソシエイトタグを差し替える
const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "harbinger-22";

function amazonUrl(asin: string) {
  return `https://www.amazon.co.jp/dp/${asin}?tag=${AMAZON_TAG}`;
}

const ITEMS = [
  {
    category: "🍺 飲み物",
    items: [
      {
        label: "キリン一番搾り 350ml×24缶",
        desc: "観戦の定番。まとめ買いで安心",
        url: amazonUrl("B07BQJG7BT"),
        badge: "Amazon",
      },
      {
        label: "コカ・コーラ 500ml×24本",
        desc: "ノンアルでも盛り上がれる",
        url: amazonUrl("B01N7VKNI4"),
        badge: "Amazon",
      },
    ],
  },
  {
    category: "🍟 つまみ・フード",
    items: [
      {
        label: "出前館",
        desc: "試合直前に注文。ピザ・寿司・ファストフード",
        url: "https://order.demae-can.com/",
        badge: "提携",
      },
      {
        label: "Uber Eats",
        desc: "キックオフに合わせてデリバリー",
        url: "https://www.ubereats.com/jp",
        badge: "提携",
      },
    ],
  },
  {
    category: "📺 視聴環境",
    items: [
      {
        label: "Fire TV Stick 4K",
        desc: "テレビでDAZN・ABEMAをフル画面で",
        url: amazonUrl("B09SWJXZ9Y"),
        badge: "Amazon",
      },
      {
        label: "Anker モバイルバッテリー 20000mAh",
        desc: "外出先でスマホ観戦するなら必須",
        url: amazonUrl("B08LG2X98F"),
        badge: "Amazon",
      },
    ],
  },
  {
    category: "⚽ サッカーグッズ",
    items: [
      {
        label: "日本代表 ユニフォーム 2026",
        desc: "着て観戦すると気分が上がる",
        url: `https://www.amazon.co.jp/s?k=日本代表+ユニフォーム+2026&tag=${AMAZON_TAG}`,
        badge: "Amazon",
      },
      {
        label: "サッカーボール 5号",
        desc: "観戦後に子供と蹴る",
        url: `https://www.amazon.co.jp/s?k=サッカーボール+5号&tag=${AMAZON_TAG}`,
        badge: "Amazon",
      },
    ],
  },
  {
    category: "📡 配信サービス",
    items: [
      {
        label: "DAZN",
        desc: "W杯全試合ライブ配信。月額4,200円〜",
        url: process.env.NEXT_PUBLIC_DAZN_AFFILIATE_URL ?? "https://www.dazn.com/ja-JP/welcome",
        badge: "アフィリ",
        highlight: true,
      },
      {
        label: "ABEMA プレミアム",
        desc: "無料枠あり。一部試合を無料生中継",
        url: "https://abema.tv/",
        badge: "提携",
      },
    ],
  },
];

const BADGE_STYLE: Record<string, string> = {
  Amazon: "bg-orange-500/20 text-orange-300",
  アフィリ: "bg-yellow-500/20 text-yellow-300",
  提携: "bg-blue-500/20 text-blue-300",
};

export default function ViewingGuide() {
  return (
    <div className="mt-10 mb-6">
      <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">
        🛋️ 観戦のお供
      </h2>

      <div className="space-y-5">
        {ITEMS.map((section) => (
          <div key={section.category}>
            <div className="text-xs text-white/40 mb-2 font-medium">{section.category}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {section.items.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all hover:bg-white/10 ${
                    item.highlight
                      ? "border-yellow-500/30 bg-yellow-500/5"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white leading-tight">{item.label}</div>
                    <div className="text-xs text-white/40 mt-0.5">{item.desc}</div>
                  </div>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 mt-0.5 ${BADGE_STYLE[item.badge] ?? "bg-white/10 text-white/40"}`}>
                    {item.badge}
                  </span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-white/20 mt-4">
        ※ 一部リンクはアフィリエイト広告を含みます
      </p>
    </div>
  );
}
