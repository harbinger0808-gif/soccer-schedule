import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "W杯2026 日程＆カレンダー";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a1628 0%, #0d2040 50%, #0a1628 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* 背景の装飾 */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(26, 158, 63, 0.15)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            left: -80,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(26, 158, 63, 0.1)",
          }}
        />

        {/* メインコンテンツ */}
        <div style={{ fontSize: 80, marginBottom: 20 }}>⚽</div>
        <div
          style={{
            fontSize: 56,
            fontWeight: "bold",
            color: "#ffffff",
            textAlign: "center",
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          W杯2026 日程＆カレンダー
        </div>
        <div
          style={{
            fontSize: 28,
            color: "rgba(255,255,255,0.6)",
            textAlign: "center",
            marginBottom: 40,
          }}
        >
          日本時間で全試合確認 · Googleカレンダーに1クリック登録
        </div>

        {/* バッジ */}
        <div style={{ display: "flex", gap: 16 }}>
          {["🇯🇵 日本代表", "📅 カレンダー登録", "🏆 順位表"].map((text) => (
            <div
              key={text}
              style={{
                background: "rgba(26, 158, 63, 0.3)",
                border: "1px solid rgba(26, 158, 63, 0.5)",
                borderRadius: 50,
                padding: "10px 24px",
                color: "#4ade80",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              {text}
            </div>
          ))}
        </div>

        {/* ドメイン */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            color: "rgba(255,255,255,0.3)",
            fontSize: 20,
          }}
        >
          japan-wc2026.com
        </div>
      </div>
    ),
    { ...size }
  );
}
