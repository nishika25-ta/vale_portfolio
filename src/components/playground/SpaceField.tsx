'use client';

import { useEffect, useRef } from 'react';

type Star = { x: number; y: number; depth: number; phase: number; radius: number };
type Ripple = { x: number; y: number; age: number };
const noise = (n: number) => { const v = Math.sin(n * 127.1 + 31.7) * 43758.5453; return v - Math.floor(v); };

export function SpaceField({ motion, override }: { motion: boolean; override: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let context: CanvasRenderingContext2D | null = null;
    try { context = canvas.getContext('2d', { alpha: true }); } catch { return; }
    if (!context) return;
    const ctx = context;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0, height = 0, stars: Star[] = [], frame = 0, elapsed = 0, previous = 0;
    let targetX = 0, targetY = 0, offsetX = 0, offsetY = 0;
    let pointerX = -1000, pointerY = -1000;
    const ripples: Ripple[] = [];
    const enabled = () => motion && (override || !media.matches) && !document.hidden;
    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);
      if (dt) { elapsed += dt; offsetX += (targetX - offsetX) * .045; offsetY += (targetY - offsetY) * .045; }
      const seconds = elapsed / 1000;
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const x = star.x * width + offsetX * star.depth * 16 + Math.sin(seconds * .035 + star.phase) * star.depth * 5;
        const y = ((star.y * height + seconds * star.depth * 1.4) % (height + 16)) - 8 + offsetY * star.depth * 12;
        const alpha = .25 + star.depth * .19 + Math.sin(seconds * .6 + star.phase) * .11;
        ctx.fillStyle = `rgba(${i % 4 ? '215,207,255' : '174,244,218'},${alpha})`;
        ctx.beginPath(); ctx.arc(x, y, star.radius, 0, Math.PI * 2); ctx.fill();
        if (star.radius > 1.3) {
          ctx.strokeStyle = `rgba(204,230,247,${alpha * .35})`; ctx.lineWidth = .65;
          ctx.beginPath(); ctx.moveTo(x - 4, y); ctx.lineTo(x + 4, y); ctx.moveTo(x, y - 4); ctx.lineTo(x, y + 4); ctx.stroke();
        }
        const distance = Math.hypot(x - pointerX, y - pointerY);
        if (dt && distance < 130) {
          ctx.strokeStyle = `rgba(182,236,220,${(1 - distance / 130) * .19})`; ctx.lineWidth = .6;
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(pointerX, pointerY); ctx.stroke();
        }
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        const ripple = ripples[i]; ripple.age += dt;
        const progress = ripple.age / 900;
        if (progress >= 1) { ripples.splice(i, 1); continue; }
        ctx.strokeStyle = `rgba(183,247,222,${(1 - progress) * .42})`; ctx.lineWidth = .8;
        ctx.beginPath(); ctx.arc(ripple.x, ripple.y, 7 + progress * 47, 0, Math.PI * 2); ctx.stroke();
        for (let ray = 0; ray < 6; ray++) {
          const angle = ray * Math.PI / 3;
          const distance = 10 + progress * 42;
          ctx.fillStyle = `rgba(229,202,253,${(1 - progress) * .75})`;
          ctx.beginPath(); ctx.arc(ripple.x + Math.cos(angle) * distance, ripple.y + Math.sin(angle) * distance, 1.4 - progress, 0, Math.PI * 2); ctx.fill();
        }
      }
    };
    const tick = (now: number) => {
      if (!enabled()) { frame = 0; return; }
      draw(Math.min(now - previous, 40)); previous = now;
      frame = window.requestAnimationFrame(tick);
    };
    const sync = () => {
      window.cancelAnimationFrame(frame); frame = 0;
      if (enabled()) { canvas.dataset.renderState = 'animated'; previous = performance.now(); frame = window.requestAnimationFrame(tick); }
      else {
        canvas.dataset.renderState = document.hidden ? 'hidden' : 'still';
        ripples.length = 0; pointerX = pointerY = -1000;
        if (!document.hidden) draw(0);
      }
    };
    const resize = () => {
      width = window.innerWidth; height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25, Math.sqrt(1400000 / Math.max(1, width * height)));
      canvas.width = Math.max(1, Math.round(width * ratio)); canvas.height = Math.max(1, Math.round(height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(130, Math.max(45, Math.round(width * height / 7000)));
      stars = Array.from({ length: count }, (_, i) => ({ x: noise(i + 1), y: noise(i + 201), depth: .3 + noise(i + 401) * .9, phase: noise(i + 601) * Math.PI * 2, radius: .45 + noise(i + 801) * 1.1 }));
      if (!document.hidden) draw(0);
    };
    const move = (event: PointerEvent) => {
      if (!enabled()) return;
      pointerX = event.clientX; pointerY = event.clientY;
      targetX = (event.clientX / width - .5) * 2; targetY = (event.clientY / height - .5) * 2;
    };
    const leave = () => { targetX = targetY = 0; pointerX = pointerY = -1000; };
    const burst = (event: PointerEvent) => {
      if (!enabled()) return;
      ripples.push({ x: event.clientX, y: event.clientY, age: 0 });
      if (ripples.length > 5) ripples.shift();
    };
    resize(); sync();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', burst, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', sync);
    media.addEventListener('change', sync);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', burst);
      document.documentElement.removeEventListener('pointerleave', leave); document.removeEventListener('visibilitychange', sync); media.removeEventListener('change', sync);
    };
  }, [motion, override]);
  return <canvas ref={canvasRef} className="space-field-canvas" aria-hidden="true" />;
}
