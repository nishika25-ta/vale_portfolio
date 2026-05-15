'use client';

import { useEffect, useRef } from 'react';

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

      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px monospace`;
      ctx.textBaseline = 'top';

      lettersRef.current.forEach((letter, index) => {
        const x = (index % gridRef.current.columns) * CHAR_WIDTH;
        const y = Math.floor(index / gridRef.current.columns) * CHAR_HEIGHT;
        ctx.fillStyle = letter.color;
        ctx.fillText(letter.char, x, y);
      });
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
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

      const updateCount = Math.max(1, Math.floor(lettersRef.current.length * 0.05));

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
          const from = hexToRgb(letter.color) ?? hexToRgb(letter.targetColor);
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
        const startRgb = fromRgbRef.current.get(index) ?? hexToRgb(letter.color);
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

    const animate = () => {
      const now = Date.now();
      if (now - lastGlitchTimeRef.current >= glitchSpeed) {
        updateLetters();
        drawLetters();
        lastGlitchTimeRef.current = now;
      }

      if (smooth) handleSmoothTransitions();

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (animationRef.current != null) {
          cancelAnimationFrame(animationRef.current);
        }
        resizeCanvas();
        animate();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current != null) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', handleResize);
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
