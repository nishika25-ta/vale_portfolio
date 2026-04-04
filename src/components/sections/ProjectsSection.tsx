import { useCallback, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { ScrollFloat } from '@/components/ScrollFloat';
import { ShowcaseDetailModal } from '../showcase/ShowcaseDetailModal';
import { ShowcaseVideoThumb } from '../showcase/ShowcaseVideoThumb';
import { showcaseData } from '../../data/showcaseData';

export function ProjectsSection() {
  const [activeShowcase, setActiveShowcase] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const activeProject = showcaseData[activeShowcase];

  const closeDetail = useCallback(() => setDetailOpen(false), []);

  /** Demo strip: switch the Live Showcase video only (no modal). */
  const selectShowcaseVideo = useCallback((index: number) => {
    setActiveShowcase(index);
  }, []);

  /** Archive cards: sync showcase + open image gallery modal. */
  const openProjectDetail = useCallback((index: number) => {
    setActiveShowcase(index);
    setDetailOpen(true);
  }, []);

  return (
    <section id="projects" className="flex min-h-screen flex-col items-center border-t border-white/5 py-32">
      <div className="mb-16 text-center">
        <ScrollFloat
          as="p"
          containerClassName="mb-3"
          textClassName="!font-mono text-sm !font-bold uppercase tracking-[0.2em] text-indigo-400"
          scrub={0.75}
          stagger={0.04}
        >
          Portfolio Highlights
        </ScrollFloat>
        <h3 className="sr-only">Live Showcase</h3>
        <ScrollFloat
          as="span"
          containerClassName="mb-2 flex w-full justify-center"
          textClassName="text-5xl !font-extrabold text-white md:text-6xl"
          scrub={0.78}
          stagger={0.02}
          role="presentation"
        >
          Live Showcase
        </ScrollFloat>
        <ScrollFloat
          as="p"
          containerClassName="mx-auto max-w-lg"
          textClassName="!font-normal !font-sans text-sm text-slate-500"
          scrub={0.82}
          stagger={0.008}
        >
          Tap a demo clip to play it in the player above. For screenshots and write-ups, open a card in the portfolio
          archive below.
        </ScrollFloat>
      </div>
      <div className="relative flex w-full max-w-[1100px] flex-col overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0d1117] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.6)] md:p-12">
        <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/5 bg-black shadow-inner">
          <div className="absolute left-4 top-4 z-20 flex gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
          </div>
          {activeProject.videoUrl ? (
            <video
              key={activeProject.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            >
              <source src={activeProject.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              key={activeProject.thumb}
              src={activeProject.thumb}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveShowcase((prev) => (prev - 1 + showcaseData.length) % showcaseData.length);
            }}
            className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60"
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveShowcase((prev) => (prev + 1) % showcaseData.length);
            }}
            className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60"
            aria-label="Next project"
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
            {showcaseData.map((project, index) => (
              <button
                key={project.id}
                type="button"
                onClick={() => selectShowcaseVideo(index)}
                className={`group relative aspect-video w-full overflow-hidden rounded-xl border bg-black text-left shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117] ${
                  activeShowcase === index
                    ? 'ring-2 ring-indigo-500 ring-offset-2 ring-offset-[#0d1117]'
                    : 'border-white/[0.08] hover:border-white/20'
                }`}
                aria-label={`Play ${project.title} in showcase`}
                aria-current={activeShowcase === index ? 'true' : undefined}
              >
                <ShowcaseVideoThumb videoUrl={project.videoUrl} imageFallback={project.thumb} />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                {activeShowcase === index ? (
                  <span className="pointer-events-none absolute right-2 top-2 h-2 w-2 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.9)]" />
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      <ShowcaseDetailModal open={detailOpen} project={activeProject} onClose={closeDetail} />

      <div className="mx-auto mt-24 w-full max-w-7xl px-4 md:px-6">
        <div className="mb-10 text-center md:text-left">
          <ScrollFloat
            as="p"
            containerClassName="mb-2"
            textClassName="!font-mono text-xs !font-bold uppercase tracking-[0.3em] text-indigo-400/90"
            scrub={0.72}
            stagger={0.045}
          >
            Portfolio archive
          </ScrollFloat>
          <h3 className="sr-only">Project galleries and overviews</h3>
          <ScrollFloat
            as="span"
            containerClassName="flex w-full justify-center md:justify-start"
            textClassName="text-3xl !font-extrabold text-white md:text-4xl"
            scrub={0.75}
            stagger={0.018}
            role="presentation"
          >
            Project galleries and overviews
          </ScrollFloat>
          <ScrollFloat
            as="p"
            containerClassName="mt-2 max-w-2xl md:mx-0 mx-auto text-center md:text-left"
            textClassName="!font-normal !font-sans text-sm !leading-relaxed text-slate-500"
            scrub={0.85}
            stagger={0.006}
          >
            Select a project to view screenshots and a concise description of the work. Video walkthroughs are presented
            in the Live Showcase above; this section focuses on static deliverables and written context.
          </ScrollFloat>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
          {showcaseData.map((project, index) => (
            <button
              key={`archive-${project.id}`}
              type="button"
              onClick={() => openProjectDetail(index)}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 bg-[#0a0a0a] text-left shadow-2xl transition-all duration-500 hover:border-indigo-500/30 hover:shadow-[0_20px_60px_-20px_rgba(79,70,229,0.15)] sm:rounded-[2rem]"
            >
              <div className="relative h-32 w-full overflow-hidden border-b border-white/5 bg-[#111] sm:h-52">
                <img
                  src={project.thumb}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-grow flex-col justify-between bg-[#050505] p-3 sm:p-7">
                <div>
                  <ScrollFloat
                    as="span"
                    containerClassName="mb-1 block sm:mb-2"
                    textClassName="line-clamp-2 text-sm !font-bold !tracking-tight text-white transition-colors group-hover:text-indigo-400 sm:text-xl"
                    scrub={0.55}
                    stagger={0.035}
                  >
                    {project.title}
                  </ScrollFloat>
                  <p className="line-clamp-3 text-xs leading-relaxed text-slate-500 sm:line-clamp-none sm:text-sm">
                    {project.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-indigo-400 transition-colors group-hover:text-white sm:mt-8 sm:gap-2 sm:text-[10px] sm:tracking-widest">
                  <span className="hidden sm:inline">View details</span>
                  <span className="sm:hidden">Details</span>
                  <ArrowRight size={12} className="shrink-0 transition-transform group-hover:translate-x-1 sm:h-[14px] sm:w-[14px]" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
