import { useEffect, useMemo, useState } from 'react';
import { useCode } from './Code';
import { highlightTsx } from './highlightTsx';

export type CodeBlockProps = {
  cursor: boolean;
  writing: boolean;
  duration: number;
  delay: number;
};

export function CodeBlock({ cursor, writing, duration, delay }: CodeBlockProps) {
  const { code } = useCode();
  const [visible, setVisible] = useState(writing ? 0 : code.length);

  useEffect(() => {
    if (!writing) {
      setVisible(code.length);
      return;
    }
    setVisible(0);
    let cancelled = false;
    let raf = 0;
    const startAt = performance.now() + delay;
    const dur = Math.max(duration, 1);

    const tick = (now: number) => {
      if (cancelled) return;
      if (now < startAt) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (now - startAt) / dur);
      const next = Math.max(0, Math.floor(t * code.length));
      setVisible(next);
      if (next < code.length) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [writing, duration, delay, code]);

  const html = useMemo(() => highlightTsx(code), [code]);

  const showHighlight = !writing || visible >= code.length;
  const plainSlice = code.slice(0, visible);

  return (
    <div className="relative min-h-[200px] overflow-x-auto bg-[#05080a] px-4 py-4 font-['JetBrains_Mono',monospace] text-[11px] leading-relaxed sm:text-xs md:text-[13px] md:leading-[1.65]">
      <div className="code-ide-scanlines pointer-events-none absolute inset-0 opacity-[0.04]" />
      <pre className="code-ide-block relative z-[1] m-0 whitespace-pre p-0">
        {showHighlight ? (
          <code dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <code className="text-slate-300">
            {plainSlice}
            {cursor ? (
              <span className="ml-0.5 inline-block h-[1.1em] w-2 translate-y-0.5 animate-pulse bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
            ) : null}
          </code>
        )}
      </pre>
    </div>
  );
}
