import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  title: "EA Budak Ubat | Trading Tools & Expert Advisors for MetaTrader",
  description: "Professional-grade Expert Advisors and AI-powered trading systems for MetaTrader 4 & 5. EA Budak Ubat grid martingale and GoldMind AI signal trading.",
  keywords: "EA, Expert Advisor, MetaTrader, MT4, MT5, grid trading, martingale, forex, automated trading, AI trading, XAUUSD, gold, ChatGPT",
  openGraph: {
    title: "EA Budak Ubat Trading Tools",
    description: "Professional Expert Advisors & AI Trading Systems for MetaTrader",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
