"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { pageview, event } from "@/lib/fpixel";

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
    };

    document.addEventListener("click", handleGlobalClick, { passive: true });
    return () => document.removeEventListener("click", handleGlobalClick);
  }, []);

  return null;
}

