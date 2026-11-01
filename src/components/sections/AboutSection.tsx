'use client';

import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import { TerminalSquare } from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
import { RESUME_HREF, SITE_LOCATION, SITE_NAME, SITE_ROLE, SOCIALS } from '@/data/profile';

const PROFILE = [
  ['Role', SITE_ROLE],
  ['Location', SITE_LOCATION],
  ['Work', 'Hospital Miri · MySTEP'],
  ['Company', 'Scribear · Co-founder'],
  ['Languages', 'English, Bahasa Melayu'],
  ['Stack', 'TypeScript, Python, React, Next.js, FastAPI'],
  ['Tools', 'PostgreSQL, Docker, Kubernetes'],
];

const COMMANDS: Record<string, string> = {
  help: 'whoami   Profile summary\nskills   Technical toolkit\nlinks    Portfolio links\nclear    Clear command history',
  whoami: `${SITE_NAME} — ${SITE_ROLE}\n${SITE_LOCATION}\nHospital Miri · Co-founder of Scribear`,
  skills: 'Full-stack:     TypeScript, React, Next.js, FastAPI\nBackend:        Python, PostgreSQL\nInfrastructure: Docker, Kubernetes\nAI:             Computer vision, OCR, automation',
  links: `LinkedIn: ${SOCIALS.linkedin.href}\nGitHub:   ${SOCIALS.github.href}\nProjects: #projects\nRésumé:   ${RESUME_HREF}`,
};

function Prompt({ command }: { command?: string }) {
  return <span className="break-all"><span className="text-emerald-300">valentine@portfolio</span><span className="text-slate-500">:</span><span className="text-sky-300">~</span><span className="mr-2 text-slate-400">$</span>{command && <span className="text-slate-100">{command}</span>}</span>;
}

export function AboutSection() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string; output: string }[]>([]);

  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = input.trim();
    if (!command) return;
    if (command.toLowerCase() === 'clear') setHistory([]);
    else setHistory(current => [...current, {
      command,
      output: Object.prototype.hasOwnProperty.call(COMMANDS, command.toLowerCase()) ? COMMANDS[command.toLowerCase()] : `Command not found: ${command}. Type help for commands.`,
    }]);
    setInput('');
  }

  return (
    <section id="about" aria-labelledby="about-heading" className="section-border py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <header className="mb-7 flex items-center gap-5 sm:mb-9">
          <h2 id="about-heading" aria-label="About me" className="shrink-0 font-mono text-xl font-medium tracking-tight text-slate-100 sm:text-2xl">
            <span className="mr-1 text-emerald-300">~/</span>about<span className="ml-1 text-emerald-300" aria-hidden>_</span>
          </h2>
          <span className="h-px flex-1 bg-white/10" aria-hidden />
        </header>
        <ScrollRevealGroup animation="fade-up">
          <div className="overflow-hidden rounded-xl border border-white/15 bg-[#0d1110] shadow-[0_24px_80px_-35px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-3 border-b border-white/10 bg-[#191e1c] px-5 py-3.5 text-xs text-slate-400">
              <TerminalSquare className="h-4 w-4 text-emerald-300/80" aria-hidden />
              <span className="flex-1 font-mono">valentine@portfolio: ~/about</span>
              <span className="font-mono text-[10px] text-slate-500">bash</span>
            </div>

            <div className="space-y-8 p-5 font-mono text-xs leading-[1.8] sm:p-8 sm:text-sm lg:p-10">
              <div>
                <p><Prompt command="fastfetch" /></p>
                <div className="mt-6 grid gap-6 sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-10">
                  <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-md border border-white/10 bg-[#151b17] lg:w-[190px]">
                    <Image src="/hi.webp" alt="Valentine Agam" fill sizes="190px" className="object-cover object-[center_20%]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-base font-semibold text-emerald-300 sm:text-lg">{SITE_NAME}</p>
                    <div className="my-3 h-px max-w-lg bg-white/15" />
                    <dl className="space-y-1.5">
                      {PROFILE.map(([label, value]) => <div key={label} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3"><dt className="text-emerald-300/90">{label}</dt><dd className="break-words text-slate-300">{value}</dd></div>)}
                    </dl>
                  </div>
                </div>
              </div>

              <div>
                <p><Prompt command="cat about.txt" /></p>
                <p className="mt-3 max-w-5xl text-slate-400">I develop digital systems at Hospital Miri and build applications for clients as co-founder of Scribear. My work covers interfaces, APIs, databases, and deployment, across healthcare, recruitment, and geospatial analytics.</p>
              </div>

              <div>
                <p><Prompt command="ls links/" /></p>
                <div className="mt-3 flex flex-wrap gap-x-7 gap-y-3 text-sky-300 [&>a]:underline-offset-4 hover:[&>a]:underline">
                  <a href="#projects">projects/</a>
                  <a href={SOCIALS.linkedin.href} target="_blank" rel="me noopener noreferrer">linkedin/</a>
                  <a href={SOCIALS.github.href} target="_blank" rel="me noopener noreferrer">github/</a>
                  <a href={RESUME_HREF} target="_blank" rel="noopener noreferrer">resume.pdf</a>
                </div>
              </div>

              <div className="border-t border-white/10 pt-5">
                <div role="log" aria-live="polite" aria-label="Terminal command history" className="max-h-60 space-y-4 overflow-y-auto" data-lenis-prevent>
                  {history.map((entry, index) => <div key={index}><p><Prompt command={entry.command} /></p><pre className="mt-2 whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-slate-400 sm:text-sm">{entry.output}</pre></div>)}
                </div>
                <form onSubmit={runCommand} className="mt-4 flex flex-wrap items-center gap-y-2">
                  <label htmlFor="profile-command" className="shrink-0"><Prompt /><span className="sr-only">Terminal command</span></label>
                  <input id="profile-command" value={input} onChange={event => setInput(event.target.value)} placeholder="help" autoComplete="off" autoCapitalize="off" spellCheck={false} className="min-w-[100px] flex-1 border-0 bg-transparent px-1 py-2 font-mono text-base text-slate-100 caret-emerald-300 outline-none placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-emerald-300/40" />
                  <button type="submit" className="ml-2 rounded border border-white/10 px-3 py-2 text-xs text-slate-400 transition-colors hover:border-emerald-300/40 hover:text-emerald-200">Run ↵</button>
                </form>
              </div>
            </div>
          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
