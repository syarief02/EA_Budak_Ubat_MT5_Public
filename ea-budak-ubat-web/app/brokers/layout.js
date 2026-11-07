import { BASE_OPEN_GRAPH } from "@/lib/siteMetadata";

const TITLE = "Partner Brokers for a Free EA Budak Ubat License";
const DESCRIPTION =
  "Compare our 14 partner brokers for MT4 and MT5. Open and fund a live account with any of them (minimum $100 deposit) and your account is whitelisted for EA Budak Ubat permanently, with no license fee.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    ...BASE_OPEN_GRAPH,
    title: `${TITLE} | EA Budak Ubat`,
    description: DESCRIPTION,
  },
};

export default function BrokersLayout({ children }) {
  return <>{children}</>;
}
