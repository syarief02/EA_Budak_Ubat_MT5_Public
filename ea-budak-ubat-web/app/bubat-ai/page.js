import Link from "next/link";

export const metadata = {
  metadataBase: new URL("https://eabudakubat.com"),
  title: "Bubat AI | Local AI Forex Trading Agent for MetaTrader 5 (User Guide)",
  description:
    "Everything about Bubat AI: how it trades, its 16 safety walls, requirements, installation, the free 7-day trial, daily use, updates, privacy and troubleshooting.",
  alternates: { canonical: "/bubat-ai" },
  openGraph: {
    title: "Bubat AI | Local AI Forex Trading Agent for MetaTrader 5",
    description: "A forex trading agent that runs on your own PC with a local AI model. Free 7-day trial.",
    type: "website",
  },
};

const DOWNLOAD = "https://github.com/syarief02/bubat-ai-releases/releases/latest";
const EMAIL = "support@eabudakubat.com";

const TOC = [
  ["what", "What Bubat AI is"],
  ["results", "Honest results so far"],
  ["how", "How it trades"],
  ["safety", "The 16 safety walls"],
  ["requirements", "What you need"],
  ["install", "Install, step by step"],
  ["models", "Which AI your PC gets"],
  ["license", "Free trial and license"],
  ["using", "Using the app"],
  ["running", "Keeping it running"],
  ["updates", "Updates"],
  ["privacy", "Your data"],
  ["troubleshooting", "Troubleshooting"],
  ["uninstall", "Uninstalling"],
  ["faq", "FAQ"],
];

const WALLS = [
  ["License", "No new trades without a valid free trial or license. Trades already open are still managed."],
  ["Entry window", "Optional trading hours. Off by default (all sessions trade)."],
  ["Confidence cap", "Signals the AI is \"too sure\" about (above 0.89) are refused: in testing they did worse, not better."],
  ["Demo account", "Real-money accounts are refused unless you switch this off by hand."],
  ["H1 trend", "Never buys against a falling 1-hour trend, never sells against a rising one."],
  ["Daily loss stop", "After losing 5% of the balance in one day (UTC), no new trades until the next day."],
  ["Capacity", "At most 10 open trades at once."],
  ["One per pair", "Only one open trade per currency pair."],
  ["News blackout", "No trades from 30 minutes before to 15 minutes after big news. NFP, CPI and Fed decisions pause every pair."],
  ["Currency exposure", "At most 3 open trades involving the same currency."],
  ["Gold guard", "No gold (XAUUSD) on accounts under $300."],
  ["Risk per trade", "Refuses a trade whose stop loss would cost more than 2% of the balance."],
  ["Spread (pips)", "Refuses when the spread is wider than 3.5 pips."],
  ["Spread cost", "Refuses when the spread eats more than 6% of the stop-loss distance."],
  ["Session rules", "Each session (Asia, London, New York...) has its own trade slots, spread limit and loss budget, tightened automatically when that session keeps losing."],
  ["Margin", "Refuses when there isn't enough free margin."],
];

const TIERS = [
  ["NVIDIA graphics card with 8 GB or more", "Qwen3.5 9B on the graphics card", "All 28 pairs + gold"],
  ["NVIDIA graphics card with 4 to 8 GB", "Qwen3.5 4B on the graphics card", "All 28 pairs + gold"],
  ["No suitable graphics card", "Qwen3.5 4B on the processor (slower)", "7 major pairs only"],
  ["16 GB of memory or more (any of the above)", "+ gpt-oss 20B for deep reasoning and the daily review", ""],
];

const TROUBLE = [
  ["\"Windows protected your PC\" when installing", "The installer isn't code-signed yet. Click More info, then Run anyway."],
  ["The app says \"Agent stopped\"", "Press Start agent (top right). If it refuses, read the message: usually the license or Ollama."],
  ["Red banner: \"Free trial ended\"", "New trades are paused. Email " + EMAIL + " for a license, then press Check again."],
  ["\"MT5 not connected\"", "Open MetaTrader 5 and log in. Bubat AI connects to the MetaTrader 5 that is open on the same PC."],
  ["The bot never trades", "Check Algo Trading is ON (green) in MetaTrader 5, the account is a demo, and the market is open. Few trades is also normal: most signals are blocked by the safety walls on purpose."],
  ["Health check shows WARN or FAULT", "Open Overview: each line says what is wrong. FAULT means something needs fixing now."],
  ["Model download stopped", "Run setup again from Settings and press Install: downloads continue where they stopped."],
  ["Chat answers are slow", "Deep \"why\" questions use the larger model and can take 1 to 5 minutes, longer on a PC without a graphics card."],
  ["Something broke after an update", "Settings, then Go back to the previous version."],
];

const FAQ = [
  ["Will it make me money?", "Nobody can promise that, and so far it hasn't: see Honest results above. Treat it as an experiment on a demo account."],
  ["Can I use it on a real-money account?", "Not by default. You would have to change a setting by hand, and we strongly advise against it until it has been profitable on demo for months."],
  ["Does it send my trades or account to anyone?", "Your account number, balance and money amounts never leave your PC. During the trial, the bot's trade results (pair, direction, result in R) are shared to improve Bubat AI. See Your data."],
  ["Does it need the internet?", "Yes, for live news, the license check and updates. The AI itself runs on your PC. If the license server can't be reached, it keeps trading for up to 3 days."],
  ["Does it work on Mac, Linux or MetaTrader 4?", "No. Windows 10 or 11 (64-bit) with MetaTrader 5 only."],
  ["Can I change the lot size or risk settings?", "Yes, in config.json in the app's folder (see Using the app). The default is a fixed 0.01 lot."],
  ["Does it trade when my PC sleeps?", "No. Keep the PC awake while the market is open (set Sleep to Never)."],
  ["Is it the same as EA Budak Ubat?", "No. EA Budak Ubat is a grid Expert Advisor that runs inside MetaTrader. Bubat AI is a separate Windows app with an AI that decides each trade."],
];

function Section({ id, title, children }) {
  return (
    <div id={id} style={{ scrollMarginTop: "100px" }}>
      <h2 style={{ fontSize: "1.55rem", fontWeight: 850, color: "var(--text-primary)", margin: "56px 0 14px" }}>{title}</h2>
      {children}
    </div>
  );
}

function Table({ head, rows }) {
  return (
    <div className="guide-table-wrap">
      <table className="guide-table">
        <thead>
          <tr>{head.map((h) => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function BubatAIPage() {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link href="/" className="nav-brand">👑 EA Budak Ubat</Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><a href="#install">Install</a></li>
            <li><a href="#license">Trial &amp; license</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li>
              <a href={DOWNLOAD} className="nav-cta" target="_blank" rel="noopener noreferrer"
                 style={{ background: "linear-gradient(135deg, #00f0ff, #3b82f6)", color: "#0a0e1a", fontWeight: 900 }}>
                ⬇ Download
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <section className="catalog-hero" style={{ paddingTop: "140px", paddingBottom: "50px", position: "relative" }}>
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="container" style={{ position: "relative", zIndex: 2, maxWidth: "900px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "20px" }}>
            <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <span style={{ color: "#00f0ff", fontWeight: 700 }}>Bubat AI</span>
          </div>
          <div className="hero-badge" style={{ borderColor: "rgba(0, 240, 255, 0.4)", background: "rgba(0, 240, 255, 0.08)" }}>
            <span className="hero-badge-dot" style={{ background: "#00f0ff", boxShadow: "0 0 10px #00f0ff" }}></span>
            <span style={{ color: "#00f0ff", letterSpacing: "0.08em", fontWeight: 800 }}>WINDOWS · METATRADER 5 · LOCAL AI</span>
          </div>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.1rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: "18px" }}>
            Bubat AI: <span className="gradient-text">a forex trading agent that runs on your own PC</span>
          </h1>
          <p className="hero-subtitle" style={{ margin: "0 0 26px", fontSize: "1.1rem", lineHeight: 1.75 }}>
            An AI model on your computer reads live MetaTrader 5 prices and the news every 5 minutes and decides
            whether to buy, sell or wait. Fixed rules, not the AI, set every price, lot size and stop, and 16 safety
            walls can veto any trade. This page explains everything: how it works, how to install it, the free trial,
            and what to expect.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href={DOWNLOAD} target="_blank" rel="noopener noreferrer" className="nav-cta"
               style={{ background: "linear-gradient(135deg, #00f0ff, #3b82f6)", color: "#0a0e1a", fontWeight: 900, padding: "12px 22px", borderRadius: "10px", textDecoration: "none" }}>
              ⬇ Download for Windows
            </a>
            <a href="#install" style={{ padding: "12px 22px", borderRadius: "10px", border: "1px solid rgba(0,240,255,0.4)", color: "#00f0ff", textDecoration: "none", fontWeight: 700 }}>
              How to install
            </a>
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginTop: "14px" }}>
            Free 7-day trial · Demo accounts only by default · Not financial advice
          </p>
        </div>
      </section>

      <main className="container" style={{ paddingBottom: "80px", maxWidth: "900px" }}>
        <div className="guide-warning">
          <strong>⚠️ Read this first.</strong> Bubat AI is experimental and <strong>has lost money in testing</strong>.
          Forex and gold trading on margin is high risk. Use it on a <strong>demo account</strong>. Nothing here is
          financial advice.
        </div>

        <nav className="guide-toc" aria-label="Contents">
          <strong>On this page</strong>
          <ol>
            {TOC.map(([id, label]) => <li key={id}><a href={`#${id}`}>{label}</a></li>)}
          </ol>
        </nav>

        <article className="legal-body" style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.02rem" }}>
          <Section id="what" title="What Bubat AI is (and isn't)">
            <p>
              Bubat AI is a Windows app that trades forex and gold automatically in your <strong>MetaTrader 5</strong>{" "}
              account. Its &quot;brain&quot; is an AI language model that runs <strong>on your own PC</strong> through a
              free engine called Ollama: no cloud AI service and no AI subscription.
            </p>
            <ul>
              <li><strong>It is:</strong> an automated agent that analyses 28 currency pairs and gold every 5 minutes, opens and manages trades with stop loss and take profit, and explains its reasoning in a chat.</li>
              <li><strong>It isn&apos;t:</strong> a guaranteed money-maker, a signal service, financial advice, or a licensed investment product.</li>
              <li><strong>Separate from EA Budak Ubat:</strong> that is a grid Expert Advisor running inside MetaTrader. Bubat AI is its own app.</li>
            </ul>
          </Section>

          <Section id="results" title="Honest results so far">
            <p>
              On a demo account between 28 September and 3 October 2026, the bot made <strong>419 trades</strong> with a
              <strong> 36% win rate</strong> and lost about <strong>0.29R per trade</strong> (R is the amount risked by
              the stop loss): a net loss. The daily review found most of the loss came from spread costs, trade
              management and weak sessions rather than the AI&apos;s direction calls, and several safety walls were
              added in response. Results may improve or not; that is why it trades demo accounts only by default.
            </p>
          </Section>

          <Section id="how" title="How it trades">
            <p><strong>The AI decides only the direction.</strong> Everything that involves money is fixed rules the AI cannot change.</p>
            <ol>
              <li><strong>Every 5 minutes</strong> (at each M5 candle close) it looks at each pair: price, moving averages, RSI, MACD, the 1-hour trend, live news headlines and the economic calendar.</li>
              <li>The AI answers <strong>BUY, SELL or WAIT</strong> with a confidence score. Only BUY/SELL at <strong>0.80 confidence or higher</strong> go further.</li>
              <li><strong>The rules calculate the trade:</strong> stop loss at 1.5 × ATR (at least 15 pips; $3.50 on gold), take profit at 3 × ATR, a fixed <strong>0.01 lot</strong> by default.</li>
              <li>The best signals go first, and <strong>every trade must pass all 16 safety walls</strong> (below).</li>
              <li><strong>While a trade is open</strong>, it is checked every 15 seconds: at +15 pips the stop moves to break-even, and from +20 pips it trails 10 pips behind the price.</li>
              <li><strong>Each trading session</strong> (Asia, London, London–New York overlap, New York, rollover) has its own slots and daily loss budget, and is re-graded every day from its own results: a session that keeps losing is automatically restricted.</li>
            </ol>
            <p>
              On PCs with 16 GB of memory, a larger &quot;brain&quot; model also <strong>reviews the bot&apos;s results every
              day</strong> and proposes improvements. It never changes anything by itself: you approve or reject each
              proposal, and approved changes are tested first.
            </p>
          </Section>

          <Section id="safety" title="The 16 safety walls">
            <p>Every trade is checked against these, in order. The first one that fails stops the trade. The AI cannot switch them off.</p>
            <Table head={["#", "Wall", "What it does"]} rows={WALLS.map((w, i) => [i + 1, w[0], w[1]])} />
          </Section>

          <Section id="requirements" title="What you need">
            <ul>
              <li><strong>Windows 10 or 11</strong>, 64-bit. No administrator rights needed.</li>
              <li><strong>8 GB of memory</strong> minimum (16 GB recommended for the daily review and deep chat).</li>
              <li><strong>About 25 GB of free disk space</strong> for the AI models.</li>
              <li><strong>An NVIDIA graphics card with 4 GB or more</strong> is recommended. Without one it still works, slower, on 7 major pairs.</li>
              <li><strong>MetaTrader 5</strong> from your broker, logged in to a <strong>demo account</strong>, with Algo Trading turned on.</li>
              <li><strong>A Google account</strong> to sign in, and an internet connection.</li>
            </ul>
          </Section>

          <Section id="install" title="Install, step by step">
            <ol>
              <li>Download <strong>BubatAI-Setup-&lt;version&gt;.exe</strong> from the <a href={DOWNLOAD} target="_blank" rel="noopener noreferrer">official download page</a>.</li>
              <li>Run it. If Windows says <em>&quot;Windows protected your PC&quot;</em>, click <strong>More info</strong>, then <strong>Run anyway</strong> (the installer isn&apos;t code-signed yet).</li>
              <li><strong>Accept the risk notice</strong>, then read the <strong>system check</strong>: it tells you if this PC can run Bubat AI.</li>
              <li>Finish the installer and start Bubat AI. A <strong>setup wizard</strong> opens:
                <ol type="a">
                  <li><strong>Welcome:</strong> read and accept the risks.</li>
                  <li><strong>Account:</strong> press <em>Sign in with Google</em>. Your browser opens; sign in, then come back. Your free trial starts.</li>
                  <li><strong>Your PC:</strong> shows your memory, graphics card and disk, and the AI models chosen for it.</li>
                  <li><strong>AI models:</strong> press <em>Install</em>. It installs Ollama if needed and downloads the models (about 7 to 22 GB, usually 10 to 40 minutes). You can keep using your PC; if it stops, press Install again and it continues.</li>
                  <li><strong>MetaTrader 5:</strong> open MT5, log in to a demo account, turn on Algo Trading, then press <em>Check connection</em>. It should say CONNECTED and DEMO.</li>
                  <li><strong>Finish:</strong> leave <em>Start the trading agent now</em> ticked.</li>
                </ol>
              </li>
            </ol>
            <p>
              Optional: check the download is genuine by comparing its SHA-256 (PowerShell:{" "}
              <code>Get-FileHash BubatAI-Setup-&lt;version&gt;.exe</code>) with the <code>.sha256</code> file on the download page.
            </p>
          </Section>

          <Section id="models" title="Which AI your PC gets">
            <p>The setup picks this automatically. The trading AI must answer about 29 pairs every 5 minutes, so it has to fit your PC.</p>
            <Table head={["Your PC", "Trading AI", "Pairs traded"]} rows={TIERS} />
          </Section>

          <Section id="license" title="Free trial and license">
            <ul>
              <li><strong>Free 7-day trial</strong> from your first Google sign-in. One free trial per PC.</li>
              <li><strong>After the trial</strong>, a red banner appears and <strong>new trades pause</strong>. Trades that are already open keep being managed until they close.</li>
              <li><strong>To get a license</strong>, email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with the Google email you signed in with (the banner&apos;s <em>Email support</em> button fills it in). Once it&apos;s active, press <em>Check again</em>: trading resumes.</li>
              <li><strong>Google sign-in only:</strong> licenses are tied to your Google account.</li>
              <li><strong>Offline?</strong> If the license server can&apos;t be reached, Bubat AI keeps trading for up to 3 days.</li>
            </ul>
          </Section>

          <Section id="using" title="Using the app">
            <Table
              head={["Tab", "What it shows"]}
              rows={[
                ["Overview", "Balance, equity, today's closed result, open positions with SL/TP and live profit, the health check, agent and market status."],
                ["Chat", "Ask the AI anything about the market or your bot. Questions with why, should I, or entry / TP / SL use the deeper model with live prices and news."],
                ["Brain", "The daily review and its proposals, with Approve and Reject buttons (16 GB PCs)."],
                ["Logs", "What the bot is doing, its trades, errors and health checks, with search."],
                ["Settings", "Account and license, data sharing, updates, run setup again."],
              ]}
            />
            <p><strong>Chat examples:</strong> &quot;Why is the bot losing money?&quot;, &quot;Give me entry, TP and SL for GBPUSD&quot;, &quot;Which pairs look best this session?&quot;. Commands: <code>think &lt;question&gt;</code> forces the deep model, <code>fast &lt;question&gt;</code> the quick one, <code>clear</code> resets the conversation, <code>approve P5</code> / <code>reject P5 reason</code> decide a proposal.</p>
            <p><strong>Start / Stop agent</strong> (top right) controls trading. <strong>Stop</strong> lets the agent finish its current step; open trades keep their stop loss and take profit in MetaTrader 5.</p>
            <p>
              <strong>Advanced settings</strong> (lot size, daily loss limit, risk walls) are in{" "}
              <code>%LOCALAPPDATA%\Programs\Bubat AI\app\forex_local_agent\config.json</code>. Stop the agent, edit, then start it again. Your settings are kept when Bubat AI updates.
            </p>
          </Section>

          <Section id="running" title="Keeping it running">
            <ul>
              <li><strong>Closing the window doesn&apos;t stop trading.</strong> Bubat AI moves to the tray icon next to the clock; click it to reopen.</li>
              <li><strong>Keep the PC awake</strong> while the market is open: Windows Settings, System, Power, set Sleep to <em>Never</em>.</li>
              <li><strong>Keep MetaTrader 5 open</strong> and logged in, with Algo Trading on.</li>
              <li><strong>Weekends:</strong> the forex market closes Friday 5 PM New York time (Saturday 5 or 6 AM Malaysia) and reopens Sunday at the same time. The bot pauses by itself and resumes when the market opens.</li>
              <li><strong>Health check:</strong> every 12 hours the app checks the agent, MetaTrader 5, the AI engine, open positions and the loss limits, and notifies you on WARN or FAULT.</li>
            </ul>
          </Section>

          <Section id="updates" title="Updates">
            <p>
              Bubat AI checks for updates every 6 hours and shows <em>Update available</em>. Each update comes only from
              the official download page, is <strong>verified with a checksum and tested</strong> before it replaces
              anything, and keeps your settings and history. The agent is stopped during the update and started again
              after. If anything goes wrong, Settings has <strong>Go back to the previous version</strong>. You can also let
              it install updates automatically on weekends.
            </p>
          </Section>

          <Section id="privacy" title="Your data">
            <ul>
              <li><strong>Never leaves your PC:</strong> your MetaTrader login, password, account number, balance, money amounts, chats and logs.</li>
              <li><strong>Sent for your license:</strong> your Google email and an anonymous ID for your PC.</li>
              <li><strong>Shared to improve Bubat AI:</strong> the bot&apos;s trade results (pair, buy/sell, session, times, result in R and pips, how it closed, app version, AI model, broker server). Required during the free trial; licensed users can turn it off. Anyone can delete what they shared in Settings.</li>
            </ul>
            <p>Full details: <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Use</Link>.</p>
          </Section>

          <Section id="troubleshooting" title="Troubleshooting">
            <Table head={["Problem", "What to do"]} rows={TROUBLE} />
            <p>Still stuck? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with a screenshot and the file <code>logs\desktop.log</code> from the app&apos;s folder (Settings, Open logs folder).</p>
          </Section>

          <Section id="uninstall" title="Uninstalling">
            <p>
              Windows Settings, Apps, <strong>Bubat AI</strong>, Uninstall. The agent is stopped first; open trades stay in
              MetaTrader 5 with their stop loss and take profit. Ollama and the AI models are left in place because other
              apps can use them: uninstall <strong>Ollama</strong> the same way if you no longer need it.
            </p>
          </Section>

          <Section id="faq" title="FAQ">
            {FAQ.map(([q, a]) => (
              <div key={q} className="guide-faq">
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </Section>

          <Section id="contact" title="Contact">
            <p>
              Licenses and support: <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · Download:{" "}
              <a href={DOWNLOAD} target="_blank" rel="noopener noreferrer">official download page</a>
            </p>
          </Section>
        </article>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} EA Budak Ubat by Syarief Azman · <Link href="/privacy">Privacy Policy</Link> ·{" "}
              <Link href="/terms">Terms of Use</Link> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <p className="footer-disclaimer">
              Risk warning: Trading on margin carries a high level of risk. Bubat AI has lost money in testing. Past
              performance is not indicative of future results. Always use a demo account.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
