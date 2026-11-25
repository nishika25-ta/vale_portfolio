'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './startup.module.css';

const BOOT_MS = 1800;
const HOLD_MS = 550;
const CODE = [
  ['import', 'keyword'],
  [' { ', 'punct'],
  ['Valentine', 'nameText'],
  [' } ', 'punct'],
  ['from', 'keyword'],
  [' ', 'punct'],
  ["'./future'", 'string'],
  [';', 'punct'],
] as const;

const GLYPHS = CODE.flatMap(([text, kind]) => [...text].map((char) => ({ char, kind })));
const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz./{}_';

function scrambled(index: number, frame: number) {
  return POOL[(index * 13 + frame) % POOL.length];
}

export function StartupScreen({ onComplete }: { onComplete: () => void }) {
  const [elapsed, setElapsed] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const stop = useRef(false);

  const finish = useCallback(() => {
    stop.current = true;
    setLeaving(true);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    try {
      if (localStorage.getItem('vale-booted')) {
        onComplete();
        return;
      }
    } catch {
      /* Show boot animation if storage is blocked. */
    }

    const wallpaper = new Image();
    wallpaper.src = '/bg.webp';

    const startTime = performance.now();
    let frameId = 0;
    let holdTimer = 0;

    const animate = (now: number) => {
      if (stop.current) return;
      const t = Math.min(1, (now - startTime) / BOOT_MS);
      setElapsed(t);
      if (t < 1) {
        frameId = requestAnimationFrame(animate);
        return;
      }
      holdTimer = window.setTimeout(() => {
        if (!stop.current) setLeaving(true);
      }, HOLD_MS);
    };

    frameId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameId);
      window.clearTimeout(holdTimer);
    };
  }, [onComplete]);

  useEffect(() => {
    if (!leaving) return;
    try {
      localStorage.setItem('vale-booted', '1');
    } catch {
      /* Ignore storage failure. */
    }
    const timer = window.setTimeout(onComplete, 420);
    return () => window.clearTimeout(timer);
  }, [leaving, onComplete]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === 'Escape' || event.key === ' ') {
        event.preventDefault();
        finish();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [finish]);

  const revealed = Math.min(GLYPHS.length, Math.floor(elapsed * GLYPHS.length));
  const scrambleFrame = Math.floor(elapsed * 48);
  const caretOn = Math.floor(elapsed * 4) % 2 === 0;
  const tone = {
    keyword: styles.keyword,
    punct: styles.punct,
    nameText: styles.nameText,
    string: styles.string,
  } as const;

  return (
    <section
      className={styles.startup}
      data-leaving={leaving ? 'true' : undefined}
      style={{ ['--boot' as string]: String(elapsed) }}
      role="dialog"
      aria-modal="true"
      aria-label="ValeOS startup"
      onClick={finish}
    >
      <div className={styles.ambientGlow} aria-hidden="true" />
      <div className={styles.centerStage}>
        <span className={styles.bootMark}>ValeOS 2.0</span>
        <h1 className={styles.codeTitle} aria-label="import { Valentine } from './future';">
          {revealed === 0 ? <span className={styles.caret} style={{ opacity: caretOn ? 1 : 0 }} /> : null}
          {GLYPHS.map((glyph, index) => {
            const shown = index < revealed;
            const atCaret = index === revealed - 1 && revealed < GLYPHS.length;
            return (
              <span
                key={index}
                className={shown || glyph.char === ' ' ? tone[glyph.kind] : styles.nameEncrypted}
                data-caret={atCaret ? 'true' : undefined}
                style={atCaret ? { ['--caret' as string]: caretOn ? '1' : '0' } : undefined}
              >
                {shown || glyph.char === ' ' ? glyph.char : scrambled(index, scrambleFrame)}
              </span>
            );
          })}
        </h1>
        <div className={styles.progressTrack} aria-hidden="true">
          <span className={styles.progressFill} />
        </div>
        <p className={styles.skipHint}>Click or press any key to enter workspace</p>
      </div>
    </section>
  );
}
