"use client";

import { useState, useEffect, useRef } from "react";

const DOWNLOAD_MT4 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT4%20-%2020260328.ex4";
const DOWNLOAD_MT5 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT5%20-%2020260328.ex5";
const PURCHASE_LINK = "https://tinyurl.com/eabubuy";
const SIGNAL_LINK = "https://www.mql5.com/en/channels/eabudakubat";

const AUTHORIZED_ACCOUNTS = [47144366, 39202388, 447496, 28744721, 446471, 67044500, 35108503, 14270029, 280898538, 22687585, 48431437, 40231501, 34181039, 50010729, 46206181, 31042413, 48424040, 30935753, 30935750, 30935749, 231105999, 231106000, 301423050, 231108522, 231107366, 437101, 231105601, 301429546, 301428462, 1253026, 45479042, 301425970, 4866577, 35066358, 20733294, 24265271, 24308938, 423655, 241272305, 30844787, 30844786, 271762633, 271762687, 271761548, 13042631, 271761625, 31031383, 241836624, 40209703, 428531, 301424257, 301420622, 30821619, 301420423, 260814087, 330018160, 13041727, 13041720, 260812069, 15127688, 260810419, 260810318, 260809709, 220763384, 260807856, 41474935, 110371577, 220760466, 220763383, 42673033, 220764630, 241797440, 40204188, 241779765, 220760133, 220757834, 110349588, 51379350, 220757761, 10589171, 220757426, 241764167, 220756561, 220756639, 301419237, 16581411, 231104393, 220754569, 290921520, 220754551, 220754458, 220754351, 110030128, 220753629, 220753544, 3805175, 231104416, 231101347, 231103989, 231103990, 260802695, 220747326, 231102420, 231100797, 231101152, 46138418, 290894056, 231099736, 290891017, 290891018, 231098986, 231097084, 231098630, 31018538, 536221, 301419571, 301419462, 301419236, 220476053, 13301739, 301419002, 301418623, 31018009, 271757912, 301417622, 1235226, 41328586, 301415814, 13300444, 38039998, 91931537, 1235225, 301415091, 301414688, 49156221, 15120370, 4574565, 407676, 271758951, 271758209, 41029112, 230325793, 271757233, 271756669, 49154578, 4573169, 260801772, 260800857, 40855756, 40818759, 30472764, 4572375, 260799123, 4120301, 22779978, 20966306, 260796883, 4571803, 260796867, 20981220, 5670568, 56171660, 241743374, 241743130, 24493784, 280788856, 44625475, 301410426, 38027769, 91922301, 4569257, 301408129, 301407379, 280790191, 384721, 301407291, 14253088, 301406548, 381957, 241738068, 15116397, 10259378, 374657, 33164480, 271750884, 31009450, 13039831, 75040932, 38023755, 13038587, 38278508, 45470568, 45471082, 90529337, 378600, 231094469, 13037390, 110447778, 231093230, 231093215, 280768223, 40172447, 3779695, 368622, 231092130, 231091871, 231091541, 231090788, 271405414, 13035331, 5075800, 271747529, 271747624, 271747617, 271747922, 128629018, 271747823, 13034491, 271747340, 40103100, 271746810, 24172371, 1228497, 67023650, 271746403, 241694961, 271745914, 271745778, 271745657, 271745025, 301406367, 5814938, 4618919, 359136, 301405259, 251005201, 301404899, 301404787, 230878495, 40005610, 50928949, 251023611, 310589109, 251011686, 56136701, 250738053, 50926643, 50926990, 6020467, 301402076, 301401831, 301401552, 241673648, 241673652, 260793536, 260793354, 260793151, 260793137, 330261658, 260792844, 310414845, 10582534, 25196877, 24281643, 260792334, 241637147, 260791720, 47105460, 75024017, 25182784, 25180557, 25182018, 43187065, 38008250, 349409, 10581650, 290827504, 10581156, 10581157, 46114152, 2100202361, 320325985, 250776195, 230878487, 10580112, 220677181, 212528, 301383073, 25134823, 110367864, 38007561, 320336495, 320341625, 10578632, 342856, 290788014, 25124937, 50911541, 320325985, 11758925, 24366538, 10577296, 271713150, 271714435, 310433979, 271710987, 241288762, 5879494, 10576950, 5879178, 1210812, 271708317, 1210655, 271706164, 4554051, 141006588, 47095826, 4566698, 6007330, 310433370, 310432147, 310427789, 4566517, 310428731, 6007088, 310428380, 467378, 467379, 260788186, 5874167, 4566325, 310416709, 310420287, 9785154, 310417582, 310412921, 310414039, 310413555, 1600109727, 310411959, 310411239, 6005601, 260789913, 230944394, 320125264, 5864001, 260784697, 260782092, 141000344, 56129966, 56129967, 38005357, 56129965, 22595771, 330246906, 17751851, 24372660, 110019895, 53483829, 2132602615, 102865, 260772890, 38216624, 56128453, 330259968, 330261080, 6973836, 250855267, 56119492, 24440346, 20932039, 330253189, 330252350, 437814, 6002511, 330247349, 22013702, 46102642, 56126565, 120201094, 51407995, 231088399, 231080470, 231080474, 38003230, 2100200249, 192139837, 231074929, 339376, 339176, 231067931, 320321354, 231065509, 220748121, 24368645, 24368642, 24368628, 24368617, 141136159, 192080160, 192080166, 192087997, 192080154, 290729490, 220734699, 6748098, 290768531, 301326664, 301326668, 310359156, 301329698, 750729, 13027894, 13527690, 301329704, 301329710, 10576779, 56120025, 310402183, 320323525, 301329718, 320287929, 320287926, 300724432, 301329724, 38000971, 320305818, 320287928, 320287930, 290797780, 320293256, 999049102, 189402, 187461, 1000012579, 192079962, 46002444, 47074913, 301329729, 5015555, 10574113, 10574122, 2100199368, 2100102903, 301370702, 301364931, 301364963, 301363842, 22668478, 117043700, 271619370, 271619248, 271619247, 271619242, 169745, 301342826, 5103852, 10572601, 301338471, 301340934, 2100127831, 301338667, 301338700, 301338711, 60127544, 241334311, 301333295, 21327810, 62630015, 290811032, 290811144, 35124407, 226727, 271376212, 271589085, 290793203, 290803005, 290803011, 290803023, 290803031, 290803035, 290803042, 290803045, 290777186, 290777238, 5793561, 290797783, 280428807, 290708505, 290708508, 10565339, 22642646, 60124625, 290793095, 290776570, 290778420, 290791966, 290791971, 290791974, 290791975, 290791976, 290791978, 290791980, 290791982, 290790446, 60127270, 290783307, 50893152, 60127243, 9106202, 4561741, 766118, 290779891, 290777138, 4561464, 24333650, 271705126, 271702365, 271702356, 271701961, 271701959, 271701950, 271700614, 271700604, 271700600, 271698838, 58808192, 22620250, 22619162, 60126730, 271680740, 65209315, 60126358, 53409128, 2875737, 5711440, 5711469, 15769428, 112883, 271670101, 271663568, 250972252, 250979131, 4559342, 3754760, 3754799, 60126208, 250966681, 250973804, 250966081, 800837865, 271628286, 260657559, 56105041, 250959657, 250957659, 35055890, 2100198278, 2100198280, 2100197940, 250953184, 250951695, 250950477, 250949189, 56104289, 363317, 250937747, 2100198277, 330231524, 1149678, 5767394, 5618549, 60125487, 117017757, 220579967, 60124536, 13025770, 330226965, 60124742, 2100197910, 13025412, 5000445, 5763809, 60124966, 60124932, 5763058, 330215114, 330215118, 330215126, 5762992, 330213208, 13024948, 330212436, 60124502, 362926, 548188, 13024780, 290448830, 320247513, 5670568, 60124670, 280755909, 21454957, 53379729, 13024449, 13022238, 60124033, 5527955, 5527967, 5586556, 5586494, 5586473, 5586460, 5585377, 60124032, 108151, 280742519, 280742542, 3751953, 280734909, 1148217, 5753815, 571958, 571729, 260753046, 260756315, 280730787, 280730796, 5585003, 13022980, 320207539, 46175797, 260764032, 260762646, 260758710, 310307023, 3957871, 5743926, 5434951, 241612110, 241612108, 27362937, 241612106, 241612105, 241612104, 241612103, 241612102, 241612100, 241612096, 241604510, 5742489, 241605261, 241617296, 443354, 22546495, 13021463, 13004694, 241591851, 290748564, 800833896, 241606464, 241605554, 231047192, 290589021, 241599814, 241599469, 13020888, 90307343, 90876405, 241598720, 241598716, 241598721, 241598555, 241598558, 241598559, 241596128, 231052121, 230942650, 241587481, 241587697, 241586738, 44094296, 5522658, 686468, 35050856, 330023862, 5724392, 220093895, 24110069, 47055958, 24390748, 220683034, 20890279, 231041409, 220670829, 231040169, 5711441, 290505538, 51194337, 310200794, 231038313, 55006805, 231037934, 8963723, 88014706, 4457412, 6336708, 360439, 20314776, 890367718, 8002244, 5727022, 5727021, 5727019, 5727018, 5727017, 5724676, 5724673, 5724670, 5713913, 5713912, 53338904, 231036521, 10569792, 10569822, 10569823, 10569824, 10569825, 260675215, 3748617, 330032453, 220708708, 10570144, 10570145, 10570146, 10570181, 220680918, 220694255, 220703637, 10570143, 10569437, 46071377, 220698139, 290636244, 220696924, 310364137, 310364161, 320243283, 310367068, 220695974, 220694810, 220694807, 220692136, 220692127, 10569667, 46070806, 220691140, 250852939, 438088, 220689347, 20829806, 220689025, 220689151, 241501008, 271557181, 250280548, 437834, 10568483, 90865412, 320183680, 21398598, 229488, 46069257, 220680804, 220678889, 310390721, 220677774, 320258092, 10568801, 320236039, 5611439, 310360242, 310393621, 330179201, 330019766, 310390036, 52133589, 310387193, 310382563, 310381317, 310362509, 310380447, 22224590, 5714333, 4558630, 5713692, 435807, 4558456, 310373184, 320239407, 320206708, 320206716, 320206723, 320206732, 4558004, 310371777, 260600979, 5711107, 310364286, 33126040, 90866470, 5434953, 301318199, 310361207, 310360465, 435036, 310360389, 320259320, 4557465, 789012, 345678];

const BROKERS = [
  { name: "FISG", url: "https://my.fisg.com/u/CTt0Rd" },
  { name: "CXM", url: "https://secure.cxmys.com/links/go/5062" },
  { name: "FBS", url: "https://fbs.partners?ibl=154319&ibp=588292" },
  { name: "HeadWay", url: "https://headway.partners/user/signup?hwp=516d6b" },
  { name: "Forex4you", url: "https://account.forex4you.com/en/user-registration/?affid=4hcnvz4" },
  { name: "OctaFx", url: "https://my.octafxmy.net/change-partner-request/?partner=246630" },
  { name: "InstaForex", url: "https://www.instaforex.com?x=KUSD" },
  { name: "LiteForex", url: "https://www.litefinance.com/?uid=805161060" },
  { name: "RoboForex", url: "https://my.roboforex.com/en/?a=mxyg" },
  { name: "XM", url: "https://clicks.pipaffiliates.com/c?c=862266&l=en&p=1" },
  { name: "Valetax", url: "https://ma.valetax.com/p/1939088" },
];

const FEATURES = [
  { icon: "📊", title: "Multi-Platform", desc: "Runs on both MetaTrader 4 and MetaTrader 5 with identical trading logic." },
  { icon: "🧠", title: "4 Analysis Methods", desc: "Classic Candle, SMA20, Alligator, and Ichimoku for entry signals." },
  { icon: "📈", title: "Grid Martingale", desc: "Automatic position layering with configurable multiplier and distance." },
  { icon: "🤖", title: "AutoConfig AI", desc: "Dynamic parameter optimization based on Average Daily Range." },
  { icon: "🔄", title: "Hedging Support", desc: "Trade both directions simultaneously or restrict to single-direction." },
  { icon: "⏰", title: "Time Filter", desc: "Schedule EA active hours with configurable Start/Stop times." },
  { icon: "🛑", title: "Close All Button", desc: "One-click close for all open positions directly on the chart." },
  { icon: "🔐", title: "Authorization System", desc: "Account-locked licensing with unlimited demo mode support." },
];

const PARAM_TABS = {
  core: [
    { name: "EA_Name", def: "[https://t.me/SyariefAzman]", desc: "Display name shown in trade comments" },
    { name: "Execution_Mode", def: "on Every New Bar", desc: "Every Tick = instant; Every New Bar = candle close" },
    { name: "Pos_Mode", def: "Buy & Sell", desc: "Buy & Sell, Buy Only, or Sell Only" },
    { name: "Hedging", def: "false", desc: "Allows simultaneous buy/sell baskets" },
    { name: "Method", def: "Ichimoku", desc: "Analysis method: Classic Candle, SMA20, Alligator, Ichimoku" },
  ],
  lot: [
    { name: "Lots", def: "0.01", desc: "Initial lot size for the first position" },
    { name: "GridTrading", def: "true", desc: "Enable/disable grid (martingale) layering" },
    { name: "MartingaleMultiplier", def: "1.3", desc: "Lot multiplier per grid layer (1.0 = flat)" },
    { name: "MaxLot", def: "500", desc: "Maximum lot size cap for martingale" },
    { name: "MaxTrade", def: "99999", desc: "Maximum grid layers per direction" },
  ],
  distance: [
    { name: "TakeProfit", def: "25.0", desc: "Take profit in pips from weighted average" },
    { name: "StopLoss", def: "0", desc: "Stop loss in pips from first entry (0 = disabled)" },
    { name: "minDistance", def: "4", desc: "Minimum pip distance between grid orders" },
    { name: "distanceIncrement", def: "2.0", desc: "Extra pips added per successive layer" },
    { name: "maxDistance", def: "100.0", desc: "Maximum distance cap between grid orders" },
  ],
  time: [
    { name: "StartTime", def: "00:00", desc: "EA active start time (HH:MM, server time)" },
    { name: "StopTime", def: "23:59", desc: "EA active stop time (HH:MM, server time)" },
    { name: "AutoConfig", def: "false", desc: "Enable AutoConfig AI for dynamic parameters" },
    { name: "MagicNumber", def: "123456", desc: "Unique magic number for trade identification" },
  ],
};

const FAQS = [
  { q: "Can I use this on multiple charts?", a: "Yes, but use a different MagicNumber for each chart to avoid conflicts between EA instances." },
  { q: "Does the MT5 version trade the same as MT4?", a: "Yes. The trading logic, parameters, grid math, analysis methods, authorization, and time filtering are all identical. Only the underlying API calls differ." },
  { q: "What pairs work best?", a: "Ranging pairs with low spread work best. Avoid highly trending or exotic pairs to minimize drawdown risk." },
  { q: "Can I use this on XAUUSD (Gold)?", a: "Technically yes, but gold is very volatile. Use extreme caution, a cent account, and very conservative settings." },
  { q: "What is the minimum capital needed?", a: "A minimum of $100 on a cent account with 0.01 starting lots is recommended. Higher leverage reduces margin requirements per position." },
  { q: "How do I get authorized?", a: "Register through one of the broker partner links on this page, then send your trading account number to @SyariefAzman on Telegram." },
];

const INSTALL_MT4 = [
  <>Download <code>EA - Budak Ubat v1.62 - MT4 - 20260328.ex4</code></>,
  <>Open MT4 → <code>File</code> → <code>Open Data Folder</code></>,
  <>Navigate to <code>MQL4/Experts/</code></>,
  "Copy the .ex4 file into this folder",
  "Restart MT4 (or right-click Navigator panel → Refresh)",
  "Drag the EA onto a chart (recommended: M5 timeframe, ranging pair)",
  <>In the EA properties, go to <code>Common</code> tab → check <strong>Allow live trading</strong></>,
  <>Configure parameters in the <code>Inputs</code> tab</>,
  "Click OK — the EA will display its status on the chart",
];

const INSTALL_MT5 = [
  <>Download <code>EA - Budak Ubat v1.62 - MT5 - 20260328.ex5</code></>,
  <>Open MT5 → <code>File</code> → <code>Open Data Folder</code></>,
  <>Navigate to <code>MQL5/Experts/</code></>,
  "Copy the .ex5 file into this folder",
  "Restart MT5 (or right-click Navigator panel → Refresh)",
  "Drag the EA onto a chart (recommended: M5 timeframe, ranging pair)",
  <>In the EA properties, go to <code>Common</code> tab → check <strong>Allow Algo Trading</strong></>,
  <>Configure parameters in the <code>Inputs</code> tab</>,
  "Click OK — the EA will display its status on the chart",
];

export default function Home() {
  const [activeParamTab, setActiveParamTab] = useState("core");
  const [activeInstall, setActiveInstall] = useState("mt4");
  const [openFaq, setOpenFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".animate-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSearch = () => {
    if (!searchQuery.trim()) { setSearchResult(null); return; }
    const found = AUTHORIZED_ACCOUNTS.includes(Number(searchQuery.trim()));
    setSearchResult(found);
  };

  return (
    <>
      {/* VERIFIED DEPLOY FROM MAIN REPO */}
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="container">
          <a href="#" className="nav-brand">EA Budak Ubat</a>
          <ul className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
            <li><a href="#features" onClick={() => setMobileNavOpen(false)}>Features</a></li>
            <li><a href="#how-it-works" onClick={() => setMobileNavOpen(false)}>How It Works</a></li>
            <li><a href="#parameters" onClick={() => setMobileNavOpen(false)}>Parameters</a></li>
            <li><a href="#installation" onClick={() => setMobileNavOpen(false)}>Install</a></li>
            <li><a href="#authorization" onClick={() => setMobileNavOpen(false)}>Authorization</a></li>
            <li><a href="#faq" onClick={() => setMobileNavOpen(false)}>FAQ</a></li>
            <li><a href={PURCHASE_LINK} className="nav-cta" target="_blank">Purchase (MT4)</a></li>
          </ul>
          <button className="nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
            {mobileNavOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-bg-grid"></div>
        <div className="hero-glow hero-glow-1"></div>
        <div className="hero-glow hero-glow-2"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            v1.62 — MT4 & MT5
          </div>
          <h1>
            <span className="gradient-text">EA Budak Ubat</span>
          </h1>
          <p className="hero-subtitle">
            A powerful grid-based martingale Expert Advisor for MetaTrader 4 & MetaTrader 5.
            Designed for ranging pairs on the M5 timeframe with 4 analysis methods and AutoConfig AI.
          </p>
          <div className="hero-actions">
            <a href={DOWNLOAD_MT4} className="btn btn-primary">⬇️ Download MT4</a>
            <a href={DOWNLOAD_MT5} className="btn btn-secondary">⬇️ Download MT5</a>
            <a href={PURCHASE_LINK} className="btn btn-accent" target="_blank">🛒 Full Version (MT4 Only)</a>
          </div>
          <p className="hero-note">
            <strong>Limited Time Price!</strong> The price increases by 10 USD after every 10 purchases.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Capabilities</span>
            <h2>Everything You Need in One EA</h2>
            <p>Built with precision for automated grid trading on the worlds most popular platforms.</p>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <div key={i} className="glass-card animate-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Trading Logic</span>
            <h2>How It Works</h2>
            <p>Understanding the EAs step-by-step decision-making process on every tick.</p>
          </div>
          <div className="flow-container">
            {[
              { title: "Tick Received", desc: "On every tick, the EA updates the chart display and checks if the current time is within the configured Start/Stop window." },
              { title: "Execution Mode Check", desc: "Determines whether the main logic runs on every tick or only when a new bar appears on the chart." },
              { title: "Entry Signal", desc: "If no positions exist, the EA evaluates the selected analysis method (Candle, SMA20, Alligator, or Ichimoku) with an RSI H1 filter to determine entry direction." },
              { title: "Grid Layering", desc: "If positions exist and GridTrading is enabled, the EA checks distance from the last position and opens a new position with martingale lot sizing." },
              { title: "TP Modification", desc: "Take Profit for all positions is updated to the weighted average entry price (break-even) plus the configured TP in pips." },
              { title: "Stop Loss", desc: "If enabled, stop loss is calculated from the first entry price of the basket for risk protection." },
            ].map((step, i) => (
              <div key={i} className="flow-step animate-in">
                <div className="flow-line">
                  <div className="flow-number">{i + 1}</div>
                </div>
                <div className="flow-content">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARAMETERS */}
      <section id="parameters">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Configuration</span>
            <h2>EA Parameters</h2>
            <p>Fine-tune every aspect of the EAs behavior to match your trading strategy.</p>
          </div>
          <div className="animate-in">
            <div className="params-tabs">
              {[
                { key: "core", label: "Core" },
                { key: "lot", label: "Lot & Grid" },
                { key: "distance", label: "Distance & TP/SL" },
                { key: "time", label: "Time & Config" },
              ].map((t) => (
                <button key={t.key} className={`param-tab ${activeParamTab === t.key ? "active" : ""}`} onClick={() => setActiveParamTab(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>
            <div className="glass-card">
              <div className="params-table-wrapper">
                <table className="params-table">
                  <thead>
                    <tr><th>Parameter</th><th>Default</th><th>Description</th></tr>
                  </thead>
                  <tbody>
                    {PARAM_TABS[activeParamTab].map((p, i) => (
                      <tr key={i}>
                        <td><code>{p.name}</code></td>
                        <td><code>{p.def}</code></td>
                        <td>{p.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTOCONFIG AI */}
      <section style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Intelligence</span>
            <h2>AutoConfig AI System</h2>
            <p>Let the EA automatically optimize parameters based on real-time market volatility.</p>
          </div>
          <div className="features-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}>
            {[
              { icon: "🔍", title: "EURUSD Detection", desc: "Automatically detects EURUSD (or broker variations) and calculates the 365-day Average Daily Range on D1." },
              { icon: "📐", title: "Ratio Derivation", desc: "Derives divisor ratios from the EURUSD ADR: TP÷25, minPipStep÷4, PipStepIncr÷(2×Multiplier^positions), maxPipStep÷100." },
              { icon: "🔄", title: "Dynamic Adaptation", desc: "Calculates the 20-day ADR of the current symbol and applies optimized parameters that recalculate every tick/bar." },
            ].map((f, i) => (
              <div key={i} className="glass-card animate-in">
                <div className="feature-icon">{f.icon}</div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTALLATION */}
      <section id="installation">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Getting Started</span>
            <h2>Installation Guide</h2>
            <p>Get up and running in minutes with this step-by-step guide.</p>
          </div>
          <div className="animate-in">
            <div className="install-tabs">
              <button className={`install-tab ${activeInstall === "mt4" ? "active" : ""}`} onClick={() => setActiveInstall("mt4")}>
                MetaTrader 4
              </button>
              <button className={`install-tab ${activeInstall === "mt5" ? "active" : ""}`} onClick={() => setActiveInstall("mt5")}>
                MetaTrader 5
              </button>
            </div>
            <div className="install-steps glass-card">
              {(activeInstall === "mt4" ? INSTALL_MT4 : INSTALL_MT5).map((step, i) => (
                <div key={i} className="install-step">
                  <span className="step-num">{i + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
              {activeInstall === "mt5" && (
                <div className="install-note">
                  <strong>⚠️ MT5 Note:</strong> Make sure your broker supports <strong>hedging accounts</strong> (not netting) if you plan to run the EA with Hedging or grid trading enabled.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* AUTHORIZATION */}
      <section id="authorization" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Access</span>
            <h2>Authorization & Licensing</h2>
            <p>Check your account status and learn how to get authorized.</p>
          </div>

          <div className="auth-flow animate-in">
            <div className="auth-node">
              <span className="auth-icon">🧪</span>
              <p><strong>Demo accounts</strong> — Always allowed, no authorization needed</p>
            </div>
            <div className="auth-arrow">↓</div>
            <div className="auth-node">
              <span className="auth-icon">✅</span>
              <p><strong>Authorized accounts</strong> — Live accounts registered through broker links</p>
            </div>
            <div className="auth-arrow">↓</div>
            <div className="auth-node">
              <span className="auth-icon">⏳</span>
              <p><strong>Trial mode</strong> — Unauthorized live accounts can trade until the expiration date</p>
            </div>
            <div className="auth-arrow">↓</div>
            <div className="auth-node">
              <span className="auth-icon">❌</span>
              <p><strong>Expired + Unauthorized</strong> — EA will alert and remove itself</p>
            </div>
          </div>

          <div className="account-search animate-in">
            <h3 style={{ textAlign: "center", marginBottom: 16 }}>Check Your Account</h3>
            <div className="search-input-wrapper">
              <input
                type="text"
                className="search-input"
                placeholder="Enter your account number..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setSearchResult(null); }}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div style={{ textAlign: "center", marginTop: 12 }}>
              <button className="btn btn-primary" style={{ padding: "10px 24px", fontSize: "0.85rem", animation: "none" }} onClick={handleSearch}>
                Search
              </button>
            </div>
            {searchResult !== null && (
              <div className={`search-result ${searchResult ? "search-found" : "search-not-found"}`}>
                {searchResult ? "✅ Your account is authorized!" : "❌ Account not found. Register through a broker link below to get authorized."}
              </div>
            )}
          </div>

          <div className="animate-in" style={{ marginTop: 48 }}>
            <h3 style={{ textAlign: "center", marginBottom: 24 }}>Register Through Our Partner Brokers</h3>
            <div className="broker-grid">
              {BROKERS.map((b, i) => (
                <a key={i} href={b.url} className="broker-card" target="_blank" rel="noopener noreferrer">
                  <span>{b.name}</span>
                  <span className="arrow">→</span>
                </a>
              ))}
            </div>
            <p style={{ textAlign: "center", marginTop: 16, fontSize: "0.85rem", color: "var(--text-muted)" }}>
              After registering, send your account number to <a href="https://t.me/SyariefAzman" style={{ color: "var(--accent-cyan)" }}>@SyariefAzman on Telegram</a>
            </p>
          </div>
        </div>
      </section>

      {/* VPS */}
      <section id="vps">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Infrastructure</span>
            <h2>Using a VPS</h2>
            <p>Run your EA 24/7 with maximum uptime and low latency.</p>
          </div>
          <div className="vps-content animate-in">
            <div>
              <ul className="vps-benefits">
                <li><span className="check">✓</span> 24/7 uptime without relying on your PC</li>
                <li><span className="check">✓</span> No disruption from power outages or internet drops</li>
                <li><span className="check">✓</span> Low latency with data center proximity</li>
                <li><span className="check">✓</span> Isolated, secure environment for your trading</li>
              </ul>
              <div className="vps-promo">
                <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Recommended Forex VPS Provider</p>
                <p className="promo-code" style={{ fontSize: "1.2rem" }}>GB Network Solutions</p>
                <p className="price">Reliable. Low Latency. 24/7 Uptime.</p>
                <a href="https://secure.gbnetwork.com/aff.php?aff=515" className="btn btn-accent" style={{ marginTop: 16, display: "inline-flex" }} target="_blank">
                  Order VPS →
                </a>
              </div>
            </div>
            <div className="vps-image">
              <img src="https://www.gbnetwork.my/wp-content/uploads/2023/07/featured-image-GB.jpg" alt="VPS Promotion" />
            </div>
          </div>
        </div>
      </section>

      {/* RISK MANAGEMENT */}
      <section className="risk-section">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">⚠️ Important</span>
            <h2>Risk Management</h2>
            <p>Martingale strategies carry significant risk. Always use proper risk management.</p>
          </div>
          <div className="risk-grid animate-in">
            {[
              { icon: "🏦", title: "Cent Account", desc: "Use a cent account to limit your exposure" },
              { icon: "💰", title: "Min $100 Capital", desc: "Minimum $100 (cent) for 0.01 starting lot" },
              { icon: "⚡", title: "Max Leverage", desc: "Maximum leverage reduces margin usage per trade" },
              { icon: "📉", title: "Ranging Pairs", desc: "Choose low-volatility pairs, avoid trending pairs" },
              { icon: "🎯", title: "Set MaxLot", desc: "Set a reasonable cap to prevent runaway lot sizes" },
              { icon: "🛡️", title: "Enable StopLoss", desc: "Consider enabling SL for additional protection" },
              { icon: "👀", title: "Monitor Daily", desc: "Check your account daily, even on VPS" },
              { icon: "💸", title: "Withdraw Profits", desc: "Withdraw regularly, don't let it grow unchecked" },
            ].map((r, i) => (
              <div key={i} className="risk-item">
                <span className="risk-icon">{r.icon}</span>
                <div>
                  <strong>{r.title}</strong>
                  <p>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label">Support</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-list animate-in">
            {FAQS.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
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

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-brand">EA Budak Ubat</h3>
              <p className="footer-desc">
                A grid-based martingale Expert Advisor for MetaTrader 4 & 5. Designed for ranging currency pairs on the M5 timeframe.
              </p>
              <div className="social-links">
                <a href="https://t.me/SyariefAzman" className="social-link" target="_blank" title="Telegram">💬</a>
                <a href="https://wa.me/60194961568" className="social-link" target="_blank" title="WhatsApp">📱</a>
                <a href="https://github.com/syarief02" className="social-link" target="_blank" title="GitHub">🐙</a>
                <a href="https://www.twitter.com/SyariefAzman" className="social-link" target="_blank" title="Twitter/X">🐦</a>
              </div>
            </div>
            <div>
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#parameters">Parameters</a></li>
                <li><a href="#installation">Installation</a></li>
                <li><a href="#authorization">Authorization</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul className="footer-links">
                <li><a href="https://t.me/SyariefAzman" target="_blank">Telegram: @SyariefAzman</a></li>
                <li><a href="https://wa.me/60194961568" target="_blank">WhatsApp: +60194961568</a></li>
                <li><a href="https://t.me/EABudakUbat" target="_blank">Channel: t.me/EABudakUbat</a></li>
                <li><a href={SIGNAL_LINK} target="_blank">MQL5 Signal Channel</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EA Budak Ubat by Syarief Azman. Licensed under MIT.</p>
            <p className="footer-disclaimer">
              Risk warning: Products traded on margin carry a high level of risk. Martingale strategies can result in total loss of capital. Past performance is not indicative of future results. EA Budak Ubat does not provide investment advice. Use at your own risk. Not available in restricted jurisdictions including USA, EU, UK, North Korea, Myanmar, and Iran.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
