"use client";

import { useState, useEffect } from "react";

interface Votes {
  home: number;
  draw: number;
  away: number;
}

interface MatchPredictProps {
  matchId: number;
  homeTeam: string;
  awayTeam: string;
  status: string;
}

export default function MatchPredict({ matchId, homeTeam, awayTeam, status }: MatchPredictProps) {
  const [votes, setVotes] = useState<Votes>({ home: 0, draw: 0, away: 0 });
  const [comments, setComments] = useState<string[]>([]);
  const [voted, setVoted] = useState(false);
  const [selectedVote, setSelectedVote] = useState<"home" | "draw" | "away" | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const isFinished = status === "FINISHED";

  useEffect(() => {
    const stored = localStorage.getItem(`voted:${matchId}`);
    if (stored) setVoted(true);

    fetch(`/api/predict?matchId=${matchId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.votes) setVotes(data.votes);
        if (data.comments) setComments(data.comments);
      })
      .catch(() => {});
  }, [matchId]);

  const total = votes.home + votes.draw + votes.away;

  function pct(n: number) {
    if (total === 0) return 0;
    return Math.round((n / total) * 100);
  }

  async function handleSubmit() {
    if (!selectedVote && !isFinished) return;
    setLoading(true);
    try {
      const body: { matchId: number; vote?: string; comment?: string } = { matchId };
      if (selectedVote) body.vote = selectedVote;
      if (comment.trim()) body.comment = comment.trim();

      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.votes) setVotes(data.votes);
      // refresh comments
      const refreshed = await fetch(`/api/predict?matchId=${matchId}`);
      const refreshedData = await refreshed.json();
      if (refreshedData.comments) setComments(refreshedData.comments);

      localStorage.setItem(`voted:${matchId}`, "1");
      setVoted(true);
    } catch {
      // silently ignore
    } finally {
      setLoading(false);
    }
  }

  if (!isFinished && !voted) {
    // 未投票状態
    return (
      <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-sm font-semibold text-white/80 mb-3">勝敗予想</p>
        <div className="flex gap-2 mb-3 flex-wrap">
          {(["home", "draw", "away"] as const).map((v) => {
            const label = v === "home" ? `${homeTeam}の勝ち` : v === "draw" ? "引き分け" : `${awayTeam}の勝ち`;
            const isSelected = selectedVote === v;
            return (
              <button
                key={v}
                onClick={() => setSelectedVote(v)}
                className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                  isSelected
                    ? v === "home"
                      ? "bg-green-500/30 border-green-500/60 text-green-300"
                      : v === "draw"
                      ? "bg-gray-500/30 border-gray-400/60 text-gray-200"
                      : "bg-blue-500/30 border-blue-500/60 text-blue-300"
                    : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={40}
          placeholder="一言コメント（任意・40文字以内）"
          className="w-full text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/30 mb-3"
        />
        <button
          onClick={handleSubmit}
          disabled={!selectedVote || loading}
          className="text-xs bg-[#1a9e3f]/80 hover:bg-[#1a9e3f] disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-1.5 rounded-lg transition-colors font-medium"
        >
          {loading ? "送信中..." : "予想する"}
        </button>
      </div>
    );
  }

  // 投票済み or 試合終了：結果表示
  return (
    <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-white/80">
          {isFinished ? "勝敗予想（投票終了）" : "勝敗予想（投票済み）"}
        </p>
        {total > 0 && (
          <span className="text-xs text-white/40">{total}人が予想中</span>
        )}
      </div>

      <div className="space-y-2 mb-4">
        {(
          [
            { key: "home", label: `${homeTeam}の勝ち`, color: "bg-green-500", trackColor: "bg-green-500/20" },
            { key: "draw", label: "引き分け", color: "bg-gray-400", trackColor: "bg-gray-400/20" },
            { key: "away", label: `${awayTeam}の勝ち`, color: "bg-blue-500", trackColor: "bg-blue-500/20" },
          ] as const
        ).map(({ key, label, color, trackColor }) => {
          const p = pct(votes[key]);
          return (
            <div key={key}>
              <div className="flex justify-between text-xs text-white/60 mb-1">
                <span>{label}</span>
                <span>{p}%</span>
              </div>
              <div className={`w-full h-2 rounded-full ${trackColor}`}>
                <div
                  className={`h-2 rounded-full ${color} transition-all duration-700`}
                  style={{ width: `${p}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* コメント一覧 */}
      {comments.length > 0 && (
        <div className="space-y-1">
          <p className="text-xs text-white/40 mb-1">みんなのコメント</p>
          {comments.map((c, i) => (
            <p key={i} className="text-xs text-white/70 border-l-2 border-white/10 pl-2">
              {c}
            </p>
          ))}
        </div>
      )}

      {/* 試合終了でない場合：コメントのみ追記可能 */}
      {!isFinished && voted && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={40}
            placeholder="一言コメント（任意・40文字以内）"
            className="w-full text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-white/30 focus:outline-none focus:border-white/30 mb-2"
          />
          <button
            onClick={async () => {
              if (!comment.trim()) return;
              setLoading(true);
              try {
                await fetch("/api/predict", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ matchId, vote: "home", comment: comment.trim() }),
                });
                const refreshed = await fetch(`/api/predict?matchId=${matchId}`);
                const data = await refreshed.json();
                if (data.comments) setComments(data.comments);
                setComment("");
              } catch {
                // silently ignore
              } finally {
                setLoading(false);
              }
            }}
            disabled={!comment.trim() || loading}
            className="text-xs bg-white/10 hover:bg-white/20 disabled:opacity-40 disabled:cursor-not-allowed text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            {loading ? "送信中..." : "コメントを追加"}
          </button>
        </div>
      )}
    </div>
  );
}
