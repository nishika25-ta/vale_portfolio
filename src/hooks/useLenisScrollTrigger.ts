import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileViewport } from '@/utils/isMobileViewport';

/** Resize + post-splash refresh — Lenis proxy lives in `useLenis`. */
export function useLenisScrollTrigger(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const mobile = isMobileViewport();
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;

    const onResize = () => {
      if (mobile) {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200);
        return;
      }
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', onResize, { passive: true });

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const t = setTimeout(refresh, mobile ? 400 : 250);

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
      clearTimeout(resizeTimer);
    };
  }, [enabled]);
}
