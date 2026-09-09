"use client";

import { useEffect, useRef } from "react";

export default function FluidCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    // Mouse & physics tracking
    const pointer = {
      x: (width * 0.5) / dpr,
      y: (height * 0.4) / dpr,
      targetX: (width * 0.5) / dpr,
      targetY: (height * 0.4) / dpr,
      vx: 0,
      vy: 0,
      speed: 0,
      angle: 0,
      radius: 200,
      down: false,
    };

    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;
    let isVisible = true;

    // Fluid Chromatic Metaspheres
    const orbs = [
      { x: width * 0.2, y: height * 0.25, r: 320, vx: 0.35, vy: 0.25, hue: 195, baseAlpha: 0.24 }, // Electric Cyan
      { x: width * 0.8, y: height * 0.35, r: 360, vx: -0.3, vy: 0.35, hue: 270, baseAlpha: 0.22 }, // Deep Violet
      { x: width * 0.5, y: height * 0.75, r: 400, vx: 0.25, vy: -0.28, hue: 220, baseAlpha: 0.20 }, // Oceanic Blue
      { x: width * 0.85, y: height * 0.85, r: 280, vx: -0.2, vy: -0.2, hue: 330, baseAlpha: 0.16 }, // Sakura Neon Pink
      { x: width * 0.15, y: height * 0.8, r: 300, vx: 0.22, vy: 0.24, hue: 160, baseAlpha: 0.18 }, // Emerald Laser
    ];

    // Anime Speedlines Array (kinetic action streaks)
    const speedlines = [];

    // Floating Cybernetic Kanji & Forex Candlestick Wick Particles
    const KANJI_TOKENS = ["波動", "瞬", "創", "撃", "龍", "極", "光", "超"];
    const particles = [];
    const PARTICLE_COUNT = 32;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isKanji = i % 4 === 0;
      particles.push({
        x: Math.random() * (width / dpr),
        y: Math.random() * (height / dpr),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: isKanji ? 13 : Math.random() * 2.5 + 1,
        isKanji,
        token: isKanji ? KANJI_TOKENS[i % KANJI_TOKENS.length] : null,
        hue: isKanji ? (Math.random() > 0.5 ? 190 : 280) : 200 + Math.random() * 60,
        alpha: isKanji ? 0.25 : 0.4 + Math.random() * 0.4,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Dynamic Caustic Ripples Array
    const ripples = [];

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const dx = currentX - pointer.targetX;
      const dy = currentY - pointer.targetY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      pointer.targetX = currentX;
      pointer.targetY = currentY;
      pointer.angle = Math.atan2(dy, dx);

      // Trigger kinetic anime speedline burst if cursor moves briskly
      if (dist > 35 && speedlines.length < 35) {
        for (let s = 0; s < 2; s++) {
          const spread = (Math.random() - 0.5) * 0.6;
          const speedlineAngle = pointer.angle + spread + Math.PI;
          const lineLength = Math.min(180, 50 + dist * 2);
          speedlines.push({
            x: pointer.targetX + (Math.random() - 0.5) * 30,
            y: pointer.targetY + (Math.random() - 0.5) * 30,
            vx: Math.cos(speedlineAngle) * (4 + dist * 0.15),
            vy: Math.sin(speedlineAngle) * (4 + dist * 0.15),
            length: lineLength,
            life: 1.0,
            decay: 0.035 + Math.random() * 0.025,
            hue: Math.random() > 0.4 ? 195 : 320, // Cyan or Sakura neon
          });
        }
      }

      // Add dynamic micro-ripple when mouse accelerates
      if (dist > 30 && ripples.length < 15) {
        ripples.push({
          x: pointer.targetX,
          y: pointer.targetY,
          r: 8,
          maxR: Math.min(260, 90 + dist * 2),
          alpha: 0.55,
          speed: 3.2 + dist * 0.06,
          hue: 190 + Math.random() * 70,
        });
      }
    };

    const handleMouseDown = () => {
      pointer.down = true;
      // Explosive anime shockwave burst
      ripples.push({
        x: pointer.x,
        y: pointer.y,
        r: 10,
        maxR: 420,
        alpha: 0.9,
        speed: 6.5,
        hue: 195,
      });
      ripples.push({
        x: pointer.x,
        y: pointer.y,
        r: 4,
        maxR: 260,
        alpha: 0.75,
        speed: 4.8,
        hue: 285,
      });

      // Spawn radial anime light burst lines
      for (let k = 0; k < 12; k++) {
        const a = (k / 12) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
        const spd = 6 + Math.random() * 5;
        speedlines.push({
          x: pointer.x,
          y: pointer.y,
          vx: Math.cos(a) * spd,
          vy: Math.sin(a) * spd,
          length: 70 + Math.random() * 50,
          life: 1.0,
          decay: 0.04,
          hue: k % 2 === 0 ? 195 : 330,
        });
      }
    };

    const handleMouseUp = () => {
      pointer.down = false;
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY;
      scrollVelocity = delta * 0.45;
      lastScrollY = currentScroll;

      // Spawn subtle vertical anime speed streaks during vigorous scrolling
      if (Math.abs(delta) > 40 && speedlines.length < 30) {
        const dir = delta > 0 ? -1 : 1;
        for (let j = 0; j < 3; j++) {
          speedlines.push({
            x: Math.random() * (width / dpr),
            y: dir > 0 ? -20 : (height / dpr) + 20,
            vx: 0,
            vy: dir * (8 + Math.random() * 12),
            length: 120 + Math.random() * 100,
            life: 1.0,
            decay: 0.04,
            hue: 195,
          });
        }
      }
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("visibilitychange", handleVisibilityChange);

    let t = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      t += 0.009;

      // Smooth kinetic lerp physics on cursor
      pointer.vx = (pointer.targetX - pointer.x) * 0.095;
      pointer.vy = (pointer.targetY - pointer.y) * 0.095;
      pointer.x += pointer.vx;
      pointer.y += pointer.vy;
      pointer.speed = Math.sqrt(pointer.vx * pointer.vx + pointer.vy * pointer.vy);

      // Scroll velocity dampening
      scrollVelocity *= 0.91;

      // Reset transform and scale to DPR
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const logicalW = width / dpr;
      const logicalH = height / dpr;

      // 1. Base dark obsidian void background
      ctx.fillStyle = "#05070e";
      ctx.fillRect(0, 0, logicalW, logicalH);

      // 2. Procedural Isometric Blueprint Dot Matrix with Wave Deflection
      ctx.save();
      const dotSpacing = 44;
      const gridOffset = (t * 14) % dotSpacing;

      for (let x = 0; x <= logicalW + dotSpacing; x += dotSpacing) {
        for (let y = 0; y <= logicalH + dotSpacing; y += dotSpacing) {
          const pdx = x - pointer.x;
          const pdy = y - pointer.y;
          const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
          let offsetX = 0;
          let offsetY = 0;
          let dotAlpha = 0.032;

          // Pointer fluid push
          if (pdist < pointer.radius * 1.5) {
            const force = (1 - pdist / (pointer.radius * 1.5));
            offsetX = (pdx / (pdist || 1)) * force * 15;
            offsetY = (pdy / (pdist || 1)) * force * 15;
            dotAlpha += force * 0.11;
          }

          // Caustic ripple displacement
          for (let r = 0; r < ripples.length; r++) {
            const rip = ripples[r];
            const rdx = x - rip.x;
            const rdy = y - rip.y;
            const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
            const waveDist = Math.abs(rdist - rip.r);
            if (waveDist < 35) {
              const wavePower = (1 - waveDist / 35) * rip.alpha * 12;
              offsetX += (rdx / (rdist || 1)) * wavePower;
              offsetY += (rdy / (rdist || 1)) * wavePower;
              dotAlpha += wavePower * 0.04;
            }
          }

          ctx.fillStyle = `rgba(140, 190, 255, ${Math.min(1, dotAlpha)})`;
          ctx.fillRect(x + offsetX - 0.75, y + offsetY + gridOffset * 0.2 - 0.75, 1.5, 1.5);
        }
      }
      ctx.restore();

      // 3. Render Procedural Liquid Metaspheres with Volumetric Screen Blend
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      orbs.forEach((orb, i) => {
        // Multi-frequency harmonic wave motion
        orb.x += orb.vx + Math.sin(t * 1.4 + i * 1.2) * 0.55;
        orb.y += orb.vy + Math.cos(t * 1.1 + i * 0.8) * 0.55 - scrollVelocity * 0.04;

        // Soft rebound at viewport borders
        if (orb.x < -80) orb.vx = Math.abs(orb.vx);
        if (orb.x > logicalW + 80) orb.vx = -Math.abs(orb.vx);
        if (orb.y < -80) orb.vy = Math.abs(orb.vy);
        if (orb.y > logicalH + 80) orb.vy = -Math.abs(orb.vy);

        // Viscous fluid deflection near cursor
        const odx = orb.x - pointer.x;
        const ody = orb.y - pointer.y;
        const odist = Math.sqrt(odx * odx + ody * ody);
        if (odist < pointer.radius * 2 && odist > 0) {
          const push = (1 - odist / (pointer.radius * 2)) * 2.2;
          orb.x += (odx / odist) * push;
          orb.y += (ody / odist) * push;
        }

        const dynamicR = orb.r + Math.sin(t * 2.2 + i) * 25;

        // Chromatic dispersion gradient
        const grad = ctx.createRadialGradient(
          orb.x, orb.y, dynamicR * 0.04,
          orb.x, orb.y, dynamicR
        );
        grad.addColorStop(0, `hsla(${orb.hue}, 90%, 65%, ${orb.baseAlpha * 1.5})`);
        grad.addColorStop(0.35, `hsla(${orb.hue + 25}, 85%, 55%, ${orb.baseAlpha * 0.85})`);
        grad.addColorStop(0.7, `hsla(${orb.hue + 55}, 90%, 45%, ${orb.baseAlpha * 0.3})`);
        grad.addColorStop(1, `hsla(${orb.hue + 80}, 95%, 35%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, dynamicR, 0, Math.PI * 2);
        ctx.fill();
      });

      // 4. Kinetic Anime Speedlines & Radiant Needles
      for (let s = speedlines.length - 1; s >= 0; s--) {
        const line = speedlines[s];
        line.x += line.vx;
        line.y += line.vy;
        line.life -= line.decay;

        if (line.life <= 0) {
          speedlines.splice(s, 1);
          continue;
        }

        const speedMag = Math.sqrt(line.vx * line.vx + line.vy * line.vy) || 1;
        const tailX = line.x - (line.vx / speedMag) * line.length * line.life;
        const tailY = line.y - (line.vy / speedMag) * line.length * line.life;

        const lineGrad = ctx.createLinearGradient(line.x, line.y, tailX, tailY);
        lineGrad.addColorStop(0, `hsla(${line.hue}, 95%, 75%, ${line.life * 0.85})`);
        lineGrad.addColorStop(0.6, `hsla(${line.hue + 30}, 90%, 65%, ${line.life * 0.35})`);
        lineGrad.addColorStop(1, `hsla(${line.hue + 60}, 95%, 55%, 0)`);

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = Math.max(1, line.life * 2.2);
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
      }

      // 5. Floating Cybernetic Kanji & Candlestick Embers
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.angularSpeed;

        // Wrap around boundaries
        if (p.x < -40) p.x = logicalW + 40;
        if (p.x > logicalW + 40) p.x = -40;
        if (p.y < -40) p.y = logicalH + 40;
        if (p.y > logicalH + 40) p.y = -40;

        // Electromagnetic repulsion from pointer
        const pdx = p.x - pointer.x;
        const pdy = p.y - pointer.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pdist < 150 && pdist > 0) {
          const repel = (1 - pdist / 150) * 2.8;
          p.x += (pdx / pdist) * repel;
          p.y += (pdy / pdist) * repel;
        }

        if (p.isKanji) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(Math.sin(p.angle) * 0.15);
          ctx.font = `600 ${p.size}px ui-sans-serif, system-ui, -apple-system, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, ${p.alpha * (0.7 + Math.sin(t * 3 + p.x) * 0.3)})`;
          ctx.fillText(p.token, 0, 0);
          ctx.restore();
        } else {
          ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // 6. Interactive Reactive Flare (Cursor Liquid Core)
      const flareRadius = pointer.radius + pointer.speed * 3.5;
      const pointerGrad = ctx.createRadialGradient(
        pointer.x, pointer.y, 0,
        pointer.x, pointer.y, flareRadius
      );
      pointerGrad.addColorStop(0, "rgba(0, 245, 255, 0.32)");
      pointerGrad.addColorStop(0.25, "rgba(140, 95, 255, 0.22)");
      pointerGrad.addColorStop(0.65, "rgba(35, 45, 110, 0.08)");
      pointerGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = pointerGrad;
      ctx.beginPath();
      ctx.arc(pointer.x, pointer.y, flareRadius, 0, Math.PI * 2);
      ctx.fill();

      // 7. Dynamic Liquid Ripple Caustic Rings
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rip = ripples[i];
        rip.r += rip.speed;
        rip.alpha *= 0.952;

        if (rip.alpha < 0.01 || rip.r >= rip.maxR) {
          ripples.splice(i, 1);
          continue;
        }

        ctx.strokeStyle = `hsla(${rip.hue}, 95%, 70%, ${rip.alpha})`;
        ctx.lineWidth = Math.max(1, (1 - rip.r / rip.maxR) * 3.2);
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.r, 0, Math.PI * 2);
        ctx.stroke();

        // Refractive inner sakura/cyan fringe
        ctx.strokeStyle = `hsla(${rip.hue + 45}, 90%, 80%, ${rip.alpha * 0.7})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, Math.max(0, rip.r - 5), 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();

      // 8. Vignette Cinematic Overlay
      const vigRadius = Math.min(logicalW, logicalH) * 0.45;
      const vigGrad = ctx.createRadialGradient(
        logicalW * 0.5, logicalH * 0.5, vigRadius,
        logicalW * 0.5, logicalH * 0.5, Math.max(logicalW, logicalH) * 0.85
      );
      vigGrad.addColorStop(0, "rgba(5, 7, 14, 0)");
      vigGrad.addColorStop(1, "rgba(3, 5, 10, 0.72)");
      ctx.fillStyle = vigGrad;
      ctx.fillRect(0, 0, logicalW, logicalH);

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
      document.removeEventListener("visibilitychange", handleVisibilityChange);
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
        opacity: 0.98,
      }}
    />
  );
}
