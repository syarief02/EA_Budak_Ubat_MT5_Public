export const metadata = {
  metadataBase: new URL('https://eabudakubat.com'),
  title: 'BracketBlitz EA | OCO Bracket Breakout Strategy for News Trading',
  description: 'Rapid-fire OCO bracket orders straddling the market price — Buy Stop + Sell Stop auto-refreshed every 30 seconds. Catch breakouts without predicting direction. MT4 & MT5.',
  openGraph: {
    title: 'BracketBlitz EA | OCO Bracket Breakout Strategy for News Trading',
    description: 'Rapid-fire OCO bracket orders straddling the market price — Buy Stop + Sell Stop auto-refreshed every 30 seconds. Catch breakouts without predicting direction. MT4 & MT5.',
    type: 'website',
  },
};

export default function BracketBlitzLayout({ children }) {
  return <>{children}</>;
}
