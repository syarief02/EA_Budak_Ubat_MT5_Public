"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AccountChecker from "@/app/components/AccountChecker";

const HEADWAY_SIGNUP_URL = "https://headway.partners/user/signup?hwp=516d6b";
const PARTNER_CODE = "516d6b";
const TELEGRAM_ADMIN = "https://t.me/SyariefAzman";
const WHATSAPP_LINK = "https://wa.me/60194961568";
const TELEGRAM_CHANNEL = "https://t.me/EABudakUbat";

const DOWNLOAD_MT4 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT4%20-%2020260930.ex4";
const DOWNLOAD_MT5 = "https://github.com/syarief02/EA_Budak_Ubat_MT5_Public/raw/main/EA%20-%20Budak%20Ubat%20v1.62%20-%20MT5%20-%2020260930.ex5";

const UNLOCKED_EAS = [
  {
    icon: "📊",
    name: "EA Budak Ubat v1.62",
    platforms: ["MT4", "MT5"],
    desc: "Robot grid martingale terunggul dengan 4 kaedah analisis (Ichimoku, Alligator, Candle & SMA20) serta AutoConfig AI.",
    badge: "Most Popular",
  },
  {
    icon: "🤖",
    name: "GoldMind AI",
    platforms: ["MT5"],
    desc: "Sistem analisis carta XAUUSD (Gold) menggunakan integrasi kecerdasan buatan ChatGPT & 6 tapisan keselamatan.",
    badge: "AI Trading",
  },
  {
    icon: "🐊",
    name: "Aligator Gozaimasu v1.06",
    platforms: ["MT4", "MT5"],
    desc: "EA multi-timeframe trend follower gabungan Bill Williams Alligator, Awesome Oscillator, RSI & Stochastic.",
    badge: "Trend Follower",
  },
  {
    icon: "🏯",
    name: "Encik Moku v1.06",
    platforms: ["MT4", "MT5"],
    desc: "EA berasaskan strategi Ichimoku Kinko Hyo Cloud Breakout merentasi pelbagai timeframe untuk tangkap trend besar.",
    badge: "Trend Strategy",
  },
  {
    icon: "⚡",
    name: "BracketBlitz EA v1.00",
    platforms: ["MT4", "MT5"],
    desc: "Strategi OCO pending orders auto-refreshed setiap 30 saat untuk tangkap breakout dan pergerakan berita besar.",
    badge: "Breakout EA",
  },
  {
    icon: "📐",
    name: "MathEdge Pro v1.1",
    platforms: ["MT4", "MT5"],
    desc: "Sistem auto-trading matematik harian khusus untuk indeks US30 (Dow Jones) & NAS100 (Nasdaq).",
    badge: "Indices",
  },
];

const BROKER_BENEFITS = [
  {
    icon: "🪙",
    title: "Akaun Cent Modal Serendah $10",
    desc: "Sangat ideal untuk EA Martingale & Grid. Modal $10 dipaparkan sebagai 1,000 cents, membolehkan robot membuka lot 0.01 dengan ketahanan margin maksimum.",
  },
  {
    icon: "🚀",
    title: "Leverage Sehingga 1:Unlimited",
    desc: "Fleksibiliti margin luar biasa untuk meminimumkan risiko Margin Call dan memberikan ruang bernafas kepada strategi perlapisan grid.",
  },
  {
    icon: "💳",
    title: "Deposit & Pengeluaran Pantas",
    desc: "Sokongan perbankan tempatan Malaysia (FPX / Online Banking), DuitNow QR, kad bank, serta pelbagai mata wang kripto (USDT TRC20/ERC20).",
  },
  {
    icon: "⚡",
    title: "Spread Rendah & 0% Komisen Deposit",
    desc: "Eksekusi pasaran sepantas kilat tanpa slippage berlebihan, tiada caj tersembunyi pada deposit untuk memaksimumkan keuntungan bersih anda.",
  },
  {
    icon: "🖥️",
    title: "MetaTrader 4 & MetaTrader 5 Penuh",
    desc: "Serasi 100% dengan kedua-dua platform MT4 dan MT5 di desktop Windows mahupun VPS trading anda.",
  },
  {
    icon: "🛡️",
    title: "Sokongan Pelanggan 24/7 & Lesen Sah",
    desc: "Broker antarabangsa dikawal selia dengan dana pelanggan disimpan di akaun berasingan (segregated accounts) demi keselamatan terjamin.",
  },
];

const HEADWAY_FAQS = [
  {
    q: "Mengapa saya disyorkan guna Akaun Cent di Headway untuk EA?",
    a: "EA berasaskan grid martingale seperti EA Budak Ubat memerlukan ketahanan modal apabila pasaran membuat retracement. Dengan akaun Cent, deposit serendah $10 atau $50 akan menjadi 1,000 atau 5,000 unit cent. Ini membolehkan EA berjalan dengan lot 0.01 mikro secara sangat selamat dan meminimumkan risiko drawdown.",
  },
  {
    q: "Berapa modal minimum yang disyorkan?",
    a: "Untuk Akaun Cent: Disyorkan serendah $10 hingga $100. Untuk Akaun Standard: Disyorkan $100 hingga $500 ke atas bergantung kepada tetapan lot dan bilangan pair yang anda jalankan.",
  },
  {
    q: "Adakah robot EA ini betul-betul percuma selepas saya mendaftar?",
    a: "YA, 100% PERCUMA! Anda tidak perlu bayar sebarang yuran bulanan atau kos lesen. Cukup sekadar mendaftar akaun Headway di bawah kod rakan kongsi 516d6b, nombor akaun anda akan dimasukkan ke dalam senarai Whitelist rasmi untuk akses tanpa had.",
  },
  {
    q: "Bagaimana jika saya sudah mempunyai akaun Headway sedia ada?",
    a: "Anda boleh memohon untuk menukar kod IB atau mendaftar akaun dagangan tambahan di bawah kod rakan kongsi 516d6b melalui live support Headway di care@hw.site atau chat di kabinet Headway anda. Kemudian hubungi kami di Telegram @SyariefAzman.",
  },
  {
    q: "Bolehkah saya jalankan EA ini di telefon pintar?",
    a: "Robot Expert Advisor (EA) berformat .ex4/.ex5 perlu dipasang pada MetaTrader di PC, laptop atau Windows VPS. Namun, selepas EA aktif di VPS/PC, anda boleh pantau semua keuntungan dan urus niaga secara langsung melalui aplikasi MetaTrader di telefon anda pada bila-bila masa!",
  },
  {
    q: "Bagaimana cara untuk mendapatkan fail EA selepas mendaftar?",
    a: "Selepas pendaftaran akaun dan deposit, anda boleh muat turun fail EA secara terus di halaman ini, dan semak nombor akaun anda di modul pengesahan akaun di bawah. Anda juga boleh hubungi @SyariefAzman di Telegram untuk bantuan 'set files' optimum.",
  },
];

export default function HeadwayLandingPage() {
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toastText, setToastText] = useState("");

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(PARTNER_CODE);
      setCopied(true);
      setToastText(`Kod Partner "${PARTNER_CODE}" telah disalin!`);
      setTimeout(() => {
        setCopied(false);
        setToastText("");
      }, 3000);
    }
  };

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

    const elements = document.querySelectorAll(".animate-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* TOAST NOTIFICATION */}
      {toastText && (
        <div className="toast-message">
          <span>📋</span>
          <span>{toastText}</span>
        </div>
      )}

      {/* STICKY TOP NAVBAR */}
      <nav className="navbar">
        <div className="container nav-container">
          <Link href="/" className="nav-logo">
            <span className="logo-icon">📊</span>
            <span className="logo-text">EA Budak Ubat</span>
            <span className="version-badge" style={{ background: "rgba(0, 198, 255, 0.15)", color: "#00e5ff", borderColor: "rgba(0, 198, 255, 0.4)" }}>
              Headway Partner
            </span>
          </Link>

          <div className={`nav-links ${mobileNavOpen ? "open" : ""}`}>
            <Link href="/" onClick={() => setMobileNavOpen(false)}>Utama</Link>
            <a href="#perks" onClick={() => setMobileNavOpen(false)}>Kelebihan Broker</a>
            <a href="#unlocked-eas" onClick={() => setMobileNavOpen(false)}>Koleksi EA Percuma</a>
            <a href="#steps" onClick={() => setMobileNavOpen(false)}>Cara Daftar</a>
            <a href="#checker" onClick={() => setMobileNavOpen(false)}>Semak Whitelist</a>
            <a href="#faq" onClick={() => setMobileNavOpen(false)}>FAQ</a>
            <a
              href={HEADWAY_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-headway-primary nav-cta"
              onClick={() => setMobileNavOpen(false)}
            >
              Daftar Headway ➜
            </a>
          </div>

          <button
            className={`mobile-menu-btn ${mobileNavOpen ? "open" : ""}`}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="hero headway-hero">
        <div className="hero-glow hero-glow-headway-1"></div>
        <div className="hero-glow hero-glow-headway-2"></div>
        <div className="container hero-content">
          <div className="hero-badge headway-badge animate-in">
            <span className="badge-dot headway-dot"></span>
            Tawaran Khas Facebook: Akses Percuma Seumur Hidup Robot Trading
          </div>

          <h1 className="hero-title animate-in">
            Buka Akaun <span className="headway-gradient-text">Headway</span> & Dapatkan Robot Trading{" "}
            <span className="gradient-text">EA Budak Ubat</span> Secara 100% PERCUMA!
          </h1>

          <p className="hero-desc animate-in" style={{ maxWidth: "780px", margin: "0 auto 24px" }}>
            Nikmati kelebihan berdagang dengan broker antarabangsa yang mesra robot trading. Akaun Cent serendah{" "}
            <strong>$10</strong>, leverage sehingga <strong>1:Unlimited</strong>, deposit/withdrawal pantas FPX & Crypto, serta pengaktifan whitelist percuma untuk kesemua Expert Advisor kami!
          </p>

          {/* PARTNER CODE HIGHLIGHT BOX */}
          <div className="partner-code-box animate-in" style={{ maxWidth: "620px", margin: "0 auto 30px" }}>
            <div className="code-details">
              <span className="code-title">Kod Rakan Kongsi Rasmi (Partner Code):</span>
              <span className="code-value">{PARTNER_CODE}</span>
            </div>
            <button
              type="button"
              className={`copy-btn-headway ${copied ? "copied" : ""}`}
              onClick={handleCopyCode}
            >
              {copied ? "✅ Disalin!" : "📋 Salin Kod"}
            </button>
          </div>

          {/* HERO ACTIONS */}
          <div className="hero-actions animate-in" style={{ justifyContent: "center", gap: "16px" }}>
            <a
              href={HEADWAY_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-headway-primary"
              style={{ fontSize: "1.1rem", padding: "16px 36px" }}
            >
              🚀 DAFTAR AKAUN HEADWAY SEKARANG
            </a>
            <a href="#steps" className="btn btn-secondary btn-lg">
              📖 Panduan Pendaftaran
            </a>
          </div>

          {/* TRUST BADGES */}
          <div className="trust-badges-bar animate-in">
            <div className="trust-badge-pill">
              <span className="icon">🪙</span>
              <span>Akaun Cent Modal $10</span>
            </div>
            <div className="trust-badge-pill">
              <span className="icon">⚡</span>
              <span>Leverage 1:Unlimited</span>
            </div>
            <div className="trust-badge-pill">
              <span className="icon">💳</span>
              <span>Deposit FPX, DuitNow & USDT</span>
            </div>
            <div className="trust-badge-pill">
              <span className="icon">🛡️</span>
              <span>Whitelist Percuma Seumur Hidup</span>
            </div>
            <div className="trust-badge-pill">
              <span className="icon">🤖</span>
              <span>Sokongan MT4 & MT5</span>
            </div>
          </div>
        </div>
      </header>

      {/* WHY HEADWAY SECTION */}
      <section id="perks">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label headway-label">Kelebihan Broker</span>
            <h2>Mengapa Headway Broker Terbaik Untuk Robot EA?</h2>
            <p>Dibina untuk memberikan prestasi optimum kepada pedagang algoritma dan pengguna Expert Advisor.</p>
          </div>

          <div className="perks-grid animate-in">
            {BROKER_BENEFITS.map((benefit, idx) => (
              <div key={idx} className="perk-card">
                <div className="perk-icon-wrap">{benefit.icon}</div>
                <h3 className="perk-title">{benefit.title}</h3>
                <p className="perk-desc">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET FOR FREE */}
      <section id="unlocked-eas" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label headway-label">Bonus Percuma Tanpa Had</span>
            <h2>Koleksi Robot Trading Yang Anda Akan Dapat</h2>
            <p>Daftar satu akaun Headway untuk membuka akses penuh kepada seluruh ekosistem trading bot kami.</p>
          </div>

          <div className="ea-unlock-grid animate-in">
            {UNLOCKED_EAS.map((ea, idx) => (
              <div key={idx} className="ea-unlock-card">
                <span className="ea-unlock-badge">{ea.badge}</span>
                <div style={{ fontSize: "2.4rem", marginBottom: "12px" }}>{ea.icon}</div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "6px" }}>{ea.name}</h3>
                <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
                  {ea.platforms.map((plat) => (
                    <span
                      key={plat}
                      style={{
                        fontSize: "0.75rem",
                        padding: "2px 8px",
                        borderRadius: "6px",
                        background: "rgba(0, 198, 255, 0.1)",
                        color: "#00e5ff",
                        border: "1px solid rgba(0, 198, 255, 0.2)",
                        fontWeight: 600,
                      }}
                    >
                      {plat}
                    </span>
                  ))}
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", lineHeight: 1.6 }}>{ea.desc}</p>
              </div>
            ))}
          </div>

          {/* DOWNLOAD LINKS ROW */}
          <div
            className="animate-in"
            style={{
              marginTop: "40px",
              padding: "24px",
              background: "var(--bg-card)",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border-glass)",
              textAlign: "center",
            }}
          >
            <h4 style={{ marginBottom: "12px", fontSize: "1.1rem" }}>Muat Turun Fail EA Budak Ubat v1.62:</h4>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <a href={DOWNLOAD_MT4} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                📥 Download MT4 (.ex4)
              </a>
              <a href={DOWNLOAD_MT5} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                📥 Download MT5 (.ex5)
              </a>
              <a
                href={HEADWAY_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-headway-primary"
              >
                Daftar Akaun Untuk Pengaktifan ➜
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3 STEPS TUTORIAL */}
      <section id="steps">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label headway-label">Langkah Mudah</span>
            <h2>3 Langkah Pantas Untuk Mulakan</h2>
            <p>Hanya ambil masa kurang daripada 3 minit untuk mendaftar dan mengaktifkan robot trading anda.</p>
          </div>

          <div className="steps-cards-grid animate-in">
            <div className="step-card">
              <div className="step-badge">1</div>
              <h3 className="step-title">Daftar Akaun Headway</h3>
              <p className="step-body">
                Klik pautan pendaftaran rasmi di halaman ini. Pastikan kod partner <strong>{PARTNER_CODE}</strong> tertera semasa pendaftaran untuk melayakkan anda menerima lesen percuma.
              </p>
              <div style={{ marginTop: "20px" }}>
                <a
                  href={HEADWAY_SIGNUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-headway-primary"
                  style={{ width: "100%", fontSize: "0.9rem" }}
                >
                  Buka Link Daftar ➜
                </a>
              </div>
            </div>

            <div className="step-card">
              <div className="step-badge">2</div>
              <h3 className="step-title">Buka Akaun Cent / Standard</h3>
              <p className="step-body">
                Di Dashboard Headway, buat akaun dagangan baharu (pilih <strong>MT4</strong> atau <strong>MT5</strong>, jenis <strong>Cent</strong> atau <strong>Standard</strong>). Lakukan deposit permulaan (serendah $10-$50 untuk akaun Cent).
              </p>
              <div
                style={{
                  marginTop: "20px",
                  padding: "12px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                }}
              >
                💡 <em>Tip: Akaun Cent sangat digalakkan untuk ketahanan margin modal kecil.</em>
              </div>
            </div>

            <div className="step-card">
              <div className="step-badge">3</div>
              <h3 className="step-title">Pengesahan & Whitelist EA</h3>
              <p className="step-body">
                Masukkan nombor akaun MT4/MT5 anda ke dalam ruangan semakan di bawah, atau hantar nombor akaun ke Telegram{" "}
                <a href={TELEGRAM_ADMIN} target="_blank" rel="noopener noreferrer" style={{ color: "#00e5ff", fontWeight: 700 }}>
                  @SyariefAzman
                </a>{" "}
                untuk pengaktifan segera tanpa had tempoh.
              </p>
              <div style={{ marginTop: "20px" }}>
                <a
                  href={TELEGRAM_ADMIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ width: "100%", fontSize: "0.9rem" }}
                >
                  💬 Chat Admin di Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE WHITELIST CHECKER */}
      <section id="checker" style={{ background: "var(--bg-secondary)" }}>
        <div className="container">
          <div className="section-header animate-in">
            <span className="label headway-label">Semakan Akaun</span>
            <h2>Semak Status Whitelist Akaun Anda</h2>
            <p>Masukkan nombor akaun MT4 / MT5 anda untuk mengesahkan status pengaktifan sistem.</p>
          </div>

          <div className="animate-in" style={{ maxWidth: "850px", margin: "0 auto" }}>
            <AccountChecker
              title="Pengesahan Lesen Akaun MetaTrader"
              subtitle="Semak sama ada akaun Headway anda sudah tersenarai dalam pangkalan data sah kami."
            />
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq">
        <div className="container">
          <div className="section-header animate-in">
            <span className="label headway-label">Soalan Lazim</span>
            <h2>Pertanyaan Kerap Ditanya (FAQ)</h2>
            <p>Segala maklumat yang anda perlukan sebelum memulakan dagangan automatik bersama Headway.</p>
          </div>

          <div className="faq-list animate-in" style={{ maxWidth: "850px", margin: "0 auto" }}>
            {HEADWAY_FAQS.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? "open" : ""}`}>
                <button
                  className="faq-question"
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

      {/* FINAL HIGH-CONVERTING CTA BANNER */}
      <section
        style={{
          background: "linear-gradient(135deg, #06192e 0%, #0a0e1a 100%)",
          borderTop: "1px solid rgba(0, 198, 255, 0.2)",
          borderBottom: "1px solid rgba(0, 198, 255, 0.2)",
          padding: "80px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <span style={{ fontSize: "3rem", display: "block", marginBottom: "16px" }}>🎁</span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginBottom: "16px" }}>
              Jangan Lepaskan Peluang Ini!
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginBottom: "32px", lineHeight: 1.7 }}>
              Daftar akaun Headway sekarang di bawah kod rakan kongsi <strong>{PARTNER_CODE}</strong> dan mula jana profit konsisten secara automatik dengan EA Budak Ubat.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
              <a
                href={HEADWAY_SIGNUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-headway-primary"
                style={{ fontSize: "1.1rem", padding: "16px 36px" }}
              >
                🚀 DAFTAR AKAUN HEADWAY SEKARANG
              </a>
              <a
                href={TELEGRAM_ADMIN}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-lg"
              >
                💬 Hubungi Kami di Telegram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <h3 className="footer-brand headway-footer-brand">EA Budak Ubat × Headway</h3>
              <p className="footer-desc">
                Rakan kongsi rasmi penyedia sistem dagangan automatik (Expert Advisor) profesional untuk platform MetaTrader 4 & MetaTrader 5.
              </p>
              <div className="social-links">
                <a href={TELEGRAM_ADMIN} className="social-link" target="_blank" rel="noopener noreferrer" title="Telegram Admin">💬</a>
                <a href={WHATSAPP_LINK} className="social-link" target="_blank" rel="noopener noreferrer" title="WhatsApp Admin">📱</a>
                <a href={TELEGRAM_CHANNEL} className="social-link" target="_blank" rel="noopener noreferrer" title="Telegram Channel">📢</a>
              </div>
            </div>

            <div>
              <h4>Pautan Pantas</h4>
              <ul className="footer-links">
                <li><a href="#perks">Kelebihan Broker</a></li>
                <li><a href="#unlocked-eas">Koleksi EA Percuma</a></li>
                <li><a href="#steps">Cara Pendaftaran</a></li>
                <li><a href="#checker">Semak Status Whitelist</a></li>
                <li><a href="#faq">Soalan Lazim (FAQ)</a></li>
              </ul>
            </div>

            <div>
              <h4>Bantuan & Sokongan</h4>
              <ul className="footer-links">
                <li><a href={TELEGRAM_ADMIN} target="_blank" rel="noopener noreferrer">Telegram: @SyariefAzman</a></li>
                <li><a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">WhatsApp: +60194961568</a></li>
                <li><a href={TELEGRAM_CHANNEL} target="_blank" rel="noopener noreferrer">Channel: t.me/EABudakUbat</a></li>
                <li><a href="mailto:care@hw.site">Emel Support: care@hw.site</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} EA Budak Ubat & Headway Official Partner. Hak Cipta Terpelihara.</p>
            <p className="footer-disclaimer">
              Amaran Risiko: Perdagangan Forex, Komoditi dan CFD dengan leveraj membawa risiko kerugian modal yang tinggi. Prestasi masa lalu bukan jaminan kejayaan masa hadapan. EA Budak Ubat tidak menyediakan nasihat pelaburan secara langsung. Sila pastikan anda memahami risiko yang terlibat sebelum memulakan dagangan.
            </p>
          </div>
        </div>
      </footer>

      {/* FLOATING MOBILE CTA BAR */}
      <div className="floating-mobile-bar">
        <button
          type="button"
          className="copy-btn-headway"
          onClick={handleCopyCode}
          style={{ padding: "10px 14px", fontSize: "0.85rem" }}
        >
          {copied ? "✅ Disalin" : "📋 Kod: 516d6b"}
        </button>
        <a
          href={HEADWAY_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-headway-primary"
        >
          🚀 Daftar Headway
        </a>
      </div>
    </>
  );
}
