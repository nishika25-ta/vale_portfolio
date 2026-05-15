'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersSaveData, useIsMobile } from '@/hooks/useIsMobile';

type ShowcaseStageVideoProps = {
  src: string;
  className?: string;
};

/**
 * Single Live Showcase player — one decoder, mobile-safe preload, no remount on clip change.
 */
export function ShowcaseStageVideo({ src, className }: ShowcaseStageVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const lowBandwidth = isMobile || prefersSaveData();

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || !inView) return;
    v.muted = true;
    v.defaultMuted = true;
    const p = v.play();
    if (p !== undefined) {
      p.then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
    }
  }, [inView]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const io = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      {
        threshold: 0.15,
        rootMargin: lowBandwidth ? '0px' : '80px',
      }
    );
    io.observe(root);
    return () => io.disconnect();
  }, [lowBandwidth]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    if (!inView) {
      v.pause();
      v.removeAttribute('src');
      v.load();
      setIsLoading(true);
      setNeedsTap(false);
      return;
    }

    setIsLoading(true);
    setNeedsTap(false);

    const onCanPlay = () => {
      setIsLoading(false);
      tryPlay();
    };
    const onPlaying = () => {
      setIsLoading(false);
      setNeedsTap(false);
    };
    const onWaiting = () => setIsLoading(true);

    v.pause();
    v.src = src;
    v.preload = lowBandwidth ? 'metadata' : 'auto';
    v.load();

    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('playing', onPlaying);
    v.addEventListener('waiting', onWaiting);

    return () => {
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('playing', onPlaying);
      v.removeEventListener('waiting', onWaiting);
    };
  }, [src, inView, tryPlay, lowBandwidth]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <video
        ref={videoRef}
        className={`${className ?? ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        controls={false}
      />
      {inView && isLoading && !needsTap ? (
        <div className="pointer-events-none absolute inset-0 z-[20] flex items-center justify-center bg-black/25">
          <span className="h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-indigo-400" />
        </div>
      ) : null}
      {needsTap ? (
        <button
          type="button"
          onClick={tryPlay}
          className="absolute inset-0 z-[25] flex items-center justify-center bg-black/35 text-white backdrop-blur-[2px]"
          aria-label="Play video"
        >
          <span className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold shadow-lg">
            Tap to play
          </span>
        </button>
      ) : null}
    </div>
  );
}
