import { useCallback, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Film, FolderOpen, Play, Sparkles } from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ShowcaseDetailModal } from '../showcase/ShowcaseDetailModal';
import { ShowcaseStageVideo } from '../showcase/ShowcaseStageVideo';
import { ShowcaseVideoThumb } from '../showcase/ShowcaseVideoThumb';
import { showcaseData } from '@/data/showcaseData';
import { videoDemoClips } from '@/data/videoShowcaseFiles';

export function ProjectsSection() {
  const [activeDemoIndex, setActiveDemoIndex] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailProjectIndex, setDetailProjectIndex] = useState(0);

  const activeDemo = videoDemoClips[activeDemoIndex];
  const detailProject = showcaseData[detailProjectIndex];
  const demoCount = videoDemoClips.length;
  const goToDemo = (direction: -1 | 1) => setActiveDemoIndex((current) => (current + direction + demoCount) % demoCount);
  const closeDetail = useCallback(() => setDetailOpen(false), []);
  const openProjectDetail = useCallback((index: number) => {
    setDetailProjectIndex(index);
    setDetailOpen(true);
  }, []);

  return (
    <section id="projects" className="section-border section-pad">
      <div className="mx-auto max-w-6xl px-0 sm:px-6 md:px-8">
        <SectionHeader
          title="Live"
          gradient="Showcase"
          description="Client product demos in motion, followed by selected case studies with screenshots and implementation notes."
          accent="content"
        />

        <ScrollRevealGroup className="flex flex-col gap-16 md:gap-24" stagger={0.15}>
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#08090b] shadow-[0_35px_100px_-45px_rgba(14,165,233,0.28)] sm:rounded-[2rem]">
            <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5" aria-hidden>
                  <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                  <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                  <span className="h-2 w-2 rounded-full bg-[#27c93f]" />
                </div>
                <span className="hidden h-4 w-px bg-white/10 sm:block" />
                  <span className="hidden font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-slate-600 sm:inline">Client demo studio</span>
              </div>
              <span className="font-mono text-[9px] font-bold tracking-[0.18em] text-slate-500">
                {String(activeDemoIndex + 1).padStart(2, '0')} / {String(demoCount).padStart(2, '0')}
              </span>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="relative aspect-video min-w-0 overflow-hidden bg-black lg:aspect-auto lg:min-h-[470px]">
                <ShowcaseStageVideo src={activeDemo.videoUrl} poster={activeDemo.posterUrl} title={activeDemo.title} className="absolute inset-0 h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
                <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 p-4 sm:p-6 lg:hidden">
                  <div className="min-w-0">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-content-primary">Now playing</span>
                    <h3 className="mt-1 truncate text-lg font-bold text-white">{activeDemo.title}</h3>
                  </div>
                </div>
              </div>

              <aside className="flex flex-col border-t border-white/[0.06] bg-[linear-gradient(180deg,rgba(14,165,233,0.055),transparent_45%)] p-5 lg:border-l lg:border-t-0 lg:p-6">
                <div className="hidden lg:block">
                  <div className="flex items-center gap-2 text-content-primary">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-content-primary/25 bg-content-primary/10"><Play className="h-3 w-3 fill-current" aria-hidden /></span>
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em]">Now playing</span>
                  </div>
                  <h3 className="mt-5 text-2xl font-bold text-white">{activeDemo.title}</h3>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">{activeDemo.caption}</p>
                </div>

                <div className="mt-0 flex items-center justify-between gap-3 lg:mt-auto">
                  <button type="button" onClick={() => goToDemo(-1)} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-semibold text-slate-300 transition-colors hover:border-content-primary/25 hover:text-white" aria-label="Previous demo clip">
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  <button type="button" onClick={() => goToDemo(1)} className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-content-primary/20 bg-content-primary/[0.08] text-xs font-semibold text-content-primary transition-colors hover:bg-content-primary/[0.14] hover:text-white" aria-label="Next demo clip">
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </aside>
            </div>

            <div className="border-t border-white/[0.06] p-4 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Film className="h-3.5 w-3.5 text-content-primary" aria-hidden />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">Demo library</span>
                </div>
                <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-700">Select to play</span>
              </div>
              <div className="flex snap-x gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-4 md:overflow-visible lg:grid-cols-8">
                {videoDemoClips.map((demo, index) => (
                  <button key={demo.id} type="button" onClick={() => setActiveDemoIndex(index)} className={`group relative aspect-video w-[9rem] shrink-0 snap-start overflow-hidden rounded-xl border bg-black text-left transition-all duration-300 md:w-auto ${activeDemoIndex === index ? 'border-content-primary ring-1 ring-content-primary/40' : 'border-white/[0.08] opacity-65 hover:border-white/20 hover:opacity-100'}`} aria-label={`Play ${demo.title}`} aria-current={activeDemoIndex === index ? 'true' : undefined}>
                    <ShowcaseVideoThumb title={demo.title} posterUrl={demo.posterUrl} isActive={activeDemoIndex === index} priority={index < 2} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <ShowcaseDetailModal open={detailOpen} project={detailProject} onClose={closeDetail} />

          <div>
            <div className="mb-8 flex flex-col gap-4 sm:mb-10 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="flex items-center gap-2 text-content-primary">
                  <Sparkles className="h-3.5 w-3.5" aria-hidden />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em]">Selected work</span>
                </div>
                <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">Project archive</h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-500">Explore screenshots, product context, and the technologies behind each build.</p>
              </div>
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-slate-500">
                <FolderOpen className="h-3.5 w-3.5" aria-hidden />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em]">{showcaseData.length} case studies</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {showcaseData.map((project, index) => (
                <button key={`archive-${project.id}`} type="button" onClick={() => openProjectDetail(index)} className="project-archive-card group flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.07] bg-[#09090b] text-left transition-all duration-500 hover:-translate-y-1 hover:border-content-primary/25 hover:shadow-[0_24px_70px_-30px_rgba(14,165,233,0.28)]">
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.05] bg-[#0f0f12]">
                    <img src={project.thumb} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" loading="lazy" decoding="async" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />
                    <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/65 px-3 py-1.5 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-white/75 backdrop-blur-md">{project.category}</span>
                    {project.featured ? (
                      <span className="absolute left-4 top-12 rounded-full border border-content-primary/25 bg-content-primary/15 px-3 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-content-primary backdrop-blur-md">
                        Featured
                      </span>
                    ) : null}
                    <span className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/65 text-white backdrop-blur-md transition-colors group-hover:border-content-primary/30 group-hover:bg-content-primary group-hover:text-black"><ArrowRight className="h-4 w-4" aria-hidden /></span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <span className="font-mono text-[8px] font-bold uppercase tracking-[0.2em] text-slate-600">Case study {String(index + 1).padStart(2, '0')}</span>
                    <h4 className="mt-3 text-lg font-bold tracking-tight text-white transition-colors group-hover:text-content-primary">{project.title}</h4>
                    <p className="mt-2 line-clamp-3 flex-1 text-[12px] leading-relaxed text-slate-500 sm:text-[13px]">{project.desc}</p>
                    {project.tags?.length ? <div className="mt-5 flex flex-wrap gap-1.5">{project.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-wider text-slate-500">{tag}</span>)}</div> : null}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
