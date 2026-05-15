'use client';

import { useEffect, useState } from 'react';

/** Viewport ≤768px or coarse pointer (phones / small tablets). */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const narrow = window.matchMedia('(max-width: 768px)');
    const coarse = window.matchMedia('(pointer: coarse)');

    const update = () => setIsMobile(narrow.matches || coarse.matches);
    update();

    narrow.addEventListener('change', update);
    coarse.addEventListener('change', update);
    return () => {
      narrow.removeEventListener('change', update);
      coarse.removeEventListener('change', update);
    };
  }, []);

  return isMobile;
}

export function prefersSaveData(): boolean {
  if (typeof navigator === 'undefined') return false;
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
  return Boolean(conn?.saveData);
}
