import type { ReactElement } from 'react';

export type DockAppItem = {
  id: string;
  name: string;
  icon: ReactElement;
  isDivider?: boolean;
};

export type ShowcaseItem = {
  id: string;
  /** Folder name under `public/images/contents/` */
  folder: string;
  category: string;
  title: string;
  desc: string;
  tags: string[];
  /** Carousel screens (excludes `icons/…` entries; those are thumb-only). */
  images: string[];
  thumb: string;
  /** Optional demo clip from `public/videos/` */
  videoUrl?: string;
};
