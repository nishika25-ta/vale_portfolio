import { ArrowUpRight, FileText, Github, Linkedin } from 'lucide-react';
import { RESUME_HREF, SOCIALS } from '@/data/profile';

type SocialLinksProps = {
  className?: string;
  includeResume?: boolean;
};

const LINK_CLASS =
  'inline-flex min-h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm font-semibold text-slate-200 transition-colors hover:border-content-primary/30 hover:bg-content-primary/[0.08] hover:text-white';

export function SocialLinks({ className = '', includeResume = true }: SocialLinksProps) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <a
        href={SOCIALS.linkedin.href}
        target="_blank"
        rel="me noopener noreferrer"
        className={LINK_CLASS}
      >
        <Linkedin className="h-4 w-4" aria-hidden />
        LinkedIn
        <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
      </a>
      <a
        href={SOCIALS.github.href}
        target="_blank"
        rel="me noopener noreferrer"
        className={LINK_CLASS}
      >
        <Github className="h-4 w-4" aria-hidden />
        GitHub
        <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
      </a>
      {includeResume ? (
        <a href={RESUME_HREF} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
          <FileText className="h-4 w-4" aria-hidden />
          Resume
          <ArrowUpRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
        </a>
      ) : null}
    </div>
  );
}
