'use client';

import { ArrowUp, ArrowUpRight, FileText, Github, Linkedin } from 'lucide-react';
import { RESUME_HREF, SITE_LOCATION, SITE_NAME, SOCIALS } from '@/data/profile';
import { scrollToSection } from '@/utils/navigation';

const CONNECTIONS = [
  { href: SOCIALS.linkedin.href, icon: Linkedin, label: 'LinkedIn', detail: 'Start a conversation' },
  { href: SOCIALS.github.href, icon: Github, label: 'GitHub', detail: 'Code & projects' },
  { href: RESUME_HREF, icon: FileText, label: 'Résumé', detail: 'Download PDF' },
];

export function ContactFooter() {
  return (
    <footer id="contact" aria-labelledby="contact-title" className="border-t border-white/10 bg-[#080a0b] pb-32 pt-20 sm:pt-24 lg:pt-28">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div>
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">Contact</p>
            <h2 id="contact-title" className="text-[clamp(2.75rem,5vw,5rem)] font-semibold leading-[1.05] tracking-[-0.055em] text-white">Get in touch<span className="text-content-primary">.</span></h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400 sm:text-base">
              For roles and project enquiries, connect with me on LinkedIn.
            </p>
          </div>

          <div className="border-t border-white/10">
            {CONNECTIONS.map(({ href, icon: Icon, label, detail }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel={label === 'Résumé' ? 'noopener noreferrer' : 'me noopener noreferrer'}
                className="group flex min-h-24 items-center gap-4 border-b border-white/10 py-5 transition-colors hover:bg-white/[0.025] focus-visible:outline focus-visible:outline-2 focus-visible:outline-content-primary sm:gap-5"
              >
                <Icon className="h-5 w-5 shrink-0 text-slate-500 transition-colors group-hover:text-content-primary" strokeWidth={1.5} aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-medium tracking-tight text-slate-100 sm:text-xl">{label}</span>
                  <span className="mt-1 block text-xs text-slate-500">{detail}</span>
                </span>
                <ArrowUpRight className="mr-1 h-5 w-5 shrink-0 text-slate-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-5 border-t border-white/10 pt-7 text-xs text-slate-500 lg:mt-20">
          <p>© {new Date().getFullYear()} {SITE_NAME}</p>
          <p>{SITE_LOCATION}</p>
          <button type="button" onClick={() => scrollToSection('home')} className="inline-flex min-h-11 items-center gap-3 text-slate-300 transition-colors hover:text-white">
            Back to top <ArrowUp className="h-4 w-4" aria-hidden />
          </button>
        </div>
      </div>
    </footer>
  );
}
