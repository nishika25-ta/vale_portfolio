import { useState } from 'react';
import { Building2, MapPin } from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { workExperience } from '@/data/workExperience';

function CompanyLogoBadge({ company, src }: { company: string; src: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/15 bg-white/[0.04]">
      {!failed ? (
        <img
          src={src}
          alt={`${company} logo`}
          className="block h-full w-full object-contain p-1"
          onError={() => setFailed(true)}
        />
      ) : (
        <Building2 className="h-4 w-4 text-slate-500" aria-hidden />
      )}
    </div>
  );
}

/** Extract a year-range string ("2026", "2025-26") from a date range like "Dec 2025 — Mar 2026" */
function extractYearLabel(range: string): string {
  const years = range.match(/\d{4}/g) ?? [];
  const first = years[0];
  const last = years[years.length - 1];
  if (!first) return range;
  if (!last || first === last) return first;
  const startShort = first.slice(-2);
  const endShort = last.slice(-2);
  return `${first.slice(0, 2)}${startShort}–${endShort}`;
}

export function ExperienceSection() {
  return (
    <section id="experience" className="section-border section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          title="Working"
          gradient="Experience"
          description="Roles and impact aligned with my resume — backend engineering, AI delivery, and client-facing work."
          accent="content"
        />

        <div className="relative">
          {/* Shared rail */}
          <div className="pointer-events-none absolute left-[1.05rem] top-0 bottom-0 hidden w-px bg-gradient-to-b from-content-primary/40 via-white/[0.06] to-transparent md:block" aria-hidden />
          <ScrollRevealGroup as="ol" className="relative flex flex-col" stagger={0.16} animation="bounce-up">
          {workExperience.map((job, jobIdx) => {
            const yearLabel = extractYearLabel(job.dateRange);
            return (
              <li key={job.id} className="relative md:pl-14">
                <div className="hidden md:block">
                  <span className="absolute left-0 top-6 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-content-primary/40 bg-[#0a0a0c] text-[10px] font-bold tracking-widest text-content-primary shadow-[0_0_24px_rgba(129,140,248,0.25)]">
                    {String(jobIdx + 1).padStart(2, '0')}
                  </span>
                </div>

                <article
                  className={`surface-card group mb-8 overflow-hidden p-6 transition-all duration-500 hover:border-content-primary/25 md:mb-10 md:p-8 ${
                    jobIdx === 0 ? '' : ''
                  }`}
                >
                  <header className="flex flex-col gap-3 border-b border-white/[0.05] pb-5">
                    <div className="flex items-center gap-3">
                      {job.logoSrc ? (
                        <CompanyLogoBadge company={job.company} src={job.logoSrc} />
                      ) : (
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                          <Building2 className="h-4 w-4 text-slate-500" aria-hidden />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="truncate text-xl font-bold text-white sm:text-2xl">{job.company}</h3>
                        <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-slate-500">
                          <MapPin className="h-3 w-3 shrink-0" aria-hidden />
                          {job.location}
                        </p>
                      </div>
                      <div className="hidden shrink-0 flex-col items-end gap-0.5 sm:flex">
                        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-content-primary/90">
                          {yearLabel}
                        </span>
                        <span className="font-mono text-[10px] text-slate-600">{job.dateRange}</span>
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-slate-600 sm:hidden">{job.dateRange}</span>
                  </header>

                  <div className="mt-5 space-y-6">
                    {job.roles.map((role, roleIndex) => (
                      <div
                        key={`${job.id}-${role.title}`}
                        className={roleIndex > 0 ? 'border-t border-white/[0.04] pt-6' : ''}
                      >
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                          <h4 className="text-[15px] font-semibold text-content-primary sm:text-base">{role.title}</h4>
                          {role.dateRange ? (
                            <span className="font-mono text-[11px] font-medium text-slate-500">{role.dateRange}</span>
                          ) : null}
                        </div>
                        <ul className="mt-4 list-none space-y-3 text-[13px] leading-relaxed text-slate-400 sm:text-[14px]">
                          {role.highlights.map((line, i) => (
                            <li key={i} className="flex gap-3">
                              <span
                                className="mt-2 h-1 w-1 shrink-0 rounded-full bg-content-primary/80"
                                aria-hidden
                              />
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {job.stack && job.stack.length > 0 ? (
                    <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/[0.05] pt-5">
                      {job.stack.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400 transition-colors hover:border-content-primary/30 hover:text-content-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </article>
              </li>
            );
          })}
          </ScrollRevealGroup>
        </div>
      </div>
    </section>
  );
}
