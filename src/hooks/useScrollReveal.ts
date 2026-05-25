'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isMobileViewport } from '@/utils/isMobileViewport';
import { getScrollScroller } from '@/utils/scrollScroller';

gsap.registerPlugin(ScrollTrigger);

/** Footer blocks using `data-reveal-stagger` + `data-reveal-item`. */
export function useScrollReveal(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const scroller = getScrollScroller();
    const mobile = isMobileViewport();

    const ctx = gsap.context(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal-stagger]').forEach((root) => {
        const stagger = parseFloat(root.getAttribute('data-reveal-stagger') || '0.12');
        const start = root.dataset.revealStart || 'top 92%';
        const items = gsap.utils.toArray<HTMLElement>(
          root.querySelectorAll(':scope > [data-reveal-item]')
        );
        if (items.length === 0) return;

        const animation =
          mobile || root.dataset.revealAnim === 'fade-up' ? 'fade-up' : 'bounce-up';
        const y = mobile ? 20 : animation === 'fade-up' ? 48 : 56;
        const ease = 'power2.out';
        const duration = mobile ? 0.45 : 0.85;
        const staggerAmount = mobile ? Math.min(stagger, 0.06) : stagger;

        gsap.set(items, { opacity: 0, y });

        ScrollTrigger.batch(items, {
          scroller,
          start,
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration,
              ease,
              stagger: staggerAmount,
              overwrite: 'auto',
            });
          },
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);
    const t = setTimeout(refresh, 300);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [enabled]);
}
