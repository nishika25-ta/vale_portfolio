import Lenis from 'lenis';
import { useEffect } from 'react';
import { getLenis, setLenis } from '@/utils/lenisRef';

export function useLenis(showSplash: boolean): void {
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    });

    setLenis(lenisInstance);
    lenisInstance.stop();

    const parallaxElements = document.querySelectorAll('.parallax-element');
    const parallaxImages = document.querySelectorAll('.parallax-image-inner');

    let rafId: number | null = null;

    function raf(time: number) {
      lenisInstance.raf(time);
      const scrollY = window.scrollY;

      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute('data-speed') || '0');
        (el as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });

      parallaxImages.forEach((img) => {
        const speed = parseFloat(img.getAttribute('data-speed-inner') || '0.1');
        (img as HTMLElement).style.transform = `translateY(${scrollY * speed}px)`;
      });

      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      lenisInstance.destroy();
      setLenis(undefined);
    };
  }, []);

  useEffect(() => {
    const lenis = getLenis();
    if (lenis && !showSplash) lenis.start();
  }, [showSplash]);
}
