/** Narrow phone/tablet layout — use for visual effects that should stay on desktop. */
export function isNarrowViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px)').matches;
}

/** Touch-first / narrow layouts — used for mobile-only perf paths (not reduced-motion). */
export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return isNarrowViewport() || window.matchMedia('(pointer: coarse)').matches;
}
