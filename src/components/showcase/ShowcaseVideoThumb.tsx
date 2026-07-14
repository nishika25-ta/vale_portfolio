import Image from 'next/image';
import { Play } from 'lucide-react';

type ShowcaseVideoThumbProps = {
  title: string;
  posterUrl: string;
  isActive?: boolean;
  priority?: boolean;
};

/**
 * Static poster thumbnail — avoids loading multiple video decoders in the strip.
 */
export function ShowcaseVideoThumb({
  title,
  posterUrl,
  isActive,
  priority = false,
}: ShowcaseVideoThumbProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0d0d12]">
      <Image
        src={posterUrl}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
        className="object-cover"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        draggable={false}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isActive ? 'bg-cyan-500/20' : 'bg-black/40'
        }`}
        aria-hidden
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full border bg-black/50 transition-colors sm:backdrop-blur-sm ${
            isActive
              ? 'border-cyan-400/70 text-cyan-200'
              : 'border-white/20 text-white/80'
          }`}
          aria-hidden
        >
          <Play className="h-3.5 w-3.5 fill-current" />
        </span>
      </div>

      <span className="absolute inset-x-1 bottom-1 truncate text-center font-mono text-[7px] font-bold uppercase tracking-[0.12em] text-white/60 sm:text-[8px]">
        {title}
      </span>
    </div>
  );
}
