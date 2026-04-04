import { Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { ScrollFloat } from '@/components/ScrollFloat';

const PrismaticBurst = lazy(() =>
  import('../footer/PrismaticBurst').then((m) => ({ default: m.PrismaticBurst }))
);

export function ContactFooter() {
  return (
    <footer
      id="contact"
      className="relative flex flex-col items-center justify-center overflow-hidden border-t border-white/5 bg-[#050505] py-24 text-center md:py-28"
    >
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="h-full w-full bg-[#050505]" aria-hidden />}>
          <PrismaticBurst
            animationType="rotate3d"
            intensity={2}
            speed={0.5}
            distort={0}
            paused={false}
            offset={{ x: 0, y: 0 }}
            hoverDampness={0.25}
            rayCount={0}
            mixBlendMode="lighten"
            colors={['#ff007a', '#4d3dff', '#ffffff']}
          />
        </Suspense>
      </div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/55 pointer-events-none" />
      <div className="relative z-10 flex max-w-3xl flex-col items-center px-6 sm:px-8">
        <ScrollFloat
          as="p"
          containerClassName="mb-4"
          textClassName="!font-mono text-xs !font-bold uppercase tracking-[0.4em] text-indigo-400 md:tracking-[0.48em]"
          scrub={0.76}
          stagger={0.045}
        >
          Let&apos;s work together
        </ScrollFloat>
        <h3 className="sr-only">
          Have a project in mind? Let&apos;s create something amazing.
        </h3>
        <div className="mb-8 flex min-w-0 max-w-full flex-col items-center gap-1 px-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-1" aria-hidden>
          <ScrollFloat
            as="span"
            textClassName="text-3xl !font-extrabold !leading-snug !tracking-tight text-white sm:text-4xl md:text-5xl"
            containerClassName="inline-block max-w-full min-w-0 text-center"
            scrub={0.78}
            stagger={0.02}
          >
            {`Have a project in mind? `}
          </ScrollFloat>
          <ScrollFloat
            as="span"
            textClassName="text-3xl !font-extrabold !leading-snug !tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent sm:text-4xl md:text-5xl"
            containerClassName="inline-block max-w-full min-w-0 text-center sm:pl-1"
            scrub={0.78}
            stagger={0.018}
          >
            Let&apos;s create something amazing.
          </ScrollFloat>
        </div>
        <div className="mb-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="mailto:valentineagam6@gmail.com"
            className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-600/20 transition-transform hover:scale-[1.02]"
          >
            <Mail size={19} /> Get in touch
          </a>
          <a
            href="https://wa.me/60146521429"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-8 py-3 text-base font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/10"
          >
            <MessageCircle size={19} /> WhatsApp
          </a>
        </div>
        <div className="mb-6 flex items-center gap-4 text-slate-500">
          <ScrollFloat
            as="span"
            textClassName="text-[10px] !font-semibold uppercase tracking-wider"
            containerClassName="inline-block"
            scrub={0.65}
            stagger={0.06}
          >
            Also on
          </ScrollFloat>
          <div className="flex gap-3">
            <a
              href="https://github.com/valentineagam"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/5 p-3 transition-all hover:bg-white/10 hover:text-white"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com/in/valentineagam"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/5 p-3 transition-all hover:bg-white/10 hover:text-white"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-emerald-900/40 bg-[#050505]/90 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-emerald-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/50 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <ScrollFloat
            as="span"
            textClassName="text-[10px] !font-bold uppercase tracking-wider text-emerald-500"
            containerClassName="inline-block"
            scrub={0.65}
            stagger={0.04}
          >
            Available for new opportunities
          </ScrollFloat>
        </div>
        <ScrollFloat
          as="p"
          textClassName="text-[10px] !font-mono uppercase tracking-[0.3em] text-slate-600"
          scrub={0.85}
          stagger={0.05}
        >
          &copy; 2026 Valentine Agam · React & Tailwind
        </ScrollFloat>
      </div>
    </footer>
  );
}
