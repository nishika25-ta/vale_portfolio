/**
 * Files in `public/videos/` used by the Live Showcase carousel.
 * Add or remove entries here when you add/remove files from that folder.
 */
export const SHOWCASE_VIDEO_FILES = [
  'chemara_hotel.mp4',
  'Coffee Joa.mp4',
  'Coffee.mp4',
  'Collectors_world.mp4',
  'DASH.mp4',
  'Dynasty_Hotel.mp4',
  'Hotel.mp4',
  'Kaledi_Demo.mp4',
  'Mal_Demo.mp4',
  'The_Yard(new).mp4',
  'The_Yard.mp4',
] as const;

export function videoPublicUrl(filename: string): string {
  return `/videos/${encodeURIComponent(filename)}`;
}

export function filenameToTitle(filename: string): string {
  const base = filename.replace(/\.[^.]+$/i, '');
  return base.replace(/_/g, ' ').trim();
}
