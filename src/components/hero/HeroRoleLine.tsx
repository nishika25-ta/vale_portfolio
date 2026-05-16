'use client';

import { useEffect, useState } from 'react';
import { HeroRoleLiquidGlass } from '@/components/hero/HeroRoleLiquidGlass';

const ROLES = [
  'Software developer',
  'AI/ML engineer',
  'learner',
  'Data Analyst',
  'Cybersecurity',
] as const;

const TYPE_MS = 58;
const DELETE_MS = 32;
const PAUSE_FULL_MS = 2400;
const PAUSE_EMPTY_MS = 380;

export function HeroRoleLine() {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let cancelled = false;
    let timeoutId = 0;
    let charIndex = 0;
    let roleIndex = 0;
    let deleting = false;

    const run = () => {
      if (cancelled) return;

      const target = ROLES[roleIndex];

      if (deleting) {
        if (charIndex > 0) {
          charIndex -= 1;
          setDisplayText(target.slice(0, charIndex));
          timeoutId = window.setTimeout(run, DELETE_MS);
          return;
        }
        deleting = false;
        roleIndex = (roleIndex + 1) % ROLES.length;
        timeoutId = window.setTimeout(run, PAUSE_EMPTY_MS);
        return;
      }

      if (charIndex < target.length) {
        charIndex += 1;
        setDisplayText(target.slice(0, charIndex));
        timeoutId = window.setTimeout(run, TYPE_MS);
        return;
      }

      deleting = true;
      timeoutId = window.setTimeout(run, PAUSE_FULL_MS);
    };

    timeoutId = window.setTimeout(run, PAUSE_EMPTY_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="hero-fade hero-fade-2 mt-7 flex justify-center font-sans">
      <HeroRoleLiquidGlass>
        <span className="hero-typewriter">
          {displayText}
          <span className="hero-typewriter-cursor" aria-hidden>
            |
          </span>
        </span>
      </HeroRoleLiquidGlass>
    </div>
  );
}
