import { Brain, Code2, Cpu, Globe, Palette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { aiSkills, designDataSkills, fullStackSkills, programmingSkills } from '@/data/skills';

type Accent = 'content' | 'emerald' | 'sky' | 'violet';

type SkillRow = {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: Accent;
  skills: string[];
};

const accentStyles: Record<Accent, { ring: string; iconBg: string; iconText: string; chipHover: string; dot: string }> = {
  content: {
    ring: 'border-content-primary/20',
    iconBg: 'bg-content-primary/10 border-content-primary/25',
    iconText: 'text-content-primary',
    chipHover: 'hover:border-content-primary/40 hover:bg-content-primary/[0.08] hover:text-white',
    dot: 'bg-content-primary',
  },
  emerald: {
    ring: 'border-emerald-500/20',
    iconBg: 'bg-emerald-500/10 border-emerald-400/25',
    iconText: 'text-emerald-300',
    chipHover: 'hover:border-emerald-400/40 hover:bg-emerald-500/[0.08] hover:text-white',
    dot: 'bg-emerald-400',
  },
  sky: {
    ring: 'border-sky-500/20',
    iconBg: 'bg-sky-500/10 border-sky-400/25',
    iconText: 'text-sky-300',
    chipHover: 'hover:border-sky-400/40 hover:bg-sky-500/[0.08] hover:text-white',
    dot: 'bg-sky-400',
  },
  violet: {
    ring: 'border-violet-500/20',
    iconBg: 'bg-violet-500/10 border-violet-400/25',
    iconText: 'text-violet-300',
    chipHover: 'hover:border-violet-400/40 hover:bg-violet-500/[0.08] hover:text-white',
    dot: 'bg-violet-400',
  },
};

const ROWS: SkillRow[] = [
  {
    id: 'backend',
    title: 'Backend & Orchestration',
    subtitle: 'APIs, automation, and managed infrastructure',
    icon: Code2,
    accent: 'content',
    skills: programmingSkills,
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    subtitle: 'Computer vision, deep learning, classical ML',
    icon: Brain,
    accent: 'emerald',
    skills: aiSkills,
  },
  {
    id: 'fullstack',
    title: 'Frontend & Cloud',
    subtitle: 'Web, mobile, and deployment platforms',
    icon: Globe,
    accent: 'sky',
    skills: fullStackSkills,
  },
  {
    id: 'data',
    title: 'Data & Tooling',
    subtitle: 'BI dashboards, spatial analysis, security',
    icon: Palette,
    accent: 'violet',
    skills: designDataSkills,
  },
];

const PROFICIENCY = [
  { label: 'Python', value: 92 },
  { label: 'FastAPI', value: 86 },
  { label: 'TensorFlow', value: 78 },
];

function SkillRow({ row }: { row: SkillRow }) {
  const a = accentStyles[row.accent];
  const Icon = row.icon;
  return (
    <div className={`surface-card overflow-hidden p-5 transition-colors ${a.ring} hover:${a.ring}`}>
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
        <div className="flex shrink-0 items-start gap-3 md:w-60">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${a.iconBg}`}>
            <Icon className={`h-4 w-4 ${a.iconText}`} aria-hidden />
          </div>
          <div className="min-w-0">
            <h3 className="text-[15px] font-bold text-white">{row.title}</h3>
            <p className="mt-0.5 text-[11.5px] leading-relaxed text-slate-500">{row.subtitle}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-wrap gap-1.5">
          {row.skills.map((skill) => (
            <span
              key={skill}
              className={`inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-[12px] font-medium text-slate-300 transition-all duration-200 ${a.chipHover}`}
            >
              <span className={`h-1 w-1 rounded-full ${a.dot}`} aria-hidden />
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="section-border section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          number="05 // STACK"
          title="Technical"
          gradient="Stack"
          description="Languages, models, and platforms from my resume — backend APIs, AI/ML, and full-stack delivery."
          accent="content"
        />

        <div className="flex flex-col gap-4">
          {ROWS.map((row) => (
            <SkillRow key={row.id} row={row} />
          ))}
        </div>

        <div className="mt-12 surface-card p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Cpu className="h-4 w-4 text-content-primary" aria-hidden />
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-content-primary/90">
              Top proficiencies
            </p>
            <span className="h-px flex-1 bg-gradient-to-r from-content-primary/30 via-white/[0.05] to-transparent" />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {PROFICIENCY.map((p) => (
              <div key={p.label}>
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-sm font-semibold text-white">{p.label}</span>
                  <span className="font-mono text-[11px] text-slate-500">{p.value}%</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.05]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-content-primary to-content-secondary"
                    style={{ width: `${p.value}%` }}
                    aria-hidden
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/[0.05] pt-8 text-center">
          <div className="flex items-center gap-2 text-slate-600">
            <Cpu size={14} className="text-slate-500" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
              Built for scale · Ship with confidence
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
