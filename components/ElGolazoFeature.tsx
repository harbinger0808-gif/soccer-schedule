// エル・ゴラッソ 2026北中米W杯 48カ国選手名鑑（ベストセラー1位）の特集枠
// 全ページ共通で優先表示するアフィリエイト枠

const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG ?? "syunchan0529-22";
const ELGOLAZO_ASIN = "B0GY68MZ85";
const ELGOLAZO_URL = `https://www.amazon.co.jp/dp/${ELGOLAZO_ASIN}?tag=${AMAZON_TAG}`;

export default function ElGolazoFeature({ className = "" }: { className?: string }) {
  return (
    <a
      href={ELGOLAZO_URL}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`flex items-center gap-4 p-4 rounded-2xl border border-yellow-400/30 bg-gradient-to-r from-yellow-400/15 to-transparent hover:from-yellow-400/25 transition-all ${className}`}
    >
      <div className="flex-shrink-0 text-3xl">📕</div>
      <div className="min-w-0 flex-1">
        <div className="text-[10px] font-bold text-yellow-300 tracking-widest mb-0.5">
          ベストセラー1位 · PR
        </div>
        <div className="text-sm font-extrabold text-white leading-tight">
          2026 北中米W杯 48カ国選手名鑑（エル・ゴラッソ特別編集）
        </div>
        <div className="text-xs text-white/50 mt-0.5">
          出場48カ国の候補選手1,542人を掲載。各国の戦力・注目選手がこれ一冊でまるわかり
        </div>
      </div>
      <div className="flex-shrink-0 text-xs font-bold text-black bg-yellow-400 rounded-full px-3 py-1.5">
        Amazon →
      </div>
    </a>
  );
}
