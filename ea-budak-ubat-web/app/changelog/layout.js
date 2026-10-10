import { BASE_OPEN_GRAPH } from "@/lib/siteMetadata";

export const metadata = {
  metadataBase: new URL('https://eabudakubat.com'),
  title: 'Version Changelog & Release Notes',
  description: 'Track continuous improvements across all Expert Advisors — EA Budak Ubat v1.67, GoldMind AI, BracketBlitz, MathEdge Pro, Aligator Gozaimasu, and Encik Moku.',
  openGraph: {
    ...BASE_OPEN_GRAPH,
    title: 'Version Changelog & Release Notes | EA Budak Ubat',
    description: 'Track continuous improvements across all Expert Advisors — EA Budak Ubat v1.67, GoldMind AI, BracketBlitz, MathEdge Pro, Aligator Gozaimasu, and Encik Moku.',
    type: 'website',
  },
};

export default function ChangelogLayout({ children }) {
  return <>{children}</>;
}
