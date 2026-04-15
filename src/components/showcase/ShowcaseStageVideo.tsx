import { useCallback, useEffect, useRef, useState } from 'react';

type ShowcaseStageVideoProps = {
  src: string;
  className?: string;
};

/**
 * Main Live Showcase player. Mobile Safari often ignores autoplay until play() runs
 * after user interaction or visibility; we retry on canplay / intersection and offer tap-to-play.
 */
export function ShowcaseStageVideo({ src, className }: ShowcaseStageVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [needsTap, setNeedsTap] = useState(false);

  const tryPlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const p = v.play();
    if (p !== undefined) {
      p.then(() => setNeedsTap(false)).catch(() => setNeedsTap(true));
    }
  }, []);

  useEffect(() => {
    setNeedsTap(false);
    const v = videoRef.current;
    if (!v) return;
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');

    const onCanPlay = () => tryPlay();
    const onPlaying = () => setNeedsTap(false);

    v.addEventListener('canplay', onCanPlay);
    v.addEventListener('playing', onPlaying);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) tryPlay();
      },
      { threshold: 0.25, rootMargin: '0px' }
    );
    io.observe(v);

    tryPlay();

    return () => {
      v.removeEventListener('canplay', onCanPlay);
      v.removeEventListener('playing', onPlaying);
      io.disconnect();
    };
  }, [src, tryPlay]);

  const handleTapPlay = useCallback(() => {
    tryPlay();
  }, [tryPlay]);

  return (
    <>
      <video
        ref={videoRef}
        key={src}
        src={src}
        className={className}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        controls={false}
      />
      {needsTap ? (
        <button
          type="button"
          onClick={handleTapPlay}
          className="absolute inset-0 z-[25] flex items-center justify-center bg-black/35 text-white backdrop-blur-[2px] transition-opacity active:bg-black/45"
          aria-label="Play video"
        >
          <span className="rounded-full border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold shadow-lg">
            Tap to play
          </span>
        </button>
      ) : null}
    </>
  );
}
