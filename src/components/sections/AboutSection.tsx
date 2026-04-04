import { MapPin, Sparkles } from 'lucide-react';
import { ScrollFloat } from '@/components/ScrollFloat';

export function AboutSection() {
  return (
    <section id="about" className="border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <header className="mb-14 text-center md:mb-16 md:text-left">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5">
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" aria-hidden />
            <ScrollFloat
              as="span"
              textClassName="!font-mono text-[10px] !font-bold uppercase tracking-[0.35em] text-indigo-300/90"
              containerClassName="inline-block"
              scrub={0.68}
              stagger={0.08}
            >
              Profile
            </ScrollFloat>
          </div>
          <h2 className="sr-only">About Me</h2>
          <div className="flex min-w-0 max-w-full flex-wrap items-baseline justify-center gap-x-1.5 md:justify-start" aria-hidden>
            <ScrollFloat
              as="span"
              textClassName="text-4xl !font-extrabold !tracking-tight text-white md:text-5xl"
              containerClassName="inline-block max-w-full min-w-0 text-left"
              scrub={0.75}
            >
              About
            </ScrollFloat>
            <ScrollFloat
              as="span"
              textClassName="text-4xl !font-extrabold !tracking-tight bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent md:text-5xl"
              containerClassName="inline-block max-w-full min-w-0 text-left"
              scrub={0.75}
            >
              Me
            </ScrollFloat>
          </div>
          <ScrollFloat
            as="p"
            containerClassName="mt-3 max-w-xl md:mx-0 mx-auto text-center md:text-left"
            textClassName="!font-normal !font-sans text-slate-500"
            scrub={0.8}
            stagger={0.012}
          >
            Engineering, AI, and product thinking — grounded in real shipping experience.
          </ScrollFloat>
        </header>

        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
          {/* Photo: narrow column + capped height so the portrait isn’t oversized */}
          <figure className="mx-auto flex w-full max-w-[min(100%,260px)] shrink-0 flex-col gap-4 lg:mx-0 lg:max-w-[240px]">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
              <div className="aspect-[3/4] w-full max-h-[min(320px,42vh)] lg:max-h-[340px]">
                <img
                  src="hi.png"
                  alt="Valentine Agam"
                  className="h-full w-full object-cover object-[center_22%]"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/60 px-3 py-2.5 backdrop-blur-md">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-indigo-400" aria-hidden />
                <span className="font-mono text-[11px] font-semibold tracking-wide text-white">Miri, Sarawak</span>
              </div>
            </div>
            <figcaption className="text-center text-[11px] leading-relaxed text-slate-600 lg:text-left">
              Valentine Agam · AI Engineer &amp; developer
            </figcaption>
          </figure>

          {/* Copy + stats */}
          <div className="min-w-0 flex-1 space-y-10">
            <div className="rounded-[1.75rem] border border-white/[0.07] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)] backdrop-blur-sm sm:p-8 md:p-10">
              <div className="space-y-6 text-base leading-relaxed text-slate-400 md:text-lg">
                <p>
                  My journey bridges technical engineering with business strategy. During my time as a{' '}
                  <strong className="font-semibold text-white">Backend Engineer</strong> and{' '}
                  <strong className="font-semibold text-white">Business Development Executive</strong> at Zenara Jaya, I
                  spearheaded digital transformations with scalable SaaS solutions.
                </p>
                <p className="border-l-2 border-indigo-500/40 pl-4">
                  Whether it&apos;s deploying an AI-powered resume parsing microservice on DigitalOcean using FastAPI, or
                  training YOLO models to achieve 92% detection accuracy, I focus on delivering tangible ROI and flawless
                  user experiences.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-colors hover:border-indigo-500/25">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Model accuracy</p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-white">
                  92<span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">%</span>
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">YOLO detection (project)</p>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-colors hover:border-violet-500/25">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">Academic</p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight text-white">3.12</p>
                <p className="mt-1 text-xs font-medium text-slate-500">CGPA · UNIMAS</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
