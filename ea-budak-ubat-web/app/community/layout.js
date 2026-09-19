export const metadata = {
  metadataBase: new URL('https://eabudakubat.com'),
  title: 'Trader Community Hub | EA Budak Ubat',
  description: 'Share live trading results, request new algorithm features, exchange parameter presets, and connect directly with developer Syarief Azman.',
  openGraph: {
    title: 'Trader Community Hub | EA Budak Ubat',
    description: 'Share live trading results, request new algorithm features, exchange parameter presets, and connect directly with developer Syarief Azman.',
    type: 'website',
  },
};

export default function CommunityLayout({ children }) {
  return <>{children}</>;
}
