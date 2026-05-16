import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Resize + post-splash refresh only — Lenis proxy lives in `useLenis`. */
export function useLenisScrollTrigger(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const t = setTimeout(refresh, 250);

    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(t);
    };
  }, [enabled]);
}
