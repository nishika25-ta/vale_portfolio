/** Touch-first / narrow layouts — used for mobile-only perf paths (not reduced-motion). */
export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(max-width: 768px)').matches ||
    window.matchMedia('(pointer: coarse)').matches
  );
}
