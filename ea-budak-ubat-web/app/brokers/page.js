"use client";

import Link from "next/link";

import "../home.css";
import { copyText } from "@/lib/clipboard";
import { useFlash } from "@/lib/useFlash";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import Icon from "@/app/components/Icon";
import RotatingAdBanner from "@/app/components/RotatingAdBanner";
import LicenseClaim from "@/app/components/LicenseClaim";
import { PARTNER_BROKERS, CLIENT_PERKS, FREE_LICENSE_MIN_DEPOSIT } from "@/lib/partnerBrokers";

export default function BrokersPage() {
  const [copied, flashCopied] = useFlash(2000); // { id, ok } while the label shows

  const copyCode = async (id) => {
    flashCopied({ id, ok: await copyText(id) });
  };

  return (
    <div className="hp">
      <SiteNav active="/brokers" ctaHref="/#authorization" ctaLabel="Check my license" />

      <main>
        <section className="hp-page-head">
          <div className="container">
            <nav className="hp-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> <span aria-hidden="true">/</span> <span>Partner brokers</span>
            </nav>
            <h1>Partner brokers</h1>
            <p className="hp-lead">
              Open a live MT4 or MT5 account with any broker below, deposit at least {FREE_LICENSE_MIN_DEPOSIT} USD
              (any account type), then <a href="#claim">request your license</a> with the broker name, the platform
              (MT4 or MT5) and the account number. Your account is then whitelisted for EA Budak Ubat permanently.
            </p>
            <p className="hp-disclosure hp-disclosure-left">
              Disclosure: these are partner (IB/affiliate) links. The broker pays us a commission based on your trading,
              which is what funds the free license. Broker conditions change, so check the broker&rsquo;s own site before
              you deposit. Margin trading carries a high risk of loss.
            </p>
          </div>
        </section>

        <section className="hp-section hp-section-flush">
          <div className="container">
            <div className="hp-broker-grid">
              {PARTNER_BROKERS.map((b, i) => (
                <article key={b.name} className="hp-card hp-broker" style={{ "--accent": b.color }}>
                  <div className="hp-broker-top">
                    <h2>{b.name}</h2>
                    <span className="hp-tag">{b.tag}</span>
                  </div>
                  <p className="hp-broker-headline">{b.headline}</p>
                  <p className="hp-broker-desc">{b.desc}</p>
                  <ul className="hp-broker-features">
                    {b.features.map((f) => (
                      <li key={f}><Icon name="check" size={15} /> {f}</li>
                    ))}
                  </ul>
                  <dl className="hp-broker-meta">
                    <div><dt>Broker minimum</dt><dd>{b.minDeposit}</dd></div>
                    <div>
                      <dt>Partner code</dt>
                      <dd>
                        <button type="button" className="hp-copy" onClick={() => copyCode(b.id)} title="Copy partner code">
                          {b.id} <span>{copied?.id === b.id ? (copied.ok ? "Copied" : "Copy failed") : "Copy"}</span>
                        </button>
                      </dd>
                    </div>
                  </dl>
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                    className={`hp-btn hp-btn-block ${i < 3 ? "hp-btn-primary" : "hp-btn-ghost"}`}
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
          </div>
        </section>

        <section className="hp-section hp-section-alt" id="perks">
          <div className="container">
            <div className="hp-head hp-head-center">
              <p className="hp-eyebrow">What you get</p>
              <h2>Benefits of trading through a partner link</h2>
            </div>
            <div className="hp-feature-grid">
              {CLIENT_PERKS.map((p) => (
                <div key={p.title} className="hp-feature">
                  <span className="hp-feature-icon"><Icon name="check" size={20} /></span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hp-section hp-section-tight" id="claim">
          <div className="container hp-narrow">
            <div className="hp-head hp-head-center">
              <p className="hp-eyebrow">Already opened your account?</p>
              <h2>Request your free license</h2>
              <p className="hp-head-sub">
                Tell us the broker, the platform and the account number in one message, so we can whitelist the right
                build straight away. Use the file we send you (or the current download) and delete any older copy:
                files from before your approval will not recognise the account.
              </p>
            </div>
            <LicenseClaim />
            <div className="hp-card hp-claim-faq">
              <h3>Already have an account with one of these brokers?</h3>
              <p>
                Only accounts registered under our partner link qualify. If yours was opened another way, ask the
                broker&rsquo;s support to move it to our partner code (shown on the broker&rsquo;s card above; the
                broker decides), or open a new account through the link. &ldquo;Opened this account without our
                link?&rdquo; in the form above writes that request for you. Once it is under our code, request your
                license here.
              </p>
              <Link href="/#authorization" className="hp-link">
                Check whether your account is already whitelisted <Icon name="arrowRight" size={16} />
              </Link>
            </div>
            <div className="hp-card hp-claim-faq" id="partnerships">
              <h3>Representing a broker or prop firm?</h3>
              <p>
                Please send partnership offers in writing from your official company email to
                support@eabudakubat.com. Include the regulated entity and its licence number, the rebate per lot on
                FX and gold, the account types (including cent), your rules for Expert Advisors and how referred
                accounts are reported. We review every written offer and reply by email.
              </p>
              <a href="mailto:support@eabudakubat.com?subject=Broker%20partnership%20enquiry" className="hp-link">
                Email support@eabudakubat.com <Icon name="arrowRight" size={16} />
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
