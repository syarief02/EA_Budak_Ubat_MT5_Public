export const metadata = {
  metadataBase: new URL('https://eabudakubat.com'),
  title: 'EA Budak Ubat User Guide | Setup & Configuration Manual',
  description: 'Complete step-by-step guide for installing, configuring, and optimizing EA Budak Ubat on MetaTrader 4 and MetaTrader 5. Includes AutoConfig AI setup and broker preset recommendations.',
  openGraph: {
    title: 'EA Budak Ubat User Guide | Setup & Configuration Manual',
    description: 'Complete step-by-step guide for installing, configuring, and optimizing EA Budak Ubat on MetaTrader 4 and MetaTrader 5. Includes AutoConfig AI setup and broker preset recommendations.',
    type: 'website',
  },
};

export default function GuideLayout({ children }) {
  return <>{children}</>;
}
