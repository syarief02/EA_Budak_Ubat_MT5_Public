export const metadata = {
  metadataBase: new URL('https://eabudakubat.com'),
  title: 'Algorithmic Trader Workbench | Grid Simulator, Preset Generator & Margin Calculator',
  description: 'Interactive simulation tools for EA Budak Ubat. Test dynamic ADR grid layering, generate .set preset files, calculate margin requirements, and verify account authorization.',
  openGraph: {
    title: 'Algorithmic Trader Workbench | Grid Simulator, Preset Generator & Margin Calculator',
    description: 'Interactive simulation tools for EA Budak Ubat. Test dynamic ADR grid layering, generate .set preset files, calculate margin requirements, and verify account authorization.',
    type: 'website',
  },
};

export default function ToolsLayout({ children }) {
  return <>{children}</>;
}
