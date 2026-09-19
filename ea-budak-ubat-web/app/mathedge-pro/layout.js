export const metadata = {
  metadataBase: new URL('https://eabudakubat.com'),
  title: 'MathEdge Pro v1.1 | Math-Based US Index Trading for US30 & NAS100',
  description: 'Automated math-based index trading EA for MetaTrader. Calculates daily OHLC levels, determines directional bias, and executes a strict 3-trade pending order sequence during NY session.',
  openGraph: {
    title: 'MathEdge Pro v1.1 | Math-Based US Index Trading for US30 & NAS100',
    description: 'Automated math-based index trading EA for MetaTrader. Calculates daily OHLC levels, determines directional bias, and executes a strict 3-trade pending order sequence during NY session.',
    type: 'website',
  },
};

export default function MathEdgeProLayout({ children }) {
  return <>{children}</>;
}
