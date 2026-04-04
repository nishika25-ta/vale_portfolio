import { Check, Copy, FileCode2 } from 'lucide-react';
import { useCallback, useState, type ComponentType, type SVGProps } from 'react';
import { useCode } from './Code';

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

type CodeHeaderProps = {
  children: React.ReactNode;
  icon?: IconComponent;
  copyButton?: boolean;
};

export function CodeHeader({ children, icon: Icon, copyButton }: CodeHeaderProps) {
  const { code } = useCode();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  const FileIcon = Icon ?? FileCode2;

  return (
    <div className="flex items-center gap-3 border-b border-emerald-500/15 bg-[#0a0e14]/95 px-4 py-3 backdrop-blur-md">
      <div className="flex gap-1.5">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[0_0_8px_rgba(255,95,87,0.5)]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[0_0_8px_rgba(254,188,46,0.4)]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840] shadow-[0_0_8px_rgba(40,200,64,0.45)]" />
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <FileIcon className="h-4 w-4 shrink-0 text-cyan-400/90" aria-hidden />
        <span className="truncate font-mono text-[11px] font-medium tracking-wide text-slate-400">{children}</span>
      </div>
      {copyButton ? (
        <button
          type="button"
          onClick={handleCopy}
          className="flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400 transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      ) : null}
    </div>
  );
}
