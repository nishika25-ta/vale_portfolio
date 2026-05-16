import { useEffect, useState } from 'react';
import { DecryptedText } from './DecryptedText';

type SplashScreenProps = {
  onComplete: () => void;
};

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 100);
    const t2 = setTimeout(() => setStage(2), 2200);
    const t3 = setTimeout(() => setStage(3), 2600);
    const t4 = setTimeout(onComplete, 3400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050505] transition-transform duration-[800ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
        stage === 3 ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Subtle scanline backdrop */}
      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-[0.08]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(97,220,163,0.08)_0%,transparent_60%)]" aria-hidden />

      <div className="relative z-10 mb-8 overflow-hidden px-4 text-center">
        <h1
          className={`font-mono text-xl font-semibold text-slate-300 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:text-3xl lg:text-5xl ${
            stage >= 1 && stage < 2 ? 'translate-y-0' : 'translate-y-[120%]'
          }`}
        >
          <span className="text-hero-primary">import</span> {'{ '}
          {stage >= 1 ? (
            <DecryptedText
              text="Valentine"
              animateOn="view"
              sequential
              revealDirection="start"
              speed={42}
              useOriginalCharsOnly
              parentClassName="inline align-baseline"
              className="text-white"
              encryptedClassName="text-slate-500"
            />
          ) : (
            <span className="text-white">Valentine</span>
          )}
          {' } '}
          <span className="text-hero-primary">from</span>{' '}
          <span className="text-hero-secondary">&apos;./future&apos;</span>;
        </h1>
      </div>
      <div
        className={`relative z-10 h-1 w-48 overflow-hidden rounded-full bg-slate-900 transition-opacity duration-500 md:w-64 ${
          stage >= 1 && stage < 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="h-full bg-gradient-to-r from-hero-primary to-hero-secondary transition-all duration-[2000ms] ease-out"
          style={{ width: stage >= 1 ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
}
