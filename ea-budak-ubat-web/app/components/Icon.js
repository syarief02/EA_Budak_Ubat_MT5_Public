// Minimal stroke icon set (24x24, currentColor) used by the home and brokers pages.
const PATHS = {
  arrowRight: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="M20 6 9 17l-5-5" />,
  download: <path d="M12 3v12m0 0-5-5m5 5 5-5M4 21h16" />,
  shield: <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" />,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  layers: (
    <>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </>
  ),
  gauge: (
    <>
      <path d="M12 14 16 9" />
      <path d="M3.5 18a9.5 9.5 0 1 1 17 0" />
    </>
  ),
  split: (
    <>
      <path d="M4 7h10l-3-3M20 17H10l3 3" />
    </>
  ),
  code: <path d="m8 7-5 5 5 5M16 7l5 5-5 5" />,
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 9-9m-3 3 3 3m-6 0 2 2" />
    </>
  ),
  wrench: <path d="M14.5 6.5a4 4 0 0 0 5 5L21 13l-8 8-3.5-3.5L3 11l8-8 1.5 1.5a4 4 0 0 0 2 2Z" />,
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M4 19a2 2 0 0 1 2-2h14" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" />
    </>
  ),
  cap: (
    <>
      <path d="m12 4 10 5-10 5L2 9l10-5Z" />
      <path d="M6 11v5c3 2.5 9 2.5 12 0v-5" />
    </>
  ),
  store: (
    <>
      <path d="M4 9h16l-1-5H5L4 9Z" />
      <path d="M5 9v11h14V9M9 20v-6h6v6" />
    </>
  ),
  message: <path d="M21 12a8 8 0 0 1-11.6 7.2L4 20l1-4.4A8 8 0 1 1 21 12Z" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />,
};

export default function Icon({ name, size = 20, className = "", strokeWidth = 1.8 }) {
  const path = PATHS[name];
  if (!path) return null;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {path}
    </svg>
  );
}
