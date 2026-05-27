import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "このサイトについて | W杯2026 日程＆カレンダー",
  description: "japan-wc2026.comはワールドカップ2026の全試合を日本時間で確認できる個人開発サイトです。",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/ja/soccer" className="text-white/40 hover:text-white text-sm mb-6 inline-block">
          ← トップへ戻る
        </Link>

        <h1 className="text-2xl font-bold mb-8">このサイトについて</h1>

        <div className="space-y-8 text-white/70 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-base mb-3">サイト概要</h2>
            <p>
              「W杯2026 日程＆カレンダー」は、FIFAワールドカップ2026の全104試合の日程を
              日本時間でわかりやすく確認できる無料サービスです。
            </p>
            <p className="mt-3">
              応援したい国を選ぶだけで試合日程を絞り込め、気になる試合をGoogleカレンダーに
              1クリックで登録できます。深夜・早朝キックオフの多いW杯で、試合を見逃さないための
              ツールとして作りました。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">主な機能</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>全104試合の日程を日本時間で表示</li>
              <li>出場48カ国から応援国を複数選択して絞り込み</li>
              <li>Googleカレンダーへの1クリック一括登録</li>
              <li>iCalendar（.ics）形式でのダウンロード（iPhone・Outlook対応）</li>
              <li>グループステージ順位表のリアルタイム表示</li>
              <li>DAZN・NHK・ABEMA等の放送局情報</li>
              <li>勝敗予想投票機能</li>
              <li>注目選手・FIFA世界ランキング情報</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">制作者について</h2>
            <p>
              サッカーが好きすぎてW杯の試合を見逃すのが怖くて作った、個人開発者のサイトです。
              日本代表はもちろん、世界中のサッカーファンに使ってもらえるツールを目指して開発しています。
            </p>
            <p className="mt-3">
              X（Twitter）：
              <a href="https://x.com/ThQfsxqP3ZwcyKK" target="_blank" rel="noopener noreferrer" className="text-[#1a9e3f] hover:underline ml-1">
                @code_de_meshikuu
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">データについて</h2>
            <p>
              試合日程・スコア・順位表データはfootball-data.org APIを利用しています。
              情報は定期的に更新されますが、最新情報はFIFA公式サイトにてご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">お問い合わせ</h2>
            <p>
              ご意見・ご要望は
              <a href="mailto:harbinger0808@gmail.com" className="text-[#1a9e3f] hover:underline mx-1">
                harbinger0808@gmail.com
              </a>
              または X（@code_de_meshikuu）のDMにてお気軽にどうぞ。
            </p>
          </section>

          <div className="flex gap-4 pt-4 border-t border-white/10 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-white/60">プライバシーポリシー</Link>
            <Link href="/terms" className="hover:text-white/60">利用規約</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
