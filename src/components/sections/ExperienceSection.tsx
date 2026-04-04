import { useState } from 'react';
import { Briefcase, Building2, Calendar, MapPin } from 'lucide-react';
import { workExperience } from '@/data/workExperience';

/** Public folder URLs must respect Vite `base` (e.g. subpath deploys). */
function publicAssetUrl(path: string): string {
  if (!path.startsWith('/')) return path;
  const base = import.meta.env.BASE_URL;
  const trimmed = path.replace(/^\//, '');
  return `${base}${trimmed}`;
}

function CompanyLogoBadge({ company, src }: { company: string; src: string }) {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = publicAssetUrl(src);

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-white/20 bg-white/[0.04] sm:h-12 sm:w-12">
      {!failed ? (
        <img
          src={resolvedSrc}
          alt={`${company} logo`}
          className="h-full w-full object-contain p-1"
          onError={() => setFailed(true)}
        />
      ) : (
        <Building2 className="h-5 w-5 text-slate-500" aria-hidden />
      )}
    </div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <header className="mb-14 flex flex-col items-center text-center md:mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5">
            <Briefcase className="h-3.5 w-3.5 text-indigo-400" aria-hidden />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-indigo-300/90">
              Career
            </span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Working{' '}
            <span className="bg-gradient-to-r from-indigo-300 to-violet-400 bg-clip-text text-transparent">
              experience
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-500">
            Roles and impact aligned with my resume — backend engineering, product delivery, and client-facing work.
          </p>
        </header>

        <ul className="flex flex-col gap-8 md:gap-10">
          {workExperience.map((job) => (
            <li key={job.id}>
              <article className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 shadow-[0_24px_60px_-32px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-colors hover:border-indigo-500/25 md:p-8">
                <div className="flex flex-col gap-6 md:flex-row md:gap-10">
                  <div className="shrink-0 md:w-52">
                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/25 bg-indigo-500/10 px-4 py-2 font-mono text-sm text-indigo-300">
                      <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {job.dateRange}
                    </div>
                    <p className="mt-3 flex items-start gap-2 text-sm text-slate-500">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-600" aria-hidden />
                      {job.location}
                    </p>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 sm:gap-4">
                      {job.logoSrc ? <CompanyLogoBadge company={job.company} src={job.logoSrc} /> : null}
                      <h3 className="text-xl font-bold text-white sm:text-2xl">{job.company}</h3>
                    </div>
                    <div className="mt-6 space-y-8">
                      {job.roles.map((role, roleIndex) => (
                        <div
                          key={`${job.id}-${role.title}`}
                          className={roleIndex > 0 ? 'border-t border-white/10 pt-8' : ''}
                        >
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                            <h4 className="text-lg font-bold text-indigo-300 sm:text-xl">{role.title}</h4>
                            {role.dateRange ? (
                              <span className="font-mono text-xs font-medium text-slate-500">{role.dateRange}</span>
                            ) : null}
                          </div>
                          <ul className="mt-4 list-none space-y-3 text-sm leading-relaxed text-slate-400 sm:text-base">
                            {role.highlights.map((line, i) => (
                              <li key={i} className="flex gap-3">
                                <span
                                  className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                                    roleIndex === 0 ? 'bg-indigo-500/80' : 'bg-violet-500/80'
                                  }`}
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
                      <div className="mt-8 flex flex-wrap gap-2 border-t border-white/5 pt-6">
                        {job.stack.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
