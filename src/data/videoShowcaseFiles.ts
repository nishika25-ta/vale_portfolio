/**
 * Files in `public/videos/` used by the Live Showcase carousel.
 * Matching posters live in `public/video-thumbs/` (same basename, .webp).
 * Regenerate posters: npm run video-thumbs
 */
export const SHOWCASE_VIDEO_FILES = [
  'Coffee.webm',
  'Coffee_Joa.webm',
  'Collectors_world.webm',
  'DASH.webm',
  'Dynasty_Hotel.webm',
  'Mal_Demo.webm',
  'Pelita_Clinic.webm',
  'The_Yard.webm',
] as const;

export function videoPublicUrl(filename: string): string {
  return `/videos/${encodeURIComponent(filename)}`;
}

export function videoPosterUrl(filename: string): string {
  const base = filename.replace(/\.[^.]+$/i, '');
  return `/video-thumbs/${encodeURIComponent(base)}.webp`;
}

const VIDEO_TITLES: Record<string, string> = {
  Coffee: 'Coffee',
  Coffee_Joa: 'Coffee Joa',
  Collectors_world: 'Collectors World',
  DASH: 'DASH',
  Dynasty_Hotel: 'Dynasty Hotel',
  Mal_Demo: 'MAL',
  Pelita_Clinic: 'Pelita Clinic',
  The_Yard: 'The Yard',
};

export function filenameToTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/i, '');
  return VIDEO_TITLES[base] ?? base.replace(/_/g, ' ').trim();
}

export type VideoDemoClip = {
  id: string;
  title: string;
  caption: string;
  videoUrl: string;
  posterUrl: string;
};

/** Sorted demo clips for the Live Showcase player and thumbnail strip. */
export const videoDemoClips: VideoDemoClip[] = [...SHOWCASE_VIDEO_FILES]
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  .map((file) => ({
    id: file.replace(/\.[^.]+$/i, '').toLowerCase(),
    title: filenameToTitle(file),
    caption: 'Client product walkthrough from a shipped Scribear delivery.',
    videoUrl: videoPublicUrl(file),
    posterUrl: videoPosterUrl(file),
  }));
