"use client";

import { useEffect, useState, useRef } from "react";

export default function LiquidGlassEffects() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cursorActive, setCursorActive] = useState(false);
  const [cursorLocked, setCursorLocked] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");

  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    // Check if device supports fine cursor (desktop)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setCursorActive(true);

    // 1. Magnetic Custom Cursor Physics
    const mouse = { x: -100, y: -100, targetX: -100, targetY: -100, vx: 0, vy: 0 };
    const dot = { x: -100, y: -100 };
    let isHoveringInteractive = false;
    let animId;

    const onPointerMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const updateCursor = () => {
      // Smooth spring lerp for outer reticle
      mouse.vx = (mouse.targetX - mouse.x) * 0.24;
      mouse.vy = (mouse.targetY - mouse.y) * 0.24;
      mouse.x += mouse.vx;
      mouse.y += mouse.vy;

      // Instant pinpoint for inner dot
      dot.x = mouse.targetX;
      dot.y = mouse.targetY;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      }

      animId = requestAnimationFrame(updateCursor);
    };

    animId = requestAnimationFrame(updateCursor);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // Interactive target detection for magnetic lock-on
    const handleMouseOver = (e) => {
      const target = e.target.closest("a, button, input, textarea, .product-card, .glass-card, [data-interactive]");
      if (target) {
        isHoveringInteractive = true;
        setCursorLocked(true);
        const label = target.getAttribute("data-cursor-label") || (target.tagName === "BUTTON" ? "EXECUTE" : target.tagName === "A" ? "OPEN" : "LOCK");
        setCursorLabel(label);
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest("a, button, input, textarea, .product-card, .glass-card, [data-interactive]");
      if (target) {
        isHoveringInteractive = false;
        setCursorLocked(false);
        setCursorLabel("");
      }
    };

    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

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
        setTimeout(() => ripple.remove(), 700);
      };

      btn.addEventListener("click", handleRipple);
      cleanups.push(() => btn.removeEventListener("click", handleRipple));
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <>
      {/* KINETIC NEON SCROLL PROGRESS BAR */}
      <div
        className="kinetic-scroll-tracker"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: "3px",
          background: "linear-gradient(90deg, #00f0ff, #8b5cf6 45%, #ff2a85 80%, #10b981 100%)",
          boxShadow: "0 0 14px rgba(0, 240, 255, 0.8), 0 0 28px rgba(139, 92, 246, 0.6)",
          zIndex: 9999,
          transition: "width 0.12s cubic-bezier(0.1, 0.9, 0.2, 1)",
          pointerEvents: "none",
        }}
      />

      {/* MAGNETIC ANIME RETICLE CURSOR */}
      {cursorActive && (
        <>
          <div
            ref={cursorRef}
            className={`anime-cursor-reticle ${cursorLocked ? "locked" : ""}`}
            aria-hidden="true"
          >
            <div className="reticle-ring"></div>
            <div className="reticle-corner reticle-tl"></div>
            <div className="reticle-corner reticle-tr"></div>
            <div className="reticle-corner reticle-bl"></div>
            <div className="reticle-corner reticle-br"></div>
            {cursorLocked && cursorLabel && (
              <span className="reticle-label">{cursorLabel}</span>
            )}
          </div>
          <div ref={cursorDotRef} className="anime-cursor-dot" aria-hidden="true" />
        </>
      )}

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
