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
  ["how", "How the AI trades"],
  ["sees", "What the AI sees"],
  ["decides", "How it decides (and why it often waits)"],
  ["order", "From signal to order"],
  ["manage", "Managing open trades"],
  ["sessions", "Sessions and daily grading"],
  ["review", "The daily review"],
  ["never", "What the AI can never do"],
  ["example", "A worked example"],
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
  ["Why does it trade so rarely?", "By design. A trade needs confidence of 0.80 or more, which the AI only gives when a clear trend on both the 5-minute and 1-hour charts lines up with a matching news headline, and then all 16 safety walls must agree. Quiet, news-free or choppy markets mean hours of WAIT."],
  ["Can I use it on a real-money account?", "Not by default. You would have to change a setting by hand, and we strongly advise against it until it has been profitable on demo for months."],
  ["Does it send my trades or account to anyone?", "Your account number, balance and money amounts never leave your PC. During the trial, the bot's trade results (pair, direction, result in R) are shared to improve Bubat AI. See Your data."],
  ["Does it need the internet?", "Yes, for live news, the license check and updates. The AI itself runs on your PC. If the license server can't be reached, it keeps trading for up to 3 days."],
  ["Does it work on Mac, Linux or MetaTrader 4?", "No. Windows 10 or 11 (64-bit) with MetaTrader 5 only."],
  ["Can I change the lot size or risk settings?", "Yes, in config.json in the app's folder (see Using the app). The default is a fixed 0.01 lot."],
  ["Will it touch the trades I open myself?", "No. It only moves stops on its own trades. Your manual trades do count toward its limits (open trades, one per pair, currency exposure, daily loss), so it may trade less while yours are open."],
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
            walls can veto any trade. This page explains everything: exactly how the AI makes each trading decision,
            how to install it, the free trial, and what to expect.
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
              added in response. Those trades were made by an earlier version with an older AI model (Qwen3 8B), which
              gave most signals a high score. Since 4 October 2026 the trading AI is Qwen3.5, which follows the
              confidence rules more strictly and so trades far less often (see{" "}
              <a href="#decides">How it decides</a>). There are no results for it yet. Results may improve or not; that
              is why it trades demo accounts only by default.
            </p>
          </Section>

          <Section id="how" title="How the AI trades: the big picture">
            <p>
              Bubat AI splits every trade into two jobs. <strong>The AI decides only the direction</strong>: BUY, SELL or
              WAIT, with a confidence score and a one-sentence reason. <strong>Fixed rules written in code decide
              everything that involves money</strong>: entry price, stop loss, take profit, lot size, and whether the trade
              is allowed at all. The AI never calculates a price, never sees your balance, and cannot switch off a rule.
            </p>
            <p>This happens in a loop that repeats every 5 minutes while the forex market is open:</p>
            <ol>
              <li><strong>Look:</strong> for each of the 29 instruments, gather charts, news and the bot&apos;s own recent history.</li>
              <li><strong>Decide:</strong> the AI answers BUY, SELL or WAIT with a confidence score.</li>
              <li><strong>Calculate:</strong> for strong signals, the rules work out the exact trade.</li>
              <li><strong>Check:</strong> the best signals go first, and each must pass all 16 safety walls.</li>
              <li><strong>Trade and manage:</strong> orders go to MetaTrader 5; open trades are watched every 15 seconds.</li>
              <li><strong>Learn:</strong> closed trades are recorded, each session is graded daily, and (on 16 GB PCs) a daily review proposes improvements for you to approve.</li>
            </ol>
          </Section>

          <Section id="sees" title="What the AI sees for each pair">
            <p>Every 5 minutes, at the close of each 5-minute (M5) candle, the AI receives a short report for one pair at a time:</p>
            <Table
              head={["Input", "What it contains"]}
              rows={[
                ["Price and trend", "Current price; where it sits against the 20 and 50 moving averages (EMA); a plain label such as \"STRONG BEARISH (below 20 & 50 EMA)\"; the % change over the last 100 candles; the high and low of that range; the last 5 candles."],
                ["Momentum", "RSI(14) with a label (oversold, bearish pressure, bullish pressure, overbought) and MACD with its signal line and histogram."],
                ["Volatility", "ATR(14): the average size of recent candles, used later to size the stop loss."],
                ["The bigger picture", "The 1-hour (H1) trend: bullish, bearish or neutral. This matters most: the AI is told never to trade against it."],
                ["News", "Up to 3 recent headlines about that pair from Google News, plus this week's economic calendar (high-impact releases such as NFP, CPI and central-bank decisions)."],
                ["Its own history", "The bot's last 5 recorded decisions on this pair, so it doesn't contradict itself without reason."],
                ["Learned rules", "A short list of rules written after reviewing past losses (for example \"wait when M5 and H1 disagree\" and \"pause around tier-1 USD news\")."],
              ]}
            />
            <p>
              It does <strong>not</strong> see your balance, open profit, account number or other pairs&apos; decisions.
              Everything runs on your PC; only the news lookups go to the internet.
            </p>
          </Section>

          <Section id="decides" title="How it decides, and why it often waits">
            <p>The AI follows written instructions. The key ones:</p>
            <ul>
              <li><strong>BUY</strong> in an uptrend (price above both moving averages, bullish momentum); <strong>SELL</strong> in a downtrend; <strong>WAIT</strong> when signals conflict or the market is flat.</li>
              <li><strong>Never against the 1-hour trend.</strong> If the 5-minute and 1-hour pictures disagree, WAIT.</li>
              <li><strong>Never through big news.</strong> If a high-impact release is due within 30 minutes, WAIT.</li>
              <li><strong>Only cite news that is actually in the headlines</strong>, never invent a story.</li>
            </ul>
            <p>It must also give an honest confidence score on this scale:</p>
            <Table
              head={["Confidence", "Meaning", "Traded?"]}
              rows={[
                ["0.82 to 0.90", "Strong trend AND a news headline that matches the direction", "Yes (if every safety wall agrees)"],
                ["0.68 to 0.80", "Clear trend, but no pair-specific news", "Usually no"],
                ["0.50 to 0.65", "Mixed or emerging trend", "No"],
                ["0.30 to 0.49", "Flat or ranging market (WAIT)", "No"],
              ]}
            />
            <p>
              <strong>Only BUY or SELL signals with confidence 0.80 or more go any further</strong>, and anything above 0.89
              is refused (in testing, the most &quot;certain&quot; signals did worse). In practice this means{" "}
              <strong>Bubat AI mostly trades when a clear trend lines up with a matching news catalyst</strong>, and
              waits otherwise. Many hours with few or no trades is normal and intended.
            </p>
            <p>
              If the AI&apos;s answer can&apos;t be read after 3 attempts, or the AI engine isn&apos;t responding, the
              bot treats it as <strong>WAIT</strong>: a failure never turns into a trade. If the AI engine (Ollama) has
              stopped, Bubat AI starts it again by itself.
            </p>
          </Section>

          <Section id="order" title="From signal to order">
            <ol>
              <li><strong>Queue, don&apos;t rush.</strong> All 29 pairs are analysed first; nothing is traded during the analysis.</li>
              <li><strong>Rank the signals.</strong> Signals that agree with a full 1-hour trend go before weaker ones, then those with the lowest spread cost. The limited trade slots go to the best setups, not whichever pair happened to be analysed first.</li>
              <li>
                <strong>Calculate the trade</strong> (code, not AI):
                <ul>
                  <li><strong>Entry:</strong> the current market price (Ask for BUY, Bid for SELL).</li>
                  <li><strong>Stop loss:</strong> 1.5 × ATR from entry, at least 15 pips on currencies ($3.50 on gold).</li>
                  <li><strong>Take profit:</strong> 3 × ATR from entry, and always at least 1.5 times the stop distance.</li>
                  <li><strong>Lot size:</strong> a fixed 0.01 lot by default (it can be switched to risk-based sizing in the settings).</li>
                </ul>
              </li>
              <li><strong>Pass the 16 safety walls</strong> (next section). The first wall that says no stops the trade, and the reason is written to the log.</li>
              <li><strong>Send the order</strong> to MetaTrader 5 with the stop loss and take profit attached, so the trade is protected even if your PC switches off.</li>
            </ol>
          </Section>

          <Section id="manage" title="Managing open trades, and after they close">
            <ul>
              <li><strong>Every 15 seconds</strong> while waiting for the next candle, the bot checks its open trades:
                <ul>
                  <li><strong>Break-even:</strong> at +15 pips profit, the stop loss moves to entry + 1 pip, so the trade can no longer lose.</li>
                  <li><strong>Trailing stop:</strong> from +20 pips, the stop follows the price 10 pips behind it, moving in steps of at least 2 pips.</li>
                </ul>
              </li>
              <li><strong>Exits</strong> happen at the take profit, the (moved) stop loss, or by your hand in MetaTrader 5. The bot never closes trades early on its own.</li>
              <li><strong>Cool-down:</strong> after a trade on a pair closes, that pair is not traded again for 30 minutes.</li>
              <li><strong>Record:</strong> every closed trade is logged with how it ended (take profit, stop loss, break-even, trailing) and its result in R, which feeds the session grading and the daily review.</li>
              <li><strong>Only its own trades:</strong> the bot only moves stops on trades it opened (marked with its own ID in MetaTrader 5); trades you open by hand are never touched. They do count toward its limits, though: open-trade count, one trade per pair, currency exposure and the daily loss limit.</li>
              <li><strong>Gold</strong> uses dollar distances instead of pips: break-even at +$2.50, trailing from +$4.00, $2.50 behind the price.</li>
            </ul>
          </Section>

          <Section id="sessions" title="Trading sessions and daily grading">
            <p>
              Each trading session has its own limits and its own share of the 5% daily loss limit, so one bad session
              can&apos;t use up the whole day. Times in Malaysia time (UTC+8):
            </p>
            <Table
              head={["Session", "Malaysia time", "Max open trades", "Loss budget"]}
              rows={[
                ["Asia", "06:00 to 15:00", "4", "1.0% of balance"],
                ["London", "15:00 to 20:00", "10", "1.75%"],
                ["London and New York overlap", "20:00 to 00:00", "8", "1.0%"],
                ["New York", "00:00 to 05:00", "6", "1.0%"],
                ["Rollover (spreads are widest)", "05:00 to 06:00", "2", "0.25%"],
              ]}
            />
            <p>
              <strong>Every day each session is graded</strong> from its last 5 days of trades. A session that keeps
              losing is restricted automatically: first to <em>Reduced</em> (half the slots, major pairs only), then to{" "}
              <em>Minimal</em> (one slot). It is restored one level per day once its results recover. Grading only ever
              tightens; it never takes more risk than the defaults above.
            </p>
          </Section>

          <Section id="review" title="The daily review (the &quot;brain&quot;)">
            <p>
              On PCs with 16 GB of memory, a larger AI model (gpt-oss 20B) runs once a day, around 05:15 Malaysia time.
              It reads the last 5 days of results, compares the bot with simple alternatives (such as &quot;just follow the
              1-hour trend&quot; and &quot;never trade&quot;), checks which safety walls helped, and proposes up to 3
              improvements.
            </p>
            <ul>
              <li><strong>It never changes anything by itself.</strong> Each proposal waits in the Brain tab for you to approve or reject, with the evidence and a check of the claim computed from your real results.</li>
              <li><strong>It can only touch a short list of settings, within hard limits</strong>, for example the confidence threshold (0.70 to 0.95), maximum open trades (1 to 10), the spread limit (up to 3.5 pips), the news pause around releases, and each session&apos;s slots and loss budget. It can also suggest stopping a losing pair or adding a written rule.</li>
              <li><strong>Each proposal is labelled SAFER or RISKIER by code</strong>, not by the AI.</li>
              <li><strong>When you approve,</strong> the change is applied, the full test suite runs, and it is undone automatically if anything fails.</li>
              <li>Your reason for rejecting is saved, and the brain reads it on its next run.</li>
            </ul>
          </Section>

          <Section id="never" title="What the AI can never do">
            <ul>
              <li>Choose prices, stop loss, take profit or lot size.</li>
              <li>Switch off, skip or change a safety wall.</li>
              <li>Trade a real-money account (unless you change that setting yourself).</li>
              <li>Change settings or code without your approval.</li>
              <li>Close or touch trades you opened by hand.</li>
              <li>Place an order from the chat: entry/TP/SL suggestions in the Chat tab are information only.</li>
            </ul>
          </Section>

          <Section id="example" title="A worked example">
            <p>A simplified example of one 5-minute cycle (prices illustrative):</p>
            <ol>
              <li>At 21:05 Malaysia time, EURUSD is below both moving averages, RSI 38, MACD bearish, and the 1-hour trend is bearish. A headline says the euro is falling after weak German data.</li>
              <li>The AI answers: <code>SELL, confidence 0.84</code>, &quot;Bearish trend on M5 and H1 with a matching euro-negative headline.&quot;</li>
              <li>0.84 is between 0.80 and 0.89, so it is queued. After all pairs are analysed, it ranks first (full H1 trend, low spread).</li>
              <li>The rules calculate it: entry 1.1250 (Bid), ATR 9 pips, so the stop is 15 pips (the minimum) at 1.1265 and the take profit 27 pips away at 1.1223. Lot 0.01.</li>
              <li>The walls check it: demo account, no news due within 30 minutes, under 10 trades, no EURUSD already open, EUR exposure below 3, spread 0.2 pips (about 1% of the stop), today&apos;s loss well under 5%, London-New York session has a free slot. All pass, and the order goes to MetaTrader 5 with SL and TP attached.</li>
              <li>The price falls 16 pips, so the stop moves to break-even. At 21 pips the trailing stop takes over. It reverses and closes at +12 pips (+0.8R). EURUSD then rests for 30 minutes.</li>
            </ol>
            <p>If the same chart had come with no matching headline, the AI would most likely have scored it 0.72 to 0.78 and the bot would have waited.</p>
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
