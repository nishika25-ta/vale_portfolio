'use client';

import { HeroRoleLine } from '@/components/hero/HeroRoleLine';

type HeroSectionProps = {
  introReady?: boolean;
};

export function HeroSection({ introReady = true }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#06080b] px-4 pb-24 pt-16 sm:pb-28"
    >
      {/* Atmospheric lighting & architectural geometry */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {/* Top ambient bloom */}
        <div className="absolute -top-[28%] left-1/2 h-[680px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(97,220,163,0.085)_0%,rgba(97,179,220,0.045)_42%,transparent_74%)] blur-3xl" />

        {/* Central focal aura behind typography */}
        <div className="absolute left-1/2 top-[46%] h-[420px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.032)_0%,rgba(97,220,163,0.022)_45%,transparent_72%)] blur-2xl" />

        {/* Subtle precision micro-grid masked to center */}
        <div className="hero-atmosphere-grid absolute inset-0" />

        {/* Delicate orbital rings */}
        <svg
          className="absolute left-1/2 top-[47%] h-[680px] w-[1160px] max-w-[145vw] -translate-x-1/2 -translate-y-1/2 opacity-[0.42]"
          viewBox="0 0 1160 680"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="hero-orbit-grad-1" x1="120" y1="140" x2="1040" y2="540" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
              <stop offset="35%" stopColor="rgba(97,220,163,0.18)" />
              <stop offset="68%" stopColor="rgba(97,179,220,0.14)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
            <linearGradient id="hero-orbit-grad-2" x1="980" y1="110" x2="180" y2="570" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(255,255,255,0.01)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.11)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.01)" />
            </linearGradient>
          </defs>
          <ellipse
            cx="580"
            cy="340"
            rx="470"
            ry="215"
            transform="rotate(-9 580 340)"
            stroke="url(#hero-orbit-grad-1)"
            strokeWidth="1"
          />
          <ellipse
            cx="580"
            cy="340"
            rx="410"
            ry="180"
            transform="rotate(7 580 340)"
            stroke="url(#hero-orbit-grad-2)"
            strokeWidth="1"
            strokeDasharray="3 7"
          />
          {/* Subtle orbital nodes */}
          <circle cx="152" cy="272" r="2" fill="rgba(97,220,163,0.45)" />
          <circle cx="1006" cy="408" r="2" fill="rgba(97,179,220,0.45)" />
        </svg>

        {/* Bottom seamless fade into the page surface */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent via-[#050505]/70 to-[#050505]" />
      </div>

      {/* Centered content — preserves exact hierarchy & layout */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center parallax-element sm:px-8"
        data-speed="0.03"
      >
        <p
          className={`mb-5 font-mono text-xs font-medium tracking-[0.22em] text-slate-400/90 sm:mb-6 sm:text-sm ${
            introReady ? 'hero-fade hero-fade-1' : 'opacity-0'
          }`}
        >
          Hello World, I&apos;m
        </p>

        <h1
          className={`font-heading text-[clamp(3.15rem,11vw,7.5rem)] font-extrabold leading-[0.96] tracking-[-0.045em] text-white ${
            introReady ? 'hero-fade hero-fade-2' : 'opacity-0'
          }`}
        >
          <span className="bg-gradient-to-b from-white via-white to-white/80 bg-clip-text text-transparent">
            Valentine
          </span>{' '}
          <span className="hero-name-accent">Agam</span>
          <span className="text-hero-primary">.</span>
        </h1>

        <HeroRoleLine start={introReady} />
      </div>
    </section>
  );
}
