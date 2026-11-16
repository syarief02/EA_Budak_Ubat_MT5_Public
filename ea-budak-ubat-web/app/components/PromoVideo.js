"use client";

import { useEffect, useState } from "react";

// A product's 30-second promo video from /public/videos/<slug>-promo.mp4. Only products released with a promo
// have one, so the player appears only after a quick HEAD request confirms the file exists. (Rendering the
// <video> straight away showed an empty player for products without a video: its load error fires before
// hydration, so an onError handler never sees it.)
export default function PromoVideo({ slug, title }) {
  const [available, setAvailable] = useState(false);
  const src = `/videos/${slug}-promo.mp4`;

  useEffect(() => {
    if (!slug) return;
    let alive = true;
    fetch(src, { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") || "";
        if (alive && r.ok && type.startsWith("video/")) setAvailable(true);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [slug, src]);

  if (!available) return null;
  return (
    <figure className="hp-card hp-pd-video">
      <video src={src} controls playsInline preload="metadata" aria-label={`${title} promo video`} />
      <figcaption>30-second demo video</figcaption>
    </figure>
  );
}
