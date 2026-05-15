import { useCallback, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';
import { ScrollFloat } from '@/components/ScrollFloat';
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

  const closeDetail = useCallback(() => setDetailOpen(false), []);

  const openProjectDetail = useCallback((index: number) => {
    setDetailProjectIndex(index);
    setDetailOpen(true);
  }, []);

  return (
    <section id="projects" className="section-border section-pad">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeader
          number="06 // WORK"
          title="Live"
          gradient="Showcase"
          description="Tap a demo clip to play it in the player above. For screenshots and write-ups, open a card in the portfolio archive below."
          accent="hero"
        />

        <div className="relative flex w-full flex-col overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0d1117] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.6)] md:p-12">
          <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/5 bg-black shadow-inner">
            <div className="absolute left-4 top-4 z-20 flex gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <ShowcaseStageVideo
              key={activeDemo.videoUrl}
              src={activeDemo.videoUrl}
              className="absolute inset-0 z-0 h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveDemoIndex((prev) => (prev - 1 + demoCount) % demoCount);
              }}
              className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60"
              aria-label="Previous demo clip"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveDemoIndex((prev) => (prev + 1) % demoCount);
              }}
              className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60"
              aria-label="Next demo clip"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="border-t border-white/[0.06] pt-8">
            <ScrollFloat
              as="p"
              containerClassName="mb-4 flex justify-center"
              textClassName="!font-mono text-[10px] !font-bold uppercase tracking-[0.35em] text-slate-600"
              scrub={0.7}
              stagger={0.06}
            >
              Demo clips
            </ScrollFloat>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
              {videoDemoClips.map((demo, index) => (
                <button
                  key={demo.id}
                  type="button"
                  onClick={() => setActiveDemoIndex(index)}
                  className={`group relative aspect-video w-full overflow-hidden rounded-xl border bg-black text-left shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117] ${
                    activeDemoIndex === index
                      ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0d1117]'
                      : 'border-white/[0.08] hover:border-white/20'
                  }`}
                  aria-label={`Play ${demo.title} in showcase`}
                  aria-current={activeDemoIndex === index ? 'true' : undefined}
                >
                  <ShowcaseVideoThumb videoUrl={demo.videoUrl} />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                  {activeDemoIndex === index ? (
                    <span className="pointer-events-none absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.9)]" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </div>

        <ShowcaseDetailModal open={detailOpen} project={detailProject} onClose={closeDetail} />

        <div className="mt-20 md:mt-24">
          <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-content-primary/90">
                Portfolio archive
              </p>
              <h3 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">Project galleries</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500">
                Screenshots and concise descriptions. Tap a tile to view the gallery.
              </p>
            </div>
            <div className="hidden items-center gap-2 text-slate-500 md:flex">
              <FolderOpen className="h-3.5 w-3.5" aria-hidden />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em]">
                {showcaseData.length} projects
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
            {showcaseData.map((project, index) => (
              <button
                key={`archive-${project.id}`}
                type="button"
                onClick={() => openProjectDetail(index)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a0c] text-left shadow-2xl transition-all duration-500 hover:border-content-primary/30 hover:shadow-[0_20px_60px_-20px_rgba(129,140,248,0.18)] sm:rounded-[1.5rem]"
              >
                <div className="relative h-32 w-full overflow-hidden border-b border-white/[0.05] bg-[#0f0f12] sm:h-48">
                  <img
                    src={project.thumb}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-90" />
                </div>
                <div className="flex flex-grow flex-col justify-between bg-[#050506] p-3 sm:p-6">
                  <div>
                    <h4 className="line-clamp-2 text-sm font-bold tracking-tight text-white transition-colors group-hover:text-content-primary sm:text-lg">
                      {project.title}
                    </h4>
                    <p className="mt-1 line-clamp-3 text-[11.5px] leading-relaxed text-slate-500 sm:line-clamp-none sm:text-[13px]">
                      {project.desc}
                    </p>
                    {project.tags && project.tags.length > 0 ? (
                      <div className="mt-3 hidden flex-wrap gap-1 sm:flex">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-content-primary transition-colors group-hover:text-white sm:mt-6 sm:gap-2 sm:text-[10px] sm:tracking-widest">
                    <span className="hidden sm:inline">View details</span>
                    <span className="sm:hidden">Details</span>
                    <ArrowRight
                      size={12}
                      className="shrink-0 transition-transform group-hover:translate-x-1 sm:h-[14px] sm:w-[14px]"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

