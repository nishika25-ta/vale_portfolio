'use client';

import { useEffect, useState } from 'react';
import LetterGlitch from '@/components/hero/LetterGlitch';
import { HeroRoleLine } from '@/components/hero/HeroRoleLine';

const HERO_GLITCH_COLORS = ['#2b4539', '#61dca3', '#61b3dc'];

const HERO_SUMMARY =
  'Building scalable backends, AI automation, and computer vision.';

function isDesktop() {
  return typeof window !== 'undefined' && window.innerWidth > 768;
}

export function HeroSection() {
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    // Check on mount
    setShowGlitch(isDesktop());

    // Re-check on resize so toggling works when the user resizes the window
    const onResize = () => setShowGlitch(isDesktop());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#050505] pb-28"
    >
      <div className="absolute inset-0 z-0">
        <div className="hero-glitch-mask absolute inset-0">
          {showGlitch ? (
            <LetterGlitch
              glitchColors={HERO_GLITCH_COLORS}
              glitchSpeed={52}
              smooth
              outerVignette
              centerVignette={false}
            />
          ) : (
            <div className="h-full w-full bg-[#050505]" aria-hidden />
          )}
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_42%,rgba(5,5,5,0.5)_0%,transparent_70%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-[#050505]"
          aria-hidden
        />
      </div>

      <div
        className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center parallax-element sm:px-8"
        data-speed="0.03"
      >
        <h1 className="hero-fade hero-fade-1 font-display text-[clamp(4rem,16vw,7.75rem)] font-normal leading-[0.98] tracking-[-0.02em] text-white">
          Valentine{' '}
          <span className="italic text-white/80">Agam</span>
        </h1>

        <HeroRoleLine />

        <div
          className="hero-fade hero-fade-3 mx-auto my-9 h-px w-14 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          aria-hidden
        />

        <p className="hero-fade hero-fade-4 mx-auto max-w-md font-sans text-pretty text-[0.9375rem] font-light leading-[1.8] tracking-[0.01em] text-white/45 sm:text-base">
          {HERO_SUMMARY}
        </p>
      </div>
    </section>
  );
}
