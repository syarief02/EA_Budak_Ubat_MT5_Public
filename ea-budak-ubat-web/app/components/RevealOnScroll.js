"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// The one place that turns `.animate-in` into `.animate-in.visible` (globals.css keeps it at opacity 0 until then).
// It also watches the DOM, so elements that mount later (tab switches, filters, fetched lists) are revealed too.
// Pages must not run their own observer for this.
const SELECTOR = ".animate-in:not(.visible)";

export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    // Remember revealed elements: if React later rewrites their className, put "visible" back.
    const revealed = new WeakSet();
    const reveal = (el) => {
      revealed.add(el);
      el.classList.add("visible");
    };

    if (typeof IntersectionObserver === "undefined") {
      document.querySelectorAll(SELECTOR).forEach(reveal);
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "50px" }
    );

    const observeWithin = (root) => {
      if (root.nodeType !== 1) return;
      if (root.matches?.(SELECTOR)) io.observe(root);
      root.querySelectorAll?.(SELECTOR).forEach((el) => io.observe(el));
    };

    observeWithin(document.body);

    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes") {
          const el = m.target;
          if (revealed.has(el) && !el.classList.contains("visible")) el.classList.add("visible");
        } else {
          m.addedNodes.forEach(observeWithin);
        }
      }
    });
    mo.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
