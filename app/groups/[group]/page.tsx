import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGroup, GROUPS } from "../groupData";

export async function generateStaticParams() {
  return GROUPS.map((g) => ({ group: g.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ group: string }>;
}): Promise<Metadata> {
  const { group } = await params;
  const data = getGroup(group);
  if (!data) return {};
  const teamNames = data.teams.map((t) => t.name).join("・");
  return {
    title: `${data.label}（${teamNames}）解説 | W杯2026`,
    description: `ワールドカップ2026 ${data.label}の出場国・見どころ・突破予想。${teamNames}が激突する注目グループの完全解説。`,
  };
}

export default async function GroupPage({
  params,
}: {
  params: Promise<{ group: string }>;
}) {
  const { group } = await params;
  const data = getGroup(group);
  if (!data) notFound();

  return (
    <main className="min-h-screen bg-[#0a1628] text-white">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <Link
          href="/groups"
          className="text-white/40 hover:text-white text-sm mb-6 inline-block"
        >
          ← グループ一覧へ戻る
        </Link>

        <div className="mb-8">
          <div className="text-xs text-[#1a9e3f] font-bold uppercase tracking-widest mb-2">
            W杯2026 グループ解説
          </div>
          <h1 className="text-2xl font-bold mb-2">{data.label}</h1>
          <div className="text-white/40 text-sm">
            {data.teams.map((t) => t.name).join(" ・ ")}
          </div>
        </div>

        {/* チーム一覧 */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          {data.teams.map((team) => (
            <div
              key={team.name}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
            >
              <span className="text-3xl">{team.flag}</span>
              <div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  {team.name}
                  {team.note && (
                    <span className="text-[10px] text-[#f97316] font-bold bg-[#f97316]/10 px-1.5 py-0.5 rounded">
                      {team.note}
                    </span>
                  )}
                </div>
                <div className="text-xs text-white/30">FIFA {team.fifaRank}位</div>
              </div>
            </div>
          ))}
        </div>

        {/* ハイライト */}
        <div className="mb-6 p-3 rounded-xl bg-[#f97316]/10 border border-[#f97316]/30 text-sm text-orange-300 font-medium">
          {data.highlight}
        </div>

        {/* グループ解説 */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-white mb-3">グループ解説</h2>
          <p className="text-white/70 text-sm leading-relaxed">{data.summary}</p>
        </section>

        {/* 突破予想 */}
        <section className="mb-8 p-4 rounded-xl bg-white/5 border border-white/10">
          <h2 className="text-base font-bold text-white mb-2">🏆 突破予想</h2>
          <p className="text-white/70 text-sm">{data.prediction}</p>
        </section>

        {/* 試合を見るボタン */}
        <Link
          href="/ja/soccer"
          className="block w-full text-center bg-[#1a9e3f] hover:bg-[#15803d] text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
        >
          ⚽ {data.label}の試合日程をカレンダーに登録する
        </Link>

        {/* 他グループへのナビ */}
        <div className="mt-10">
          <h3 className="text-xs text-white/40 font-medium mb-3 uppercase tracking-widest">
            他のグループを見る
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {GROUPS.map((g) => (
              <Link
                key={g.id}
                href={`/groups/${g.id}`}
                className={`text-center py-2 px-3 rounded-lg text-sm font-bold transition-all ${
                  g.id === data.id
                    ? "bg-[#1a9e3f] text-white"
                    : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {g.label.replace("グループ", "")}
              </Link>
            ))}
          </div>
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
