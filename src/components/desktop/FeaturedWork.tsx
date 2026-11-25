'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { showcaseData } from '@/data/showcaseData';
import styles from './featured.module.css';

const featured = showcaseData.filter((item) => item.featured).slice(0, 4);

export function FeaturedWork({ onOpen }: { onOpen: (id: string) => void }) {
  const [index, setIndex] = useState(0);
  const current = featured[index];
  if (!current) return null;

  const step = (delta: number) => setIndex((value) => (value + delta + featured.length) % featured.length);

  return (
    <div className={styles.featured}>
      <button
        type="button"
        className={styles.stage}
        onClick={() => onOpen(current.id)}
        aria-label={`Open ${current.title} case study`}
      >
        <span className={styles.preview}>
          <img src={current.images[0]} alt="" draggable={false} />
        </span>
        <span className={styles.caption}>
          <small>{current.category}</small>
          <strong>{current.title}</strong>
        </span>
      </button>

      {featured.length > 1 && (
        <div className={styles.navControls} role="group" aria-label="Featured projects">
          <button type="button" aria-label="Previous featured project" onClick={() => step(-1)}>
            <ChevronLeft size={16} aria-hidden="true" />
          </button>
          <span aria-live="polite" aria-atomic="true">
            <span className="sr-only">{current.title}, project </span>
            {index + 1} / {featured.length}
          </span>
          <button type="button" aria-label="Next featured project" onClick={() => step(1)}>
            <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
