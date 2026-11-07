import Link from "next/link";
import { FEATURED_BROKERS, PARTNER_BROKERS } from "@/lib/partnerBrokers";

const MQL5_MARKET_LINK = "https://www.mql5.com/en/market/product/195399";
const SIGNAL_LINK = "https://www.mql5.com/en/channels/eabudakubat";

// Footer for the home and /brokers pages; uses the shared .footer styles from globals.css.
export default function SiteFooter() {
  return (
    <footer className="footer hp-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="hp-brand hp-footer-brand">
              <img src="/icon.png" alt="" width={30} height={30} />
              <span>EA Budak Ubat</span>
            </Link>
            <p className="footer-desc">
              Expert Advisors, indicators, utilities and libraries for MetaTrader 4 and 5 by Syarief Azman, building trading software since 2014.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            <ul className="footer-links">
              <li><Link href="/ea-budak-ubat">EA Budak Ubat</Link></li>
              <li><Link href="/products">All products</Link></li>
              <li><Link href="/bubat-ai">Bubat AI</Link></li>
              <li><Link href="/tools">Trader tools</Link></li>
              <li><Link href="/guide">User guide</Link></li>
              <li><Link href="/learn">Forex Quest academy</Link></li>
              <li><Link href="/community">Community</Link></li>
              <li><Link href="/changelog">Changelog</Link></li>
            </ul>
          </div>
          <div>
            <h4>Partner brokers</h4>
            <ul className="footer-links">
              {FEATURED_BROKERS.map((b) => (
                <li key={b.name}>
                  <a href={b.url} target="_blank" rel="noopener noreferrer sponsored">{b.name}</a>
                </li>
              ))}
              <li><Link href="/brokers">All {PARTNER_BROKERS.length} partner brokers</Link></li>
              <li><Link href="/#authorization">License checker</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul className="footer-links">
              <li><a href="mailto:support@eabudakubat.com">support@eabudakubat.com</a></li>
              <li><a href="https://t.me/SyariefAzman" target="_blank" rel="noopener noreferrer">Telegram: @SyariefAzman</a></li>
              <li><a href="https://t.me/EABudakUbat" target="_blank" rel="noopener noreferrer">Telegram channel</a></li>
              <li><a href="https://www.twitter.com/SyariefAzman" target="_blank" rel="noopener noreferrer">X: @SyariefAzman</a></li>
              <li><a href={MQL5_MARKET_LINK} target="_blank" rel="noopener noreferrer">MQL5 Market</a></li>
              <li><a href={SIGNAL_LINK} target="_blank" rel="noopener noreferrer">MQL5 channel</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} EA Budak Ubat by Syarief Azman. All rights reserved. ·{" "}
            <Link href="/privacy">Privacy Policy</Link> · <Link href="/terms">Terms of Use</Link>
          </p>
          <p className="footer-disclaimer">
            Risk warning: trading on margin carries a high level of risk. Grid and martingale systems can lose a significant
            part of your capital. Past performance does not guarantee future results. Test on a demo account first. Partner
            broker links are affiliate (IB) links and we may receive a commission. Not available in restricted jurisdictions.
          </p>
        </div>
      </div>
    </footer>
  );
}
