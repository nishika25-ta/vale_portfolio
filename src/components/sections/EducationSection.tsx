import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Calendar, GraduationCap, School } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { ScrollFloat } from '@/components/ScrollFloat';

gsap.registerPlugin(ScrollTrigger);

export function EducationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const fill = lineFillRef.current;
      if (!section || !fill) return;

      gsap.fromTo(
        fill,
        { scaleY: 0, transformOrigin: '50% 0%' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 78%',
            end: 'bottom 38%',
            scrub: 0.65,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const update = () => ScrollTrigger.update();
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      update();
    });

    const lenis = window.lenis as
      | { on?: (ev: string, fn: () => void) => void; off?: (ev: string, fn: () => void) => void }
      | undefined;
    lenis?.on?.('scroll', update);

    return () => {
      lenis?.off?.('scroll', update);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="min-h-screen py-32 flex flex-col justify-center border-t border-white/5"
    >
      <div className="text-center mb-16 md:mb-24 relative z-10">
        <ScrollFloat
          as="p"
          containerClassName="mb-4"
          textClassName="!font-mono text-xs !font-bold uppercase tracking-[0.4em] text-indigo-500"
          scrub={0.75}
          stagger={0.04}
        >
          Academic Credentials
        </ScrollFloat>
        <h3 className="sr-only">Education Path</h3>
        <ScrollFloat
          as="span"
          containerClassName="mb-4 flex w-full justify-center"
          textClassName="text-4xl !font-extrabold text-white md:text-6xl"
          scrub={0.78}
          stagger={0.02}
          role="presentation"
        >
          Education Path
        </ScrollFloat>
        <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto w-full min-w-0">
        {/* Mobile: stacked order; md: 3-column grid with shared timeline */}
        <div className="flex flex-col gap-12 md:gap-0">
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] md:grid-rows-[auto_auto] gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-16 items-start">
            {/* UNIMAS — left column */}
            <div className="order-2 md:order-none md:col-start-1 md:row-start-1 md:text-right min-w-0 md:pr-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-sm mb-4">
                <Calendar size={14} /> Oct 2022 — Nov 2025
              </div>
              <ScrollFloat
                as="h4"
                textClassName="text-2xl sm:text-3xl !font-bold text-white !leading-tight break-words"
                containerClassName="mb-2"
                scrub={0.65}
                stagger={0.015}
              >
                Bachelor of Science in Cognitive Science
              </ScrollFloat>
              <p className="text-lg sm:text-xl text-slate-400 font-medium">
                University Malaysia Sarawak (UNIMAS)
              </p>
              <p className="text-sm text-slate-500 mt-1">Kuching, Sarawak · Graduated Nov 2025</p>
            </div>

            {/* Timeline: spans both rows on desktop */}
            <div className="order-1 md:order-none md:col-start-2 md:row-start-1 md:row-span-2 hidden md:block relative w-8 shrink-0 justify-self-center self-stretch min-h-[20rem]">
              {/* Baseline track (unfilled) */}
              <div
                className="absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-white/[0.08] via-white/[0.05] to-white/[0.08]"
                aria-hidden
              />
              {/* Scroll-driven fill */}
              <div
                ref={lineFillRef}
                className="absolute left-1/2 top-0 h-full w-[2px] origin-top scale-y-0 -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-400 via-purple-400 to-purple-500 shadow-[0_0_14px_rgba(129,140,248,0.45)] will-change-transform z-[1]"
                aria-hidden
              />
              <div className="absolute left-1/2 top-[12%] -translate-x-1/2 z-10 h-4 w-4 rounded-full border-4 border-[#050505] bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,1)]" />
              <div className="absolute left-1/2 top-[58%] -translate-x-1/2 z-10 h-4 w-4 rounded-full border-4 border-[#050505] bg-purple-500 shadow-[0_0_16px_rgba(168,85,247,0.8)]" />
            </div>

            {/* UNIMAS — detail card */}
            <div className="order-3 md:order-none md:col-start-3 md:row-start-1 min-w-0 md:pl-2">
              <div className="timeline-card group relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-[2rem] hover:border-indigo-500/30 transition-all duration-500 overflow-hidden">
                <GraduationCap className="academic-sigil absolute -right-4 -bottom-4 text-indigo-500 pointer-events-none" size={120} />
                <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                  <span className="px-3 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-md">
                    Minor: Computer Science
                  </span>
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest rounded-md border border-indigo-500/20 flex items-center gap-1">
                    <Award size={10} /> Dean&apos;s List · Y3 Sem 2 (2025)
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed relative z-10 text-sm sm:text-base">
                  Focus areas: <strong className="text-white font-semibold">Data Science</strong>,{' '}
                  <strong className="text-white font-semibold">AI/ML</strong>, and{' '}
                  <strong className="text-white font-semibold">Software Development</strong>. Relevant coursework includes
                  Data Analysis, Software Development, Web Development, and Artificial Intelligence.
                </p>
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-baseline gap-2">
                  <span className="text-slate-500 text-xs font-mono uppercase tracking-widest">CGPA:</span>
                  <span className="text-2xl font-bold text-indigo-400">3.12</span>
                </div>
              </div>
            </div>

            {/* STPM — left column */}
            <div className="order-5 md:order-none md:col-start-1 md:row-start-2 md:text-right min-w-0 md:pr-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-sm mb-4">
                <Calendar size={14} /> Jun 2020 — Jul 2022
              </div>
              <ScrollFloat
                as="h4"
                textClassName="text-2xl sm:text-3xl !font-bold text-white !leading-tight break-words"
                containerClassName="mb-2"
                scrub={0.65}
                stagger={0.02}
              >
                STPM · Sport Science
              </ScrollFloat>
              <p className="text-lg sm:text-xl text-slate-400 font-medium">Kolej Tun Datu Tuanku Haji Bujang</p>
              <p className="text-sm text-slate-500 mt-1">Miri, Sarawak</p>
            </div>

            {/* STPM — detail card */}
            <div className="order-6 md:order-none md:col-start-3 md:row-start-2 min-w-0 md:pl-2">
              <div className="timeline-card group relative bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-8 rounded-[2rem] hover:border-purple-500/30 transition-all duration-500 overflow-hidden">
                <School className="academic-sigil absolute -right-4 -bottom-4 text-purple-500 pointer-events-none" size={100} />
                <ul className="text-slate-300 leading-relaxed relative z-10 text-sm sm:text-base space-y-3 list-none">
                  <li className="flex gap-2">
                    <span className="text-purple-400 shrink-0">•</span>
                    <span>
                      Participant, <strong className="text-white font-semibold">National Scout Forum</strong> (2022)
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-purple-400 shrink-0">•</span>
                    <span>
                      <strong className="text-white font-semibold">Head of Student Council (Multimedia)</strong> — graphics,
                      video, and event coverage; digital content and social campaigns.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
