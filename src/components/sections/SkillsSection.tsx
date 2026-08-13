import { BrainCircuit, Braces, Check, CloudCog, Cpu, Database, Layers3, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { aiSkills, designDataSkills, fullStackSkills, programmingSkills } from '@/data/skills';

type StackGroup = {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  skills: string[];
  featured: string[];
  accent: string;
  glow: string;
};

const STACK_GROUPS: StackGroup[] = [
  {
    id: 'backend',
    index: '01',
    title: 'Programming & Backend',
    subtitle: 'Robust APIs, business logic, and maintainable server-side systems.',
    icon: Braces,
    skills: programmingSkills,
    featured: ['Python', 'FastAPI', 'REST APIs'],
    accent: 'text-sky-300 border-sky-400/25 bg-sky-400/10',
    glow: 'group-hover:bg-sky-400/[0.08]',
  },
  {
    id: 'ai',
    index: '02',
    title: 'AI & Machine Learning',
    subtitle: 'Applied intelligence for vision, documents, and automation.',
    icon: BrainCircuit,
    skills: aiSkills,
    featured: ['TensorFlow', 'Computer Vision', 'OCR'],
    accent: 'text-emerald-300 border-emerald-400/25 bg-emerald-400/10',
    glow: 'group-hover:bg-emerald-400/[0.07]',
  },
  {
    id: 'fullstack',
    index: '03',
    title: 'Frontend & DevOps',
    subtitle: 'Responsive products shipped through reliable deployment workflows.',
    icon: CloudCog,
    skills: fullStackSkills,
    featured: ['Next.js', 'Docker', 'Kubernetes'],
    accent: 'text-cyan-300 border-cyan-400/25 bg-cyan-400/10',
    glow: 'group-hover:bg-cyan-400/[0.07]',
  },
  {
    id: 'data',
    index: '04',
    title: 'Database & Analytics',
    subtitle: 'Structured data, spatial analysis, and decision-ready reporting.',
    icon: Database,
    skills: designDataSkills,
    featured: ['PostgreSQL', 'Power BI', 'QGIS'],
    accent: 'text-violet-300 border-violet-400/25 bg-violet-400/10',
    glow: 'group-hover:bg-violet-400/[0.07]',
  },
];

const CORE_TOOLKIT = [
  { label: 'Primary language', value: 'Python', detail: 'Backend · AI · Automation' },
  { label: 'Product framework', value: 'Next.js', detail: 'React · Full-stack web' },
  { label: 'Data foundation', value: 'PostgreSQL', detail: 'Schema · Queries · APIs' },
];

function StackCard({ group }: { group: StackGroup }) {
  const Icon = group.icon;

  return (
    <article className="group relative flex min-h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-[#09090b] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.14] sm:p-7">
      <div className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${group.glow}`} />
      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${group.accent}`}>
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <span className="font-mono text-[10px] font-bold tracking-[0.24em] text-slate-700">{group.index}</span>
        </div>

        <div className="mt-7">
          <h3 className="text-xl font-bold text-white sm:text-2xl">{group.title}</h3>
          <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-slate-500">{group.subtitle}</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {group.featured.map((skill) => (
            <span key={skill} className={`rounded-full border px-3 py-1.5 text-[11px] font-semibold ${group.accent}`}>
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-7 border-t border-white/[0.06] pt-5">
          <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-slate-600">Supporting toolkit</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2.5">
            {group.skills.filter((skill) => !group.featured.includes(skill)).map((skill) => (
              <span key={skill} className="inline-flex items-center gap-1.5 text-[12px] font-medium text-slate-400 transition-colors group-hover:text-slate-300">
                <span className="h-1 w-1 rounded-full bg-slate-600" aria-hidden />
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function SkillsSection() {
  const totalSkills = STACK_GROUPS.reduce((total, group) => total + group.skills.length, 0);

  return (
    <section id="skills" className="section-border section-pad">
      <div className="mx-auto max-w-6xl px-0 sm:px-6 md:px-8">
        <SectionHeader
          title="Technical"
          gradient="Stack"
          description="A production-focused toolkit for building, deploying, and improving intelligent software systems."
          accent="content"
        />

        <ScrollRevealGroup className="flex flex-col gap-6 sm:gap-8" stagger={0.12}>
          <div className="relative overflow-hidden rounded-3xl border border-content-primary/15 bg-[linear-gradient(120deg,rgba(14,165,233,0.10),rgba(10,10,12,0.92)_42%,rgba(34,211,238,0.05))] p-5 sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full bg-content-primary/10 blur-3xl" />
            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-4 flex items-center gap-2 text-content-primary">
                  <Workflow className="h-4 w-4" aria-hidden />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em]">Engineering approach</span>
                </div>
                <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl">From idea to production.</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 sm:text-[15px]">
                  I work across the complete delivery path: interface, API, data, infrastructure, and applied intelligence.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-2xl border border-white/[0.08] bg-black/20 px-3 py-3 text-center sm:px-5">
                  <p className="text-xl font-bold text-white sm:text-2xl">{totalSkills}+</p>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">Tools</p>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-black/20 px-3 py-3 text-center sm:px-5">
                  <p className="text-xl font-bold text-white sm:text-2xl">04</p>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">Domains</p>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-black/20 px-3 py-3 text-center sm:px-5">
                  <p className="text-xl font-bold text-content-primary sm:text-2xl">E2E</p>
                  <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">Delivery</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
            {STACK_GROUPS.map((group) => <StackCard key={group.id} group={group} />)}
          </div>

          <div className="surface-card overflow-hidden p-5 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xs">
                <div className="flex items-center gap-2 text-content-primary">
                  <Cpu className="h-4 w-4" aria-hidden />
                  <p className="font-mono text-[9px] font-bold uppercase tracking-[0.24em]">Core toolkit</p>
                </div>
                <h3 className="mt-3 text-xl font-bold text-white">The technologies I reach for first.</h3>
              </div>
              <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-2xl">
                {CORE_TOOLKIT.map((item) => (
                  <div key={item.value} className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <div className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-content-primary" aria-hidden />
                      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-slate-600">{item.label}</span>
                    </div>
                    <p className="mt-4 text-lg font-bold text-white">{item.value}</p>
                    <p className="mt-1 text-[11px] text-slate-500">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2 text-slate-600">
            <Layers3 className="h-3.5 w-3.5" aria-hidden />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em]">Built for scale · Shipped with confidence</span>
          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
