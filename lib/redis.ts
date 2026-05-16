const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL!;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!;

async function redis(command: string) {
  const res = await fetch(`${REDIS_URL}/${command}`, {
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    cache: "no-store",
  });
  const data = await res.json();
  return data.result;
}

export async function incrVote(matchId: number, vote: "home" | "draw" | "away") {
  return redis(`incr/predict:${matchId}:${vote}`);
}

export async function getVotes(matchId: number) {
  const [home, draw, away] = await Promise.all([
    redis(`get/predict:${matchId}:home`),
    redis(`get/predict:${matchId}:draw`),
    redis(`get/predict:${matchId}:away`),
  ]);
  return {
    home: Number(home ?? 0),
    draw: Number(draw ?? 0),
    away: Number(away ?? 0),
  };
}

export async function addComment(matchId: number, comment: string) {
  const encoded = encodeURIComponent(comment.slice(0, 40));
  return redis(`lpush/comments:${matchId}/${encoded}`);
}

export async function getComments(matchId: number): Promise<string[]> {
  const result = await redis(`lrange/comments:${matchId}/0/9`);
  return (result ?? []).map((c: string) => decodeURIComponent(c));
}
