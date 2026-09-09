"use client";

import { useEffect, useRef } from "react";

export default function FluidCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse & interaction physics
    const pointer = {
      x: width * 0.5,
      y: height * 0.4,
      targetX: width * 0.5,
      targetY: height * 0.4,
      vx: 0,
      vy: 0,
      speed: 0,
      radius: 190,
      down: false,
    };

    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    // Fluid particles / Caustic orbs
    const orbs = [
      { x: width * 0.25, y: height * 0.3, r: 280, vx: 0.3, vy: 0.2, hue: 215, alpha: 0.22 },
      { x: width * 0.75, y: height * 0.4, r: 320, vx: -0.25, vy: 0.3, hue: 260, alpha: 0.20 },
      { x: width * 0.5, y: height * 0.75, r: 360, vx: 0.2, vy: -0.2, hue: 190, alpha: 0.18 },
      { x: width * 0.85, y: height * 0.85, r: 240, vx: -0.15, vy: -0.15, hue: 275, alpha: 0.16 },
      { x: width * 0.15, y: height * 0.8, r: 260, vx: 0.2, vy: 0.18, hue: 205, alpha: 0.18 },
    ];

    // Wave ripples array
    const ripples = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = e.clientX - rect.left;
      pointer.targetY = e.clientY - rect.top;

      // Add dynamic micro-ripple when mouse moves fast
      const dx = pointer.targetX - pointer.x;
      const dy = pointer.targetY - pointer.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 25 && ripples.length < 18) {
        ripples.push({
          x: pointer.targetX,
          y: pointer.targetY,
          r: 10,
          maxR: Math.min(220, 80 + dist * 1.5),
          alpha: 0.4,
          speed: 2.2 + dist * 0.05,
          hue: 200 + Math.random() * 60,
        });
      }
    };

    const handleMouseDown = () => {
      pointer.down = true;
      ripples.push({
        x: pointer.x,
        y: pointer.y,
        r: 15,
        maxR: 350,
        alpha: 0.7,
        speed: 4.5,
        hue: 190,
      });
    };

    const handleMouseUp = () => {
      pointer.down = false;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      scrollVelocity = (currentScroll - lastScrollY) * 0.5;
      lastScrollY = currentScroll;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    let t = 0;

    const render = () => {
      t += 0.008;

      // Smooth pointer lerp
      pointer.vx = (pointer.targetX - pointer.x) * 0.08;
      pointer.vy = (pointer.targetY - pointer.y) * 0.08;
      pointer.x += pointer.vx;
      pointer.y += pointer.vy;
      pointer.speed = Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy);

      // Dampen scroll velocity
      scrollVelocity *= 0.92;

      // Clear with dark obsidian base
      ctx.fillStyle = "#070a12";
      ctx.fillRect(0, 0, width, height);

      // Draw subtle Japanese isometric dot matrix grid
      ctx.save();
      const dotSpacing = 48;
      const gridOffset = (t * 12) % dotSpacing;
      
      const startX = -dotSpacing;
      const endX = width + dotSpacing;
      const startY = -dotSpacing;
      const endY = height + dotSpacing;

      for (let x = startX; x < endX; x += dotSpacing) {
        for (let y = startY; y < endY; y += dotSpacing) {
          // Dynamic wave deflection near pointer
          const pdx = x - pointer.x;
          const pdy = y - pointer.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          let offsetX = 0;
          let offsetY = 0;
          let dotAlpha = 0.035;

          if (pdist < pointer.radius * 1.6) {
            const force = (1 - pdist / (pointer.radius * 1.6));
            offsetX = (pdx / (pdist || 1)) * force * 12;
            offsetY = (pdy / (pdist || 1)) * force * 12;
            dotAlpha += force * 0.08;
          }

          ctx.fillStyle = `rgba(130, 180, 255, ${dotAlpha})`;
          ctx.beginPath();
          ctx.arc(x + offsetX, y + offsetY + gridOffset * 0.3, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // Render Procedural Liquid Glass Orbs with Chromatic Bleed
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      orbs.forEach((orb, i) => {
        // Natural harmonic oscillation
        orb.x += orb.vx + Math.sin(t * 1.2 + i) * 0.4;
        orb.y += orb.vy + Math.cos(t * 0.9 + i) * 0.4 - scrollVelocity * 0.05;

        // Bounce gently off borders
        if (orb.x < -100) orb.vx = Math.abs(orb.vx);
        if (orb.x > width + 100) orb.vx = -Math.abs(orb.vx);
        if (orb.y < -100) orb.vy = Math.abs(orb.vy);
        if (orb.y > height + 100) orb.vy = -Math.abs(orb.vy);

        // Fluid repulsion from pointer
        const odx = orb.x - pointer.x;
        const ody = orb.y - pointer.y;
        const odist = Math.sqrt(odx * odx + ody * ody);
        if (odist < pointer.radius * 1.8 && odist > 0) {
          const push = (1 - odist / (pointer.radius * 1.8)) * 1.8;
          orb.x += (odx / odist) * push;
          orb.y += (ody / odist) * push;
        }

        const dynamicR = orb.r + Math.sin(t * 2 + i) * 20;

        // Radial chromatic gradient
        const grad = ctx.createRadialGradient(
          orb.x, orb.y, dynamicR * 0.05,
          orb.x, orb.y, dynamicR
        );
        grad.addColorStop(0, `hsla(${orb.hue}, 85%, 60%, ${orb.alpha * 1.4})`);
        grad.addColorStop(0.45, `hsla(${orb.hue + 25}, 80%, 50%, ${orb.alpha * 0.7})`);
        grad.addColorStop(1, `hsla(${orb.hue + 50}, 90%, 40%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, dynamicR, 0, Math.PI * 2);
        ctx.fill();
      });

      // Pointer Interactive Liquid Flare (Reactive Glow)
      const pointerGrad = ctx.createRadialGradient(
        pointer.x, pointer.y, 0,
        pointer.x, pointer.y, pointer.radius + pointer.speed * 2.5
      );
      pointerGrad.addColorStop(0, "rgba(0, 240, 255, 0.28)");
      pointerGrad.addColorStop(0.3, "rgba(120, 90, 255, 0.18)");
      pointerGrad.addColorStop(0.7, "rgba(30, 40, 90, 0.08)");
      pointerGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = pointerGrad;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, pointer.radius + pointer.speed * 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Render Dynamic Ripple Waves
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += rip.speed;
        rip.alpha *= 0.955;

        if (rip.alpha < 0.01 || rip.r >= rip.maxR) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `hsla(${rip.hue}, 90%, 65%, ${rip.alpha})`;
        ctx.lineWidth = Math.max(1, (1 - rip.r / rip.maxR) * 2.8);
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.stroke();

        // Chromatic inner ring for liquid refraction illusion
        ctx.strokeStyle = `hsla(${rip.hue + 35}, 90%, 75%, ${rip.alpha * 0.6})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, Math.max(0, rip.r - 4), 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();

      // Atmospheric Noise / Vignette Overlay
      const vigGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.5, Math.min(width, height) * 0.4,
        width * 0.5, height * 0.5, Math.max(width, height) * 0.8
      );
      vigGrad.addColorStop(0, "rgba(6, 9, 18, 0)");
      vigGrad.addColorStop(1, "rgba(4, 6, 12, 0.65)");
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.95,
      }}
    />
  );
}
