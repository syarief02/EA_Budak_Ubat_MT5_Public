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

      // Lead / Download Event: EA Binary or Preset download
      if (
        href.endsWith(".ex5") ||
        href.endsWith(".ex4") ||
        href.endsWith(".set") ||
        target.hasAttribute("download") ||
        text.toLowerCase().includes("download")
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

