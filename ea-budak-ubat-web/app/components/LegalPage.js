import Link from "next/link";

// Shared layout for /privacy and /terms (server component: plain readable text, no client JS).
export default function LegalPage({ title, updated, children }) {
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <Link href="/" className="nav-brand">👑 EA Budak Ubat</Link>
          <ul className="nav-links">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/privacy">Privacy</Link></li>
            <li><Link href="/terms">Terms</Link></li>
          </ul>
        </div>
      </nav>

      <main className="container" style={{ paddingTop: "130px", paddingBottom: "80px", maxWidth: "860px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.88rem", color: "var(--text-muted)", marginBottom: "20px" }}>
          <Link href="/" style={{ color: "var(--text-secondary)", textDecoration: "none" }}>Home</Link>
          <span>/</span>
          <span style={{ color: "#00f0ff", fontWeight: 700 }}>{title}</span>
        </div>
        <h1 style={{ fontSize: "clamp(1.9rem, 4vw, 2.6rem)", fontWeight: 900, lineHeight: 1.2, marginBottom: "8px" }}>
          <span className="gradient-text">{title}</span>
        </h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "36px" }}>Last updated: {updated}</p>
        <article className="legal-body" style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.02rem" }}>
          {children}
        </article>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-bottom">
            <p>
              © {new Date().getFullYear()} EA Budak Ubat by Syarief Azman ·{" "}
              <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms of Use</Link> ·{" "}
              <a href="mailto:support@eabudakubat.com">support@eabudakubat.com</a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export function H2({ children }) {
  return <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)", margin: "36px 0 12px" }}>{children}</h2>;
}
