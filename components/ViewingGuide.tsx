"use client";

// 観戦のお供おすすめ
const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "syunchan0529-22";

function amazonUrl(asin: string) {
  return `https://www.amazon.co.jp/dp/${asin}?tag=${AMAZON_TAG}`;
}

function amazonSearch(q: string) {
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(q)}&tag=${AMAZON_TAG}`;
}

const ITEMS = [
  {
    category: "🍺 飲み物",
    items: [
      {
        label: "キリン一番搾り 350ml×24缶",
        desc: "観戦の定番。まとめ買いで安心",
        url: amazonUrl("B07BQJG7BT"),
      },
      {
        label: "コカ・コーラ 500ml×24本",
        desc: "ノンアルでも盛り上がれる",
        url: amazonUrl("B01N7VKNI4"),
      },
      {
        label: "アサヒスーパードライ 350ml×24缶",
        desc: "キレのある味わいで試合を楽しむ",
        url: amazonUrl("B07BPD6QJ7"),
      },
      {
        label: "ポカリスエット 500ml×24本",
        desc: "深夜観戦の水分補給に",
        url: amazonUrl("B001V9QLIY"),
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
      },
      {
        label: "Anker モバイルバッテリー 20000mAh",
        desc: "外出先でスマホ観戦するなら必須",
        url: amazonUrl("B08LG2X98F"),
      },
      {
        label: "Bluetoothイヤホン ワイヤレス",
        desc: "深夜観戦で周りを起こさない",
        url: amazonSearch("Bluetooth イヤホン ワイヤレス 高音質"),
      },
      {
        label: "プロジェクター 小型 家庭用",
        desc: "壁に大画面で迫力満点の観戦",
        url: amazonSearch("小型プロジェクター 家庭用 4K"),
      },
    ],
  },
  {
    category: "⚽ サッカーグッズ",
    items: [
      {
        label: "日本代表 ユニフォーム 2026",
        desc: "着て観戦すると気分が上がる",
        url: amazonSearch("日本代表 ユニフォーム 2026"),
      },
      {
        label: "サッカーボール 5号",
        desc: "観戦後に子供と蹴る",
        url: amazonSearch("サッカーボール 5号 公式"),
      },
      {
        label: "サポーターグッズ 日本代表",
        desc: "フラッグ・タオルで応援を盛り上げる",
        url: amazonSearch("日本代表 サポーター グッズ タオル"),
      },
      {
        label: "クラッカー・メガホン",
        desc: "仲間と観戦するときに盛り上がる",
        url: amazonSearch("メガホン 応援 サッカー"),
      },
    ],
  },
  {
    category: "📚 W杯をもっと楽しむ本",
    items: [
      {
        label: "サッカー戦術の教科書",
        desc: "フォーメーションが分かると試合が10倍面白い",
        url: amazonSearch("サッカー 戦術 本 入門"),
      },
      {
        label: "ワールドカップ全大会の記録",
        desc: "歴代の名勝負・名場面を振り返る",
        url: amazonSearch("ワールドカップ 歴史 本"),
      },
      {
        label: "日本代表 名勝負・秘話",
        desc: "日本サッカーの軌跡を知る一冊",
        url: amazonSearch("日本代表 サッカー 本 名勝負"),
      },
      {
        label: "世界のサッカースター名鑑2026",
        desc: "出場選手を予習してW杯を楽しもう",
        url: amazonSearch("サッカー スター 名鑑 2026"),
      },
    ],
  },
  {
    category: "🍕 観戦フード",
    items: [
      {
        label: "カルビー ポテトチップス 大袋 詰め合わせ",
        desc: "観戦のお供に欠かせない定番スナック",
        url: amazonSearch("ポテトチップス 詰め合わせ 大袋"),
      },
      {
        label: "柿の種 大袋",
        desc: "おつまみにも。止まらない美味しさ",
        url: amazonUrl("B07CWS3RNR"),
      },
      {
        label: "冷凍ピザ まとめ買い",
        desc: "深夜観戦の腹ごしらえに",
        url: amazonSearch("冷凍ピザ まとめ買い"),
      },
      {
        label: "唐揚げ 冷凍食品",
        desc: "レンチンで本格おつまみ",
        url: amazonSearch("唐揚げ 冷凍 レンジ"),
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
      },
      {
        label: "ABEMA プレミアム",
        desc: "一部試合を無料生中継。プレミアムで全試合",
        url: "https://abema.tv/",
      },
      {
        label: "NHKプラス",
        desc: "NHK放送試合をスマホで視聴",
        url: "https://plus.nhk.jp/",
      },
      {
        label: "U-NEXT",
        desc: "スポーツ・映画も楽しめる総合配信",
        url: "https://video.unext.jp/",
      },
    ],
  },
];

export default function ViewingGuide() {
  return (
    <div className="mt-10 mb-6">
      <h2 className="text-sm font-bold text-white/60 uppercase tracking-widest mb-4">
        🛋️ 観戦のお供
      </h2>

      <div className="space-y-6">
        {ITEMS.map((section) => (
          <div key={section.category}>
            <div className="text-xs text-white/40 mb-2 font-medium">{section.category}</div>
            {/* 横スクロールカルーセル */}
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
              {section.items.map((item) => (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-44 flex flex-col gap-1 p-3 rounded-xl border border-white/10 bg-white/5 transition-all hover:bg-white/10 snap-start"
                >
                  <div className="text-sm font-medium text-white leading-tight line-clamp-2">{item.label}</div>
                  <div className="text-xs text-white/40 mt-0.5 line-clamp-2">{item.desc}</div>
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
