import { BASE_OPEN_GRAPH } from "@/lib/siteMetadata";

export const metadata = {
  metadataBase: new URL('https://eabudakubat.com'),
  title: 'GoldMind AI v1.01 | AI-Powered XAUUSD Gold Trading System for MetaTrader 5',
  description: 'AI trading system using OpenAI GPT to analyze gold (XAUUSD) charts and auto-place trades in MT5. 6 safety filters, smart lot sizing, and local FastAPI processing. Open source.',
  openGraph: {
    ...BASE_OPEN_GRAPH,
    title: 'GoldMind AI v1.01 | AI-Powered XAUUSD Gold Trading System for MetaTrader 5',
    description: 'AI trading system using OpenAI GPT to analyze gold (XAUUSD) charts and auto-place trades in MT5. 6 safety filters, smart lot sizing, and local FastAPI processing. Open source.',
    type: 'website',
  },
};

export default function GoldmindAILayout({ children }) {
  return <>{children}</>;
}
