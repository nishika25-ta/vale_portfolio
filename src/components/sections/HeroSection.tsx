import LetterGlitch from '@/components/hero/LetterGlitch';

type HeroSectionProps = {
  // Kept for API compatibility with PortfolioApp; hero no longer has CTAs.
  onNavigate?: (sectionId: string) => void;
};

const HERO_GLITCH_COLORS = ['#2b4539', '#61dca3', '#61b3dc'];

export function HeroSection(_props: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20 text-center"
    >
      <div className="absolute inset-0 z-0 min-h-[100dvh] w-full bg-[#050505]">
        <LetterGlitch
          glitchColors={HERO_GLITCH_COLORS}
          glitchSpeed={50}
          smooth
          outerVignette={false}
          centerVignette={false}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-40 bg-gradient-to-b from-transparent to-[#050505]"
        aria-hidden
      />

      <div
        className="font-apple relative z-10 flex w-full max-w-6xl flex-col items-center px-4 parallax-element sm:px-6"
        data-speed="0.05"
      >
        <div className="hero-fade hero-fade-1 hero-glass-pill mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 font-mono text-[11px] tracking-wide text-white/90">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-hero-primary/40 opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-hero-primary" />
          </span>
          <span className="text-hero-primary">~/</span>
          <span className="text-white/90">available_for_hire</span>
          <span className="text-white/40">·</span>
          <span className="text-white/55">2026</span>
        </div>

        <div className="hero-fade hero-fade-3 relative mb-6 w-full max-w-3xl">
          <div className="hero-glass hero-glass-shine hero-glass-edge relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10 md:px-14 md:py-14">
            <div className="relative">
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.4em] text-hero-primary [text-shadow:0_0_20px_rgba(97,220,163,0.35)] md:text-[12px]">
                Backend &amp; AI Engineer
              </p>
              <h1 className="w-full min-w-0 text-center text-[clamp(2.5rem,12vw,7.5rem)] font-extrabold leading-[1.05] tracking-[-0.045em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.2),0_0_32px_rgba(255,255,255,0.12)]">
                <span className="block">Valentine</span>
                <span className="block bg-gradient-to-r from-hero-primary via-white to-hero-secondary bg-clip-text text-transparent">
                  Agam
                </span>
              </h1>
            </div>
          </div>
        </div>

        <div className="hero-fade hero-fade-4 relative w-full max-w-xl">
          <div className="hero-glass hero-glass-shine hero-glass-edge relative overflow-hidden rounded-3xl px-6 py-5 sm:px-8 sm:py-6">
            <p className="relative text-[1rem] font-medium leading-[1.4] tracking-[-0.018em] text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.18),0_0_24px_rgba(255,255,255,0.1)] sm:text-[1.1rem] md:text-[1.25rem]">
              Scalable backends, AI automation, and computer vision.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
