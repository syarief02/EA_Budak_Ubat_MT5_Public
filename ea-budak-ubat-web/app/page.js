"use client";

import { useState } from "react";
import Link from "next/link";

import "./home.css";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import Icon from "@/app/components/Icon";
import AccountChecker from "@/app/components/AccountChecker";
import RotatingAdBanner from "@/app/components/RotatingAdBanner";
import { AUTHORIZED_ACCOUNTS_DISPLAY } from "@/lib/authorizedAccounts";
import { FEATURED_BROKERS, PARTNER_BROKERS, FREE_LICENSE_MIN_DEPOSIT } from "@/lib/partnerBrokers";
import { PRODUCT_TYPES } from "@/lib/productTypes";

// The YYYYMMDD suffix is the trial cutoff for unauthorized real accounts; swap it with the monthly expiry update.
const DOWNLOAD_MT4 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT4%20-%2020261130.ex4";
const DOWNLOAD_MT5 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.67%20-%20MT5%20-%2020261130.ex5";
const MQL5_MARKET_LINK = "https://www.mql5.com/en/market/product/195399";
const TELEGRAM_DEV = "https://t.me/SyariefAzman";

const SPEC_ROWS = [
  ["Platforms", "MT5 v1.67 · MT4 v1.62"],
  ["Reference setup", "EURUSD · M5"],
  ["Entry engines", "Candle · SMA20 · Alligator · Ichimoku"],
  ["Grid defaults", "0.01 lots · martingale ×1.3"],
  ["Filters", "H1 RSI · spread · trading hours"],
  ["Optional guards", "Break-even · drawdown · margin level"],
  ["License", "Free via partner broker, or $149 on MQL5"],
];

const STEPS = [
  {
    title: "Open a partner account",
    desc: "Register a new live MT4 or MT5 account with one of our partner brokers, using the link on this page.",
  },
  {
    title: `Deposit ${FREE_LICENSE_MIN_DEPOSIT} and send your account number`,
    desc: "Fund at least $100 USD on any account type (Cent is recommended under $1,000), then send the account number to @SyariefAzman on Telegram.",
  },
  {
    title: "Download and run",
    desc: "Once you are whitelisted, download the current build, attach it to EURUSD M5 and load a preset from the Preset Studio.",
  },
];

const FEATURES = [
  {
    icon: "layers",
    title: "Four entry engines",
    desc: "Candle momentum, SMA20 channel, Alligator and Ichimoku. Pick the model that suits the pair and market regime.",
  },
  {
    icon: "gauge",
    title: "AutoConfig from volatility",
    desc: "Optional AutoConfig sets take profit and grid spacing from the symbol's average daily range, so the grid widens in fast markets and tightens in quiet ones.",
  },
  {
    icon: "bolt",
    title: "Tick-level basket break-even",
    desc: "New in v1.67: when enabled, the basket break-even lock is checked on every tick, so intra-candle spikes are captured without waiting for the bar to close.",
  },
  {
    icon: "shield",
    title: "Configurable risk guards",
    desc: "Set a maximum spread, a drawdown limit, a minimum margin level for adding orders and an emergency margin stop-out to match your account size.",
  },
  {
    icon: "split",
    title: "Direction and session control",
    desc: "Trade both directions, buy only or sell only, with an H1 RSI filter and a server-time trading window.",
  },
  {
    icon: "code",
    title: "Native MQL, no DLLs",
    desc: "Written in pure MQL4 and MQL5 with no external libraries, for hedging and netting accounts on any MetaTrader broker.",
  },
];

const COMPANION_EAS = [
  { slug: "goldmind-ai", name: "GoldMind AI", version: "v1.01", platforms: "MT5", tagline: "ChatGPT-assisted chart analysis and trade execution for XAUUSD." },
  { slug: "bracketblitz", name: "BracketBlitz", version: "v1.00", platforms: "MT4 · MT5", tagline: "OCO buy-stop and sell-stop brackets that follow price to catch breakouts." },
  { slug: "mathedge-pro", name: "MathEdge Pro", version: "v1.1", platforms: "MT4 · MT5", tagline: "Daily level calculation and a fixed 3-order sequence for US30 and NAS100." },
  { slug: "aligator-gozaimasu", name: "Aligator Gozaimasu", version: "v1.06", platforms: "MT4 · MT5", tagline: "Bill Williams Alligator trend entries confirmed on up to four timeframes." },
  { slug: "encik-moku", name: "Encik Moku", version: "v1.06", platforms: "MT4 · MT5", tagline: "Ichimoku cloud trend entries with RSI and Stochastic confirmation." },
];

const RESOURCES = [
  { href: "/tools", icon: "wrench", title: "Trader tools", desc: "Grid simulator, .set preset studio and margin calculator." },
  { href: "/guide", icon: "book", title: "User guide", desc: "Installation, settings and troubleshooting, step by step." },
  { href: "/learn", icon: "cap", title: "Forex Quest academy", desc: "Learn forex and algorithmic trading through short quizzes." },
  { href: "/community", icon: "users", title: "Community", desc: "Feedback, ideas and EA requests from other traders." },
];

const HOME_FAQS = [
  {
    q: "Is EA Budak Ubat really free?",
    a: "Yes. The software license costs $0 when you open and fund a live MT4 or MT5 account through one of our partner broker links. Your deposit stays in your own trading account and you pay us nothing. Disclosure: our broker links are partner (IB/affiliate) links, so the broker pays us a referral commission on your trading; that commission is what funds the free license.",
  },
  {
    q: "How do I get my account whitelisted?",
    a: "Register with a partner broker using the links on this page, deposit at least $100 USD (any account type), then send your trading account number to @SyariefAzman on Telegram. Once it is added, the license checker on this page will show your account as authorized.",
  },
  {
    q: "How much capital do I need?",
    a: "The free license requires a deposit of at least $100 USD on any account type. A Cent account is recommended for balances under $1,000 USD, because it gives the grid far more room at 0.01 starting lots. Each broker's own minimum deposit is shown on its card, but the free license needs the $100.",
  },
  {
    q: "Which pair and timeframe should I run it on?",
    a: "EURUSD on M5 is the reference setup, with our pre-calibrated .set presets from the Preset Studio. If you run it on several charts, give each chart a different MagicNumber.",
  },
  {
    q: "Do I need to download a new file after I am whitelisted?",
    a: "Yes, once. The whitelist is built into the EA file, so a file you downloaded before your account was approved will still show it as unauthorized. Delete the old file, download the current MT5 or MT4 build from this page and restart MetaTrader. After that your license is permanent with no expiry; later builds are optional updates with the newest fixes.",
  },
  {
    q: "I can't switch brokers. Can I still use it?",
    a: "Yes. The standalone MT5 edition on MQL5 Market works with any MT5 broker, with no broker affiliation and no monthly expiry.",
  },
  {
    q: "Is it risk-free?",
    a: "No. EA Budak Ubat is a grid and martingale system, and margin trading can lose significant capital. Test on a demo account first, use a Cent account with conservative lot sizes, and never trade money you cannot afford to lose.",
  },
];

function SectionHead({ eyebrow, title, children, align = "center" }) {
  return (
    <div className={`hp-head hp-head-${align}`}>
      {eyebrow && <p className="hp-eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {children && <p className="hp-head-sub">{children}</p>}
    </div>
  );
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="hp">
      <SiteNav ctaHref="#broker-partners" />

      <main>
        {/* HERO */}
        <section className="hp-hero" id="flagship">
          <div className="container hp-hero-grid">
            <div className="hp-hero-copy">
              <p className="hp-eyebrow">Expert Advisor for MetaTrader 4 &amp; 5 · Since 2014</p>
              <h1>
                Automated grid trading for MetaTrader,
                <span className="hp-hero-accent"> licensed free through our partner brokers.</span>
              </h1>
              <p className="hp-lead">
                EA Budak Ubat v1.67 combines four entry engines, volatility-based auto-configuration and tick-level
                basket break-even. Open and fund a live account with a partner broker and your account is whitelisted
                permanently, with no license fee.
              </p>
              <div className="hp-actions">
                <a href="#broker-partners" className="hp-btn hp-btn-primary">
                  Get the EA free <Icon name="arrowRight" size={18} />
                </a>
                <a href="#how-to-get-free" className="hp-btn hp-btn-ghost">How it works</a>
              </div>
              <ul className="hp-checks">
                <li><Icon name="check" size={16} /> No license fee</li>
                <li><Icon name="check" size={16} /> Permanent whitelist</li>
                <li><Icon name="check" size={16} /> MT4 &amp; MT5</li>
                <li><Icon name="check" size={16} /> No DLLs</li>
              </ul>
            </div>

            <aside className="hp-spec" aria-label="EA Budak Ubat at a glance">
              <div className="hp-spec-head">
                <span>EA Budak Ubat</span>
                <span className="hp-pill">v1.67</span>
              </div>
              <dl>
                {SPEC_ROWS.map(([k, v]) => (
                  <div key={k} className="hp-spec-row">
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <p className="hp-spec-risk">
                <strong>High risk:</strong> grid and martingale strategies can lose significant capital. Test on demo
                first and trade only money you can afford to lose.
              </p>
            </aside>
          </div>

          <div className="container">
            <div className="hp-client-bar">
              <div>
                <strong>Already whitelisted?</strong>
                <span> Download the latest build, or check your account first.</span>
              </div>
              <div className="hp-client-actions">
                <a href={DOWNLOAD_MT5} className="hp-btn hp-btn-sm hp-btn-primary">
                  <Icon name="download" size={16} /> MT5 v1.67
                </a>
                <a href={DOWNLOAD_MT4} className="hp-btn hp-btn-sm hp-btn-ghost">
                  <Icon name="download" size={16} /> MT4 v1.62
                </a>
                <a href="#authorization" className="hp-btn hp-btn-sm hp-btn-ghost">
                  <Icon name="key" size={16} /> Check account
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* PROOF STRIP */}
        <section className="hp-stats" aria-label="Key numbers">
          <div className="container hp-stats-grid">
            <div><strong>{AUTHORIZED_ACCOUNTS_DISPLAY}</strong><span>Authorized accounts</span></div>
            <div><strong>2014</strong><span>First public release</span></div>
            <div><strong>{PARTNER_BROKERS.length}</strong><span>Partner brokers</span></div>
            <div><strong>6</strong><span>Expert Advisors</span></div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="hp-section" id="how-to-get-free">
          <div className="container">
            <SectionHead eyebrow="How it works" title="Get EA Budak Ubat free in three steps">
              The broker pays us a referral commission on your trading, which is what covers your license.
            </SectionHead>
            <ol className="hp-steps">
              {STEPS.map((s, i) => (
                <li key={s.title} className="hp-step">
                  <span className="hp-step-num">{i + 1}</span>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </li>
              ))}
            </ol>
            <p className="hp-note">
              Your whitelist never expires. After approval, use a build downloaded <em>after</em> your account was
              added: older files will still show it as unauthorized.
            </p>
          </div>
        </section>

        {/* BROKERS */}
        <section className="hp-section hp-section-alt" id="broker-partners">
          <div className="container">
            <SectionHead eyebrow="Partner brokers" title="Recommended brokers">
              Open your account with any partner broker to qualify. These three work best with EA Budak Ubat.
            </SectionHead>

            <div className="hp-broker-grid">
              {FEATURED_BROKERS.map((b) => (
                <article key={b.name} className="hp-card hp-broker" style={{ "--accent": b.color }}>
                  <div className="hp-broker-top">
                    <h3>{b.name}</h3>
                    <span className="hp-tag">{b.tag}</span>
                  </div>
                  <p className="hp-broker-headline">{b.headline}</p>
                  <ul className="hp-broker-features">
                    {b.features.map((f) => (
                      <li key={f}><Icon name="check" size={15} /> {f}</li>
                    ))}
                  </ul>
                  <dl className="hp-broker-meta">
                    <div><dt>Broker minimum</dt><dd>{b.minDeposit}</dd></div>
                    <div><dt>Partner code</dt><dd>{b.id}</dd></div>
                  </dl>
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className="hp-btn hp-btn-primary hp-btn-block"
                    aria-label={`Open an account with ${b.name} (opens in a new tab)`}
                  >
                    Open an account <Icon name="external" size={16} />
                  </a>
                </article>
              ))}
            </div>

            <div className="hp-promo">
              <RotatingAdBanner variant="strip" />
            </div>

            <div className="hp-center">
              <Link href="/brokers" className="hp-btn hp-btn-ghost">
                Compare all {PARTNER_BROKERS.length} partner brokers <Icon name="arrowRight" size={18} />
              </Link>
            </div>
            <p className="hp-disclosure">
              Free license: deposit at least {FREE_LICENSE_MIN_DEPOSIT} USD on any account type. Disclosure: these are
              partner (IB/affiliate) links and the broker pays us a commission based on your trading. Margin trading
              carries a high risk of loss.
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section className="hp-section" id="features">
          <div className="container">
            <SectionHead eyebrow="Inside the EA" title="Built for ranging markets, with risk controls you set">
              A dynamic grid that closes the whole basket at a combined target, with filters and guards that limit
              how far it can expand.
            </SectionHead>
            <div className="hp-feature-grid">
              {FEATURES.map((f) => (
                <div key={f.title} className="hp-feature">
                  <span className="hp-feature-icon"><Icon name={f.icon} size={22} /></span>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="hp-center hp-gap-top">
              <Link href="/ea-budak-ubat" className="hp-btn hp-btn-ghost">
                Full specification and parameters <Icon name="arrowRight" size={18} />
              </Link>
              <Link href="/changelog" className="hp-link">What&rsquo;s new in v1.67</Link>
            </div>
          </div>
        </section>

        {/* LICENSE CHECKER */}
        <section className="hp-section hp-section-alt" id="authorization">
          <div className="container hp-narrow">
            <SectionHead eyebrow="License" title="Check your account">
              Enter your MetaTrader account number to see whether it is whitelisted for EA Budak Ubat and the
              companion EAs. Authorized accounts are permanent and never expire.
            </SectionHead>
            <AccountChecker initialEa="ea-budak-ubat" compact />
          </div>
        </section>

        {/* PRODUCT SUITE */}
        <section className="hp-section" id="ecosystem">
          <div className="container">
            <SectionHead eyebrow="Product suite" title="More Expert Advisors">
              Specialised systems for gold, breakouts, US indices and trend following. Whitelisted clients can run
              them too.
            </SectionHead>
            <div className="hp-ea-grid">
              {COMPANION_EAS.map((ea) => (
                <Link key={ea.slug} href={`/${ea.slug}`} className="hp-card hp-ea">
                  <div className="hp-ea-top">
                    <h3>{ea.name}</h3>
                    <span className="hp-ea-meta">{ea.version} · {ea.platforms}</span>
                  </div>
                  <p>{ea.tagline}</p>
                  <span className="hp-ea-more">Learn more <Icon name="arrowRight" size={16} /></span>
                </Link>
              ))}
              <div className="hp-card hp-ea hp-ea-store">
                <div className="hp-ea-top">
                  <h3>Not just Expert Advisors</h3>
                  <span className="hp-ea-meta">MQL5 Market catalogue</span>
                </div>
                <p>Indicators, trade utilities and developer libraries, plus more EAs on MQL5 Market.</p>
                <ul className="hp-type-links">
                  {PRODUCT_TYPES.map((t) => (
                    <li key={t.key} style={{ "--accent": t.color }}>
                      <Link href={`/products?type=${t.key}`}>
                        <span className="hp-dot" aria-hidden="true" /> {t.plural}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="hp-card hp-standalone">
              <div>
                <p className="hp-eyebrow">Can&rsquo;t switch brokers?</p>
                <h3>Standalone MT5 edition on MQL5 Market</h3>
                <p>
                  Works with any MT5 broker, prop firm or existing account. No broker affiliation and no monthly
                  expiry, with 20 activations and automatic updates through MetaTrader.
                </p>
              </div>
              <a href={MQL5_MARKET_LINK} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn-ghost">
                <Icon name="store" size={18} /> $149 lifetime or rent from $30/month
              </a>
            </div>
          </div>
        </section>

        {/* RESOURCES */}
        <section className="hp-section hp-section-alt hp-section-tight" aria-labelledby="resources-title">
          <div className="container">
            <SectionHead eyebrow="Resources" title="Plan, learn and get support" />
            <div className="hp-resource-grid">
              {RESOURCES.map((r) => (
                <Link key={r.href} href={r.href} className="hp-card hp-resource">
                  <span className="hp-feature-icon"><Icon name={r.icon} size={20} /></span>
                  <div>
                    <h3>{r.title}</h3>
                    <p>{r.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="hp-section" id="about">
          <div className="container hp-about">
            <div>
              <p className="hp-eyebrow">The developer</p>
              <h2>Built by Syarief Azman</h2>
              <p>
                Syarief comes from analytical chemistry and laboratory quality control, and brought that discipline
                to MQL development. He released EA Budak Ubat v1.27 on MT4 in 2014 and has maintained it ever since, through
                the v1.51 forum era, the pure-MQL5 rewrite for MQL5 Market in 2023 and today&rsquo;s v1.67.
              </p>
              <p>
                In practice that means calibrating parameters, validating them against data, and stating the risks
                plainly.
              </p>
              <div className="hp-actions hp-actions-left">
                <Link href="/about" className="hp-btn hp-btn-ghost">
                  Read the full story <Icon name="arrowRight" size={18} />
                </Link>
                <a href={TELEGRAM_DEV} target="_blank" rel="noopener noreferrer" className="hp-link">
                  Message @SyariefAzman
                </a>
              </div>
            </div>
            <ul className="hp-about-facts">
              <li><span>Based in</span><strong>Selangor, Malaysia</strong></li>
              <li><span>Publishing since</span><strong>2014 (v1.27, MT4)</strong></li>
              <li><span>Marketplace</span><strong>Official MQL5 Market seller</strong></li>
              <li><span>Code</span><strong>Pure native MQL4 / MQL5</strong></li>
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="hp-section hp-section-alt" id="faq">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: HOME_FAQS.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
          <div className="container hp-narrow">
            <SectionHead eyebrow="FAQ" title="Frequently asked questions" />
            <div className="faq-list">
              {HOME_FAQS.map((faq, i) => (
                <div key={faq.q} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                  <button
                    type="button"
                    className="faq-question"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <span className="faq-chevron">▼</span>
                  </button>
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="hp-section hp-section-tight">
          <div className="container">
            <div className="hp-cta">
              <div>
                <h2>Start on demo. Go live when you are ready.</h2>
                <p>Questions about setup, brokers or your license? Ask the developer directly on Telegram.</p>
              </div>
              <div className="hp-actions">
                <a href="#broker-partners" className="hp-btn hp-btn-primary">
                  Get the EA free <Icon name="arrowRight" size={18} />
                </a>
                <a href={TELEGRAM_DEV} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn-ghost">
                  <Icon name="message" size={18} /> Telegram
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
