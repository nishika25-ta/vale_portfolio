import type { ShowcaseItem } from '../types/portfolio';
import { buildShowcaseFromContents } from './contentShowcase';

export const showcaseData: ShowcaseItem[] = buildShowcaseFromContents();
