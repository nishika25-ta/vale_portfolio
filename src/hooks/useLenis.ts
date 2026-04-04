import { useEffect } from 'react';

export function useLenis(showSplash: boolean): void {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@studio-freight/lenis@1.0.39/dist/lenis.min.js';
    script.async = true;
    document.body.appendChild(script);

    let lenisInstance: InstanceType<NonNullable<typeof window.Lenis>> | null = null;
    let rafId: number | null = null;

    script.onload = () => {
      const LenisCtor = window.Lenis;
      if (!LenisCtor) return;
      lenisInstance = new LenisCtor({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
        infinite: false,
      });
      window.lenis = lenisInstance;
      lenisInstance.stop();

      const parallaxElements = document.querySelectorAll('.parallax-element');
      const parallaxImages = document.querySelectorAll('.parallax-image-inner');

      function raf(time: number) {
        lenisInstance?.raf(time);
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
    };

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenisInstance) lenisInstance.destroy();
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.lenis && !showSplash) window.lenis.start();
  }, [showSplash]);
}
