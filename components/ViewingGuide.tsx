"use client";

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "syunchan0529-22";

function amazonUrl(asin: string) {
  return `https://www.amazon.co.jp/dp/${asin}?tag=${AMAZON_TAG}`;
}

function amazonSearch(q: string) {
  return `https://www.amazon.co.jp/s?k=${encodeURIComponent(q)}&tag=${AMAZON_TAG}`;
}

const ITEMS = [
  {
    category: "🪑 観戦グッズ",
    items: [
      {
        label: "ビーズソファ Yogibo Max",
        desc: "沈み込む快感。長時間観戦の最強アイテム",
        url: amazonSearch("ビーズソファ Yogibo Max"),
      },
      {
        label: "座椅子 リクライニング",
        desc: "床に座って大画面観戦。腰が楽になる",
        url: amazonSearch("座椅子 リクライニング コンパクト"),
      },
      {
        label: "低反発クッション",
        desc: "ソファや床に置くだけで快適さが激変",
        url: amazonSearch("低反発クッション 座布団 大きめ"),
      },
      {
        label: "ひざ掛け ブランケット",
        desc: "夜の冷え対策。冷房が強い部屋にも",
        url: amazonSearch("ひざ掛け ブランケット 大判 フランネル"),
      },
      {
        label: "サイドテーブル ソファ用",
        desc: "飲み物・スナックをすぐ手が届く場所に",
        url: amazonSearch("サイドテーブル ソファ ベッド 飲み物"),
      },
      {
        label: "スマホスタンド 卓上",
        desc: "サブ画面で速報チェックしながら観戦",
        url: amazonSearch("スマホスタンド 卓上 角度調整"),
      },
    ],
  },
  {
    category: "🌙 深夜対策",
    items: [
      {
        label: "モンスターエナジー 355ml×24缶",
        desc: "深夜キックオフに向けてチャージ",
        url: amazonUrl("B07BNTG2QG"),
      },
      {
        label: "レッドブル 250ml×24缶",
        desc: "眠気に打ち勝つ定番エナジードリンク",
        url: amazonUrl("B003PXBF98"),
      },
      {
        label: "眠眠打破 50ml×60本",
        desc: "試合前に一本。確実に目が覚める",
        url: amazonSearch("眠眠打破 まとめ買い"),
      },
      {
        label: "アイマスク 安眠 遮光",
        desc: "試合前にちょっと仮眠して万全の状態で",
        url: amazonSearch("アイマスク 安眠 遮光 立体"),
      },
      {
        label: "耳栓 防音 睡眠用",
        desc: "家族が寝てる中でも音を気にせず観戦",
        url: amazonSearch("耳栓 防音 睡眠 フォーム"),
      },
      {
        label: "カフェイン サプリ",
        desc: "コーヒーが苦手な人の深夜観戦サポート",
        url: amazonSearch("カフェイン サプリ 眠気覚まし"),
      },
    ],
  },
  {
    category: "🍺 飲み物",
    items: [
      {
        label: "キリン一番搾り 350ml×24缶",
        desc: "観戦の定番。まとめ買いで安心",
        url: amazonUrl("B07BQJG7BT"),
      },
      {
        label: "アサヒスーパードライ 350ml×24缶",
        desc: "キレのある味わいで試合を楽しむ",
        url: amazonUrl("B07BPD6QJ7"),
      },
      {
        label: "コカ・コーラ 500ml×24本",
        desc: "ノンアルでも盛り上がれる定番",
        url: amazonUrl("B01N7VKNI4"),
      },
      {
        label: "三ツ矢サイダー 500ml×24本",
        desc: "さっぱり爽快。子供から大人まで",
        url: amazonSearch("三ツ矢サイダー 500ml 24本"),
      },
      {
        label: "綾鷹 緑茶 500ml×24本",
        desc: "試合中の水分補給はやっぱりお茶",
        url: amazonSearch("綾鷹 緑茶 500ml 24本"),
      },
      {
        label: "ポカリスエット 500ml×24本",
        desc: "深夜観戦で意外と汗かく。スポーツドリンクで補給",
        url: amazonUrl("B001V9QLIY"),
      },
    ],
  },
  {
    category: "🍿 お菓子・スナック",
    items: [
      {
        label: "カルビー ポテトチップス 詰め合わせ",
        desc: "止まらない。観戦のお供の王様",
        url: amazonSearch("カルビー ポテトチップス 詰め合わせ 大袋"),
      },
      {
        label: "亀田の柿の種 10袋詰め",
        desc: "ピリ辛でビールが進む定番おつまみ",
        url: amazonUrl("B07CWS3RNR"),
      },
      {
        label: "じゃがりこ まとめ買い",
        desc: "食べやすくて手が汚れない観戦向きスナック",
        url: amazonSearch("じゃがりこ まとめ買い 大量"),
      },
      {
        label: "ミックスナッツ 大袋",
        desc: "ビールに合う。ちょっとヘルシーなおつまみ",
        url: amazonSearch("ミックスナッツ 大袋 1kg 素焼き"),
      },
      {
        label: "グミ 詰め合わせ",
        desc: "眠気覚ましにも。噛んで集中力キープ",
        url: amazonSearch("グミ 詰め合わせ まとめ買い 大量"),
      },
      {
        label: "チョコレート 詰め合わせ",
        desc: "深夜の糖分補給。幸福感で応援に力が入る",
        url: amazonSearch("チョコレート 詰め合わせ まとめ買い"),
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
        label: "小型プロジェクター 家庭用",
        desc: "壁に大画面で迫力満点の観戦",
        url: amazonSearch("小型プロジェクター 家庭用 4K WiFi"),
      },
      {
        label: "ワイヤレスイヤホン",
        desc: "深夜観戦で家族を起こさない",
        url: amazonSearch("ワイヤレスイヤホン Bluetooth 高音質"),
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
        desc: "NHK放送試合をスマホ・PCで無料視聴",
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
