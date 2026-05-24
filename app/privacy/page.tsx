import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  robots: { index: false },
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link href="/ja/soccer" className="text-white/40 hover:text-white text-sm mb-6 inline-block">
          ← トップへ戻る
        </Link>

        <h1 className="text-2xl font-bold mb-8">プライバシーポリシー</h1>

        <div className="space-y-8 text-white/70 text-sm leading-relaxed">

          <section>
            <h2 className="text-white font-bold text-base mb-3">基本方針</h2>
            <p>
              japan-wc2026.com（以下「当サイト」）は、利用者のプライバシーを尊重し、個人情報の保護に努めます。
              本ポリシーは当サイトにおける個人情報の取り扱いについて説明するものです。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">広告について</h2>
            <p className="mb-3">
              当サイトでは、Google合同会社の広告配信サービス「Google AdSense」を利用しています。
              Google AdSenseは、ユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。
            </p>
            <p>
              Cookieを使用することで、Googleおよびそのパートナーは当サイトやその他のサイトへのアクセス情報に基づいて広告を配信します。
              Cookieの使用を無効にする場合は、
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-[#1a9e3f] hover:underline mx-1">
                Google広告設定ページ
              </a>
              から設定できます。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">アフィリエイトについて</h2>
            <p className="mb-3">
              当サイトは以下のアフィリエイトプログラムに参加しています。
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Amazonアソシエイト・プログラム（Amazon.co.jp）</li>
              <li>A8.net（ABEMA プレミアム 等）</li>
            </ul>
            <p className="mt-3">
              これらのリンクを経由して商品・サービスをご購入いただいた場合、当サイトに紹介料が発生することがあります。
              なお、リンク先の価格・サービス内容は当サイトが保証するものではありません。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">Cookieについて</h2>
            <p>
              当サイトでは、利便性向上およびアクセス解析のためにCookieを使用する場合があります。
              ブラウザの設定からCookieを無効にすることが可能ですが、一部機能が正常に動作しない場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">アクセス解析</h2>
            <p>
              当サイトでは、サービス改善を目的としてアクセス解析ツールを使用する場合があります。
              収集したデータは個人を特定するものではなく、統計的な情報として利用します。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">外部サービスへのリンク</h2>
            <p>
              当サイトには外部サイトへのリンクが含まれます。リンク先のプライバシーポリシーおよびコンテンツについて、当サイトは責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">免責事項</h2>
            <p>
              当サイトに掲載する試合日程・放送情報等は正確性に努めていますが、変更・誤りが生じる場合があります。
              最新情報は各公式サイトにてご確認ください。当サイトの情報利用による損害について、運営者は責任を負いかねます。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">プライバシーポリシーの変更</h2>
            <p>
              本ポリシーは必要に応じて変更する場合があります。変更後のポリシーは本ページに掲載した時点で効力を生じます。
            </p>
          </section>

          <section>
            <h2 className="text-white font-bold text-base mb-3">お問い合わせ</h2>
            <p>
              本ポリシーに関するお問い合わせは、
              <a href="mailto:harbinger0808@gmail.com" className="text-[#1a9e3f] hover:underline mx-1">
                harbinger0808@gmail.com
              </a>
              までご連絡ください。
            </p>
          </section>

          <p className="text-white/30 text-xs pt-4 border-t border-white/10">
            制定日：2026年5月19日<br />
            運営：japan-wc2026.com
          </p>
        </div>
      </div>
    </main>
  );
}
