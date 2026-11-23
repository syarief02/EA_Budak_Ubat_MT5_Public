"use client";

import { useState } from "react";

import Icon from "@/app/components/Icon";
import { copyText } from "@/lib/clipboard";
import { event } from "@/lib/fpixel";
import { useFlash } from "@/lib/useFlash";
import { PARTNER_BROKERS } from "@/lib/partnerBrokers";

const TELEGRAM_URL = "https://t.me/SyariefAzman";
const SUPPORT_EMAIL = "support@eabudakubat.com";
const PLATFORMS = ["MT4", "MT5"];

// Builds the license request a client sends after opening a partner account.
// Nothing is submitted to our servers: the message is copied, or handed to the visitor's own mail app.
// Broker, platform and account number are all needed to whitelist the right build, so the buttons stay
// disabled until each one is filled in.
export default function LicenseClaim() {
  const [broker, setBroker] = useState("");
  const [platform, setPlatform] = useState("");
  const [account, setAccount] = useState("");
  const [copied, flashCopied] = useFlash(2500);
  const [transferCopied, flashTransferCopied] = useFlash(2500); // { ok } while the button label shows

  const accountOk = /^\d{5,15}$/.test(account);
  const ready = Boolean(broker && platform && accountOk);
  const partnerCode = PARTNER_BROKERS.find((b) => b.name === broker)?.id;
  const transferReady = Boolean(partnerCode && accountOk);

  const message = [
    "Hello, I would like to request the free EA Budak Ubat license.",
    `Broker: ${broker || "-"}`,
    `Platform: ${platform || "-"}`,
    `Account number: ${account || "-"}`,
    "The account was opened through the eabudakubat.com partner link.",
  ].join("\n");

  const copyAndOpenTelegram = async () => {
    const ok = await copyText(message);
    flashCopied({ ok, telegram: true });
    // A button, not a t.me link, so the pixel's global link tracking doesn't see it: report the Contact here.
    // ("Send by email" is a mailto link and is already counted there.)
    event("Contact", { contact_channel: "telegram" });
    window.open(TELEGRAM_URL, "_blank", "noopener,noreferrer");
  };

  const copyOnly = async () => {
    flashCopied({ ok: await copyText(message), telegram: false });
  };

  // For accounts opened before (or without) the partner link: the broker has to move the account under our
  // partner code before it qualifies, so this is the message the client sends to the broker's support.
  const transferMessage = [
    `Hello, please move my trading account ${account || "-"}${platform ? ` (${platform})` : ""} under the partner (IB) code ${partnerCode || "-"}.`,
    "Please let me know once it is done. Thank you.",
  ].join("\n");

  const copyTransfer = async () => {
    flashTransferCopied({ ok: await copyText(transferMessage) });
  };

  const mailHref =
    `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(`License request: ${broker} ${platform} ${account}`)}` +
    `&body=${encodeURIComponent(message)}`;

  return (
    <div className="hp-card hp-claim">
      <div className="hp-claim-fields">
        <label className="hp-claim-field">
          <span>Broker</span>
          <select value={broker} onChange={(e) => setBroker(e.target.value)}>
            <option value="">Select your broker</option>
            {PARTNER_BROKERS.map((b) => (
              <option key={b.name} value={b.name}>{b.name}</option>
            ))}
          </select>
        </label>

        <div className="hp-claim-field" role="group" aria-label="Platform">
          <span>Platform</span>
          <div className="hp-claim-seg">
            {PLATFORMS.map((p) => (
              <button
                key={p}
                type="button"
                aria-pressed={platform === p}
                className={platform === p ? "is-active" : ""}
                onClick={() => setPlatform(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <label className="hp-claim-field">
          <span>Account number</span>
          <input
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={15}
            placeholder="e.g. 51234567"
            value={account}
            onChange={(e) => setAccount(e.target.value.replace(/\D/g, ""))}
          />
        </label>
      </div>

      <pre className="hp-claim-preview" aria-label="Message preview">{message}</pre>

      <div className="hp-actions hp-actions-left">
        <button type="button" className="hp-btn hp-btn-primary" disabled={!ready} onClick={copyAndOpenTelegram}>
          <Icon name="message" size={18} /> Copy and open Telegram
        </button>
        <a
          href={ready ? mailHref : undefined}
          aria-disabled={!ready}
          className={`hp-btn hp-btn-ghost${ready ? "" : " is-disabled"}`}
        >
          <Icon name="mail" size={18} /> Send by email
        </a>
        <button type="button" className="hp-btn hp-btn-ghost" disabled={!ready} onClick={copyOnly}>
          Copy message
        </button>
      </div>

      <p className="hp-claim-note" aria-live="polite">
        {!ready
          ? "Choose your broker and platform, and enter your account number."
          : copied
            ? copied.ok
              ? copied.telegram
                ? "Message copied. Paste it into the chat with @SyariefAzman and press Send."
                : "Message copied."
              : "Copying is blocked in this browser. Please select the message above and copy it by hand."
            : "We reply with your licensed file once the account is confirmed under our partner link."}
      </p>

      <details className="hp-claim-transfer">
        <summary>Opened this account without our link?</summary>
        <p>
          Only accounts under our partner code qualify. Ask {broker ? `${broker}'s` : "your broker's"} support (live
          chat, or the support email in your client area) to move the account under our code. Copy the request below
          and send it to them. The broker decides; once they confirm the move, send the license request above.
        </p>
        <pre className="hp-claim-preview" aria-label="Transfer request preview">{transferMessage}</pre>
        <div className="hp-actions hp-actions-left">
          <button type="button" className="hp-btn hp-btn-ghost" disabled={!transferReady} onClick={copyTransfer}>
            {transferCopied ? (transferCopied.ok ? "Request copied" : "Copy blocked, select it by hand") : "Copy transfer request"}
          </button>
        </div>
      </details>
    </div>
  );
}
