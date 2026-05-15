/**
 * Files in `public/videos/` used by the Live Showcase carousel.
 * Add or remove entries here when you add/remove files from that folder.
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

export function filenameToTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/i, '');
  return base.replace(/_/g, ' ').trim();
}

export type VideoDemoClip = {
  id: string;
  title: string;
  videoUrl: string;
};

/** Sorted demo clips for the Live Showcase player and thumbnail strip. */
export const videoDemoClips: VideoDemoClip[] = [...SHOWCASE_VIDEO_FILES]
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  .map((file) => ({
    id: file.replace(/\.[^.]+$/i, '').toLowerCase(),
    title: filenameToTitle(file),
    videoUrl: videoPublicUrl(file),
  }));
