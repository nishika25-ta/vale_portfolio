'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollAnimationsReady } from '@/context/ScrollAnimationContext';
import { isMobileViewport } from '@/utils/isMobileViewport';
import { getScrollScroller } from '@/utils/scrollScroller';
import { createElement, useRef, type ElementType, type ReactNode } from 'react';

gsap.registerPlugin(ScrollTrigger);

export type ScrollRevealAnimation = 'fade-up' | 'bounce-up' | 'fade' | 'scale-up';

type ScrollRevealGroupProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  animation?: ScrollRevealAnimation;
  stagger?: number;
  start?: string;
  duration?: number;
};

const PRESETS: Record<
  ScrollRevealAnimation,
  { y: number; scale: number; ease: string }
> = {
  'fade-up': { y: 48, scale: 1, ease: 'power3.out' },
  'bounce-up': { y: 56, scale: 1, ease: 'back.out(1.1)' },
  fade: { y: 28, scale: 1, ease: 'power2.out' },
  'scale-up': { y: 36, scale: 0.96, ease: 'power3.out' },
};

export function ScrollRevealGroup({
  as: Tag = 'div',
  children,
  className = '',
  animation = 'bounce-up',
  stagger = 0.12,
  start = 'top 92%',
  duration = 0.85,
}: ScrollRevealGroupProps) {
  const rootRef = useRef<HTMLElement>(null);
  const scrollReady = useScrollAnimationsReady();

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !scrollReady) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const items = gsap.utils.toArray<HTMLElement>(root.children);
      if (items.length === 0) return;

      const mobile = isMobileViewport();
      const resolvedAnimation = mobile && animation === 'bounce-up' ? 'fade-up' : animation;
      const preset = PRESETS[resolvedAnimation];
      const revealDuration = mobile ? Math.min(duration, 0.5) : duration;
      const revealStagger = mobile ? Math.min(stagger, 0.06) : stagger;

      gsap.set(items, {
        opacity: 0,
        y: mobile ? 20 : preset.y,
        scale: mobile ? 1 : preset.scale,
      });

      const scroller = getScrollScroller();

      ScrollTrigger.batch(items, {
        scroller,
        start,
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: revealDuration,
            ease: mobile ? 'power2.out' : preset.ease,
            stagger: revealStagger,
            overwrite: 'auto',
          });
        },
      });

      ScrollTrigger.refresh();
    },
    { scope: rootRef, dependencies: [scrollReady, animation, stagger, start, duration] }
  );

  return createElement(Tag, { ref: rootRef, className }, children);
}
