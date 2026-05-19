import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import SessionProvider from "@/components/SessionProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const BASE_URL = "https://japan-wc2026.com";

const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  ...(ADSENSE_ID ? { other: { "google-adsense-account": ADSENSE_ID } } : {}),
  title: {
    default: "W杯2026 日程＆カレンダー | ワールドカップ日本時間",
    template: "%s | W杯2026 日程",
  },
  description: "ワールドカップ2026の全試合日程を日本時間で確認。Googleカレンダーに1クリックで全試合を一括登録。日本代表・グループ順位表・DAZN・NHK・ABEMA放送情報も掲載。",
  keywords: ["W杯2026", "ワールドカップ2026", "サッカー日程", "日本代表", "カレンダー登録", "グループ順位表", "DAZN", "ABEMA", "NHK", "FIFA World Cup 2026"],
  authors: [{ name: "japan-wc2026.com" }],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "⚽ W杯2026 日程＆カレンダー | 日本時間で全試合確認",
    description: "ワールドカップ2026の全試合を日本時間で表示。Googleカレンダーに1クリックで一括登録できる！日本代表の試合日程・グループ順位表も確認できます。",
    url: BASE_URL,
    siteName: "W杯2026 日程＆カレンダー",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "W杯2026 日程＆カレンダー",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "⚽ W杯2026 日程＆カレンダー",
    description: "日本代表の試合日程をGoogleカレンダーに1クリック登録！グループ順位表も確認できます。",
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
        {/* AdSense サイト確認 & 広告スクリプト */}
        <meta name="google-adsense-account" content="ca-pub-3890242142577791" />
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
