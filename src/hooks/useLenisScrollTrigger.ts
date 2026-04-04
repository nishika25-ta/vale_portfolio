import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Keeps ScrollTrigger in sync with Lenis smooth scroll and refreshes on resize.
 */
export function useLenisScrollTrigger(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    const update = () => ScrollTrigger.update();
    let detach: (() => void) | undefined;

    const attach = () => {
      const lenis = window.lenis as
        | { on?: (ev: string, fn: () => void) => void; off?: (ev: string, fn: () => void) => void }
        | undefined;
      if (!lenis?.on) return false;
      lenis.on('scroll', update);
      detach = () => lenis.off?.('scroll', update);
      ScrollTrigger.refresh();
      return true;
    };

    if (attach()) {
      return () => {
        detach?.();
        window.removeEventListener('resize', onResize);
      };
    }

    const interval = window.setInterval(() => {
      if (attach()) window.clearInterval(interval);
    }, 80);

    return () => {
      window.clearInterval(interval);
      detach?.();
      window.removeEventListener('resize', onResize);
    };
  }, [enabled]);
}
