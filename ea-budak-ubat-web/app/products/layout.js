import { BASE_OPEN_GRAPH } from "@/lib/siteMetadata";

const TITLE = "Products: Expert Advisors, Indicators, Utilities & Libraries";
const DESCRIPTION =
  "MetaTrader 4 and 5 products by Syarief Azman: Expert Advisors, indicators, trade utilities and developer libraries. Filter by type and platform, then buy on MQL5 Market or get our own EAs free through a partner broker.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    ...BASE_OPEN_GRAPH,
    title: `${TITLE} | EA Budak Ubat`,
    description: DESCRIPTION,
    type: "website",
  },
};

export default function ProductsLayout({ children }) {
  return <>{children}</>;
}
