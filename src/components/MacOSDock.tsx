import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { DockAppItem } from '../types/portfolio';
import { isMobileViewport } from '@/utils/isMobileViewport';
import { useActiveSection } from '@/hooks/useActiveSection';

type MacOSDockProps = {
  apps: DockAppItem[];
  onAppClick: (appId: string) => void;
  openApps?: string[];
  className?: string;
};

export function MacOSDock({ apps, onAppClick, openApps = [], className = '' }: MacOSDockProps) {
  const observedActiveSection = useActiveSection();
  const effectiveOpenApps = openApps.length > 0 ? openApps : [observedActiveSection];
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && isMobileViewport());
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [currentScales, setCurrentScales] = useState(() => apps.map(() => 1));
  const [currentPositions, setCurrentPositions] = useState<number[]>([]);
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number>(undefined);
  const lastMouseMoveTime = useRef(0);

  const getResponsiveConfig = useCallback(() => {
    if (typeof window === 'undefined') {
      return {
        baseIconSize: 40,
        maxScale: 1.6,
        effectWidth: 200,
        baseSpacing: 10,
        padX: 16,
        padY: 10,
      };
    }
    const w = window.innerWidth;
    // Fit ~9 items + padding within viewport (dock width uses horizontal space, not min(w,h))
    if (w < 360) {
      return { baseIconSize: 22, maxScale: 1.18, effectWidth: 100, baseSpacing: 3, padX: 8, padY: 6 };
    }
    if (w < 400) {
      return { baseIconSize: 24, maxScale: 1.22, effectWidth: 110, baseSpacing: 4, padX: 8, padY: 7 };
    }
    if (w < 480) {
      return { baseIconSize: 26, maxScale: 1.28, effectWidth: 125, baseSpacing: 5, padX: 10, padY: 8 };
    }
    if (w < 640) {
      return { baseIconSize: 30, maxScale: 1.38, effectWidth: 150, baseSpacing: 7, padX: 12, padY: 9 };
    }
    if (w < 768) {
      return { baseIconSize: 36, maxScale: 1.5, effectWidth: 180, baseSpacing: 9, padX: 14, padY: 10 };
    }
    return { baseIconSize: 42, maxScale: 1.65, effectWidth: 220, baseSpacing: 10, padX: 16, padY: 10 };
  }, []);

  const [config, setConfig] = useState(getResponsiveConfig);
  const { baseIconSize, maxScale, effectWidth, baseSpacing, padX, padY } = config;
  const minScale = 1.0;

  useEffect(() => {
    setConfig(getResponsiveConfig());
    setIsMobile(isMobileViewport());
    setMounted(true);
  }, [getResponsiveConfig]);

  useEffect(() => {
    const handleResize = () => {
      setConfig(getResponsiveConfig());
      setIsMobile(isMobileViewport());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getResponsiveConfig]);

  const calculateTargetMagnification = useCallback(
    (mousePosition: number | null) => {
      if (mousePosition === null) return apps.map(() => minScale);
      return apps.map((_, index) => {
        const normalIconCenter = index * (baseIconSize + baseSpacing) + baseIconSize / 2;
        const minX = mousePosition - effectWidth / 2;
        const maxX = mousePosition + effectWidth / 2;
        if (normalIconCenter < minX || normalIconCenter > maxX) return minScale;
        const theta = ((normalIconCenter - minX) / effectWidth) * 2 * Math.PI;
        const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI);
        const scaleFactor = (1 - Math.cos(cappedTheta)) / 2;
        return minScale + scaleFactor * (maxScale - minScale);
      });
    },
    [apps, baseIconSize, baseSpacing, effectWidth, maxScale, minScale]
  );

  const calculatePositions = useCallback(
    (scales: number[]) => {
      let currentX = 0;
      return scales.map((scale) => {
        const scaledWidth = baseIconSize * scale;
        const centerX = currentX + scaledWidth / 2;
        currentX += scaledWidth + baseSpacing;
        return centerX;
      });
    },
    [baseIconSize, baseSpacing]
  );

  useEffect(() => {
    if (isMobile) return;
    const initialScales = apps.map(() => minScale);
    setCurrentScales(initialScales);
    setCurrentPositions(calculatePositions(initialScales));
  }, [apps, calculatePositions, minScale, config, isMobile]);

  const animateToTarget = useCallback(() => {
    const targetScales = calculateTargetMagnification(mouseX);
    const targetPositions = calculatePositions(targetScales);
    const lerpFactor = mouseX !== null ? 0.22 : 0.12;
    setCurrentScales((prev) => prev.map((curr, i) => curr + (targetScales[i] - curr) * lerpFactor));
    setCurrentPositions((prev) => prev.map((curr, i) => curr + (targetPositions[i] - curr) * lerpFactor));
    const needsUpdate =
      currentScales.some((s, i) => Math.abs(s - targetScales[i]) > 0.002) ||
      currentPositions.some((p, i) => Math.abs(p - targetPositions[i]) > 0.1);
    if (needsUpdate || mouseX !== null) animationFrameRef.current = requestAnimationFrame(animateToTarget);
  }, [mouseX, calculateTargetMagnification, calculatePositions, currentScales, currentPositions]);

  useEffect(() => {
    if (isMobile) return;
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = requestAnimationFrame(animateToTarget);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [animateToTarget, isMobile]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();
    if (now - lastMouseMoveTime.current < 16) return;
    lastMouseMoveTime.current = now;
    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left - padX);
    }
  }, [padX]);

  const handleAppClick = (appId: string, index: number) => {
    const el = iconRefs.current[index];
    if (el) {
      el.style.transition = 'transform 0.2s cubic-bezier(0.2, 0, 0.2, 1)';
      el.style.transform = `translateY(-12px)`;
      setTimeout(() => {
        el.style.transition = 'transform 0.4s cubic-bezier(0.5, 2, 0.5, 1)';
        el.style.transform = 'translateY(0px)';
      }, 200);
    }
    onAppClick(appId);
  };

  const horizontalPadding = padX * 2;
  const dockWidth =
    currentPositions.length > 0
      ? Math.max(...currentPositions.map((pos, i) => pos + (baseIconSize * currentScales[i]) / 2)) + horizontalPadding
      : apps.length * (baseIconSize + baseSpacing) - baseSpacing + horizontalPadding;

  if (!mounted) return null;

  if (isMobile) {
    const mobileIds = new Set(['home', 'about', 'experience', 'skills', 'projects', 'resume']);
    const mobileApps = apps.filter((app) => mobileIds.has(app.id));
    return (
      <nav
        className={`fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-1/2 z-50 w-[calc(100vw-16px)] max-w-md -translate-x-1/2 ${className}`}
        aria-label="Portfolio sections"
      >
        <div className="mobile-pill-nav rounded-2xl border border-white/10 bg-[#0c0c0f] p-1.5 shadow-[0_10px_28px_rgba(0,0,0,0.45)]">
          <div className="grid grid-cols-6 items-center gap-0.5">
            {mobileApps.map((app) => {
              const active = effectiveOpenApps.includes(app.id);
              return (
                <button
                  key={app.id}
                  type="button"
                  onClick={() => onAppClick(app.id)}
                  className={`relative flex h-10 w-full items-center justify-center rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-content-primary ${
                    active ? 'bg-content-primary/15 text-content-primary' : 'text-white/55 active:bg-white/10 active:text-white'
                  }`}
                  aria-label={app.name}
                  aria-current={active ? 'page' : undefined}
                >
                  {React.cloneElement(app.icon, { size: 19, strokeWidth: 2 } as { size?: number; strokeWidth?: number })}
                  {active ? <span className="absolute bottom-1 h-1 w-1 rounded-full bg-content-primary" aria-hidden /> : null}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <div
      className={`fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-50 max-w-[calc(100vw-12px)] -translate-x-1/2 sm:bottom-6 ${className}`}
    >
      <div
        ref={dockRef}
        className="macos-dock-shell backdrop-blur-2xl transition-all duration-300 ease-out flex items-center justify-center"
        style={{
          width: `${dockWidth}px`,
          background: 'rgba(12, 12, 12, 0.9)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255, 255, 255, 0.03)',
          padding: `${padY}px ${padX}px`,
          height: `${baseIconSize + padY * 2}px`,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMouseX(null)}
      >
        <div className="relative w-full flex items-end" style={{ height: `${baseIconSize}px` }}>
          {apps.map((app, index) => {
            const scale = currentScales[index] ?? 1;
            const position = currentPositions[index] ?? 0;
            const scaledSize = baseIconSize * scale;
            return (
              <div
                key={app.id}
                ref={(el) => {
                  iconRefs.current[index] = el;
                }}
                className="absolute cursor-pointer flex flex-col items-center justify-center group"
                onClick={() => handleAppClick(app.id, index)}
                style={{
                  left: `${position - scaledSize / 2}px`,
                  bottom: '1px',
                  width: `${scaledSize}px`,
                  height: `${scaledSize}px`,
                  transformOrigin: 'bottom center',
                  zIndex: Math.round(scale * 10),
                }}
              >
                <div className="pointer-events-none absolute -top-11 whitespace-nowrap rounded-md border border-white/10 bg-black/85 px-2.5 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-white opacity-0 shadow-xl transition-all -translate-y-1 backdrop-blur-md group-hover:translate-y-0 group-hover:opacity-100">
                  {app.name}
                </div>
                <div
                  className={`flex items-center justify-center w-full h-full transition-colors ${
                    app.isDivider ? 'opacity-20' : 'text-white/60 group-hover:text-white'
                  }`}
                >
                  {React.cloneElement(app.icon, {
                    size: scaledSize * 0.58,
                    strokeWidth: app.isDivider ? 1 : 2,
                  } as { size?: number; strokeWidth?: number })}
                </div>
                {effectiveOpenApps.includes(app.id) && !app.isDivider && (
                  <div
                    className="absolute rounded-full"
                    style={{
                      bottom: `-${Math.max(3, scaledSize * 0.1)}px`,
                      width: '3px',
                      height: '3px',
                      background: app.id === 'home' ? '#61dca3' : '#818cf8',
                      boxShadow:
                        app.id === 'home'
                          ? '0 0 8px rgba(97,220,163,0.85)'
                          : '0 0 8px rgba(129,140,248,0.85)',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
