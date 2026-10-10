import { BASE_OPEN_GRAPH } from "@/lib/siteMetadata";

export const metadata = {
  metadataBase: new URL('https://eabudakubat.com'),
  title: 'Encik Moku v1.06 | Multi-Timeframe Ichimoku Cloud Trend EA',
  description: 'Ichimoku Kinko Hyo trend-following EA confirmed across 4 timeframes. Buys above the Kumo cloud, sells below. Auto-compounding, martingale recovery, and time filters. MT4 & MT5.',
  openGraph: {
    ...BASE_OPEN_GRAPH,
    title: 'Encik Moku v1.06 | Multi-Timeframe Ichimoku Cloud Trend EA',
    description: 'Ichimoku Kinko Hyo trend-following EA confirmed across 4 timeframes. Buys above the Kumo cloud, sells below. Auto-compounding, martingale recovery, and time filters. MT4 & MT5.',
    type: 'website',
  },
};

export default function EncikMokuLayout({ children }) {
  return <>{children}</>;
}
