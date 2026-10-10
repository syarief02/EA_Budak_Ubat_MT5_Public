import { BASE_OPEN_GRAPH } from "@/lib/siteMetadata";

export const metadata = {
  metadataBase: new URL('https://eabudakubat.com'),
  title: 'Aligator Gozaimasu v1.06 | Multi-Timeframe Bill Williams Trend EA',
  description: 'Trend-following EA using Bill Williams Alligator, Awesome Oscillator, RSI, and Stochastic confirmed across 4 timeframes. Includes auto-compounding and martingale recovery. MT4 & MT5.',
  openGraph: {
    ...BASE_OPEN_GRAPH,
    title: 'Aligator Gozaimasu v1.06 | Multi-Timeframe Bill Williams Trend EA',
    description: 'Trend-following EA using Bill Williams Alligator, Awesome Oscillator, RSI, and Stochastic confirmed across 4 timeframes. Includes auto-compounding and martingale recovery. MT4 & MT5.',
    type: 'website',
  },
};

export default function AligatorGozaimasuLayout({ children }) {
  return <>{children}</>;
}
