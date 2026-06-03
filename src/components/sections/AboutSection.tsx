import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
import { SectionHeader } from '@/components/ui/SectionHeader';

const META_ROWS = [
  { label: 'Location', value: 'Miri, Sarawak' },
  { label: 'Focus', value: 'Backend · AI · Full-Stack' },
  { label: 'Status', value: 'Open to roles · 2026' },
  { label: 'Languages', value: 'English · Bahasa Melayu' },
];



export function AboutSection() {
  return (
    <section id="about" className="section-border section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          title="About"
          gradient="Me"
          description="Backend engineering, AI systems, and production-ready full-stack delivery."
          accent="content"
        />

        <ScrollRevealGroup className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12" stagger={0.14}>
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
                  <div key={row.label} className="flex items-baseline justify-between gap-3 border-b border-white/[0.04] pb-2 last:border-0 last:pb-0">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                      {row.label}
                    </span>
                    <span className="text-right text-[12px] font-medium text-slate-300">{row.value}</span>
                  </div>
                ))}
              </div>
            </figure>
          </aside>

          {/* Editorial bio + stats */}
          <div className="lg:col-span-8 space-y-8">
            <div className="surface-card p-6 sm:p-8 md:p-10">
              <p className="text-[1.0625rem] font-medium leading-[1.6] text-slate-200 md:text-[1.1875rem]">
                Backend and AI-focused software engineer with a background in{' '}
                <strong className="font-semibold text-white">Cognitive Science</strong>, building scalable web
                applications, automation systems, and computer vision solutions with Python, FastAPI, Next.js,
                TensorFlow, and Supabase.
              </p>
              <p className="mt-5 border-l-2 border-content-primary/40 pl-4 text-[0.9375rem] leading-relaxed text-slate-400 md:text-[1rem]">
                From high-accuracy <strong className="font-semibold text-white">YOLO</strong> detection (92%) to AI-powered
                recruitment workflows that cut manual processing by 60% — I deliver ATS platforms, n8n automation, and GIS
                tooling through freelance and contract work.
              </p>
            </div>


          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
