import { ArrowRight } from 'lucide-react';
import { lazy, Suspense } from 'react';

const Silk = lazy(() => import('@/components/hero/Silk'));

type HeroSectionProps = {
  onNavigate: (sectionId: string) => void;
};

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20 text-center"
    >
      <div className="absolute inset-0 z-0 min-h-[100dvh] w-full bg-[#050505]">
        <Suspense fallback={null}>
          <Silk speed={5} scale={1} color="#7B7481" noiseIntensity={1.5} rotation={0} />
        </Suspense>
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] min-h-[100dvh] bg-gradient-to-b from-[#050505]/80 via-[#050505]/35 to-[#050505]/90"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 z-[1] grid-overlay opacity-[0.18]" aria-hidden />

      <div
        className="font-apple relative z-10 flex w-full max-w-6xl flex-col items-center px-4 parallax-element sm:px-6"
        data-speed="0.05"
      >
        <div className="hero-fade hero-fade-1 mb-10 inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] px-4 py-2 text-[13px] font-medium text-white/70 backdrop-blur-md md:text-[14px]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Open for roles · 2026
        </div>

        <p className="hero-fade hero-fade-2 mb-5 text-[15px] font-normal text-white/45 md:text-[17px]">
          Design, engineering, and product
        </p>

        <h1 className="hero-fade hero-fade-3 mb-8 w-full min-w-0 text-center text-[clamp(2.5rem,12vw,7.5rem)] font-extrabold leading-[1.08] tracking-[-0.045em] text-white">
          Valentine Agam
        </h1>

        <div className="mb-12 flex max-w-[22rem] flex-col items-center gap-3 text-center sm:max-w-lg md:max-w-2xl md:gap-4">
          <p className="hero-fade hero-fade-4 text-[1.25rem] font-medium leading-[1.25] tracking-[-0.022em] text-white/[0.92] sm:text-[1.375rem] md:text-[1.625rem]">
            I build products people actually use.
          </p>
          <p className="hero-fade hero-fade-5 max-w-[28rem] text-[0.9375rem] font-normal leading-[1.55] text-[#8e8e93] sm:text-base md:text-[1.0625rem] md:leading-[1.5]">
            Crisp interfaces, dependable code, and calm judgment when design, engineering, and reality disagree.
          </p>
        </div>

        <div className="hero-fade hero-fade-6 flex flex-wrap items-center justify-center gap-3 pb-12">
          <button
            type="button"
            onClick={() => onNavigate('projects')}
            className="group flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-[15px] font-semibold text-neutral-950 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            Explore work <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className="rounded-full border border-white/20 bg-transparent px-8 py-3.5 text-[15px] font-semibold text-white/90 backdrop-blur-sm transition-colors duration-300 hover:border-white/35 hover:bg-white/[0.06]"
          >
            The story
          </button>
        </div>
      </div>
    </section>
  );
}
