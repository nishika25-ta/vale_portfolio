import { Brain, Code2, Cpu, Globe, Palette, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollFloat } from '@/components/ScrollFloat';
import { aiSkills, designDataSkills, fullStackSkills, programmingSkills } from '../../data/skills';

const accentStyles = {
  indigo: {
    ring: 'ring-indigo-500/20',
    iconBg: 'bg-indigo-500/15 border-indigo-400/25',
    iconText: 'text-indigo-300',
    glow: 'from-indigo-500/20 via-transparent to-transparent',
    bar: 'bg-gradient-to-r from-indigo-500 to-violet-500',
    chip: 'hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-indigo-100',
    line: 'bg-indigo-500/60',
  },
  emerald: {
    ring: 'ring-emerald-500/20',
    iconBg: 'bg-emerald-500/15 border-emerald-400/25',
    iconText: 'text-emerald-300',
    glow: 'from-emerald-500/15 via-transparent to-transparent',
    bar: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    chip: 'hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-100',
    line: 'bg-emerald-500/60',
  },
  sky: {
    ring: 'ring-sky-500/20',
    iconBg: 'bg-sky-500/15 border-sky-400/25',
    iconText: 'text-sky-300',
    glow: 'from-sky-500/15 via-transparent to-transparent',
    bar: 'bg-gradient-to-r from-sky-500 to-blue-500',
    chip: 'hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-sky-100',
    line: 'bg-sky-500/60',
  },
  violet: {
    ring: 'ring-violet-500/20',
    iconBg: 'bg-violet-500/15 border-violet-400/25',
    iconText: 'text-violet-300',
    glow: 'from-violet-500/15 via-transparent to-transparent',
    bar: 'bg-gradient-to-r from-violet-500 to-fuchsia-500',
    chip: 'hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-100',
    line: 'bg-violet-500/60',
  },
} as const;

type Accent = keyof typeof accentStyles;

function SkillChip({ label, accent }: { label: string; accent: Accent }) {
  const a = accentStyles[accent];
  return (
    <span
      className={`inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-3.5 py-1.5 text-xs font-medium tracking-wide text-slate-300 backdrop-blur-sm transition-all duration-300 ${a.chip}`}
    >
      {label}
    </span>
  );
}

function ArsenalCard({
  title,
  subtitle,
  icon: Icon,
  accent,
  children,
  className = '',
}: {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  accent: Accent;
  children: React.ReactNode;
  className?: string;
}) {
  const a = accentStyles[accent];
  return (
    <div
      className={`group relative overflow-hidden rounded-[1.75rem] border border-white/[0.07] bg-gradient-to-br from-white/[0.05] to-white/[0.01] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.6)] sm:p-8 ${className}`}
    >
      <div
        className={`pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br ${a.glow} opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100`}
      />
      <div className={`mb-5 h-px w-12 rounded-full ${a.bar} opacity-90`} />
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${a.iconBg} ${a.ring} ring-1 transition-transform duration-500 group-hover:scale-105`}
          >
            <Icon className={a.iconText} size={22} strokeWidth={1.75} />
          </div>
          <div>
            <ScrollFloat
              as="h4"
              textClassName="text-lg !font-bold !tracking-tight text-white sm:text-xl"
              scrub={0.65}
              stagger={0.025}
            >
              {title}
            </ScrollFloat>
            {subtitle ? <p className="mt-1 text-sm leading-relaxed text-slate-500">{subtitle}</p> : null}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="relative border-t border-white/5 py-28 md:py-36">
      {/* Ambient layers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[420px] w-[min(100%,720px)] -translate-x-1/2 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(99,102,241,0.14),transparent)]" />
        <div className="absolute bottom-0 right-0 h-[280px] w-[400px] translate-x-1/4 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08),transparent)] blur-2xl" />
        <div className="tech-mesh absolute inset-0 opacity-[0.35]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-0">
        <header className="mx-auto mb-16 min-w-0 max-w-2xl text-center md:mb-20">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-1.5">
            <Sparkles className="text-indigo-400" size={14} />
            <ScrollFloat
              as="span"
              textClassName="!font-mono text-[10px] !font-bold uppercase tracking-[0.35em] text-indigo-300/90"
              containerClassName="inline-block"
              scrub={0.68}
              stagger={0.07}
            >
              Core Competencies
            </ScrollFloat>
          </div>
          <h3 className="sr-only">Technical Arsenal</h3>
          <div className="mb-5 flex min-w-0 max-w-full flex-wrap items-baseline justify-center gap-x-2 px-2" aria-hidden>
            <ScrollFloat
              as="span"
              textClassName="text-4xl !font-extrabold !tracking-tight text-white md:text-6xl"
              containerClassName="inline-block max-w-full min-w-0"
              scrub={0.75}
            >
              {`Technical `}
            </ScrollFloat>
            <ScrollFloat
              as="span"
              textClassName="text-4xl !font-extrabold !tracking-tight bg-gradient-to-r from-indigo-300 via-white to-violet-300 bg-clip-text text-transparent md:text-6xl"
              containerClassName="inline-block max-w-full min-w-0"
              scrub={0.75}
            >
              Arsenal
            </ScrollFloat>
          </div>
          <ScrollFloat
            as="p"
            containerClassName="mx-auto max-w-2xl text-center"
            textClassName="!font-normal !font-sans text-base !leading-relaxed text-slate-500 md:text-lg"
            scrub={0.8}
            stagger={0.01}
          >
            Languages, models, and platforms I use to ship reliable AI products and full-stack systems.
          </ScrollFloat>
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-500/50" />
            <ScrollFloat
              as="span"
              textClassName="!font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600"
              containerClassName="inline-block"
              scrub={0.7}
              stagger={0.05}
            >
              Stack overview
            </ScrollFloat>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet-500/50" />
          </div>
        </header>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Programming — wide */}
          <ArsenalCard
            title="Programming & logic"
            subtitle="Backend, systems, and languages for production code."
            icon={Code2}
            accent="indigo"
            className="lg:col-span-7"
          >
            <div className="flex flex-wrap gap-2">
              {programmingSkills.map((skill) => (
                <SkillChip key={skill} label={skill} accent="indigo" />
              ))}
            </div>
          </ArsenalCard>

          {/* AI — tall column */}
          <ArsenalCard
            title="AI & ML"
            subtitle="Training, vision, and classical ML tooling."
            icon={Brain}
            accent="emerald"
            className="lg:col-span-5"
          >
            <ul className="flex flex-col gap-0">
              {aiSkills.map((skill, i) => (
                <li
                  key={skill}
                  className="flex items-center gap-3 border-b border-white/[0.05] py-3 last:border-0 last:pb-0 first:pt-0"
                >
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${accentStyles.emerald.line}`} />
                  <span className="flex-1 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-300">
                    {skill}
                  </span>
                  <span className="text-[10px] text-slate-600">{String(i + 1).padStart(2, '0')}</span>
                </li>
              ))}
            </ul>
          </ArsenalCard>

          {/* Full-stack */}
          <ArsenalCard
            title="Full-stack"
            subtitle="Apps, APIs, and managed backend."
            icon={Globe}
            accent="sky"
            className="lg:col-span-6"
          >
            <div className="flex flex-wrap gap-2">
              {fullStackSkills.map((skill) => (
                <SkillChip key={skill} label={skill} accent="sky" />
              ))}
            </div>
          </ArsenalCard>

          {/* Design & data */}
          <ArsenalCard
            title="Design & geodata"
            subtitle="Product UI and spatial / BI tooling."
            icon={Palette}
            accent="violet"
            className="lg:col-span-6"
          >
            <div className="flex flex-wrap gap-2">
              {designDataSkills.map((skill) => (
                <SkillChip key={skill} label={skill} accent="violet" />
              ))}
            </div>
          </ArsenalCard>
        </div>

        {/* Bottom strip — decorative */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/[0.06] pt-10 text-center">
          <div className="flex items-center gap-2 text-slate-600">
            <Cpu size={14} className="text-slate-500" />
            <ScrollFloat
              as="span"
              textClassName="!font-mono text-[10px] uppercase tracking-[0.25em]"
              containerClassName="inline-block"
              scrub={0.72}
              stagger={0.02}
            >
              Built for scale · Ship with confidence
            </ScrollFloat>
          </div>
        </div>
      </div>
    </section>
  );
}
