import { useCallback, useRef } from 'react';

type ShowcaseVideoThumbProps = {
  videoUrl?: string;
  imageFallback: string;
};

/**
 * Shows the first frame of a local MP4 as the thumbnail (no autoplay).
 * Falls back to a static image when there is no video URL.
 * Parent control should supply an accessible name (e.g. aria-label on the button).
 */
export function ShowcaseVideoThumb({ videoUrl, imageFallback }: ShowcaseVideoThumbProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const primeFrame = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    try {
      el.currentTime = 0.15;
    } catch {
      /* seek may fail before metadata */
    }
  }, []);

  if (!videoUrl) {
    return <img src={imageFallback} alt="" className="h-full w-full object-cover" loading="lazy" />;
  }

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      muted
      playsInline
      preload="metadata"
      onLoadedMetadata={primeFrame}
      onLoadedData={primeFrame}
      className="pointer-events-none h-full w-full object-cover"
      aria-hidden
    />
  );
}
