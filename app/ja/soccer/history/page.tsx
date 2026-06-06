import type { Metadata } from "next";
import Link from "next/link";
import IMobileAd from "@/components/IMobileAd";
import StickyAdBanner from "@/components/StickyAdBanner";
import ElGolazoFeature from "@/components/ElGolazoFeature";

const DAZN_URL =
  process.env.NEXT_PUBLIC_DAZN_AFFILIATE_URL ?? "https://www.dazn.com/ja-JP/welcome";
const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "syunchan0529-22";
const amazonSearch = (q: string) =>
  `https://www.amazon.co.jp/s?k=${encodeURIComponent(q)}&tag=${AMAZON_TAG}`;

const TITLE =
  "歴代ワールドカップ 優勝国一覧｜全大会の記録・優勝回数ランキング";
const DESCRIPTION =
  "FIFAワールドカップの歴代優勝国を1930年の第1回から2022年カタール大会まで一覧で紹介。優勝回数ランキング、決勝スコア、開催国、日本代表の歴代成績まで、W杯の歴史をまとめました。2026年北中米大会の予習に。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://japan-wc2026.com/ja/soccer/history" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://japan-wc2026.com/ja/soccer/history",
    type: "article",
  },
};

// 歴代優勝国（史実）
const WINNERS = [
  { year: 1930, host: "ウルグアイ", winner: "ウルグアイ", runnerUp: "アルゼンチン", score: "4–2" },
  { year: 1934, host: "イタリア", winner: "イタリア", runnerUp: "チェコスロバキア", score: "2–1" },
  { year: 1938, host: "フランス", winner: "イタリア", runnerUp: "ハンガリー", score: "4–2" },
  { year: 1950, host: "ブラジル", winner: "ウルグアイ", runnerUp: "ブラジル", score: "2–1" },
  { year: 1954, host: "スイス", winner: "西ドイツ", runnerUp: "ハンガリー", score: "3–2" },
  { year: 1958, host: "スウェーデン", winner: "ブラジル", runnerUp: "スウェーデン", score: "5–2" },
  { year: 1962, host: "チリ", winner: "ブラジル", runnerUp: "チェコスロバキア", score: "3–1" },
  { year: 1966, host: "イングランド", winner: "イングランド", runnerUp: "西ドイツ", score: "4–2" },
  { year: 1970, host: "メキシコ", winner: "ブラジル", runnerUp: "イタリア", score: "4–1" },
  { year: 1974, host: "西ドイツ", winner: "西ドイツ", runnerUp: "オランダ", score: "2–1" },
  { year: 1978, host: "アルゼンチン", winner: "アルゼンチン", runnerUp: "オランダ", score: "3–1" },
  { year: 1982, host: "スペイン", winner: "イタリア", runnerUp: "西ドイツ", score: "3–1" },
  { year: 1986, host: "メキシコ", winner: "アルゼンチン", runnerUp: "西ドイツ", score: "3–2" },
  { year: 1990, host: "イタリア", winner: "西ドイツ", runnerUp: "アルゼンチン", score: "1–0" },
  { year: 1994, host: "アメリカ", winner: "ブラジル", runnerUp: "イタリア", score: "0–0 (PK 3–2)" },
  { year: 1998, host: "フランス", winner: "フランス", runnerUp: "ブラジル", score: "3–0" },
  { year: 2002, host: "日韓", winner: "ブラジル", runnerUp: "ドイツ", score: "2–0" },
  { year: 2006, host: "ドイツ", winner: "イタリア", runnerUp: "フランス", score: "1–1 (PK 5–3)" },
  { year: 2010, host: "南アフリカ", winner: "スペイン", runnerUp: "オランダ", score: "1–0" },
  { year: 2014, host: "ブラジル", winner: "ドイツ", runnerUp: "アルゼンチン", score: "1–0" },
  { year: 2018, host: "ロシア", winner: "フランス", runnerUp: "クロアチア", score: "4–2" },
  { year: 2022, host: "カタール", winner: "アルゼンチン", runnerUp: "フランス", score: "3–3 (PK 4–2)" },
];

// 優勝回数ランキング（西ドイツはドイツに合算）
const TITLES = [
  { country: "🇧🇷 ブラジル", count: 5, years: "1958・62・70・94・2002" },
  { country: "🇩🇪 ドイツ（西ドイツ含む）", count: 4, years: "1954・74・90・2014" },
  { country: "🇮🇹 イタリア", count: 4, years: "1934・38・82・2006" },
  { country: "🇦🇷 アルゼンチン", count: 3, years: "1978・86・2022" },
  { country: "🇺🇾 ウルグアイ", count: 2, years: "1930・50" },
  { country: "🇫🇷 フランス", count: 2, years: "1998・2018" },
  { country: "🏴 イングランド", count: 1, years: "1966" },
  { country: "🇪🇸 スペイン", count: 1, years: "2010" },
];

// 日本代表の歴代W杯成績（史実）
const JAPAN = [
  { year: 1998, result: "グループリーグ敗退", note: "初出場（フランス大会）" },
  { year: 2002, result: "ベスト16", note: "自国開催（日韓大会）で初の決勝T進出" },
  { year: 2006, result: "グループリーグ敗退", note: "ドイツ大会" },
  { year: 2010, result: "ベスト16", note: "南アフリカ大会・PK戦で惜敗" },
  { year: 2014, result: "グループリーグ敗退", note: "ブラジル大会" },
  { year: 2018, result: "ベスト16", note: "ロシア大会・ベルギー戦の激闘" },
  { year: 2022, result: "ベスト16", note: "ドイツ・スペインを撃破して突破" },
];

// 歴代得点王（ゴールデンブーツ／史実・主要大会）
const SCORERS = [
  { year: 1930, name: "G・スタビレ", country: "アルゼンチン", goals: "8" },
  { year: 1950, name: "アデミール", country: "ブラジル", goals: "8" },
  { year: 1954, name: "S・コチシュ", country: "ハンガリー", goals: "11" },
  { year: 1958, name: "J・フォンテーヌ", country: "フランス", goals: "13 ★" },
  { year: 1966, name: "エウゼビオ", country: "ポルトガル", goals: "9" },
  { year: 1970, name: "G・ミュラー", country: "西ドイツ", goals: "10" },
  { year: 1986, name: "G・リネカー", country: "イングランド", goals: "6" },
  { year: 1990, name: "S・スキラッチ", country: "イタリア", goals: "6" },
  { year: 2002, name: "ロナウド", country: "ブラジル", goals: "8" },
  { year: 2006, name: "M・クローゼ", country: "ドイツ", goals: "5" },
  { year: 2014, name: "J・ロドリゲス", country: "コロンビア", goals: "6" },
  { year: 2018, name: "H・ケイン", country: "イングランド", goals: "6" },
  { year: 2022, name: "K・エムバペ", country: "フランス", goals: "8" },
];

// 記憶に残る名場面（史実）
const EPISODES = [
  { title: "ペレ、17歳の戴冠（1958）", text: "10代のペレが決勝で2得点。ブラジル初優勝の立役者となり、世界に衝撃を与えた。" },
  { title: "マラカナンの悲劇（1950）", text: "地元ブラジルが最終戦でウルグアイに敗れまさかの準優勝。20万人の大観衆が沈黙した。" },
  { title: "マラドーナ、2つの伝説（1986）", text: "対イングランド戦で『神の手』ゴールと5人抜きの『世紀のゴール』を同じ試合で。アルゼンチンを優勝へ導いた。" },
  { title: "ジダンの頭突き退場（2006・決勝）", text: "フランスの英雄が延長で相手選手に頭突きし一発退場。PK戦の末イタリアが優勝した。" },
  { title: "ミネイロンの惨劇（2014）", text: "準決勝で地元ブラジルがドイツに1–7の歴史的大敗。サッカー王国が崩れた一戦。" },
  { title: "メッシ、悲願のW杯（2022）", text: "決勝でフランスと3–3、PK戦を制してアルゼンチンが優勝。エムバペは決勝ハットトリックの記録。" },
  { title: "🇯🇵 ドイツ・スペイン撃破（2022）", text: "日本が優勝経験国2カ国を相次いで逆転で破り、グループ首位で決勝トーナメントへ。" },
  { title: "🇯🇵 ベルギーの悪夢（2018）", text: "2–0からまさかの逆転負け。あと一歩のベスト8を逃した、語り継がれる激闘。" },
];

const FAQ = [
  {
    q: "ワールドカップで最も優勝回数が多い国はどこですか？",
    a: "ブラジルの5回（1958・1962・1970・1994・2002年）が歴代最多です。次いでドイツ（西ドイツ含む）とイタリアが各4回となっています。",
  },
  {
    q: "第1回ワールドカップはいつ開催されましたか？",
    a: "1930年にウルグアイで開催され、開催国ウルグアイが初代王者になりました。決勝でアルゼンチンを4–2で破っています。",
  },
  {
    q: "日本代表のワールドカップ最高成績は？",
    a: "ベスト16です。2002・2010・2018・2022年の4回、決勝トーナメントに進出していますが、ベスト8（新たな景色）にはまだ到達していません。2026年大会での悲願達成が期待されています。",
  },
  {
    q: "ワールドカップの1大会最多得点記録は？",
    a: "1958年スウェーデン大会でフランスのジュスト・フォンテーヌが記録した13得点が、今も破られていない単一大会の最多得点記録です。通算では、ドイツのミロスラフ・クローゼが4大会で挙げた16得点が歴代最多です。",
  },
];

export default function HistoryPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link
          href="/ja/soccer"
          className="text-white/40 hover:text-white text-sm mb-6 inline-block"
        >
          ← トップへ戻る
        </Link>

        <h1 className="text-2xl font-bold mb-3 leading-snug">
          歴代ワールドカップ<br />優勝国・記録
        </h1>
        <p className="text-white/50 text-sm mb-8">
          1930年の第1回から2022年カタール大会まで、全22大会の優勝国・決勝スコア・開催国を一覧で。優勝回数ランキングと日本代表の歴代成績もまとめました。
        </p>

        <ElGolazoFeature className="mb-10" />

        <div className="space-y-10 text-white/70 text-sm leading-relaxed">
          {/* 優勝回数ランキング */}
          <section>
            <h2 className="text-white font-bold text-base mb-3">優勝回数ランキング</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/10 text-white/70">
                    <th className="text-left px-3 py-2 font-semibold">国</th>
                    <th className="text-center px-3 py-2 font-semibold">優勝</th>
                    <th className="text-left px-3 py-2 font-semibold">優勝年</th>
                  </tr>
                </thead>
                <tbody>
                  {TITLES.map((t, i) => (
                    <tr key={t.country} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                      <td className="px-3 py-2 font-bold text-white whitespace-nowrap">{t.country}</td>
                      <td className="px-3 py-2 text-center text-yellow-300 font-bold">{t.count}回</td>
                      <td className="px-3 py-2 text-white/50">{t.years}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* 記事中広告 */}
          <div>
            <p className="text-[10px] text-white/20 mb-1">広告</p>
            <IMobileAd />
          </div>

          {/* 歴代優勝国一覧 */}
          <section>
            <h2 className="text-white font-bold text-base mb-3">歴代優勝国 全一覧（1930〜2022）</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/10 text-white/70">
                    <th className="text-left px-2 py-2 font-semibold">年</th>
                    <th className="text-left px-2 py-2 font-semibold">開催</th>
                    <th className="text-left px-2 py-2 font-semibold">優勝</th>
                    <th className="text-left px-2 py-2 font-semibold">準優勝</th>
                    <th className="text-left px-2 py-2 font-semibold">スコア</th>
                  </tr>
                </thead>
                <tbody>
                  {WINNERS.map((w, i) => (
                    <tr key={w.year} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                      <td className="px-2 py-2 font-bold text-white">{w.year}</td>
                      <td className="px-2 py-2 text-white/50">{w.host}</td>
                      <td className="px-2 py-2 font-semibold text-yellow-300">{w.winner}</td>
                      <td className="px-2 py-2 text-white/60">{w.runnerUp}</td>
                      <td className="px-2 py-2 text-white/50 whitespace-nowrap">{w.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-3">
              ※ 1954〜1990年の「西ドイツ」は、現在のドイツの前身です。
            </p>
          </section>

          {/* 日本代表の歴代成績 */}
          <section>
            <h2 className="text-white font-bold text-base mb-3">🇯🇵 日本代表の歴代W杯成績</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/10 text-white/70">
                    <th className="text-left px-3 py-2 font-semibold">年</th>
                    <th className="text-left px-3 py-2 font-semibold">成績</th>
                    <th className="text-left px-3 py-2 font-semibold">メモ</th>
                  </tr>
                </thead>
                <tbody>
                  {JAPAN.map((j, i) => (
                    <tr key={j.year} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                      <td className="px-3 py-2 font-bold text-white">{j.year}</td>
                      <td className={`px-3 py-2 font-semibold ${j.result === "ベスト16" ? "text-green-300" : "text-white/50"}`}>{j.result}</td>
                      <td className="px-3 py-2 text-white/50">{j.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-3">
              日本の最高成績はベスト16。ベスト8＝「新たな景色」が2026年大会の悲願です。
            </p>
          </section>

          {/* 歴代得点王 */}
          <section>
            <h2 className="text-white font-bold text-base mb-3">⚽ 歴代得点王（主な大会）</h2>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/10 text-white/70">
                    <th className="text-left px-3 py-2 font-semibold">年</th>
                    <th className="text-left px-3 py-2 font-semibold">選手</th>
                    <th className="text-left px-3 py-2 font-semibold">国</th>
                    <th className="text-center px-3 py-2 font-semibold">得点</th>
                  </tr>
                </thead>
                <tbody>
                  {SCORERS.map((s, i) => (
                    <tr key={s.year} className={i % 2 === 0 ? "bg-white/[0.02]" : ""}>
                      <td className="px-3 py-2 font-bold text-white">{s.year}</td>
                      <td className="px-3 py-2 text-white/80">{s.name}</td>
                      <td className="px-3 py-2 text-white/50">{s.country}</td>
                      <td className="px-3 py-2 text-center text-yellow-300 font-bold">{s.goals}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-3">
              ★ フォンテーヌの13得点（1958）は今も破られない単一大会の最多記録。通算最多得点はM・クローゼの16得点。<br />
              ※ 初期大会の得点数は集計資料により異なる場合があります。
            </p>
          </section>

          {/* 記憶に残る名場面 */}
          <section>
            <h2 className="text-white font-bold text-base mb-3">🔥 記憶に残る名場面</h2>
            <div className="space-y-3">
              {EPISODES.map((e) => (
                <div key={e.title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-white font-bold text-sm mb-1">{e.title}</div>
                  <div className="text-white/60 text-sm">{e.text}</div>
                </div>
              ))}
            </div>
          </section>

          {/* よくある質問 */}
          <section>
            <h2 className="text-white font-bold text-base mb-3">よくある質問</h2>
            <div className="space-y-4">
              {FAQ.map((f) => (
                <div key={f.q} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="text-white font-semibold text-sm mb-1.5">Q. {f.q}</div>
                  <div className="text-white/60 text-sm">A. {f.a}</div>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
            <div className="text-base font-bold text-yellow-300 mb-1">⚽ 2026年、次の王者を見届けよう</div>
            <p className="text-xs text-white/60 mb-4">
              北中米大会は2026年6月開幕。歴史に立ち会うために、日程はカレンダーへ、観戦は配信で準備を。
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/ja/soccer/schedule"
                className="block text-center rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors px-3 py-2.5 text-sm font-bold text-white"
              >
                📅 2026 全試合日程をカレンダーに追加 →
              </Link>
              <a
                href={DAZN_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block text-center rounded-xl bg-yellow-400 hover:bg-yellow-300 transition-colors px-3 py-2.5 text-sm font-extrabold text-black"
              >
                DAZNでW杯を見る →
              </a>
              <a
                href={amazonSearch("ワールドカップ 歴史 名鑑 本")}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="block text-center rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 transition-colors px-3 py-2.5 text-sm font-bold text-white"
              >
                📚 W杯の歴史本・名鑑をAmazonで探す →
              </a>
            </div>
          </section>

          <nav className="pt-4 border-t border-white/10">
            <div className="text-xs text-white/40 mb-2">関連ページ</div>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/ja/soccer" className="text-blue-300 hover:underline">→ W杯2026 トップ（応援国を選んで日程を確認）</Link>
              <Link href="/ja/soccer/knockout" className="text-blue-300 hover:underline">→ 決勝トーナメントの仕組みを図解で解説</Link>
              <Link href="/ja/soccer/schedule" className="text-blue-300 hover:underline">→ 全試合日程＆Googleカレンダー登録</Link>
            </div>
          </nav>

          <p className="text-xs text-white/20">
            ※ 一部リンクはアフィリエイト広告を含みます ·{" "}
            <a href="/privacy" className="hover:text-white/40 underline">プライバシーポリシー</a>
            {" · "}
            <a href="/about" className="hover:text-white/40 underline">このサイトについて</a>
          </p>
        </div>

        <div className="h-28" />
      </div>
      <StickyAdBanner />
    </main>
  );
}
