// MQL5 Market product types (the four Market sections), used to label and group products on the site.
// A product's type comes from its `product_type` field when present, otherwise from keywords in `category`
// ("... Indicator", "... Utility", "... Library", "... Manager"); anything else is an Expert Advisor.

export const PRODUCT_TYPES = [
  {
    key: "expert-advisor",
    label: "Expert Advisor",
    plural: "Expert Advisors",
    desc: "Automated strategies that open, manage and close trades on their own.",
    color: "#38bdf8",
  },
  {
    key: "indicator",
    label: "Indicator",
    plural: "Indicators",
    desc: "Chart analysis, levels and signals. Indicators do not place trades.",
    color: "#a78bfa",
  },
  {
    key: "utility",
    label: "Utility",
    plural: "Utilities",
    desc: "Tools for manual traders: trade and risk management, alerts and journals.",
    color: "#34d399",
  },
  {
    key: "library",
    label: "Library",
    plural: "Libraries",
    desc: "Code libraries for MQL developers to call from their own EAs, indicators and scripts.",
    color: "#fbbf24",
  },
];

const BY_KEY = Object.fromEntries(PRODUCT_TYPES.map((t) => [t.key, t]));

function typeFromText(text) {
  const s = String(text || "").toLowerCase();
  if (!s) return null;
  if (s.includes("expert advisor")) return "expert-advisor";
  if (s.includes("librar")) return "library";
  if (s.includes("indicator") || s.includes("oscillator")) return "indicator";
  if (s.includes("utilit") || s.includes("manager")) return "utility";
  return null;
}

export function getProductTypeKey(product) {
  return typeFromText(product?.product_type) || typeFromText(product?.category) || "expert-advisor";
}

export function getProductType(product) {
  return BY_KEY[getProductTypeKey(product)];
}

export function getProductTypeByKey(key) {
  return BY_KEY[key] || null;
}

// The category without the type words, e.g. "Volume Profile Indicator" -> "Volume Profile".
export function getProductSubcategory(product) {
  const rest = String(product?.category || "")
    .replace(/\b(expert advisor|indicator|utility|library)\b/gi, "")
    .replace(/^[\s/&-]+|[\s/&-]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  return rest.toLowerCase() === "developer" ? "" : rest;
}
