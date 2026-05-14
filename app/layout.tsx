import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "W杯2026 日程＆カレンダー | Soccer Schedule",
  description: "W杯2026の全試合を日本時間で確認。Googleカレンダーに1クリックで全試合を登録。DAZN・NHK・ABEMAの放送情報も掲載。",
  keywords: ["W杯2026", "サッカー", "日程", "カレンダー", "日本代表"],
  openGraph: {
    title: "W杯2026 日程＆カレンダー",
    description: "全64試合を日本時間で表示。Googleカレンダーに1クリック登録。",
    locale: "ja_JP",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  return (
    <html lang="ja" className={`${inter.variable} h-full`}>
      <head>
        {adsenseId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="min-h-full bg-[#0a1628] text-white antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
