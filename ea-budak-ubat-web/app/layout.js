import "./globals.css";

export const metadata = {
  title: "EA Budak Ubat v1.62 | Grid Martingale Expert Advisor for MT4 & MT5",
  description: "A powerful grid-based martingale Expert Advisor for MetaTrader 4 & MetaTrader 5. Features 4 analysis methods, AutoConfig AI, hedging support, and more. Free to download.",
  keywords: "EA, Expert Advisor, MetaTrader, MT4, MT5, grid trading, martingale, forex, automated trading",
  openGraph: {
    title: "EA Budak Ubat v1.62",
    description: "Grid Martingale Expert Advisor for MT4 & MT5",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
