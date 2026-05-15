import { useCallback, useEffect, useRef, useState } from 'react';

type ShowcaseVideoThumbProps = {
  videoUrl: string;
  imageFallback?: string;
};

/**
 * First frame of a local demo clip as thumbnail (metadata only, in-viewport).
 */
export function ShowcaseVideoThumb({ videoUrl, imageFallback }: ShowcaseVideoThumbProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  const primeFrame = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    try {
      el.currentTime = 0.15;
    } catch {
      /* seek may fail before metadata */
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setShouldLoad(true);
      },
      { rootMargin: '100px', threshold: 0.01 }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  const placeholder = imageFallback ? (
    <img
      src={imageFallback}
      alt=""
      className="h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />
  ) : (
    <div className="h-full w-full bg-[#0a0a0c]" aria-hidden />
  );

  return (
    <div ref={rootRef} className="absolute inset-0">
      {!shouldLoad ? (
        placeholder
      ) : (
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
      )}
    </div>
  );
}
