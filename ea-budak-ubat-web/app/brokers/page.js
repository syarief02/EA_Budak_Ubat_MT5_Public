"use client";

import { useState } from "react";
import Link from "next/link";

import "../home.css";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import Icon from "@/app/components/Icon";
import RotatingAdBanner from "@/app/components/RotatingAdBanner";
import { PARTNER_BROKERS, CLIENT_PERKS, FREE_LICENSE_MIN_DEPOSIT } from "@/lib/partnerBrokers";

export default function BrokersPage() {
  const [copied, setCopied] = useState(null);

  const copyCode = (id) => {
    try {
      navigator.clipboard?.writeText(id);
    } catch (e) {}
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
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
              (any account type) and send the account number to{" "}
              <a href="https://t.me/SyariefAzman" target="_blank" rel="noopener noreferrer">@SyariefAzman</a>. Your
              account is then whitelisted for EA Budak Ubat permanently.
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
                          {b.id} <span>{copied === b.id ? "Copied" : "Copy"}</span>
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

        <section className="hp-section hp-section-tight">
          <div className="container">
            <div className="hp-cta">
              <div>
                <h2>Already opened your account?</h2>
                <p>
                  Send your account number on Telegram. Once it is whitelisted, download the current build: files from
                  before your approval will not recognise the account.
                </p>
              </div>
              <div className="hp-actions">
                <a href="https://t.me/SyariefAzman" target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn-primary">
                  <Icon name="message" size={18} /> Message @SyariefAzman
                </a>
                <Link href="/#authorization" className="hp-btn hp-btn-ghost">
                  <Icon name="key" size={18} /> Check my license
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
