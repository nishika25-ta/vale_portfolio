import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
import { SectionHeader } from '@/components/ui/SectionHeader';

const META_ROWS = [
  { label: 'Location', value: 'Miri, Sarawak, Malaysia' },
  { label: 'Focus', value: 'Full-Stack · Digital Transformation · AI' },
  { label: 'Status', value: 'Hospital Miri (MySTEP) · 2026' },
  { label: 'Languages', value: 'English · Bahasa Melayu' },
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

        <ScrollRevealGroup className="grid grid-cols-1 gap-6 sm:gap-10 lg:grid-cols-12 lg:gap-12" stagger={0.14}>
          {/* ID-card portrait */}
          <aside className="lg:col-span-4">
            <figure className="surface-card overflow-hidden p-3">
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
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-lg border border-white/10 bg-black/65 px-3 py-2.5 backdrop-blur-md">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-content-primary" aria-hidden />
                  <span className="font-mono text-[11px] font-semibold tracking-wide text-white">Miri, Sarawak</span>
                </div>
              </div>
              <div className="mt-4 space-y-2.5 px-2 pb-2">
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
          <div className="lg:col-span-8 space-y-8">
            <div className="surface-card p-5 sm:p-8 md:p-10">
              <p className="text-[1.0625rem] font-medium leading-[1.6] text-slate-200 md:text-[1.1875rem]">
                Software engineer with experience designing and delivering full-stack applications, AI-powered solutions,
                backend systems, and enterprise software that solve real-world business problems. Background in{' '}
                <strong className="font-semibold text-white">Cognitive Science</strong> with a minor in Computer Science
                from UNIMAS.
              </p>
              <p className="mt-5 border-l-2 border-content-primary/40 pl-4 text-[0.9375rem] leading-relaxed text-slate-400 md:text-[1rem]">
                Currently at <strong className="font-semibold text-white">Hospital Miri</strong>, independently developing
                enterprise systems that digitize manual workflows, from employee onboarding and asset tracking to hospital
                wayfinding. Passionate about production-ready software with Next.js, PostgreSQL, Docker, and applied ML.
              </p>
            </div>


          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
