'use client';

import { ArrowUp, Code2, Layers3, Sparkles } from 'lucide-react';
import { FooterChrome } from '@/components/footer/FooterChrome';
import { scrollToSection } from '@/utils/navigation';

const PRINCIPLES = [
  { icon: Code2, title: 'Purposeful', text: 'Every feature begins with a real problem.' },
  { icon: Layers3, title: 'Scalable', text: 'Systems designed to evolve beyond version one.' },
  { icon: Sparkles, title: 'Thoughtful', text: 'Clear experiences, polished down to the detail.' },
];

export function ContactFooter() {
  return (
    <footer id="contact" className="relative min-h-[620px] overflow-hidden border-t border-white/[0.06] bg-[#050505] pb-28 pt-20 sm:pt-28 md:pb-10 md:pt-36">
      <div className="absolute inset-0 z-0">
        <FooterChrome />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgba(14,165,233,0.13),transparent_38%)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/65 to-[#050505]/15" />
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.07]" aria-hidden />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl text-center" data-reveal-stagger="0.14">
          <div data-reveal-item>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-content-primary/25 bg-content-primary/[0.07] px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-content-primary" aria-hidden />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.28em] text-content-primary">End of portfolio</span>
            </div>
            <h3 className="text-[2.25rem] font-extrabold !leading-[1.03] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl">
              Ideas deserve more than a prototype.
              <span className="mt-2 block bg-gradient-to-r from-content-primary via-content-secondary to-hero-primary bg-clip-text text-transparent">
                They deserve to work beautifully.
              </span>
            </h3>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
              A portfolio built around practical engineering, intelligent systems, and digital products designed for real-world use.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4" data-reveal-stagger="0.12">
          {PRINCIPLES.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title} data-reveal-item className="rounded-2xl border border-white/[0.07] bg-black/30 p-5 text-left backdrop-blur-sm transition-colors hover:border-content-primary/20 hover:bg-content-primary/[0.04] sm:text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-content-primary/20 bg-content-primary/[0.08] text-content-primary sm:mx-auto">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <h4 className="mt-4 text-sm font-bold text-white">{item.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.text}</p>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-12 flex max-w-4xl justify-center border-t border-white/[0.06] pt-8">
          <button type="button" onClick={() => scrollToSection('home')} className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-6 text-sm font-semibold text-white transition-all hover:border-content-primary/30 hover:bg-content-primary/[0.08]">
            Back to the beginning
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-1" aria-hidden />
          </button>
        </div>

        <div className="mt-12 text-center">
          <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-slate-700">Designed &amp; engineered for the web · 2026</p>
        </div>
      </div>
    </footer>
  );
}
