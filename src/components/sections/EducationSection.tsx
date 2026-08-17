import { Award, BookOpen, Calendar, GraduationCap } from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
import { SectionHeader } from '@/components/ui/SectionHeader';

const COURSEWORK = ['Artificial Intelligence', 'Data Analysis', 'Statistics', 'Software Development', 'Web Development'];

export function EducationSection() {
  return (
    <section id="education" className="section-border section-pad">
      <div className="mx-auto max-w-6xl px-0 sm:px-6 md:px-8">
        <SectionHeader
          title="Education"
          gradient="Path"
          description="Cognitive Science training supported by Computer Science, AI/ML, data, and software development."
          accent="content"
        />

        <ScrollRevealGroup className="mx-auto max-w-5xl" stagger={0.14} animation="fade-up">
          <article className="surface-card relative overflow-hidden p-5 sm:p-8 md:p-10">
            <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-content-primary/[0.08] blur-3xl" />
            <GraduationCap className="academic-sigil pointer-events-none absolute -bottom-8 -right-6 text-content-primary" size={180} aria-hidden />

            <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:gap-12">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-content-primary/25 bg-content-primary/[0.07] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-content-primary">
                    <Calendar className="h-3.5 w-3.5" aria-hidden /> Nov 2025
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                    <Award className="h-3.5 w-3.5" aria-hidden /> Dean&apos;s List · Y3 S2
                  </span>
                </div>

                <p className="mt-7 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-content-primary">Universiti Malaysia Sarawak (UNIMAS)</p>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl">Bachelor of Science in Cognitive Science</h3>
                <p className="mt-3 text-sm font-medium text-slate-400 sm:text-base">Minor in Computer Science (AI/ML)</p>

                <div className="mt-8 flex items-end gap-3 border-t border-white/[0.06] pt-6">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">CGPA</span>
                  <span className="text-3xl font-bold text-content-primary">3.12</span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/[0.07] bg-black/20 p-5 sm:p-6">
                <div className="flex items-center gap-2 text-content-primary">
                  <BookOpen className="h-4 w-4" aria-hidden />
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em]">Relevant coursework</p>
                </div>
                <ul className="mt-5 space-y-3">
                  {COURSEWORK.map((course) => (
                    <li key={course} className="flex items-center gap-3 text-sm text-slate-300">
                      <span className="h-1.5 w-1.5 rounded-full bg-content-primary" aria-hidden />
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
