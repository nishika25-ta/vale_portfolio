'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { prefersSaveData, useIsMobile } from '@/hooks/useIsMobile';

type ShowcaseStageVideoProps = {
  src: string;
  poster: string;
  title: string;
  className?: string;
};

/**
 * Single Live Showcase player — one decoder, poster-first on mobile, no remount on clip change.
 */
export function ShowcaseStageVideo({ src, poster, title, className }: ShowcaseStageVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const isMobile = useIsMobile();
  const lowBandwidth = isMobile || prefersSaveData();

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || !inView) return;
    v.muted = true;
    v.defaultMuted = true;
    const p = v.play();
    if (p !== undefined) {
      p.then(() => {
        setNeedsTap(false);
        setIsPlaying(true);
      }).catch(() => setNeedsTap(true));
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
      setIsPlaying(false);
      setNeedsTap(false);
      return;
    }

    setIsLoading(true);
    setIsPlaying(false);
    setNeedsTap(lowBandwidth);

    const onCanPlay = () => {
      setIsLoading(false);
      if (!lowBandwidth) tryPlay();
    };
    const onPlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
      setNeedsTap(false);
    };
    const onPause = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);

    v.pause();
    v.src = src;
    v.poster = poster;
    v.preload = lowBandwidth ? 'none' : 'metadata';
    v.load();

    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('playing', onPlaying);
    v.addEventListener('pause', onPause);
    v.addEventListener('waiting', onWaiting);

    return () => {
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('playing', onPlaying);
      v.removeEventListener('pause', onPause);
      v.removeEventListener('waiting', onWaiting);
    };
  }, [src, poster, inView, tryPlay, lowBandwidth]);

  const showPoster = !isPlaying || isLoading;

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Image
        src={poster}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 896px"
        className={`object-cover transition-opacity duration-300 ${
          showPoster ? 'opacity-100' : 'opacity-0'
        }`}
        priority={inView}
        draggable={false}
      />

      <video
        ref={videoRef}
        poster={poster}
        className={`${className ?? ''} ${
          isPlaying && !isLoading ? 'opacity-100' : 'opacity-0'
        } transition-opacity duration-300`}
        autoPlay={!lowBandwidth}
        loop
        muted
        playsInline
        preload="none"
        disablePictureInPicture
        controls={false}
        aria-label={`${title} demo video`}
      />

      {inView && isLoading && !needsTap ? (
        <div className="pointer-events-none absolute inset-0 z-[20] flex items-center justify-center bg-black/20">
          <span className="h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-cyan-400" />
        </div>
      ) : null}

      {needsTap ? (
        <button
          type="button"
          onClick={tryPlay}
          className="absolute inset-0 z-[25] flex items-center justify-center bg-black/35 text-white sm:backdrop-blur-[2px]"
          aria-label={`Play ${title} demo`}
        >
          <span className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold shadow-lg">
            Tap to play
          </span>
        </button>
      ) : null}
    </div>
  );
}
