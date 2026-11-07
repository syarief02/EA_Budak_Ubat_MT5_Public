"use client";

import { useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { href: "/ea-budak-ubat", label: "EA Budak Ubat" },
  { href: "/brokers", label: "Brokers" },
  { href: "/products", label: "Products" },
  { href: "/tools", label: "Tools" },
  { href: "/guide", label: "Guide" },
  { href: "/changelog", label: "Changelog" },
  { href: "/about", label: "About" },
];

// Navigation for the home and /brokers pages; uses the shared .navbar styles from globals.css.
export default function SiteNav({ active = "", ctaHref = "/#broker-partners", ctaLabel = "Get the EA free" }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="navbar hp-nav" aria-label="Main">
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
          <li>
            <a href={ctaHref} className="nav-cta hp-nav-cta" onClick={close}>
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
    </nav>
  );
}
