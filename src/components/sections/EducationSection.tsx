import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Calendar, GraduationCap, School } from 'lucide-react';
import { useRef } from 'react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
import { useScrollAnimationsReady } from '@/context/ScrollAnimationContext';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { getScrollScroller } from '@/utils/scrollScroller';

gsap.registerPlugin(ScrollTrigger);

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const scrollReady = useScrollAnimationsReady();

  useGSAP(
    () => {
      const section = sectionRef.current;
      const fill = lineFillRef.current;
      if (!section || !fill || !scrollReady) return;

      gsap.fromTo(
        fill,
        { scaleY: 0, transformOrigin: '50% 0%' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            scroller: getScrollScroller(),
            trigger: section,
            start: 'top 78%',
            end: 'bottom 38%',
            scrub: 0.65,
          },
        }
      );
    },
    { scope: sectionRef, dependencies: [scrollReady] }
  );


  return (
    <section ref={sectionRef} id="education" className="section-border section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          number="04 // EDUCATION"
          title="Education"
          gradient="Path"
          description="Cognitive Science training with focus on data science, AI/ML, and software development."
          accent="content"
        />

        <ScrollRevealGroup className="mx-auto w-full min-w-0 max-w-5xl" stagger={0.14} animation="fade-up">
          <div className="flex flex-col gap-12 md:gap-0">
            <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] md:grid-rows-[auto_auto] md:gap-x-8 md:gap-y-16">
              {/* UNIMAS — meta */}
              <div className="order-2 min-w-0 md:order-none md:col-start-1 md:row-start-1 md:pr-2 md:text-right">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-content-primary/25 bg-content-primary/[0.06] px-4 py-2 font-mono text-sm text-content-primary">
                  <Calendar size={14} /> Oct 2022 — Nov 2025
                </div>
                <h4 className="text-2xl !font-bold !leading-tight text-white sm:text-3xl">
                  Bachelor of Science in Cognitive Science
                </h4>
                <p className="mt-2 text-lg font-medium text-slate-400 sm:text-xl">University Malaysia Sarawak (UNIMAS)</p>
                <p className="mt-1 text-sm text-slate-500">Kota Samarahan, Sarawak · Graduated Nov 2025</p>
              </div>

              {/* Timeline rail */}
              <div className="relative order-1 hidden min-h-[20rem] w-8 shrink-0 self-stretch justify-self-center md:order-none md:col-start-2 md:row-span-2 md:row-start-1 md:block">
                <div
                  className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full bg-white/[0.06]"
                  aria-hidden
                />
                <div
                  ref={lineFillRef}
                  className="absolute left-1/2 top-0 h-full w-[2px] origin-top -translate-x-1/2 scale-y-0 rounded-full bg-gradient-to-b from-content-primary via-content-secondary to-content-secondary shadow-[0_0_14px_rgba(129,140,248,0.4)] will-change-transform z-[1]"
                  aria-hidden
                />
                <div className="absolute left-1/2 top-[12%] z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-4 border-[#050505] bg-content-primary shadow-[0_0_18px_rgba(129,140,248,0.9)]" />
                <div className="absolute left-1/2 top-[58%] z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-4 border-[#050505] bg-content-secondary shadow-[0_0_14px_rgba(167,139,250,0.75)]" />
              </div>

              {/* UNIMAS — detail */}
              <div className="order-3 min-w-0 md:order-none md:col-start-3 md:row-start-1 md:pl-2">
                <div className="surface-card group relative overflow-hidden p-6 transition-all duration-500 hover:border-content-primary/25 sm:p-8">
                  <GraduationCap
                    className="academic-sigil pointer-events-none absolute -right-4 -bottom-4 text-content-primary"
                    size={120}
                  />
                  <div className="relative z-10 mb-5 flex flex-wrap gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-md border border-white/15 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-slate-300">
                      Minor: Computer Science
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md border border-content-primary/30 bg-content-primary/[0.06] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-content-primary">
                      <Award size={10} /> Dean&apos;s List · Y3 Sem 2
                    </span>
                  </div>
                  <p className="relative z-10 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                    Focus areas: <strong className="font-semibold text-white">Data Science</strong>,{' '}
                    <strong className="font-semibold text-white">AI/ML</strong>, and{' '}
                    <strong className="font-semibold text-white">Software Development</strong>. Coursework included
                    Data Analysis, Software Development, Web Development, and Artificial Intelligence.
                  </p>
                  <div className="mt-6 flex flex-wrap items-baseline gap-2 border-t border-white/[0.05] pt-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">CGPA</span>
                    <span className="text-2xl font-bold text-content-primary">3.12</span>
                  </div>
                </div>
              </div>

              {/* STPM — meta */}
              <div className="order-5 min-w-0 md:order-none md:col-start-1 md:row-start-2 md:pr-2 md:text-right">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-content-secondary/25 bg-content-secondary/[0.06] px-4 py-2 font-mono text-sm text-content-secondary">
                  <Calendar size={14} /> Jun 2020 — Jul 2022
                </div>
                <h4 className="text-2xl !font-bold !leading-tight text-white sm:text-3xl">STPM · Sport Science</h4>
                <p className="mt-2 text-lg font-medium text-slate-400 sm:text-xl">
                  Kolej Tun Datu Tuanku Haji Bujang
                </p>
                <p className="mt-1 text-sm text-slate-500">Miri, Sarawak</p>
              </div>

              {/* STPM — detail */}
              <div className="order-6 min-w-0 md:order-none md:col-start-3 md:row-start-2 md:pl-2">
                <div className="surface-card group relative overflow-hidden p-6 transition-all duration-500 hover:border-content-secondary/25 sm:p-8">
                  <School
                    className="academic-sigil pointer-events-none absolute -right-4 -bottom-4 text-content-secondary"
                    size={100}
                  />
                  <ul className="relative z-10 list-none space-y-3 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                    <li className="flex gap-2">
                      <span className="shrink-0 text-content-secondary">•</span>
                      <span>
                        Participant, <strong className="font-semibold text-white">National Scout Forum</strong> (2022)
                      </span>
                    </li>
                    <li className="flex gap-2">
                      <span className="shrink-0 text-content-secondary">•</span>
                      <span>
                        <strong className="font-semibold text-white">Head of Student Council (Multimedia)</strong> —
                        graphics, video, and event coverage; digital content and social campaigns.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
