import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileViewport } from '@/utils/isMobileViewport';

/** Resize + post-splash refresh — Lenis proxy lives in `useLenis`. */
export function useLenisScrollTrigger(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const mobile = isMobileViewport();
    if (mobile) return;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const onResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', onResize, { passive: true });

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const t = setTimeout(refresh, 250);

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
      clearTimeout(resizeTimer);
    };
  }, [enabled]);
}
