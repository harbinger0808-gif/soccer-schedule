import type { Metadata } from "next";
import Link from "next/link";
import IMobileAd from "@/components/IMobileAd";
import StickyAdBanner from "@/components/StickyAdBanner";
import KnockoutBracket from "@/components/KnockoutBracket";
import ElGolazoFeature from "@/components/ElGolazoFeature";

const DAZN_URL =
  process.env.NEXT_PUBLIC_DAZN_AFFILIATE_URL ?? "https://www.dazn.com/ja-JP/welcome";
const ABEMA_URL =
  process.env.NEXT_PUBLIC_ABEMA_AFFILIATE_URL ?? "https://abema.tv/";

const TITLE =
  "ワールドカップ2026 決勝トーナメントの仕組み｜進出条件・組み合わせを図解";
const DESCRIPTION =
  "FIFAワールドカップ2026（北中米大会）の決勝トーナメントの仕組みを図解で解説。48カ国・12組のグループリーグから何チームが進出するのか、ラウンド32からの勝ち上がり、3位通過のルール、延長・PKの規定、放送・配信で見る方法までまとめました。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://japan-wc2026.com/ja/soccer/knockout" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://japan-wc2026.com/ja/soccer/knockout",
    type: "article",
  },
};

const FAQ = [
  {
    q: "ワールドカップ2026は何チームが決勝トーナメントに進みますか？",
    a: "48カ国が12組に分かれてグループリーグを戦い、各組の上位2チーム（24チーム）と、各組3位のうち成績上位8チームを加えた合計32チームが決勝トーナメント（ラウンド32）に進出します。",
  },
  {
    q: "グループ3位でも決勝トーナメントに進めますか？",
    a: "進めます。12組ある3位チームのうち、勝ち点・得失点差などの成績が上位の8チームがワイルドカードとしてラウンド32に進出します。",
  },
  {
    q: "決勝トーナメントは何試合ありますか？",
    a: "ラウンド32（16試合）、ラウンド16（8試合）、準々決勝（4試合）、準決勝（2試合）、3位決定戦（1試合）、決勝（1試合）の合計32試合です。グループリーグ72試合と合わせ、大会全体では104試合になります。",
  },
  {
    q: "決勝トーナメントで引き分けたらどうなりますか？",
    a: "ノックアウト方式のため引き分けはありません。90分で決着がつかない場合は前後半15分ずつの延長戦、それでも決まらなければPK戦で勝者を決めます。",
  },
  {
    q: "ワールドカップ2026の決勝はいつ・どこで行われますか？",
    a: "決勝は2026年7月19日、アメリカ・ニュージャージー州のメットライフ・スタジアムで開催される予定です。開幕は6月11日、開催国はアメリカ・カナダ・メキシコの3カ国です。",
  },
];

const ROUNDS = [
  { round: "ラウンド32", teams: "32チーム", matches: "16試合", note: "決勝トーナメント1回戦" },
  { round: "ラウンド16", teams: "16チーム", matches: "8試合", note: "ベスト16" },
  { round: "準々決勝", teams: "8チーム", matches: "4試合", note: "ベスト8" },
  { round: "準決勝", teams: "4チーム", matches: "2試合", note: "ベスト4" },
  { round: "3位決定戦", teams: "2チーム", matches: "1試合", note: "準決勝敗者同士" },
  { round: "決勝", teams: "2チーム", matches: "1試合", note: "頂点を決める一戦" },
];

export default function KnockoutPage() {
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
          ワールドカップ2026<br />
          決勝トーナメントの仕組み
        </h1>
        <p className="text-white/50 text-sm mb-8">
          48カ国に拡大した北中米大会。グループリーグの進出条件から、ラウンド32の勝ち上がり、延長・PKのルールまで図解でわかりやすく解説します。
        </p>

        {/* 視聴CTA（上部） */}
        <div className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-4 mb-10">
          <div className="text-sm font-bold text-yellow-300 mb-1">📺 決勝トーナメントを見逃さない</div>
          <p className="text-xs text-white/60 mb-3">
            負ければ終わりの一発勝負。深夜・早朝キックオフが多いので、配信で確実にチェックを。
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={DAZN_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-1 min-w-[120px] text-center rounded-xl bg-yellow-400 hover:bg-yellow-300 transition-colors px-3 py-2 text-sm font-extrabold text-black"
            >
              DAZNで見る →
            </a>
            <a
              href={ABEMA_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex-1 min-w-[120px] text-center rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 transition-colors px-3 py-2 text-sm font-bold text-white"
            >
              ABEMAで見る →
            </a>
          </div>
        </div>

        <ElGolazoFeature className="mb-10" />

        <div className="space-y-10 text-white/70 text-sm leading-relaxed">
          <section>
            <h2 className="text-white font-bold text-base mb-3">
              2026年大会の最大の変更点：出場48カ国
            </h2>
            <p>
              FIFAワールドカップ2026は、出場国が従来の32カ国から
              <strong className="text-white">48カ国</strong>へと大幅に拡大した初の大会です。
              アメリカ・カナダ・メキシコの3カ国共催で、2026年6月11日に開幕し、
              7月19日の決勝まで全<strong className="text-white">104試合</strong>が行われます。
            </p>
            <p className="mt-3">
              出場国が増えたことで大会方式も変わり、グループリーグの後に
              <strong className="text-white">「ラウンド32（決勝トーナメント1回戦）」</strong>が新設されました。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">
              グループリーグ：12組×4チーム
            </h2>
            <p>
              48カ国は<strong className="text-white">12のグループ（A〜L）</strong>に分かれ、
              各組4チームによる総当たり戦（1チーム3試合）を行います。
              グループリーグは合計72試合です。
            </p>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-white font-bold text-sm mb-2">✅ 決勝トーナメント進出の条件</div>
              <ul className="space-y-1.5">
                <li>・各組<strong className="text-white">1位・2位</strong>の24チーム → 自動的に進出</li>
                <li>・各組<strong className="text-white">3位</strong>のうち、成績上位<strong className="text-white">8チーム</strong> → ワイルドカードで進出</li>
                <li className="text-white/90 pt-1">＝ 合計 <strong className="text-yellow-300">32チーム</strong> がラウンド32へ</li>
              </ul>
              <p className="text-xs text-white/40 mt-3">
                3位チームの順位は、勝ち点 → 得失点差 → 総得点 などの順で比較されます。つまり3位でも、内容次第で勝ち上がれるのがポイントです。
              </p>
            </div>
          </section>

          {/* 記事中広告 */}
          <div>
            <p className="text-[10px] text-white/20 mb-1">広告</p>
            <IMobileAd />
          </div>

          <section>
            <h2 className="text-white font-bold text-base mb-3">
              決勝トーナメントの勝ち上がり（32チーム→優勝）
            </h2>
            <p className="mb-4">
              ラウンド32からは<strong className="text-white">ノックアウト方式（負けたら敗退）</strong>。
              32チームが下記のように勝ち上がり、頂点を目指します。
            </p>
            <div className="overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-white/10 text-white/70">
                    <th className="text-left px-3 py-2 font-semibold">ラウンド</th>
                    <th className="text-left px-3 py-2 font-semibold">チーム数</th>
                    <th className="text-left px-3 py-2 font-semibold">試合数</th>
                    <th className="text-left px-3 py-2 font-semibold">備考</th>
                  </tr>
                </thead>
                <tbody>
                  {ROUNDS.map((r, i) => (
                    <tr
                      key={r.round}
                      className={i % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent"}
                    >
                      <td className="px-3 py-2 font-bold text-white">{r.round}</td>
                      <td className="px-3 py-2">{r.teams}</td>
                      <td className="px-3 py-2">{r.matches}</td>
                      <td className="px-3 py-2 text-white/50">{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-white/40 mt-3">
              決勝トーナメントは合計32試合。グループリーグ72試合と合わせて、大会全体で104試合になります。
            </p>
          </section>

          {/* 決勝トーナメント試合表（実データ） */}
          <section>
            <h2 className="text-white font-bold text-base mb-1">
              決勝トーナメント 試合表・日程
            </h2>
            <p className="text-white/50 text-xs mb-4">
              ラウンド32から決勝までの日程・会場（日本時間）。気になる試合はそのままGoogleカレンダーに追加できます。
            </p>
            <KnockoutBracket />
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">
              引き分けたらどうなる？延長・PKのルール
            </h2>
            <p>
              決勝トーナメントには引き分けがありません。90分で決着がつかない場合は、
              次の順で勝者を決めます。
            </p>
            <ol className="list-decimal list-inside mt-3 space-y-1.5">
              <li><strong className="text-white">延長戦</strong>：前後半15分ずつ（計30分）</li>
              <li><strong className="text-white">PK戦</strong>：延長でも決まらなければ実施</li>
            </ol>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">
              開幕・決勝の日程と開催地
            </h2>
            <ul className="space-y-1.5">
              <li>・<strong className="text-white">開幕</strong>：2026年6月11日</li>
              <li>・<strong className="text-white">決勝</strong>：2026年7月19日（アメリカ・ニュージャージー州 メットライフ・スタジアム）</li>
              <li>・<strong className="text-white">開催国</strong>：アメリカ・カナダ・メキシコの3カ国共催</li>
            </ul>
            <p className="text-xs text-white/40 mt-3">
              ※ 日程・会場はFIFAの発表に基づきますが、最新情報は公式サイトでご確認ください。
            </p>
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

          {/* 視聴CTA（下部） */}
          <section className="rounded-2xl border border-yellow-400/30 bg-yellow-400/10 p-5">
            <div className="text-base font-bold text-yellow-300 mb-1">⚽ 決勝トーナメントを楽しもう</div>
            <p className="text-xs text-white/60 mb-4">
              一発勝負のドラマは見逃せない。配信に登録して、日程はカレンダーに入れて準備万端に。
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <a
                href={DAZN_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex-1 min-w-[120px] text-center rounded-xl bg-yellow-400 hover:bg-yellow-300 transition-colors px-3 py-2.5 text-sm font-extrabold text-black"
              >
                DAZNで全試合 →
              </a>
              <a
                href={ABEMA_URL}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex-1 min-w-[120px] text-center rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 transition-colors px-3 py-2.5 text-sm font-bold text-white"
              >
                ABEMAで見る →
              </a>
            </div>
            <Link
              href="/ja/soccer/schedule"
              className="block text-center rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors px-3 py-2.5 text-sm font-bold text-white"
            >
              📅 全試合日程をカレンダーに追加する →
            </Link>
          </section>

          <nav className="pt-4 border-t border-white/10">
            <div className="text-xs text-white/40 mb-2">関連ページ</div>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/ja/soccer" className="text-blue-300 hover:underline">→ W杯2026 トップ（応援国を選んで日程を確認）</Link>
              <Link href="/ja/soccer/schedule" className="text-blue-300 hover:underline">→ 全試合日程＆Googleカレンダー登録</Link>
              <Link href="/groups" className="text-blue-300 hover:underline">→ グループ組み合わせ一覧</Link>
            </div>
          </nav>

          <p className="text-xs text-white/20">
            ※ 一部リンクはアフィリエイト広告を含みます ·{" "}
            <a href="/privacy" className="hover:text-white/40 underline">プライバシーポリシー</a>
            {" · "}
            <a href="/about" className="hover:text-white/40 underline">このサイトについて</a>
          </p>
        </div>

        {/* アンカー広告で隠れないための余白 */}
        <div className="h-28" />
      </div>
      <StickyAdBanner />
    </main>
  );
}
