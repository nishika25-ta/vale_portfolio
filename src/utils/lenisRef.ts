import type Lenis from 'lenis';

let _lenis: Lenis | undefined;

export function getLenis(): Lenis | undefined {
  return _lenis;
}

export function setLenis(instance: Lenis | undefined): void {
  _lenis = instance;
}
