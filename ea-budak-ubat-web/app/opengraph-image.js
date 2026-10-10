import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "EA Budak Ubat — Expert Advisors & AI Trading Systems for MetaTrader 4 & 5";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default share preview for every page (Telegram, Facebook, WhatsApp, X)
export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "app", "icon.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  const chips = ["MT4 & MT5", "Grid · AI · Breakout · Trend", "Free license via partner brokers"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#f1f5f9",
          backgroundColor: "#0a0e1a",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(0,240,255,0.22), transparent 45%), radial-gradient(circle at 90% 85%, rgba(139,92,246,0.35), transparent 50%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <img src={logoSrc} width={150} height={150} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 84, letterSpacing: -2, lineHeight: 1 }}>EA Budak Ubat</div>
            <div style={{ fontSize: 34, color: "#94a3b8", marginTop: 18 }}>
              Expert Advisors & AI Trading Systems for MetaTrader
            </div>
          </div>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {chips.map((chip) => (
            <div
              key={chip}
              style={{
                display: "flex",
                fontSize: 26,
                padding: "12px 24px",
                borderRadius: 999,
                border: "1px solid rgba(0,240,255,0.45)",
                backgroundColor: "rgba(0,240,255,0.08)",
                color: "#cffafe",
              }}
            >
              {chip}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 30 }}>
          <div style={{ color: "#00f0ff" }}>eabudakubat.com</div>
          <div style={{ fontSize: 20, color: "#64748b" }}>Trading involves risk. Grid/martingale systems can lose capital.</div>
        </div>
      </div>
    ),
    size
  );
}
