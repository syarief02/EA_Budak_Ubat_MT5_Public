"use client";

import { useEffect, useState } from "react";
import { playTactileClick } from "@/lib/audioSynthesizer";

// Site-wide polish: scroll progress bar, card tilt and button ripples (desktop only).
// The sci-fi reticle cursor and the fixed corner readouts ("LATENCY: 0.8ms", "ZERO-SLIP") were removed in Nov 2026:
// they read as gimmicks and stated performance figures nothing backs up.
export default function LiquidGlassEffects() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Check if device supports fine cursor (desktop)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    // 2. Kinetic Scroll Progress & Velocimeter
    let ticking = false;
    let lastScroll = window.scrollY;
    let scrollVelocity = 0;

    const updateScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
      const diff = Math.abs(window.scrollY - lastScroll);
      scrollVelocity = diff;
      lastScroll = window.scrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // 3. Smooth 3D Gyro Perspective Tilt & Optical Specular Sheen
    const cards = document.querySelectorAll(
      ".product-card, .feature-card, .stat-card, .calculator-card, .preset-card, .account-checker, .liquid-glass-card, .community-form"
    );

    const cleanups = [];

    cards.forEach((card) => {
      let isHovered = false;
      let cardRaf;

      const onMouseEnter = () => {
        isHovered = true;
        card.style.transition = "transform 0.18s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease";
      };

      const onMouseMove = (e) => {
        if (!isHovered) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;

        // Dynamic specular reflection coordinates
        card.style.setProperty("--specular-x", `${percentX.toFixed(1)}%`);
        card.style.setProperty("--specular-y", `${percentY.toFixed(1)}%`);

        // Subdued optical tilt (max 6 degrees for premium elegance)
        const rotX = ((y - centerY) / centerY) * -6;
        const rotY = ((x - centerX) / centerX) * 6;

        if (cardRaf) cancelAnimationFrame(cardRaf);
        cardRaf = requestAnimationFrame(() => {
          card.style.transform = `perspective(1100px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-5px) scale3d(1.014, 1.014, 1.014)`;
        });
      };

      const onMouseLeave = () => {
        isHovered = false;
        if (cardRaf) cancelAnimationFrame(cardRaf);
        card.style.transition = "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease";
        card.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)";
        card.style.removeProperty("--specular-x");
        card.style.removeProperty("--specular-y");
      };

      card.addEventListener("mouseenter", onMouseEnter);
      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);

      cleanups.push(() => {
        card.removeEventListener("mouseenter", onMouseEnter);
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
      });
    });

    // 4. Tactile Anime Ripple Waves on Buttons
    const buttons = document.querySelectorAll(".btn, .nav-cta, .platform-pill, .filter-tab");
    buttons.forEach((btn) => {
      const handleRipple = (e) => {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "liquid-ripple-wave";
        const size = Math.max(rect.width, rect.height) * 2.2;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        btn.appendChild(ripple);
        playTactileClick(0.08);
        setTimeout(() => ripple.remove(), 700);
      };

      btn.addEventListener("click", handleRipple);
      cleanups.push(() => btn.removeEventListener("click", handleRipple));
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <div
      className="kinetic-scroll-tracker"
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${scrollProgress}%`,
        height: "2px",
        background: "linear-gradient(90deg, #38bdf8, #3b82f6)",
        zIndex: 9999,
        transition: "width 0.12s cubic-bezier(0.1, 0.9, 0.2, 1)",
        pointerEvents: "none",
      }}
    />
  );
}
