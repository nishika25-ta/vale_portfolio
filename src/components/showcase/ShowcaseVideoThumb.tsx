import { Play } from 'lucide-react';

type ShowcaseVideoThumbProps = {
  title: string;
  isActive?: boolean;
};

/**
 * Static demo thumb — no video decode (avoids mobile OOM / crashes).
 */
export function ShowcaseVideoThumb({ title, isActive }: ShowcaseVideoThumbProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#1c1c28] via-[#12121a] to-[#08080c]">
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isActive ? 'bg-indigo-500/15' : 'bg-transparent'
        }`}
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full border bg-black/50 backdrop-blur-sm transition-colors ${
            isActive ? 'border-indigo-400/60 text-indigo-200' : 'border-white/15 text-white/70'
          }`}
          aria-hidden
        >
          <Play className="h-3.5 w-3.5 fill-current" />
        </span>
      </div>
      <span className="absolute inset-x-1 bottom-1 truncate text-center font-mono text-[7px] font-bold uppercase tracking-[0.12em] text-white/40 sm:text-[8px]">
        {title}
      </span>
    </div>
  );
}
