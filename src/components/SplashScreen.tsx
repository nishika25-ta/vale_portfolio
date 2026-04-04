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
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 transition-transform duration-[800ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
        stage === 3 ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="overflow-hidden mb-8 px-4 text-center">
        <h1
          className={`text-xl md:text-3xl lg:text-5xl font-mono font-semibold text-slate-300 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            stage >= 1 && stage < 2 ? 'translate-y-0' : 'translate-y-[120%]'
          }`}
        >
          <span className="text-indigo-500">import</span> {'{ '}
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
          <span className="text-indigo-500">from</span>{' '}
          <span className="text-emerald-400">&apos;./future&apos;</span>;
        </h1>
      </div>
      <div
        className={`w-48 md:w-64 h-1 bg-slate-800 rounded-full overflow-hidden transition-opacity duration-500 ${
          stage >= 1 && stage < 2 ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="h-full bg-indigo-600 transition-all duration-[2000ms] ease-out"
          style={{ width: stage >= 1 ? '100%' : '0%' }}
        />
      </div>
    </div>
  );
}
