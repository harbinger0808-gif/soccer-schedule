import { NextRequest, NextResponse } from "next/server";
import { incrVote, getVotes, addComment, getComments } from "@/lib/redis";

export const dynamic = "force-dynamic";

// GET: 現在の投票数・コメント取得
export async function GET(request: NextRequest) {
  const matchId = Number(request.nextUrl.searchParams.get("matchId"));
  if (!matchId) return NextResponse.json({ error: "matchId required" }, { status: 400 });
  const [votes, comments] = await Promise.all([getVotes(matchId), getComments(matchId)]);
  return NextResponse.json({ votes, comments });
}

// POST: 投票＋コメント送信
export async function POST(request: NextRequest) {
  const { matchId, vote, comment } = await request.json();
  if (!matchId || !vote) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await incrVote(matchId, vote);
  if (comment?.trim()) await addComment(matchId, comment.trim());
  const votes = await getVotes(matchId);
  return NextResponse.json({ votes });
}
