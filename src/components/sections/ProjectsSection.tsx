'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  Activity,
  ChevronLeft,
  ChevronRight,
  Cpu,
  FolderGit2,
  FolderOpen,
  HardDrive,
  Layers,
  Maximize2,
  Power,
  Sparkles,
  Terminal,
} from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ShowcaseDetailModal } from '../showcase/ShowcaseDetailModal';
import { showcaseData } from '@/data/showcaseData';

export function ProjectsSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailProjectIndex, setDetailProjectIndex] = useState(0);
  const [screenPowered, setScreenPowered] = useState(true);

  const selectedProject = showcaseData[selectedIndex] ?? showcaseData[0];
  const detailProject = showcaseData[detailProjectIndex] ?? showcaseData[0];
  const projectImages = selectedProject?.images?.length
    ? selectedProject.images
    : selectedProject?.thumb
      ? [selectedProject.thumb]
      : [];

  useEffect(() => {
    setActiveSlide(0);
  }, [selectedIndex]);

  const closeDetail = useCallback(() => setDetailOpen(false), []);
  const openProjectDetail = useCallback((index: number) => {
    setDetailProjectIndex(index);
    setDetailOpen(true);
  }, []);

  const handleSelectProject = useCallback((index: number) => {
    setSelectedIndex(index);
    if (!screenPowered) setScreenPowered(true);
  }, [screenPowered]);

  const stepSlide = useCallback(
    (dir: -1 | 1) => {
      if (projectImages.length <= 1) return;
      setActiveSlide((prev) => (projectImages.length + prev + dir) % projectImages.length);
    },
    [projectImages.length]
  );

  // Keyboard navigation when focused inside the terminal
  const handleTerminalKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (detailOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % showcaseData.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (showcaseData.length + prev - 1) % showcaseData.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        openProjectDetail(selectedIndex);
      }
    },
    [detailOpen, openProjectDetail, selectedIndex]
  );

  const slugName = selectedProject
    ? selectedProject.folder.toLowerCase().replace(/[^a-z0-9_]+/g, '_')
    : 'project';

  return (
    <section id="projects" aria-labelledby="project-archive-title" className="section-border section-pad">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-10">
        <ShowcaseDetailModal open={detailOpen} project={detailProject} onClose={closeDetail} />

        <div className="mb-10 flex flex-col justify-between gap-4 md:mb-14 md:flex-row md:items-end">
          <SectionHeader
            title="Project"
            gradient="Archive"
            description="Interactive workstation terminal — inspect builds, architecture, and visual telemetry."
            accent="content"
            className="!mb-0"
          />
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.07] px-3.5 py-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" aria-hidden />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
                TTY1 · ONLINE
              </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.025] px-3.5 py-1.5 text-slate-400">
              <FolderOpen className="h-3.5 w-3.5 text-content-primary" aria-hidden />
              <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]">
                {showcaseData.length} Mounted Builds
              </span>
            </div>
          </div>
        </div>

        <ScrollRevealGroup className="relative" stagger={0.12}>
          {/* Ambient Backlight Aura behind the physical monitor */}
          <div
            className="pointer-events-none absolute -inset-x-6 -top-8 bottom-12 -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_65%_55%_at_50%_45%,rgba(14,165,233,0.16),rgba(97,220,163,0.06)_48%,transparent_75%)] blur-3xl transition-opacity duration-700"
            style={{ opacity: screenPowered ? 1 : 0.15 }}
            aria-hidden
          />

          {/* ==================== REALISTIC PC MONITOR ==================== */}
          <div
            className="mx-auto w-full max-w-[1320px] focus:outline-none"
            tabIndex={0}
            onKeyDown={handleTerminalKeyDown}
            aria-label="Interactive Project Archive Workstation Monitor"
          >
            {/* Outer Anodized Aluminum / Space-Black Chassis */}
            <div className="monitor-frame-outer relative rounded-[1.6rem] p-2.5 sm:rounded-[2.1rem] sm:p-4 md:p-5">
              {/* Top center webcam & ambient light sensor */}
              <div
                className="pointer-events-none absolute left-1/2 top-1.5 z-30 flex -translate-x-1/2 items-center gap-2 sm:top-2"
                aria-hidden
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#090d12] ring-1 ring-white/15" />
                <span
                  className={`h-1 w-1 rounded-full transition-colors duration-500 ${
                    screenPowered ? 'bg-emerald-400/80 shadow-[0_0_6px_#34d399]' : 'bg-white/10'
                  }`}
                />
              </div>

              {/* Inner Display Bezel & Recessed IPS Glass Screen */}
              <div className="monitor-bezel-inner relative overflow-hidden rounded-[1.1rem] sm:rounded-[1.35rem]">
                {/* Subtle CRT/IPS Scanlines & Diagonal Glass Reflection */}
                <div className="monitor-scanlines pointer-events-none absolute inset-0 z-20" aria-hidden />
                <div className="monitor-glass-glare pointer-events-none absolute inset-0 z-20" aria-hidden />

                {/* Screen Power-off Overlay */}
                {!screenPowered ? (
                  <div className="flex min-h-[540px] flex-col items-center justify-center bg-[#030507] px-6 py-20 text-center sm:min-h-[640px]">
                    <Power className="mb-4 h-10 w-10 text-slate-700" strokeWidth={1.5} />
                    <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-600">
                      Display Standby · Signal Suspended
                    </p>
                    <button
                      type="button"
                      onClick={() => setScreenPowered(true)}
                      className="mt-5 rounded-full border border-content-primary/30 bg-content-primary/10 px-5 py-2 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-content-primary transition hover:bg-content-primary/20"
                    >
                      Wake Display
                    </button>
                  </div>
                ) : (
                  <div className="relative z-10 flex flex-col bg-[#06090e] text-slate-200">
                    {/* ---------------- OS / Terminal Window Top Bar ---------------- */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] bg-[#0b1017]/95 px-3.5 py-2.5 sm:px-5 sm:py-3">
                      <div className="flex items-center gap-3">
                        {/* Window traffic lights */}
                        <div className="flex items-center gap-1.5" aria-hidden>
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/90 shadow-[0_0_6px_rgba(255,95,86,0.4)]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/90 shadow-[0_0_6px_rgba(255,189,46,0.4)]" />
                          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/90 shadow-[0_0_6px_rgba(39,201,63,0.4)]" />
                        </div>
                        <span className="hidden h-3.5 w-px bg-white/10 sm:inline-block" aria-hidden />
                        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300 sm:text-xs">
                          <Terminal className="h-3.5 w-3.5 text-hero-primary" aria-hidden />
                          <span className="text-hero-primary font-semibold">valentine@vale-os</span>
                          <span className="text-slate-600">:</span>
                          <span className="text-content-primary">~/archive/{slugName}</span>
                        </div>
                      </div>

                      {/* Shell Tabs */}
                      <div className="hidden items-center gap-1.5 lg:flex">
                        <span className="rounded-md border border-content-primary/30 bg-content-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-content-primary">
                          [1] inspect.sh*
                        </span>
                        <span className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-slate-500">
                          [2] telemetry.log
                        </span>
                        <span className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2.5 py-1 font-mono text-[10px] text-slate-500">
                          zsh · 5.9
                        </span>
                      </div>

                      {/* Quick Action in Titlebar */}
                      <button
                        type="button"
                        onClick={() => openProjectDetail(selectedIndex)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300 transition hover:border-content-primary/40 hover:bg-content-primary/15 hover:text-white"
                      >
                        <Maximize2 className="h-3 w-3 text-content-primary" aria-hidden />
                        <span className="hidden sm:inline">Full Screen</span>
                        <span className="sm:hidden">Open</span>
                      </button>
                    </div>

                    {/* ---------------- Live Command Prompt Strip ---------------- */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] bg-[#070b10] px-3.5 py-2 font-mono text-[11px] sm:px-5 sm:text-xs">
                      <div className="flex min-w-0 items-center gap-2 overflow-x-auto whitespace-nowrap">
                        <span className="text-hero-primary font-bold">❯</span>
                        <span className="text-slate-400">vale-cli inspect</span>
                        <span className="rounded bg-content-primary/15 px-1.5 py-0.5 text-content-primary">
                          --target=&quot;{selectedProject?.id}&quot;
                        </span>
                        <span className="hidden text-slate-500 sm:inline">--render=high-dpi</span>
                        <span
                          className="inline-block h-3.5 w-1.5 animate-pulse bg-hero-primary align-middle"
                          aria-hidden
                        />
                      </div>
                      <div className="hidden items-center gap-3 text-[10px] text-slate-500 md:flex">
                        <span>↑/↓ SELECT</span>
                        <span>·</span>
                        <span>ENTER LAUNCH</span>
                      </div>
                    </div>

                    {/* ---------------- Main Split Terminal Workspace ---------------- */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 lg:divide-x lg:divide-white/[0.07]">
                      {/* LEFT PANE: Directory Tree / File Explorer (4 cols) */}
                      <div className="flex flex-col border-b border-white/[0.07] bg-[#070a0f]/90 lg:col-span-4 lg:border-b-0">
                        <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                          <span className="flex items-center gap-2">
                            <FolderGit2 className="h-3.5 w-3.5 text-content-primary" aria-hidden />
                            /workspace/projects
                          </span>
                          <span className="text-slate-600">drwxr-xr-x</span>
                        </div>

                        {/* Mobile horizontal pill selector / Desktop vertical file list */}
                        <div
                          className="flex gap-2 overflow-x-auto p-3 lg:flex-col lg:gap-1.5 lg:overflow-y-auto lg:p-3"
                          role="listbox"
                          aria-label="Project archive directory"
                        >
                          {showcaseData.map((item, idx) => {
                            const active = idx === selectedIndex;
                            const indexCode = String(idx + 1).padStart(2, '0');
                            const itemSlug = item.folder.toLowerCase();

                            return (
                              <button
                                key={item.id}
                                type="button"
                                role="option"
                                aria-selected={active}
                                onClick={() => handleSelectProject(idx)}
                                className={`group relative flex shrink-0 items-center gap-3 rounded-xl border px-3 py-2.5 text-left font-mono transition-all lg:w-full lg:px-3.5 lg:py-3 ${
                                  active
                                    ? 'border-content-primary/40 bg-gradient-to-r from-content-primary/[0.15] via-content-primary/[0.06] to-transparent text-white shadow-[inset_2px_0_0_#0ea5e9]'
                                    : 'border-transparent bg-white/[0.015] text-slate-400 hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-slate-200'
                                }`}
                              >
                                <span
                                  className={`text-[10px] font-bold ${
                                    active ? 'text-hero-primary' : 'text-slate-600 group-hover:text-slate-400'
                                  }`}
                                >
                                  {active ? '▸' : indexCode}
                                </span>

                                <img
                                  src={item.thumb}
                                  alt=""
                                  className={`h-8 w-8 shrink-0 rounded-lg border object-cover transition-transform duration-300 ${
                                    active
                                      ? 'border-content-primary/50 scale-105'
                                      : 'border-white/10 opacity-75 group-hover:opacity-100'
                                  }`}
                                  loading="lazy"
                                  decoding="async"
                                />

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2">
                                    <p
                                      className={`truncate font-sans text-xs font-semibold tracking-tight sm:text-[13px] ${
                                        active ? 'text-white' : 'text-slate-300'
                                      }`}
                                    >
                                      {item.title}
                                    </p>
                                  </div>
                                  <div className="mt-0.5 flex items-center gap-2 font-mono text-[10px] text-slate-500">
                                    <span className="truncate">./{itemSlug}</span>
                                    {item.featured ? (
                                      <span className="rounded bg-hero-primary/15 px-1.5 py-0.2 text-[8px] font-bold uppercase tracking-wider text-hero-primary">
                                        ★ Core
                                      </span>
                                    ) : null}
                                  </div>
                                </div>

                                <span
                                  className={`hidden font-mono text-[9px] uppercase tracking-wider xl:inline-block ${
                                    active ? 'text-content-primary' : 'text-slate-600'
                                  }`}
                                >
                                  {item.images.length} img
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* System Telemetry Footer inside Left Pane */}
                        <div className="mt-auto hidden border-t border-white/[0.06] bg-[#05080c] p-4 font-mono text-[10px] text-slate-500 lg:block">
                          <div className="mb-2 flex items-center justify-between text-slate-400">
                            <span className="flex items-center gap-1.5">
                              <Cpu className="h-3.5 w-3.5 text-hero-primary" aria-hidden />
                              SYS_RESOURCES
                            </span>
                            <span className="text-emerald-400">NOMINAL</span>
                          </div>
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span>ARCHIVE_INDEX</span>
                              <span className="text-slate-300">
                                {String(selectedIndex + 1).padStart(2, '0')} /{' '}
                                {String(showcaseData.length).padStart(2, '0')}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>CATEGORY</span>
                              <span className="text-content-primary">{selectedProject?.category}</span>
                            </div>
                            <div className="pt-1">
                              <div className="h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                                <div
                                  className="h-full bg-gradient-to-r from-hero-primary to-content-primary transition-all duration-500"
                                  style={{
                                    width: `${((selectedIndex + 1) / showcaseData.length) * 100}%`,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* RIGHT PANE: Active Case Study Inspector & Graphical Viewport (8 cols) */}
                      <div className="flex flex-col justify-between bg-[#06090e] p-4 sm:p-6 lg:col-span-8 lg:p-7">
                        {/* Top Inspector Header */}
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="rounded-md border border-content-primary/30 bg-content-primary/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-content-primary">
                                {selectedProject?.category}
                              </span>
                              {selectedProject?.featured ? (
                                <span className="inline-flex items-center gap-1 rounded-md border border-hero-primary/30 bg-hero-primary/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-hero-primary">
                                  <Sparkles className="h-3 w-3" aria-hidden />
                                  Featured Build
                                </span>
                              ) : null}
                              <span className="font-mono text-[10px] text-slate-500">
                                PID:{1040 + selectedIndex * 18}
                              </span>
                            </div>

                            <div className="font-mono text-[10px] text-slate-500">
                              FRAME [{activeSlide + 1}/{Math.max(1, projectImages.length)}]
                            </div>
                          </div>

                          {/* Graphical Preview Viewport inside Terminal */}
                          <div className="group/stage relative mt-4 overflow-hidden rounded-xl border border-white/[0.09] bg-[#030508] shadow-inner">
                            <div className="relative aspect-[16/9] w-full overflow-hidden">
                              {projectImages[activeSlide] ? (
                                <img
                                  key={`${selectedProject?.id}-${activeSlide}`}
                                  src={projectImages[activeSlide]}
                                  alt={`${selectedProject?.title} preview ${activeSlide + 1}`}
                                  className="h-full w-full object-contain transition-transform duration-700 group-hover/stage:scale-[1.02]"
                                  loading="lazy"
                                  decoding="async"
                                />
                              ) : null}

                              {/* Subtle vignette & HUD corners */}
                              <div
                                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#030508] via-transparent to-black/20 opacity-75"
                                aria-hidden
                              />
                              <span
                                className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l border-t border-content-primary/50"
                                aria-hidden
                              />
                              <span
                                className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r border-t border-content-primary/50"
                                aria-hidden
                              />
                              <span
                                className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b border-l border-content-primary/50"
                                aria-hidden
                              />
                              <span
                                className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b border-r border-content-primary/50"
                                aria-hidden
                              />

                              {/* Slide Controls if project has multiple screenshots */}
                              {projectImages.length > 1 ? (
                                <>
                                  <button
                                    type="button"
                                    onClick={() => stepSlide(-1)}
                                    className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-white/15 bg-black/70 text-white backdrop-blur-md transition hover:border-content-primary/50 hover:bg-content-primary hover:text-black"
                                    aria-label="Previous screenshot"
                                  >
                                    <ChevronLeft className="h-4 w-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => stepSlide(1)}
                                    className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg border border-white/15 bg-black/70 text-white backdrop-blur-md transition hover:border-content-primary/50 hover:bg-content-primary hover:text-black"
                                    aria-label="Next screenshot"
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </button>
                                </>
                              ) : null}

                              {/* Bottom overlay bar inside preview */}
                              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-4 py-2.5">
                                <div className="flex items-center gap-1.5">
                                  {projectImages.map((_, i) => (
                                    <button
                                      key={i}
                                      type="button"
                                      onClick={() => setActiveSlide(i)}
                                      className={`h-1.5 rounded-full transition-all ${
                                        i === activeSlide
                                          ? 'w-6 bg-hero-primary'
                                          : 'w-1.5 bg-white/30 hover:bg-white/60'
                                      }`}
                                      aria-label={`Select screenshot ${i + 1}`}
                                    />
                                  ))}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => openProjectDetail(selectedIndex)}
                                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-black/75 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-md transition hover:border-hero-primary/50 hover:bg-hero-primary hover:text-black"
                                >
                                  <Maximize2 className="h-3 w-3" aria-hidden />
                                  Expand View
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Terminal Output: Project Title, Description & Stack */}
                          <div className="mt-5 rounded-xl border border-white/[0.06] bg-[#090d14] p-4 sm:p-5">
                            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-baseline">
                              <div>
                                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-hero-primary">
                                  $ cat ./{slugName}/README.md
                                </p>
                                <h3
                                  id="project-archive-title"
                                  className="mt-1.5 font-heading text-xl font-bold tracking-tight text-white sm:text-2xl"
                                >
                                  {selectedProject?.title}
                                </h3>
                              </div>

                              <button
                                type="button"
                                onClick={() => openProjectDetail(selectedIndex)}
                                className="inline-flex shrink-0 items-center gap-2 self-start rounded-lg bg-gradient-to-r from-content-primary to-hero-primary px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-slate-950 shadow-[0_0_25px_-5px_rgba(14,165,233,0.5)] transition hover:brightness-110 sm:self-auto"
                              >
                                <span>./launch_case_study.sh</span>
                              </button>
                            </div>

                            <p className="mt-3 text-xs leading-relaxed text-slate-300/90 sm:text-sm">
                              {selectedProject?.desc}
                            </p>

                            {/* Stack Dependencies */}
                            {selectedProject?.tags?.length ? (
                              <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-white/[0.06] pt-3.5">
                                <span className="mr-1.5 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">
                                  <Layers className="h-3 w-3 text-content-primary" aria-hidden />
                                  deps:
                                </span>
                                {selectedProject.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ---------------- Bottom Terminal Statusline (tmux/vim style) ---------------- */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] bg-[#080c12] px-3.5 py-2 font-mono text-[10px] text-slate-400 sm:px-5">
                      <div className="flex items-center gap-3">
                        <span className="rounded bg-hero-primary px-2 py-0.5 font-bold uppercase tracking-wider text-slate-950">
                          NORMAL
                        </span>
                        <span className="flex items-center gap-1.5 text-slate-300">
                          <HardDrive className="h-3 w-3 text-content-primary" aria-hidden />
                          {selectedProject?.folder}
                        </span>
                        <span className="hidden text-slate-600 sm:inline">|</span>
                        <span className="hidden text-slate-400 sm:inline">
                          {projectImages.length} {projectImages.length === 1 ? 'asset' : 'assets'} mounted
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="hidden items-center gap-1.5 text-emerald-400 sm:flex">
                          <Activity className="h-3 w-3" aria-hidden />
                          60 FPS · UTF-8
                        </span>
                        <span className="text-slate-300">
                          LN {selectedIndex + 1}, COL 1
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ---------------- Realistic Monitor Bottom Chin ---------------- */}
              <div className="monitor-chin mt-2.5 flex items-center justify-between rounded-b-xl px-4 py-2 sm:mt-3 sm:px-6">
                {/* Left OSD markings */}
                <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.24em] text-slate-500">
                  <span className="hidden sm:inline">PRO-DISPLAY · IPS 4K</span>
                  <span className="sm:hidden">VALE-DISPLAY</span>
                </div>

                {/* Center metallic brand badge */}
                <div className="flex items-center gap-2">
                  <span className="font-heading text-[11px] font-bold uppercase tracking-[0.35em] text-slate-300/80">
                    VALE<span className="text-content-primary">STUDIO</span>
                  </span>
                </div>

                {/* Right Hardware Power Button & LED */}
                <div className="flex items-center gap-3">
                  <div className="hidden items-center gap-1.5 sm:flex" aria-hidden>
                    <span className="h-1 w-2.5 rounded-full bg-white/15" />
                    <span className="h-1 w-2.5 rounded-full bg-white/15" />
                    <span className="h-1 w-2.5 rounded-full bg-white/15" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setScreenPowered((p) => !p)}
                    title={screenPowered ? 'Put monitor in standby' : 'Wake monitor'}
                    aria-label={screenPowered ? 'Put monitor in standby' : 'Wake monitor'}
                    className="group flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 transition hover:border-white/25"
                  >
                    <Power
                      className={`h-3 w-3 transition-colors ${
                        screenPowered ? 'text-emerald-400' : 'text-slate-600'
                      }`}
                    />
                    <span
                      className={`h-1.5 w-1.5 rounded-full transition-all ${
                        screenPowered
                          ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                          : 'bg-amber-500/70 shadow-[0_0_6px_#f59e0b]'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* ---------------- Realistic Monitor Neck & Desk Stand ---------------- */}
            <div className="relative mx-auto flex flex-col items-center" aria-hidden>
              {/* Machined Aluminum Stand Neck */}
              <div className="monitor-stand-neck relative h-12 w-28 sm:h-16 sm:w-36">
                {/* Cable routing slot detail */}
                <div className="absolute left-1/2 top-1/2 h-6 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06] bg-black/70" />
              </div>

              {/* Heavy Beveled Desk Foot */}
              <div className="monitor-stand-base h-3.5 w-64 rounded-t-2xl rounded-b-md sm:h-4 sm:w-80 md:w-96" />

              {/* Ambient Desk Surface Reflection / Shadow */}
              <div className="mt-1 h-4 w-[85%] max-w-2xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.18)_0%,rgba(0,0,0,0.85)_65%,transparent_100%)] blur-md" />
            </div>
          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
