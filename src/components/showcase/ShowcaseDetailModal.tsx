import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import type { ShowcaseItem } from '../../types/portfolio';

type ShowcaseDetailModalProps = {
  open: boolean;
  project: ShowcaseItem | null;
  onClose: () => void;
};

export function ShowcaseDetailModal({ open, project, onClose }: ShowcaseDetailModalProps) {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    setSlide(0);
  }, [project?.id]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    html.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    window.lenis?.stop();

    return () => {
      html.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      window.lenis?.start();
    };
  }, [open]);

  const images = project?.images ?? [];

  const go = useCallback(
    (dir: -1 | 1) => {
      setSlide((s) => (images.length + s + dir) % images.length);
    },
    [images.length]
  );

  if (!open || !project) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="showcase-detail-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        className="relative z-10 flex max-h-[min(92vh,900px)] w-full max-w-4xl flex-col overflow-hidden overscroll-contain rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
        onWheel={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h2 id="showcase-detail-title" className="text-lg font-bold tracking-tight text-white md:text-xl">
            {project.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 p-2 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <div className="relative bg-black/40">
            <div className="flex flex-col items-center justify-center md:min-h-[280px]">
              <img
                src={images[slide]}
                alt={`${project.title} slide ${slide + 1}`}
                className="max-h-[min(50vh,480px)] w-full object-contain"
              />
            </div>
            {images.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur-md transition-all hover:bg-black/80"
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            ) : null}
          </div>

          <div className="flex justify-center gap-2 border-t border-white/5 px-4 py-3">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all ${
                  i === slide ? 'w-8 bg-indigo-500' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="space-y-6 px-6 pb-8 pt-4">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-400/90">
              {project.category}
            </p>
            <p className="text-sm leading-relaxed text-slate-400 md:text-base">{project.desc}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-indigo-500/30 bg-indigo-500/20 px-3 py-1 text-[10px] font-bold uppercase text-indigo-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
