"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import "../home.css";
import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import Icon from "@/app/components/Icon";
import {
  PRODUCT_TYPES,
  getProductTypeKey,
  getProductTypeByKey,
  getProductSubcategory,
} from "@/lib/productTypes";

const SELLER_URL = "https://www.mql5.com/en/users/syarief.azman/seller";
const PLATFORMS = [
  { key: "all", label: "All platforms" },
  { key: "MT5", label: "MT5" },
  { key: "MT4", label: "MT4" },
];

function matchesSearch(p, q) {
  if (!q) return true;
  return [p.name, p.tagline, p.description, p.category, p.target_assets]
    .some((v) => String(v || "").toLowerCase().includes(q));
}

function ProductCard({ p }) {
  const type = getProductTypeByKey(getProductTypeKey(p));
  const sub = getProductSubcategory(p);
  const platforms = Array.isArray(p.platforms) ? [...p.platforms].sort().reverse() : [];
  const features = Array.isArray(p.features) ? p.features.slice(0, 4) : [];

  return (
    <article className="hp-card hp-product" style={{ "--accent": type.color }}>
      <div className="hp-product-top">
        <span className="hp-type">{type.label}</span>
        {platforms.length > 0 && <span className="hp-product-platforms">{platforms.join(" · ")}</span>}
      </div>
      <div>
        <h3>{p.name}</h3>
        <p className="hp-product-sub">{[sub, p.version].filter(Boolean).join(" · ")}</p>
      </div>
      {p.tagline && <p className="hp-product-tagline">{p.tagline}</p>}
      {features.length > 0 && (
        <ul className="hp-product-features">
          {features.map((f) => (
            <li key={f}><Icon name="check" size={14} /> {f}</li>
          ))}
        </ul>
      )}
      <div className="hp-product-foot">
        <div className="hp-product-price">
          <span>Price</span>
          <strong>{p.price}</strong>
        </div>
        <div className="hp-product-actions">
          {p.has_page ? (
            <Link href={`/${p.slug}`} className="hp-btn hp-btn-sm hp-btn-primary">
              View details
            </Link>
          ) : p.market_url ? (
            <a
              href={p.market_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hp-btn hp-btn-sm hp-btn-primary"
              aria-label={`${p.name} on MQL5 Market (opens in a new tab)`}
            >
              MQL5 Market <Icon name="external" size={14} />
            </a>
          ) : null}
          {p.has_page && p.market_url && (
            <a
              href={p.market_url}
              target="_blank"
              rel="noopener noreferrer"
              className="hp-btn hp-btn-sm hp-btn-ghost"
              aria-label={`${p.name} on MQL5 Market (opens in a new tab)`}
            >
              MQL5 <Icon name="external" size={14} />
            </a>
          )}
          {p.download_url && (
            <a href={p.download_url} className="hp-btn hp-btn-sm hp-btn-ghost" aria-label={`Download ${p.name}`}>
              <Icon name="download" size={14} /> Download
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [type, setType] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Deep links such as /products?type=indicator
    const fromUrl = new URLSearchParams(window.location.search).get("type");
    if (fromUrl && getProductTypeByKey(fromUrl)) setType(fromUrl);

    fetch("/api/products")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.products)) setProducts(json.products);
        else setFailed(true);
      })
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  }, []);

  const chooseType = (key) => {
    setType(key);
    try {
      window.history.replaceState(null, "", key === "all" ? "/products" : `/products?type=${key}`);
    } catch (e) {}
  };

  // Platform and search narrow everything; the type tabs show how many remain in each type.
  const narrowed = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        (platform === "all" || (Array.isArray(p.platforms) && p.platforms.includes(platform))) &&
        matchesSearch(p, q)
    );
  }, [products, platform, search]);

  const groups = useMemo(
    () =>
      PRODUCT_TYPES.map((t) => ({ ...t, items: narrowed.filter((p) => getProductTypeKey(p) === t.key) })),
    [narrowed]
  );

  const visibleGroups = groups.filter((g) => (type === "all" || g.key === type) && g.items.length > 0);
  const activeType = getProductTypeByKey(type);

  const resetFilters = () => {
    setSearch("");
    setPlatform("all");
    chooseType("all");
  };

  return (
    <div className="hp">
      <SiteNav active="/products" />

      <main>
        <section className="hp-page-head">
          <div className="container">
            <nav className="hp-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> <span aria-hidden="true">/</span> <span>Products</span>
            </nav>
            <h1>Products</h1>
            <p className="hp-lead">
              Expert Advisors, indicators, trade utilities and developer libraries for MetaTrader 4 and 5. Our own EAs
              are free through a partner broker; the rest are sold on the official MQL5 Market.
            </p>

            <div className="hp-filters">
              <div className="hp-tabs" role="group" aria-label="Product type">
                <button type="button" className="hp-tab" aria-pressed={type === "all"} onClick={() => chooseType("all")}>
                  All products <span className="hp-count">{narrowed.length}</span>
                </button>
                {groups.map((g) => (
                  <button
                    key={g.key}
                    type="button"
                    className="hp-tab"
                    style={{ "--accent": g.color }}
                    aria-pressed={type === g.key}
                    onClick={() => chooseType(g.key)}
                  >
                    <span className="hp-dot" aria-hidden="true" />
                    {g.plural} <span className="hp-count">{g.items.length}</span>
                  </button>
                ))}
              </div>

              <div className="hp-filter-row">
                <label className="hp-search">
                  <span className="hp-visually-hidden">Search products</span>
                  <input
                    type="search"
                    placeholder="Search by name, strategy or market (e.g. gold, divergence, session)"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </label>
                <div className="hp-seg" role="group" aria-label="Platform">
                  {PLATFORMS.map((pl) => (
                    <button
                      key={pl.key}
                      type="button"
                      aria-pressed={platform === pl.key}
                      onClick={() => setPlatform(pl.key)}
                    >
                      {pl.label}
                    </button>
                  ))}
                </div>
              </div>

              {activeType && <p className="hp-type-desc">{activeType.desc}</p>}
            </div>
          </div>
        </section>

        <section className="hp-section hp-section-flush">
          <div className="container">
            {loading ? (
              <p className="hp-status">Loading products…</p>
            ) : failed && products.length === 0 ? (
              <p className="hp-status">
                The product list could not be loaded. Browse the full catalogue on{" "}
                <a href={SELLER_URL} target="_blank" rel="noopener noreferrer" className="hp-link">MQL5 Market</a>.
              </p>
            ) : visibleGroups.length === 0 ? (
              <div className="hp-status">
                <p>No products match these filters.</p>
                <button type="button" className="hp-btn hp-btn-sm hp-btn-ghost" onClick={resetFilters}>
                  Reset filters
                </button>
              </div>
            ) : (
              visibleGroups.map((g) => (
                <div key={g.key} className="hp-group" id={g.key} style={{ "--accent": g.color }}>
                  <div className="hp-group-head">
                    <h2>{g.plural}</h2>
                    <span className="hp-count">{g.items.length}</span>
                  </div>
                  {type === "all" && <p className="hp-group-desc">{g.desc}</p>}
                  <div className="hp-product-grid">
                    {g.items.map((p) => (
                      <ProductCard key={p.slug || p.name} p={p} />
                    ))}
                  </div>
                </div>
              ))
            )}

            <div className="hp-card hp-standalone hp-gap-top">
              <div>
                <p className="hp-eyebrow">MQL5 Market seller</p>
                <h3>All Market products in one place</h3>
                <p>
                  Every MQL5 Market product passes MetaQuotes&rsquo; automated validation before it is listed, and is
                  delivered and updated through your MetaTrader terminal.
                </p>
              </div>
              <a href={SELLER_URL} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn-ghost">
                <Icon name="store" size={18} /> Seller profile on MQL5
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
