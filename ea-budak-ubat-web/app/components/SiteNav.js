"use client";

import { useState } from "react";
import Link from "next/link";

// The nav brings its own styles, so any page can use it without importing home.css itself.
import "@/app/home.css";

const NAV_LINKS = [
  { href: "/ea-budak-ubat", label: "EA Budak Ubat" },
  { href: "/brokers", label: "Brokers" },
  { href: "/products", label: "Products" },
  { href: "/tools", label: "Tools" },
  { href: "/guide", label: "Guide" },
  { href: "/changelog", label: "Changelog" },
  { href: "/about", label: "About" },
];

// Site-wide navigation (every page uses it). Uses the shared .navbar styles from globals.css plus hp- styles.
// `sections` adds an "On this page" row of in-page anchors for long pages: a second row on desktop, and a group
// inside the menu on phones and tablets.
export default function SiteNav({
  active = "",
  ctaHref = "/#broker-partners",
  ctaLabel = "Get the EA free",
  ctaExternal = false,
  sections = [],
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const hasSections = sections.length > 0;
  const ctaProps = ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <>
    <nav className={`navbar hp-nav hp${hasSections ? " hp-nav-has-sub" : ""}`} aria-label="Main">
      <div className="container">
        <Link href="/" className="hp-brand" onClick={close}>
          <img src="/icon.png" alt="" width={30} height={30} />
          <span>EA Budak Ubat</span>
        </Link>
        <ul className={`nav-links ${open ? "open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={close}
                className={active === l.href ? "hp-nav-active" : undefined}
                aria-current={active === l.href ? "page" : undefined}
              >
                {l.label}
              </Link>
            </li>
          ))}
          {hasSections && (
            <>
              <li className="hp-nav-sec-head" aria-hidden="true">On this page</li>
              {sections.map((s) => (
                <li key={s.href} className="hp-nav-sec">
                  <a href={s.href} onClick={close}>
                    {s.label}
                  </a>
                </li>
              ))}
            </>
          )}
          <li>
            <a href={ctaHref} className="nav-cta hp-nav-cta" onClick={close} {...ctaProps}>
              {ctaLabel}
            </a>
          </li>
        </ul>
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      {hasSections && (
        <div className="hp-subnav">
          <div className="container">
            <span className="hp-subnav-label">On this page</span>
            <ul>
              {sections.map((s) => (
                <li key={s.href}>
                  <a href={s.href}>{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
    {/* Pushes the page down by the height of the desktop "On this page" row (the nav is fixed). */}
    {hasSections && <div className="hp-subnav-spacer" aria-hidden="true" />}
    </>
  );
}
