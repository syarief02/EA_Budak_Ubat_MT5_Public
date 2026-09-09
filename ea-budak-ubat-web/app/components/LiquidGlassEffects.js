"use client";

import { useEffect, useState } from "react";

export default function LiquidGlassEffects() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // 1. Kinetic Scroll Progress Calculation
    let ticking = false;

    const updateScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const current = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // 2. Smooth 3D Gyro / Perspective Tilt on Glass Cards
    const cards = document.querySelectorAll(
      ".product-card, .feature-card, .stat-card, .calculator-card, .preset-card, .account-checker, .liquid-glass-card"
    );

    const cleanups = [];

    cards.forEach((card) => {
      let isHovered = false;
      let rafId;

      const onMouseEnter = () => {
        isHovered = true;
        card.style.transition = "transform 0.15s ease-out, box-shadow 0.3s ease-out";
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

        // Dynamic specular liquid reflection coordinates
        card.style.setProperty("--specular-x", `${percentX.toFixed(1)}%`);
        card.style.setProperty("--specular-y", `${percentY.toFixed(1)}%`);

        // Kinetic tilt limits (max 7 degrees for elegant subtlety)
        const rotX = ((y - centerY) / centerY) * -7;
        const rotY = ((x - centerX) / centerX) * 7;

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px) scale3d(1.012, 1.012, 1.012)`;
        });
      };

      const onMouseLeave = () => {
        isHovered = false;
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transition = "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease";
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)";
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

    // 3. Tactile Ripple on Buttons & Interactive Elements
    const buttons = document.querySelectorAll(".btn, .nav-cta, .tab-btn");
    buttons.forEach((btn) => {
      const handleRipple = (e) => {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement("span");
        ripple.className = "liquid-ripple-wave";
        const size = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
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
    <>
      {/* KINETIC SCROLL PROGRESS BAR */}
      <div
        className="kinetic-scroll-tracker"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: "3px",
          background: "linear-gradient(90deg, #00f0ff, #8b5cf6 50%, #10b981 100%)",
          boxShadow: "0 0 12px rgba(0, 240, 255, 0.7), 0 0 24px rgba(139, 92, 246, 0.5)",
          zIndex: 9999,
          transition: "width 0.1s cubic-bezier(0.1, 0.9, 0.2, 1)",
          pointerEvents: "none",
        }}
      />

      {/* JAPANESE MINIMALIST BLUEPRINT HUD CORNERS */}
      <div className="jp-hud-reticle jp-hud-tl" aria-hidden="true">
        <span className="jp-reticle-cross">+</span>
        <span className="jp-reticle-label">TYO // 35.6762°N</span>
      </div>
      <div className="jp-hud-reticle jp-hud-tr" aria-hidden="true">
        <span className="jp-reticle-label">SYS.STABLE // v1.63</span>
        <span className="jp-reticle-cross">+</span>
      </div>
      <div className="jp-hud-reticle jp-hud-bl" aria-hidden="true">
        <span className="jp-reticle-cross">+</span>
        <span className="jp-reticle-label">LATENCY: 0.8ms</span>
      </div>
      <div className="jp-hud-reticle jp-hud-br" aria-hidden="true">
        <span className="jp-reticle-label">極限精度 // ZERO-SLIP</span>
        <span className="jp-reticle-cross">+</span>
      </div>
    </>
  );
}
