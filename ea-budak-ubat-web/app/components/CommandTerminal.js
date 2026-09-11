"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  isSoundEnabled,
  toggleSound,
  playTactileClick,
  playReticleLock,
} from "@/lib/audioSynthesizer";

const COMMANDS = [
  // Products
  { id: "ea-bu", title: "EA Budak Ubat", subtitle: "Grid Martingale EA (MT4 & MT5)", icon: "📊", action: "/ea-budak-ubat", cat: "Products" },
  { id: "mql5-market", title: "Buy EA Budak Ubat on MQL5 Market", subtitle: "Official MT5 Market Edition (Instant Activation & Native DRM)", icon: "🛒", action: "https://www.mql5.com/en/market/product/195399", external: true, cat: "Products" },
  { id: "buy-mt4", title: "Buy EA Budak Ubat (MT4 Full Version)", subtitle: "Instant Full Unlocked License for MetaTrader 4", icon: "🛒", action: "https://tinyurl.com/eabubuy", external: true, cat: "Products" },
  { id: "goldmind", title: "GoldMind AI", subtitle: "Neural ChatGPT 4o-mini Signal Engine (MT5)", icon: "🤖", action: "/goldmind-ai", cat: "Products" },
  { id: "bracket", title: "BracketBlitz EA", subtitle: "OCO Dual Breakout Pending Orders (MT4 & MT5)", icon: "⚡", action: "/bracketblitz", cat: "Products" },
  { id: "mathedge", title: "MathEdge Pro", subtitle: "Mathematical Index Engine for US30 & NAS100", icon: "📐", action: "/mathedge-pro", cat: "Products" },
  { id: "aligator", title: "Aligator Gozaimasu", subtitle: "Multi-Timeframe Alligator Trend EA", icon: "🐊", action: "/aligator-gozaimasu", cat: "Products" },
  { id: "encik-moku", title: "Encik Moku", subtitle: "Multi-Timeframe Ichimoku Cloud EA", icon: "🏯", action: "/encik-moku", cat: "Products" },

  // Tools & Generators
  { id: "presets", title: "Preset Generator (.set)", subtitle: "Generate custom configuration files for MT4/MT5", icon: "⚙️", action: "/ea-budak-ubat#preset-generator", cat: "Tools" },
  { id: "calculator", title: "Risk & Grid Calculator", subtitle: "Simulate lot progression, margin, and drawdown", icon: "🧮", action: "/ea-budak-ubat#risk-calculator", cat: "Tools" },
  { id: "license", title: "License & Account Checker", subtitle: "Verify trading account authorization across all EAs", icon: "🔐", action: "/#authorization", cat: "Tools" },

  // Community & Docs
  { id: "guide", title: "Installation & Strategy Guide", subtitle: "Complete documentation for MT4 & MT5 setup", icon: "📖", action: "/guide", cat: "Resources" },
  { id: "changelog", title: "System Changelog", subtitle: "Version history and patch release notes", icon: "📜", action: "/changelog", cat: "Resources" },
  { id: "community", title: "Community Hub & Feedback", subtitle: "Join discussions and request custom features", icon: "💬", action: "/#community-hub", cat: "Resources" },
  { id: "telegram", title: "Official Telegram Channel", subtitle: "Join @EABudakUbat for updates & releases", icon: "📢", action: "https://t.me/EABudakUbat", external: true, cat: "Social" },
  { id: "creator", title: "Message Creator (Syarief Azman)", subtitle: "Telegram direct inquiry: @SyariefAzman", icon: "✉️", action: "https://t.me/SyariefAzman", external: true, cat: "Social" },

  // System Toggles
  { id: "toggle-sound", title: "Toggle Procedural Sound FX", subtitle: "Enable or mute browser audio synthesis", icon: "🔊", action: "TOGGLE_SOUND", cat: "Preferences" },
];

export default function CommandTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [soundActive, setSoundActive] = useState(false);
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    setSoundActive(isSoundEnabled());

    const handleSoundToggle = (e) => {
      setSoundActive(e.detail.enabled);
    };

    window.addEventListener("ea-sound-toggled", handleSoundToggle);

    // Keyboard shortcut handler: Ctrl+K or Cmd+K
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("ea-sound-toggled", handleSoundToggle);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      playTactileClick(0.1);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Filter commands
  const filtered = COMMANDS.filter((c) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.cat.toLowerCase().includes(q)
    );
  });

  // Handle arrow navigation
  const handleNavKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
      playReticleLock(0.03);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      playReticleLock(0.03);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[selectedIndex]) {
        executeCommand(filtered[selectedIndex]);
      }
    }
  };

  const executeCommand = (cmd) => {
    playTactileClick(0.12);
    setIsOpen(false);

    if (cmd.action === "TOGGLE_SOUND") {
      const newState = toggleSound();
      setSoundActive(newState);
      return;
    }

    if (cmd.external) {
      window.open(cmd.action, "_blank", "noopener,noreferrer");
    } else {
      router.push(cmd.action);
    }
  };

  const handleSoundBtnClick = () => {
    const state = toggleSound();
    setSoundActive(state);
  };

  return (
    <>
      {/* FLOATING HUD COMMAND DOCK (BOTTOM-RIGHT) */}
      <div className="floating-hud-dock" aria-label="HUD Actions">
        {/* Sound SFX Pill */}
        <button
          type="button"
          className={`hud-dock-btn ${soundActive ? "sound-on" : "sound-off"}`}
          data-cursor-label="AUDIO"
          onClick={handleSoundBtnClick}
          title={soundActive ? "Procedural Audio Synthesizer: ACTIVE" : "Procedural Audio Synthesizer: MUTED"}
        >
          <span className="hud-dock-icon">{soundActive ? "🔊" : "🔇"}</span>
          <span className="hud-dock-text">SFX {soundActive ? "ON" : "OFF"}</span>
        </button>

        {/* Command Palette Pill */}
        <button
          type="button"
          className="hud-dock-btn terminal-trigger-btn"
          data-cursor-label="TERMINAL"
          onClick={() => setIsOpen(true)}
          title="Open Command Terminal (Ctrl + K)"
        >
          <span className="hud-dock-icon">⚡</span>
          <span className="hud-dock-text">TERMINAL</span>
          <span className="hud-dock-kbd">⌘K</span>
        </button>
      </div>

      {/* COMMAND MODAL OVERLAY */}
      {isOpen && (
        <div className="cmd-modal-backdrop" onClick={() => setIsOpen(false)}>
          <div className="cmd-modal-window border-beam-card" onClick={(e) => e.stopPropagation()}>
            <div className="cmd-header">
              <div className="cmd-input-wrapper">
                <span className="cmd-search-icon">🔍</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="cmd-input"
                  placeholder="Search EAs, tools, presets, risk calculators, or actions..."
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleNavKeyDown}
                />
              </div>
              <button
                type="button"
                className="cmd-close-btn"
                onClick={() => setIsOpen(false)}
              >
                ESC
              </button>
            </div>

            <div className="cmd-results-list">
              {filtered.length === 0 ? (
                <div className="cmd-empty-state">
                  <span>No matching commands or tools found for "{query}"</span>
                </div>
              ) : (
                filtered.map((cmd, idx) => (
                  <div
                    key={cmd.id}
                    className={`cmd-item ${selectedIndex === idx ? "selected" : ""}`}
                    onClick={() => executeCommand(cmd)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <span className="cmd-item-icon">{cmd.icon}</span>
                    <div className="cmd-item-body">
                      <div className="cmd-item-title-row">
                        <span className="cmd-item-title">{cmd.title}</span>
                        <span className="cmd-item-cat">{cmd.cat}</span>
                      </div>
                      <span className="cmd-item-sub">{cmd.subtitle}</span>
                    </div>
                    {selectedIndex === idx && <span className="cmd-enter-tag">↵ ENTER</span>}
                  </div>
                ))
              )}
            </div>

            <div className="cmd-footer">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
              <span>CTRL+K Toggle</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

