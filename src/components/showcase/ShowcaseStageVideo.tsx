import { useCallback, useEffect, useRef, useState } from 'react';

type ShowcaseStageVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

/**
 * Main Live Showcase player — defers .webm download until the stage is near the viewport.
 */
export function ShowcaseStageVideo({ src, poster, className }: ShowcaseStageVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
      { threshold: 0.12, rootMargin: '160px' }
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

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

    v.src = src;
    v.preload = 'auto';
    v.load();
    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('playing', onPlaying);

    return () => {
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('playing', onPlaying);
    };
  }, [src, inView, tryPlay]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      {poster && isLoading ? (
        <img src={poster} alt="" className={className} aria-hidden />
      ) : null}
      <video
        ref={videoRef}
        className={`${className ?? ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={poster}
        controls={false}
      />
      {inView && isLoading && !needsTap ? (
        <div className="pointer-events-none absolute inset-0 z-[20] flex items-center justify-center bg-black/20">
          <span className="h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-indigo-400" />
        </div>
      ) : null}
      {needsTap ? (
        <button
          type="button"
          onClick={tryPlay}
          className="absolute inset-0 z-[25] flex items-center justify-center bg-black/35 text-white backdrop-blur-[2px] transition-opacity active:bg-black/45"
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
