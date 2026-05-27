import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "利用規約 | W杯2026 日程＆カレンダー",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/ja/soccer" className="text-white/40 hover:text-white text-sm mb-6 inline-block">
          ← トップへ戻る
        </Link>

        <h1 className="text-2xl font-bold mb-8">利用規約</h1>

        <div className="space-y-8 text-white/70 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-base mb-3">第1条（適用）</h2>
            <p>
              本規約は、japan-wc2026.com（以下「当サイト」）が提供するサービスの利用条件を定めるものです。
              ユーザーは本規約に同意のうえ、当サイトをご利用ください。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">第2条（サービスの内容）</h2>
            <p>
              当サイトは、FIFAワールドカップ2026の試合日程・結果・順位表等の情報を提供する無料サービスです。
              サービスの内容は予告なく変更・停止する場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">第3条（禁止事項）</h2>
            <p>ユーザーは以下の行為を行ってはなりません。</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>当サイトのコンテンツを無断で複製・転載する行為</li>
              <li>当サイトの運営を妨害する行為</li>
              <li>不正アクセス・クラッキング等の行為</li>
              <li>その他、法令または公序良俗に違反する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">第4条（免責事項）</h2>
            <p>
              当サイトに掲載する情報の正確性・完全性について保証しません。
              当サイトの利用により生じた損害について、運営者は一切の責任を負いかねます。
              試合日程・放送情報等は変更される場合があり、最新情報は各公式サイトにてご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">第5条（著作権）</h2>
            <p>
              当サイトのコンテンツに関する著作権は運営者に帰属します。
              ただし、試合データ等については各権利者に帰属します。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">第6条（規約の変更）</h2>
            <p>
              本規約は必要に応じて変更する場合があります。変更後の規約は本ページに掲載した時点で効力を生じます。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">第7条（準拠法）</h2>
            <p>本規約の解釈にあたっては日本法を準拠法とします。</p>
          </section>

          <p className="text-white/30 text-xs pt-4 border-t border-white/10">
            制定日：2026年5月19日<br />
            運営：japan-wc2026.com
          </p>

          <div className="flex gap-4 text-xs text-white/30">
            <Link href="/privacy" className="hover:text-white/60">プライバシーポリシー</Link>
            <Link href="/about" className="hover:text-white/60">サイトについて</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
