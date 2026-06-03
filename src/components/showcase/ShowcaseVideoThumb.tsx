import { Play } from 'lucide-react';

type ShowcaseVideoThumbProps = {
  title: string;
  videoUrl: string;
  isActive?: boolean;
};

/**
 * Video thumbnail — renders the first frame of the webm using
 * preload="metadata" (loads just the first frame, no full decode).
 */
export function ShowcaseVideoThumb({ title, videoUrl, isActive }: ShowcaseVideoThumbProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0d0d12]">
      {/* First-frame thumbnail via metadata preload */}
      <video
        src={videoUrl}
        preload="metadata"
        muted
        playsInline
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
        tabIndex={-1}
      />

      {/* Overlay tint when active */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          isActive ? 'bg-cyan-500/20' : 'bg-black/40'
        }`}
        aria-hidden
      />

      {/* Play icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full border bg-black/50 backdrop-blur-sm transition-colors ${
            isActive
              ? 'border-cyan-400/70 text-cyan-200'
              : 'border-white/20 text-white/80'
          }`}
          aria-hidden
        >
          <Play className="h-3.5 w-3.5 fill-current" />
        </span>
      </div>

      {/* Title label */}
      <span className="absolute inset-x-1 bottom-1 truncate text-center font-mono text-[7px] font-bold uppercase tracking-[0.12em] text-white/60 sm:text-[8px]">
        {title}
      </span>
    </div>
  );
}
