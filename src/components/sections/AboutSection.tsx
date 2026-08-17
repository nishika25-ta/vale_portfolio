import Image from 'next/image';
import { ArrowUpRight, Boxes, BrainCircuit, ServerCog } from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
import { SectionHeader } from '@/components/ui/SectionHeader';

const META_ROWS = [
  { label: 'Approach', value: 'Product-minded engineering' },
  { label: 'Focus', value: 'Full-Stack · Digital Transformation · AI' },
  { label: 'Status', value: 'Hospital Miri (MySTEP) · 2026' },
  { label: 'Languages', value: 'English · Bahasa Melayu' },
];

const CAPABILITIES = [
  {
    label: 'Build',
    title: 'Full-stack products',
    description: 'Responsive interfaces backed by dependable APIs and databases.',
    icon: Boxes,
  },
  {
    label: 'Transform',
    title: 'Enterprise systems',
    description: 'Digital workflows that replace repetitive, manual operations.',
    icon: ServerCog,
  },
  {
    label: 'Innovate',
    title: 'Applied AI',
    description: 'Practical ML, computer vision, OCR, and intelligent automation.',
    icon: BrainCircuit,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-border section-pad">
      <div className="mx-auto max-w-6xl px-0 sm:px-6 md:px-8">
        <SectionHeader
          title="About"
          gradient="Me"
          description="Full-stack development, digital transformation, and AI-powered enterprise systems."
          accent="content"
        />

        <ScrollRevealGroup className="grid grid-cols-1 items-start gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-10" stagger={0.14}>
          {/* ID-card portrait */}
          <aside className="lg:col-span-4">
            <figure className="surface-card overflow-hidden p-3 sm:p-4">
              <div className="relative overflow-hidden rounded-2xl">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/hi.webp"
                    alt="Valentine Agam"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-[center_22%]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-emerald-300/20 bg-black/65 px-3 py-1.5 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.9)]" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-emerald-200">
                    Available
                  </span>
                </div>
              </div>
              <figcaption className="px-2 pb-1 pt-5">
                <p className="text-lg font-bold text-white">Valentine Agam</p>
                <p className="mt-1 text-xs text-slate-500">Software Engineer · Full-stack &amp; AI systems</p>
              </figcaption>
              <div className="mt-4 space-y-2.5 border-t border-white/[0.05] px-2 pt-4 pb-2">
                {META_ROWS.map((row) => (
                  <div key={row.label} className="flex flex-col gap-1 border-b border-white/[0.04] pb-2 last:border-0 last:pb-0 min-[420px]:flex-row min-[420px]:items-baseline min-[420px]:justify-between min-[420px]:gap-3">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                      {row.label}
                    </span>
                    <span className="text-left text-[12px] font-medium text-slate-300 min-[420px]:text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </figure>
          </aside>

          {/* Editorial bio + stats */}
          <div className="space-y-5 lg:col-span-8">
            <div className="surface-card relative overflow-hidden p-5 sm:p-8 md:p-10">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-content-primary/[0.07] blur-3xl" />
              <div className="relative">
              <div className="mb-6 flex items-center gap-3">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-content-primary">Profile</span>
                <span className="h-px flex-1 bg-gradient-to-r from-content-primary/30 to-transparent" />
              </div>
              <p className="text-[1.125rem] font-medium leading-[1.65] text-slate-200 sm:text-xl md:text-[1.35rem]">
                Software engineer and product builder delivering full-stack applications, backend services, enterprise
                workflows, and applied AI/ML systems across healthcare, recruitment, geospatial analytics, and client-facing products.
              </p>
              <p className="mt-6 border-l-2 border-content-primary/50 pl-4 text-[0.9375rem] leading-relaxed text-slate-400 sm:pl-5 md:text-[1rem]">
                Skilled in translating operational needs into maintainable software from architecture and data modeling through
                deployment and support, with practical strengths in Python, TypeScript, Next.js, FastAPI, PostgreSQL, Docker,
                Kubernetes, computer vision, and automation.
              </p>
              <a
                href="#projects"
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-content-primary/25 bg-content-primary/[0.08] px-5 py-2.5 text-sm font-semibold text-content-primary transition-colors hover:border-content-primary/45 hover:bg-content-primary/[0.14] hover:text-white"
              >
                Explore selected work <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {CAPABILITIES.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.label} className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-colors hover:border-content-primary/25 hover:bg-content-primary/[0.04]">
                    <div className="mb-5 flex items-center justify-between">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-slate-600">{item.label}</span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-content-primary transition-colors group-hover:border-content-primary/25">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-white sm:text-[15px]">{item.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-500">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
