import "./globals.css";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/next";
import FacebookPixel from "@/app/components/FacebookPixel";
import FluidCanvas from "@/app/components/FluidCanvas";
import LiquidGlassEffects from "@/app/components/LiquidGlassEffects";
import CommandTerminal from "@/app/components/CommandTerminal";

export const metadata = {
  metadataBase: new URL("https://eabudakubat.com"),
  title: {
    default: "EA Budak Ubat | Trading Tools & Expert Advisors for MetaTrader",
    template: "%s | EA Budak Ubat",
  },
  description: "Professional-grade Expert Advisors and AI-powered trading systems for MetaTrader 4 & 5. EA Budak Ubat grid martingale, GoldMind AI signal trading, and 6 specialized algorithmic systems.",
  keywords: "EA, Expert Advisor, MetaTrader, MT4, MT5, grid trading, martingale, forex, automated trading, AI trading, XAUUSD, gold, ChatGPT, algorithmic trading, forex EA",
  authors: [{ name: "Syarief Azman", url: "https://github.com/syarief02" }],
  creator: "Syarief Azman",
  publisher: "EA Budak Ubat",
  openGraph: {
    title: "EA Budak Ubat | Trading Tools & Expert Advisors for MetaTrader",
    description: "Professional Expert Advisors & AI Trading Systems for MetaTrader 4 & 5",
    url: "https://eabudakubat.com",
    siteName: "EA Budak Ubat",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@SyariefAzman",
    site: "@SyariefAzman",
  },
  alternates: {
    canonical: "https://eabudakubat.com",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          id="fb-pixel"
          dangerouslySetInnerHTML={{
            __html: `
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
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2242456612962821&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "EA Budak Ubat",
              url: "https://eabudakubat.com",
              logo: "https://eabudakubat.com/icon.png",
              description: "Professional Expert Advisors & AI Trading Systems for MetaTrader 4 & 5 by Syarief Azman",
              founder: {
                "@type": "Person",
                name: "Syarief Azman",
                url: "https://github.com/syarief02",
                jobTitle: "Algorithmic Trading Engineer & Pharmaceutical Scientist",
              },
              sameAs: [
                "https://t.me/SyariefAzman",
                "https://t.me/EABudakUbat",
                "https://github.com/syarief02",
                "https://www.twitter.com/SyariefAzman",
                "https://www.mql5.com/en/users/syarief.azman/seller",
              ],
              contactPoint: {
                "@type": "ContactPoint",
                email: "support@eabudakubat.com",
                contactType: "customer support",
                url: "https://t.me/SyariefAzman",
              },
            }),
          }}
        />
      </head>
      <body>
        <FluidCanvas />
        <LiquidGlassEffects />
        <CommandTerminal />
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <div className="relative-content-wrapper">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  );
}

