'use client';

import { createContext, useContext, type ReactNode } from 'react';

const ScrollAnimationContext = createContext(false);

export function ScrollAnimationProvider({
  ready,
  children,
}: {
  ready: boolean;
  children: ReactNode;
}) {
  return (
    <ScrollAnimationContext.Provider value={ready}>{children}</ScrollAnimationContext.Provider>
  );
}

export function useScrollAnimationsReady(): boolean {
  return useContext(ScrollAnimationContext);
}
