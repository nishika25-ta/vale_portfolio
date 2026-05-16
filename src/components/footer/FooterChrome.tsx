'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { readMotionProfile } from '@/hooks/useMotionProfile';

const LiquidChrome = dynamic(() => import('@/components/footer/LiquidChrome'), { ssr: false });

export const FOOTER_CHROME_COLOR: [number, number, number] = [0.12, 0.1, 0.22];

/** Always rendered (SSR-safe). WebGL layers on top after mount on capable desktops. */
const FOOTER_BASE_CLASS =
  'absolute inset-0 bg-[radial-gradient(ellipse_95%_75%_at_50%_100%,rgba(99,102,241,0.38)_0%,rgba(67,56,202,0.28)_35%,rgba(18,16,40,0.9)_65%,#050505_100%)]';

export function FooterChrome() {
  const [showWebGL, setShowWebGL] = useState(false);

  useEffect(() => {
    setShowWebGL(readMotionProfile().useHeavyEffects);
  }, []);

  return (
    <>
      <div className={FOOTER_BASE_CLASS} aria-hidden />
      {showWebGL ? (
        <LiquidChrome
          baseColor={FOOTER_CHROME_COLOR}
          speed={0.3}
          amplitude={0.3}
          frequencyX={3}
          frequencyY={2}
          interactive
          className="absolute inset-0"
          aria-hidden
        />
      ) : null}
    </>
  );
}
