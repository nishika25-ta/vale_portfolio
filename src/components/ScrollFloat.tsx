import { createElement, useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

export type ScrollFloatProps = {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  containerClassName?: string;
  textClassName?: string;
  /** Adds the large display clamp from ScrollFloat.css */
  displaySize?: boolean;
  animationDuration?: number;
  ease?: string;
  scrollStart?: string;
  scrollEnd?: string;
  stagger?: number;
  /** Number = smoothed scrub lag (recommended). */
  scrub?: number | boolean;
  role?: string;
  /**
   * `line` = animate the whole string (gradient text + word-wrap work on mobile).
   * `chars` = per-letter (can break gradient text and mid-word wraps on narrow screens).
   */
  splitMode?: 'chars' | 'line';
};

export function ScrollFloat({
  children,
  as: Tag = 'h2',
  scrollContainerRef,
  containerClassName = '',
  textClassName = '',
  displaySize = false,
  animationDuration = 1,
  ease = 'power2.out',
  scrollStart = 'center bottom+=45%',
  scrollEnd = 'bottom bottom-=35%',
  stagger = 0.025,
  scrub = 0.75,
  role,
  splitMode = 'line',
}: ScrollFloatProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const lineTargetRef = useRef<HTMLSpanElement | null>(null);
  const text = String(children);

  const splitText = useMemo(
    () =>
      text.split('').map((char, index) => (
        <span className="char" key={`${index}-${char}`}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      )),
    [text]
  );

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const scrollerEl = scrollContainerRef?.current;
      const stCommon = {
        trigger: el,
        scroller: scrollerEl ?? window,
        start: scrollStart,
        end: scrollEnd,
        scrub,
      } as const;

      if (splitMode === 'line') {
        const target = lineTargetRef.current;
        if (!target) return;
        gsap.fromTo(
          target,
          {
            willChange: 'opacity, transform',
            opacity: 0,
            yPercent: 108,
            scaleY: 1.75,
            scaleX: 0.82,
            transformOrigin: '50% 0%',
          },
          {
            duration: animationDuration,
            ease,
            opacity: 1,
            yPercent: 0,
            scaleY: 1,
            scaleX: 1,
            scrollTrigger: stCommon,
          }
        );
        return;
      }

      const charElements = el.querySelectorAll('.char');
      if (charElements.length === 0) return;

      gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 108,
          scaleY: 1.75,
          scaleX: 0.82,
          transformOrigin: '50% 0%',
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: stCommon,
        }
      );
    },
    {
      scope: containerRef,
      dependencies: [
        text,
        splitMode,
        animationDuration,
        ease,
        scrollStart,
        scrollEnd,
        stagger,
        scrub,
        scrollContainerRef,
      ],
    }
  );

  const textClasses = ['scroll-float-text', displaySize ? 'scroll-float-text--display' : '', textClassName]
    .filter(Boolean)
    .join(' ');

  const lineClass = splitMode === 'line' ? 'scroll-float--line' : '';
  const outerProps: Record<string, unknown> = {
    ref: containerRef,
    className: `scroll-float ${lineClass} ${containerClassName}`.trim(),
  };
  if (role !== undefined) outerProps.role = role;

  const innerSpan =
    splitMode === 'line'
      ? createElement('span', { ref: lineTargetRef, className: textClasses }, text)
      : createElement('span', { className: textClasses }, splitText);

  return createElement(Tag, outerProps, innerSpan);
}
