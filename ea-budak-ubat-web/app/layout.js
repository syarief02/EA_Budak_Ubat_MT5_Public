import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: new URL("https://eabudakubat.com"),
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
      <head>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2242456612962821&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>
        {children}
        <Analytics />
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
        >
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2242456612962821');
            fbq('track', 'PageView');
          `}
        </Script>
      </body>
    </html>
  );
}
