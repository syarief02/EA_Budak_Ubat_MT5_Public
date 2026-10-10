// Spread into a page's `openGraph` metadata. A page-level `openGraph` replaces the root one wholesale,
// which would otherwise drop og:url, og:image, site name and locale on that page.
export const BASE_OPEN_GRAPH = {
  siteName: "EA Budak Ubat",
  locale: "en_US",
  type: "website",
  url: "./", // resolves to the page's own path
  images: [
    {
      url: "/opengraph-image",
      width: 1200,
      height: 630,
      alt: "EA Budak Ubat — Expert Advisors & AI Trading Systems for MetaTrader 4 & 5",
    },
  ],
};
