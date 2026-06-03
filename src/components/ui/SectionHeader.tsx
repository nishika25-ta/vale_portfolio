import { ScrollFloat } from '@/components/ScrollFloat';

type Accent = 'hero' | 'content';

type SectionHeaderProps = {
  number?: string;
  title: string;
  gradient?: string;
  description?: string;
  accent?: Accent;
  align?: 'left' | 'center';
  className?: string;
};

const accentMap: Record<Accent, { text: string; grad: string; rail: string }> = {
  hero: {
    text: 'text-content-primary/90',
    grad: 'from-content-primary to-content-secondary',
    rail: 'from-transparent via-content-primary/40 to-transparent',
  },
  content: {
    text: 'text-content-primary/90',
    grad: 'from-content-primary to-content-secondary',
    rail: 'from-transparent via-content-primary/40 to-transparent',
  },
};

export function SectionHeader({
  number,
  title,
  gradient,
  description,
  accent = 'content',
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const a = accentMap[accent];
  const alignText = align === 'center' ? 'text-center md:text-center' : 'text-center md:text-left';
  const alignJustify = align === 'center' ? 'justify-center' : 'justify-center md:justify-start';

  return (
    <header className={`mb-14 ${alignText} md:mb-16 ${className}`}>
      {number ? (
        <div className={`mb-5 flex items-center gap-3 ${alignJustify}`}>
          <span className={`font-mono text-[10px] font-bold tracking-[0.4em] ${a.text}`}>{number}</span>
          <span className={`h-px w-12 bg-gradient-to-r ${a.rail}`} aria-hidden />
        </div>
      ) : null}
      <h2 className="sr-only">{`${title}${gradient ? ` ${gradient}` : ''}`}</h2>
      <div className={`flex min-w-0 max-w-full flex-wrap items-baseline gap-x-2 ${alignJustify}`} aria-hidden>
        <ScrollFloat
          as="span"
          textClassName="text-4xl !font-extrabold !tracking-tight text-white md:text-5xl"
          containerClassName="inline-block max-w-full min-w-0"
          scrub={0.75}
        >
          {title}
        </ScrollFloat>
        {gradient ? (
          <ScrollFloat
            as="span"
            textClassName={`text-4xl !font-extrabold !tracking-tight bg-gradient-to-r ${a.grad} bg-clip-text text-transparent md:text-5xl`}
            containerClassName="inline-block max-w-full min-w-0"
            scrub={0.75}
          >
            {gradient}
          </ScrollFloat>
        ) : null}
      </div>
      {description ? (
        <ScrollFloat
          as="p"
          containerClassName={`mt-4 max-w-xl ${align === 'center' ? 'mx-auto' : 'md:mx-0 mx-auto'}`}
          textClassName="!font-normal !font-sans text-sm md:text-base text-slate-500"
          scrub={0.8}
          stagger={0.012}
        >
          {description}
        </ScrollFloat>
      ) : null}
    </header>
  );
}
