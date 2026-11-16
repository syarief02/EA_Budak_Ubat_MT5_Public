import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import SiteNav from "@/app/components/SiteNav";
import SiteFooter from "@/app/components/SiteFooter";
import Icon from "@/app/components/Icon";
import PromoVideo from "@/app/components/PromoVideo";
import { getCatalog } from "@/lib/productCatalog";
import { getProductType, getProductSubcategory, productPath } from "@/lib/productTypes";
import { BASE_OPEN_GRAPH } from "@/lib/siteMetadata";

// One page per MQL5 Market product, generated from the catalog (Supabase `mql_products`, or the fallback list).
// Pages are rebuilt hourly, and a product added after a deploy is rendered on its first visit.
export const revalidate = 3600;
export const dynamicParams = true;

const SITE = "https://eabudakubat.com";

export async function generateStaticParams() {
  const all = await getCatalog();
  return all.filter((p) => p.slug && !p.has_page).map((p) => ({ slug: p.slug }));
}

async function loadProduct(slug) {
  const all = await getCatalog();
  return { product: all.find((p) => p.slug === slug), all };
}

function platformsOf(p) {
  return Array.isArray(p.platforms) ? [...p.platforms].sort() : [];
}

function platformName(platforms) {
  const nums = platforms.map((x) => String(x).replace(/^MT/i, ""));
  return nums.length ? `MetaTrader ${nums.join(" & ")}` : "MetaTrader";
}

function clip(text, max) {
  const s = String(text || "").replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "") + "…";
}

function priceNumber(price) {
  const n = parseFloat(String(price || "").replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { product: p } = await loadProduct(slug);
  if (!p || p.has_page) return { title: "Product not found" };
  const type = getProductType(p);
  const plats = platformsOf(p);
  const title = `${p.name}: ${plats.join("/")} ${type.label}`.replace(/\s+/g, " ");
  const description = clip(p.description || p.tagline, 158);
  return {
    // absolute: the /products layout sets a plain title, which stops the site-wide "%s | EA Budak Ubat" template
    title: { absolute: `${title} | EA Budak Ubat` },
    description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: {
      ...BASE_OPEN_GRAPH,
      url: `/products/${p.slug}`,
      title: `${title} | EA Budak Ubat`,
      description,
    },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const { product: p, all } = await loadProduct(slug);
  if (!p) notFound();
  if (p.has_page) permanentRedirect(`/${p.slug}`);

  const type = getProductType(p);
  const sub = getProductSubcategory(p);
  const plats = platformsOf(p);
  const features = Array.isArray(p.features) ? p.features : [];
  const price = priceNumber(p.price);
  const related = all
    .filter((x) => x.slug !== p.slug && !x.has_page && getProductType(x).key === type.key)
    .sort((a, b) => (b.display_order || 0) - (a.display_order || 0))
    .slice(0, 3);

  const details = [
    ["Type", type.label],
    sub && ["Category", sub],
    plats.length > 0 && ["Platform", platformName(plats)],
    p.version && ["Version", p.version],
    p.target_assets && ["Best for", p.target_assets],
    p.price && ["Price", `${String(p.price).replace(/\s*USD$/i, "")} USD lifetime, rentals available on MQL5`],
  ].filter(Boolean);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: p.name,
      description: p.description || p.tagline,
      applicationCategory: "FinanceApplication",
      applicationSubCategory: `${type.label} for ${platformName(plats)}`,
      operatingSystem: "Windows",
      softwareVersion: p.version || undefined,
      url: `${SITE}/products/${p.slug}`,
      author: { "@type": "Person", name: "Syarief Azman", url: `${SITE}/about` },
      ...(price && p.market_url
        ? { offers: { "@type": "Offer", price: price.toFixed(2), priceCurrency: "USD", url: p.market_url, availability: "https://schema.org/InStock" } }
        : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Products", item: `${SITE}/products` },
        { "@type": "ListItem", position: 3, name: p.name, item: `${SITE}/products/${p.slug}` },
      ],
    },
  ];

  return (
    <div className="hp">
      <SiteNav active="/products" ctaHref={p.market_url || "/products"} ctaLabel="View on MQL5" ctaExternal={!!p.market_url} />

      <main>
        <section className="hp-page-head">
          <div className="container">
            <nav className="hp-crumbs" aria-label="Breadcrumb">
              <Link href="/">Home</Link> <span aria-hidden="true">/</span> <Link href="/products">Products</Link>{" "}
              <span aria-hidden="true">/</span> <span>{p.name}</span>
            </nav>
            <div className="hp-pd-head" style={{ "--accent": type.color }}>
              {p.icon && <span className="hp-product-icon hp-pd-icon" aria-hidden="true">{p.icon}</span>}
              <div>
                <p className="hp-pd-meta">
                  <span className="hp-type">{type.label}</span>
                  {plats.length > 0 && <span>{platformName(plats)}</span>}
                  {p.version && <span>{p.version}</span>}
                </p>
                <h1>{p.name}</h1>
              </div>
            </div>
            {p.tagline && <p className="hp-lead">{p.tagline}</p>}
            <div className="hp-actions hp-actions-left">
              {p.market_url && (
                <a href={p.market_url} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn-primary">
                  View on MQL5 Market <Icon name="external" size={16} />
                </a>
              )}
              <Link href={`/products?type=${type.key}`} className="hp-btn hp-btn-ghost">
                All {type.plural.toLowerCase()}
              </Link>
            </div>
          </div>
        </section>

        <section className="hp-section hp-section-tight">
          <div className="container hp-pd-grid">
            <div className="hp-pd-main">
              <PromoVideo slug={p.slug} title={p.name} />
              {p.description && (
                <div className="hp-card">
                  <h2 className="hp-pd-h2">What it does</h2>
                  <p className="hp-pd-text">{p.description}</p>
                </div>
              )}
              {features.length > 0 && (
                <div className="hp-card">
                  <h2 className="hp-pd-h2">Features</h2>
                  <ul className="hp-pd-features">
                    {features.map((f) => (
                      <li key={f}>
                        <Icon name="check" size={16} /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <aside className="hp-pd-side">
              <div className="hp-card">
                <h2 className="hp-pd-h2">Details</h2>
                <dl className="hp-pd-details">
                  {details.map(([k, v]) => (
                    <div key={k}>
                      <dt>{k}</dt>
                      <dd>{v}</dd>
                    </div>
                  ))}
                </dl>
                {p.market_url && (
                  <a href={p.market_url} target="_blank" rel="noopener noreferrer" className="hp-btn hp-btn-primary hp-btn-block">
                    Buy or rent on MQL5 <Icon name="external" size={16} />
                  </a>
                )}
                <p className="hp-pd-small">
                  Sold and delivered through the official MQL5 Market: secure payment, automatic updates in MetaTrader
                  and a free demo you can run in the Strategy Tester before buying. The full user manual is on the MQL5
                  page.
                </p>
              </div>
            </aside>
          </div>
        </section>

        {related.length > 0 && (
          <section className="hp-section hp-section-tight">
            <div className="container">
              <div className="hp-latest-head">
                <h2 className="hp-pd-h2">More {type.plural.toLowerCase()}</h2>
                <Link href={`/products?type=${type.key}`} className="hp-latest-all">
                  See all <Icon name="arrowRight" size={16} />
                </Link>
              </div>
              <div className="hp-ea-grid">
                {related.map((r) => (
                  <Link key={r.slug} href={productPath(r)} className="hp-card hp-ea" style={{ "--accent": type.color }}>
                    <div className="hp-product-head">
                      {r.icon && <span className="hp-product-icon" aria-hidden="true">{r.icon}</span>}
                      <div className="hp-ea-top">
                        <h3>{r.name}</h3>
                        <span className="hp-ea-meta">
                          {[platformsOf(r).join(" · "), String(r.price || "").replace(/\s*USD$/i, "")].filter(Boolean).join(" · ")}
                        </span>
                      </div>
                    </div>
                    <p>{r.tagline}</p>
                    <span className="hp-ea-more">
                      View details <Icon name="arrowRight" size={16} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="hp-section hp-section-tight">
          <div className="container">
            <p className="hp-note">
              Risk warning: trading on margin carries a high level of risk and can lose more than you expect. Tools and
              indicators do not guarantee results, and past or simulated performance does not predict future results.
              Test on a demo account first.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
