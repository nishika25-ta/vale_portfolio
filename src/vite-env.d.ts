/// <reference types="vite/client" />

declare global {
  interface Window {
    Lenis?: new (options: Record<string, unknown>) => {
      raf: (time: number) => void;
      destroy: () => void;
      start: () => void;
      stop: () => void;
      scrollTo: (target: HTMLElement, options?: { offset?: number }) => void;
    };
    lenis?: InstanceType<NonNullable<typeof window.Lenis>>;
  }
}

export {};
