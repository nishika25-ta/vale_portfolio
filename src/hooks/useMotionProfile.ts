'use client';

import { useEffect, useState } from 'react';

export type MotionProfile = {
  isMobile: boolean;
  prefersReducedMotion: boolean;
  useSmoothScroll: boolean;
  useHeavyEffects: boolean;
};

/** SSR / first paint — must match server HTML (no window APIs). */
export const MOTION_PROFILE_SSR: MotionProfile = {
  isMobile: false,
  prefersReducedMotion: false,
  useSmoothScroll: false,
  useHeavyEffects: false,
};

export function readMotionProfile(): MotionProfile {
  if (typeof window === 'undefined') {
    return MOTION_PROFILE_SSR;
  }

  const isMobile =
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saveData = Boolean(
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData
  );

  const useHeavyEffects = !prefersReducedMotion && !isMobile && !saveData;
  const useSmoothScroll = !prefersReducedMotion && !isMobile;

  return { isMobile, prefersReducedMotion, useSmoothScroll, useHeavyEffects };
}

export function useMotionProfile(): MotionProfile {
  const [profile, setProfile] = useState<MotionProfile>(MOTION_PROFILE_SSR);

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 768px)');
    const coarse = window.matchMedia('(pointer: coarse)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => setProfile(readMotionProfile());
    update();

    narrow.addEventListener('change', update);
    coarse.addEventListener('change', update);
    reduced.addEventListener('change', update);

    return () => {
      narrow.removeEventListener('change', update);
      coarse.removeEventListener('change', update);
      reduced.removeEventListener('change', update);
    };
  }, []);

  return profile;
}
