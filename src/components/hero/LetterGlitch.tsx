'use client';

import { useEffect, useRef } from 'react';
import { isMobileViewport } from '@/utils/isMobileViewport';

type LetterGlitchProps = {
  glitchColors?: string[];
  glitchSpeed?: number;
  centerVignette?: boolean;
  outerVignette?: boolean;
  smooth?: boolean;
  characters?: string;
  className?: string;
};

type Letter = {
  char: string;
  color: string;
  targetColor: string;
  colorProgress: number;
};

type Rgb = { r: number; g: number; b: number };

const DEFAULT_COLORS = ['#2b4539', '#61dca3', '#61b3dc'];
const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789';
const FONT_SIZE = 16;
const CHAR_WIDTH = 10;
const CHAR_HEIGHT = 20;

function hexToRgb(hex: string): Rgb | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const normalized = hex.replace(shorthandRegex, (_m, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
  if (!result) return null;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function parseColorToRgb(color: string): Rgb | null {
  if (color.startsWith('rgb')) {
    const match = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/.exec(color);
    if (match) {
      return {
        r: parseInt(match[1], 10),
        g: parseInt(match[2], 10),
        b: parseInt(match[3], 10),
      };
    }
  }
  return hexToRgb(color);
}

function interpolateColor(start: Rgb, end: Rgb, factor: number): string {
  const r = Math.round(start.r + (end.r - start.r) * factor);
  const g = Math.round(start.g + (end.g - start.g) * factor);
  const b = Math.round(start.b + (end.b - start.b) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Canvas character grid — continuous rAF loop (matches original LetterGlitch behavior).
 */
export default function LetterGlitch({
  glitchColors = DEFAULT_COLORS,
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = DEFAULT_CHARS,
  className = '',
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lettersRef = useRef<Letter[]>([]);
  const gridRef = useRef({ columns: 0, rows: 0 });
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const lastGlitchTimeRef = useRef(Date.now());
  const fromRgbRef = useRef<Map<number, Rgb>>(new Map());
  const dprRef = useRef(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const lettersAndSymbols = Array.from(characters);
    contextRef.current = canvas.getContext('2d');

    const getRandomChar = () =>
      lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)] ?? 'A';
    const getRandomColor = () =>
      glitchColors[Math.floor(Math.random() * glitchColors.length)] ?? '#fff';

    const calculateGrid = (width: number, height: number) => ({
      columns: Math.ceil(width / CHAR_WIDTH),
      rows: Math.ceil(height / CHAR_HEIGHT),
    });

    const initializeLetters = (columns: number, rows: number) => {
      gridRef.current = { columns, rows };
      const totalLetters = columns * rows;
      lettersRef.current = Array.from({ length: totalLetters }, () => ({
        char: getRandomChar(),
        color: getRandomColor(),
        targetColor: getRandomColor(),
        colorProgress: 1,
      }));
      fromRgbRef.current.clear();
    };

    const drawLetters = () => {
      const ctx = contextRef.current;
      if (!ctx || lettersRef.current.length === 0) return;

      const dpr = dprRef.current;
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textBaseline = 'top';

      lettersRef.current.forEach((letter, index) => {
        const x = (index % gridRef.current.columns) * CHAR_WIDTH;
        const y = Math.floor(index / gridRef.current.columns) * CHAR_HEIGHT;
        ctx.fillStyle = letter.color;
        ctx.fillText(letter.char, x, y);
      });
    };

    const mobile = isMobileViewport();
    let isVisible = true;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.25 : 2);
      dprRef.current = dpr;
      const rect = parent.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      if (contextRef.current) {
        contextRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      const { columns, rows } = calculateGrid(rect.width, rect.height);
      initializeLetters(columns, rows);
      drawLetters();
    };

    const updateLetters = () => {
      if (lettersRef.current.length === 0) return;

      const updateRatio = mobile ? 0.025 : 0.05;
      const updateCount = Math.max(1, Math.floor(lettersRef.current.length * updateRatio));

      for (let i = 0; i < updateCount; i += 1) {
        const index = Math.floor(Math.random() * lettersRef.current.length);
        const letter = lettersRef.current[index];
        if (!letter) continue;

        letter.char = getRandomChar();
        letter.targetColor = getRandomColor();

        if (!smooth) {
          letter.color = letter.targetColor;
          letter.colorProgress = 1;
          fromRgbRef.current.delete(index);
        } else {
          const from = parseColorToRgb(letter.color) ?? hexToRgb(letter.targetColor);
          if (from) fromRgbRef.current.set(index, from);
          letter.colorProgress = 0;
        }
      }
    };

    const handleSmoothTransitions = () => {
      let needsRedraw = false;

      lettersRef.current.forEach((letter, index) => {
        if (letter.colorProgress >= 1) return;

        letter.colorProgress = Math.min(1, letter.colorProgress + 0.05);
        const startRgb = fromRgbRef.current.get(index) ?? parseColorToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);

        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }

        if (letter.colorProgress >= 1) {
          fromRgbRef.current.delete(index);
        }
      });

      if (needsRedraw) drawLetters();
    };

    const effectiveGlitchSpeed = mobile ? Math.max(glitchSpeed, 90) : glitchSpeed;

    const animate = () => {
      if (!isVisible) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const now = Date.now();
      if (now - lastGlitchTimeRef.current >= effectiveGlitchSpeed) {
        updateLetters();
        drawLetters();
        lastGlitchTimeRef.current = now;
      }

      if (smooth) handleSmoothTransitions();

      animationRef.current = requestAnimationFrame(animate);
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true;
      },
      { root: null, threshold: 0.05 }
    );
    visibilityObserver.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden) isVisible = false;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const resizeObserver = new ResizeObserver(() => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 100);
    });

    const parent = canvas.parentElement;
    if (parent) {
      resizeObserver.observe(parent);
    }

    // Initialize canvas size immediately on mount before the animation loop starts.
    // ResizeObserver only fires on changes, not the initial layout.
    resizeCanvas();
    animate();

    // Safety net: re-run sizing one frame later in case CSS layout hadn't fully
    // settled yet during the synchronous mount call above.
    const rafId = requestAnimationFrame(() => {
      resizeCanvas();
    });

    return () => {
      if (animationRef.current != null) {
        cancelAnimationFrame(animationRef.current);
      }
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimeout);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [characters, glitchColors, glitchSpeed, smooth]);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-black ${className}`}>
      <canvas ref={canvasRef} className="block h-full w-full" aria-hidden />
      {outerVignette ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]"
          aria-hidden
        />
      ) : null}
      {centerVignette ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]"
          aria-hidden
        />
      ) : null}
    </div>
  );
}
