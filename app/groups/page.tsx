import type { Metadata } from "next";
import Link from "next/link";
import { GROUPS } from "./groupData";

export const metadata: Metadata = {
  title: "グループ別解説 | W杯2026 日程＆カレンダー",
  description: "FIFAワールドカップ2026 グループA〜Lの全12グループを徹底解説。出場国・注目選手・突破予想をまとめました。",
};

export default function GroupsPage() {
  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link
          href="/ja/soccer"
          className="text-white/40 hover:text-white text-sm mb-6 inline-block"
        >
          ← トップへ戻る
        </Link>

        <div className="mb-8">
          <div className="text-xs text-[#1a9e3f] font-bold uppercase tracking-widest mb-2">
            W杯2026 グループ解説
          </div>
          <h1 className="text-2xl font-bold mb-2">グループ別 徹底解説</h1>
          <p className="text-white/50 text-sm">
            全12グループ48チームの見どころ・突破予想をまとめました
          </p>
        </div>

        <div className="space-y-3">
          {GROUPS.map((group) => (
            <Link
              key={group.id}
              href={`/groups/${group.id}`}
              className="block p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white mb-1">
                    {group.label}
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {group.teams.map((team) => (
                      <span key={team.name} className="text-xs text-white/50 flex items-center gap-1">
                        <span>{team.flag}</span>
                        <span>{team.name}</span>
                        {team.note && (
                          <span className="text-[#f97316] text-[10px]">({team.note})</span>
                        )}
                      </span>
                    ))}
                  </div>
                  <div className="text-[11px] text-orange-300/70">{group.highlight}</div>
                </div>
                <div className="text-white/20 group-hover:text-white/60 text-lg flex-shrink-0">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 試合を見るボタン */}
        <div className="mt-8">
          <Link
            href="/ja/soccer"
            className="block w-full text-center bg-[#1a9e3f] hover:bg-[#15803d] text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
          >
            ⚽ 試合日程をカレンダーに登録する
          </Link>
        </div>

        {/* フッター */}
        <div className="flex gap-4 justify-center pt-8 pb-2 text-xs text-white/20">
          <Link href="/about" className="hover:text-white/40">このサイトについて</Link>
          <Link href="/privacy" className="hover:text-white/40">プライバシーポリシー</Link>
          <Link href="/terms" className="hover:text-white/40">利用規約</Link>
        </div>
      </div>
    </main>
  );
}
