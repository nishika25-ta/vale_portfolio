'use client';

import dynamic from 'next/dynamic';
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';

const LiquidChrome = dynamic(() => import('@/components/footer/LiquidChrome'), { ssr: false });

/** RGB 0–1 — indigo/violet base to match content accent */
const FOOTER_CHROME_COLOR: [number, number, number] = [0.12, 0.1, 0.22];

export function ContactFooter() {
  return (
    <footer
      id="contact"
      className="relative min-h-[600px] overflow-hidden border-t border-white/[0.06] bg-[#050505] pt-24 md:min-h-[640px] md:pt-32"
    >
      <div className="absolute inset-0 z-0">
        <LiquidChrome
          baseColor={FOOTER_CHROME_COLOR}
          speed={0.3}
          amplitude={0.3}
          frequencyX={3}
          frequencyY={2}
          interactive
          className="absolute inset-0"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/75 to-[#050505]/40" />
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.08]" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <div className="pointer-events-none mb-16 text-center md:text-left">
          <div className="pointer-events-auto mb-4 inline-flex items-center gap-2 rounded-full border border-hero-primary/25 bg-hero-primary/[0.06] px-4 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hero-primary/40 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-hero-primary" />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-hero-primary/90">
              Available for new opportunities
            </span>
          </div>
          <h3 className="mx-auto max-w-3xl text-3xl font-extrabold !leading-[1.1] tracking-tight text-white md:mx-0 md:text-5xl">
            Have a project in mind?{' '}
            <span className="bg-gradient-to-r from-content-primary to-hero-secondary bg-clip-text text-transparent">
              Let&apos;s create something amazing.
            </span>
          </h3>
        </div>

        <div className="pointer-events-none grid grid-cols-1 gap-8 border-t border-white/[0.06] pt-12 md:grid-cols-2 md:gap-12">
          <div className="pointer-events-auto">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-content-primary/90">
              01 // Get in touch
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <a
                href="mailto:valentineagam6@gmail.com"
                className="group inline-flex items-center justify-between gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition-transform hover:scale-[1.02]"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail size={16} /> Email me
                </span>
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="https://wa.me/60146521429"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/[0.08]"
              >
                <span className="inline-flex items-center gap-2">
                  <MessageCircle size={16} /> WhatsApp
                </span>
                <ArrowUpRight size={14} className="opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
            <div className="mt-6 flex gap-2">
              <a
                href="https://github.com/nishika25-ta"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto rounded-full border border-white/10 bg-white/[0.04] p-3 text-slate-400 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                aria-label="GitHub — nishika25-ta"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/valentine-a-a278a7254"
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto rounded-full border border-white/10 bg-white/[0.04] p-3 text-slate-400 transition-all hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                aria-label="LinkedIn — Valentine Agam"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="pointer-events-auto">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-content-primary/90">
              02 // Details
            </p>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.05] pb-2">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Email</dt>
                <dd className="text-right text-[12px] font-medium text-slate-200">valentineagam6@gmail.com</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.05] pb-2">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Phone</dt>
                <dd className="text-right text-[12px] font-medium text-slate-200">+60 14-652 1429</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.05] pb-2">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Based in</dt>
                <dd className="text-right text-[12px] font-medium text-slate-200">Miri, Sarawak · MY</dd>
              </div>
              <div className="flex items-baseline justify-between gap-3">
                <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">Reply within</dt>
                <dd className="text-right text-[12px] font-medium text-slate-200">~24 hours</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="pointer-events-none mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/[0.05] py-8 text-center md:flex-row md:text-left">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
            &copy; 2026 Valentine Agam · Next.js &amp; Tailwind
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
            Crafted in Miri, Sarawak · MY
          </p>
        </div>
      </div>
    </footer>
  );
}
