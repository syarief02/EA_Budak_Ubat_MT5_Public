"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { pageview, event } from "@/lib/fpixel";
import { PARTNER_BROKERS } from "@/lib/partnerBrokers";

// Hosts of the partner (IB) sign-up links. A click on any of them, wherever the link sits (broker cards, footer,
// ad banners, calculators), is the start of a broker account application: the step that funds the free license.
const PARTNER_HOSTS = new Set(PARTNER_BROKERS.map((b) => new URL(b.url).hostname));

const isPartnerLink = (href) => {
  try {
    return PARTNER_HOSTS.has(new URL(href, window.location.href).hostname);
  } catch {
    return false;
  }
};

export default function FacebookPixel() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track PageView on route changes
  useEffect(() => {
    pageview();
  }, [pathname, searchParams]);

  // Global click tracking for standard events (Contact, Lead/Download)
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const target = e.target.closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href") || "";
      const text = target.innerText?.trim() || "";

      // Contact Event: Telegram or Email
      if (href.includes("t.me/") || href.startsWith("mailto:")) {
        event("Contact", {
          contact_channel: href.startsWith("mailto:") ? "email" : "telegram",
          target_url: href,
        });
      }

      // Lead / Download Event: an EA binary or preset file actually being downloaded.
      // Only links count. Matching button text ("download") also fired on FAQ questions, and the .set generator's
      // button click plus the file link it creates counted one download twice.
      const isLink = target.tagName === "A";
      const path = href.split("?")[0];
      if (
        isLink &&
        (/\.(ex4|ex5|set|zip)$/i.test(path) ||
          /github\.com\/[^/]+\/[^/]+\/releases/.test(path) || // Bubat AI installer page
          target.hasAttribute("download"))
      ) {
        event("Lead", {
          content_name: text || "EA Binary / Preset",
          download_url: href,
        });
      }

      // SubmitApplication Event: a partner broker sign-up link (opening the live account that qualifies for the
      // free license). Standard event, so it still works under the domain's "Core setup" data restriction.
      if (isLink && isPartnerLink(href)) {
        event("SubmitApplication");
      }
    };

    document.addEventListener("click", handleGlobalClick, { passive: true });
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return null;
}

