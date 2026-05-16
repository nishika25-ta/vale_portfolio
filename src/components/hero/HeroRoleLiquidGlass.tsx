'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { LiquidGlassFilter } from '@/components/hero/LiquidGlassFilter';

import './liquid-glass.css';

type DraggableInstance = { kill: () => void; target: Element };
type DraggablePlugin = {
  create: (
    target: Element,
    vars: Record<string, unknown>,
  ) => DraggableInstance[];
};

type HeroRoleLiquidGlassProps = {
  children: ReactNode;
};

export function HeroRoleLiquidGlass({ children }: HeroRoleLiquidGlassProps) {
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pillRef.current;
    if (!el) return;

    let disposed = false;
    let instances: DraggableInstance[] = [];

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (reducedMotion || coarsePointer) return;

    const setupDraggable = async () => {
      if (disposed) return;

      const [{ default: Draggable }, { default: InertiaPlugin }] = await Promise.all([
        import('gsap/dist/Draggable'),
        import('gsap/dist/InertiaPlugin'),
      ]);

      if (disposed) return;

      gsap.registerPlugin(Draggable, InertiaPlugin);
      const plugin = Draggable as unknown as DraggablePlugin;

      instances = plugin.create(el, {
        type: 'x,y',
        inertia: true,
        onRelease: function onRelease(this: DraggableInstance) {
          gsap.to(this.target, {
            x: 0,
            y: 0,
            duration: 1.5,
            ease: 'elastic.out(1, 0.3)',
          });
        },
      });
    };

    void setupDraggable();

    return () => {
      disposed = true;
      instances.forEach((instance) => instance.kill());
      gsap.set(el, { x: 0, y: 0 });
    };
  }, []);

  return (
    <>
      <LiquidGlassFilter />
      <div
        ref={pillRef}
        className="liquid-glass liquid-glass--hero-role"
        aria-live="polite"
        title="Drag to move"
      >
        <div className="liquid-glass--bend" aria-hidden />
        <div className="liquid-glass--face" aria-hidden />
        <div className="liquid-glass--edge" aria-hidden />
        <div className="liquid-glass__content">{children}</div>
      </div>
    </>
  );
}
