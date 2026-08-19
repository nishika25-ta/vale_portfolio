'use client';

import { useEffect, useState } from 'react';
import { ArrowDownRight, FileText } from 'lucide-react';
import LetterGlitch from '@/components/hero/LetterGlitch';
import { HeroRoleLine } from '@/components/hero/HeroRoleLine';
import { RESUME_HREF, SITE_TAGLINE } from '@/data/profile';
import { scrollToSection } from '@/utils/navigation';

const HERO_GLITCH_COLORS = ['#2b4539', '#61dca3', '#61b3dc'];

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
        <h1 className="hero-fade hero-fade-1 font-display text-[clamp(3.35rem,16vw,7.75rem)] font-normal leading-[0.98] tracking-[-0.03em] text-white">
          Valentine{' '}
          <span className="italic text-white/80">Agam</span>
        </h1>

        <HeroRoleLine />

        <div
          className="hero-fade hero-fade-3 mx-auto my-7 h-px w-14 bg-gradient-to-r from-transparent via-white/25 to-transparent sm:my-9"
          aria-hidden
        />

        <p className="hero-fade hero-fade-4 mx-auto max-w-md font-sans text-pretty text-[0.9375rem] font-light leading-[1.8] tracking-[0.01em] text-white/45 sm:text-base">
          {SITE_TAGLINE}
        </p>

        <div className="hero-fade hero-fade-5 mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollToSection('projects')}
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.02]"
          >
            View selected work
            <ArrowDownRight className="h-4 w-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('contact')}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/[0.08]"
          >
            Let&apos;s connect
          </button>
          <a
            href={RESUME_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/10 px-5 text-sm font-semibold text-white/70 transition-colors hover:border-white/20 hover:text-white"
          >
            <FileText className="h-4 w-4" aria-hidden />
            Resume
          </a>
        </div>
      </div>
    </section>
  );
}
