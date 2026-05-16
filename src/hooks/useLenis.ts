import Lenis from 'lenis';
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getLenis, setLenis } from '@/utils/lenisRef';
import { getScrollScroller } from '@/utils/scrollScroller';

gsap.registerPlugin(ScrollTrigger);

function setupLenisScrollProxy(lenis: Lenis) {
  const root = getScrollScroller();

  ScrollTrigger.scrollerProxy(root, {
    scrollTop(value) {
      if (value !== undefined) {
        lenis.scrollTo(value, { immediate: true });
      }
      return lenis.scroll;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: root.style.transform ? 'transform' : 'fixed',
  });
}

function clearLenisScrollProxy() {
  ScrollTrigger.scrollerProxy(getScrollScroller(), {});
}

export function useLenis(showSplash: boolean): void {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setLenis(undefined);
      clearLenisScrollProxy();
      return;
    }

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      infinite: false,
    });

    setLenis(lenisInstance);
    setupLenisScrollProxy(lenisInstance);
    lenisInstance.stop();

    let rafId: number | null = null;

    function raf(time: number) {
      lenisInstance.raf(time);

      const scrollY = lenisInstance.scroll;
      document.querySelectorAll('.parallax-element').forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0');
        (el as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });

      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const unsubScroll = lenisInstance.on('scroll', ScrollTrigger.update);

    return () => {
      unsubScroll();
      if (rafId) cancelAnimationFrame(rafId);
      clearLenisScrollProxy();
      lenisInstance.destroy();
      setLenis(undefined);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    if (showSplash) {
      lenis.stop();
      return;
    }

    lenis.start();
    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const t1 = setTimeout(refresh, 150);
    const t2 = setTimeout(refresh, 600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [showSplash]);
}
