import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis } from '@/utils/lenisRef';

export function useLenisScrollTrigger(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    const update = () => ScrollTrigger.update();
    let unsub: (() => void) | undefined;

    const attach = () => {
      const lenis = getLenis();
      if (!lenis) return false;
      unsub = lenis.on('scroll', () => update);
      ScrollTrigger.refresh();
      return true;
    };

    if (attach()) {
      return () => {
        unsub?.();
        window.removeEventListener('resize', onResize);
      };
    }

    const interval = window.setInterval(() => {
      if (attach()) window.clearInterval(interval);
    }, 80);

    return () => {
      window.clearInterval(interval);
      unsub?.();
      window.removeEventListener('resize', onResize);
    };
  }, [enabled]);
}
