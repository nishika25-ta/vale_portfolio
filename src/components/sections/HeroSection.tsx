'use client';

import { useEffect, useState } from 'react';
import LetterGlitch from '@/components/hero/LetterGlitch';
import { HeroRoleLine } from '@/components/hero/HeroRoleLine';

const HERO_GLITCH_COLORS = ['#2b4539', '#61dca3', '#61b3dc'];

function isDesktop() {
  return typeof window !== 'undefined' && window.innerWidth > 768;
}

type HeroSectionProps = {
  introReady?: boolean;
};

export function HeroSection({ introReady = true }: HeroSectionProps) {
  const [showGlitch, setShowGlitch] = useState(false);

  useEffect(() => {
    setShowGlitch(isDesktop());

    const onResize = () => setShowGlitch(isDesktop());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#050505] px-1 pb-24 sm:pb-28"
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
        className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center parallax-element sm:px-8"
        data-speed="0.03"
      >
        <h1
          className={`font-display text-[clamp(3.35rem,16vw,7.75rem)] font-normal leading-[0.98] tracking-[-0.03em] text-white ${
            introReady ? 'hero-fade hero-fade-1' : 'opacity-0'
          }`}
        >
          Valentine{' '}
          <span className="italic text-white/80">Agam</span>
        </h1>

        <HeroRoleLine start={introReady} />
      </div>
    </section>
  );
}
