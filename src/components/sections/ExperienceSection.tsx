'use client';

import { useRef, useState, type FormEvent } from 'react';
import { ChevronRight, Folder, TerminalSquare } from 'lucide-react';
import { ScrollRevealGroup } from '@/components/ScrollRevealGroup';
import { workExperience } from '@/data/workExperience';

export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('Type help for commands.');
  const panelRef = useRef<HTMLElement>(null);
  const job = workExperience[activeIndex];

  function selectRole(index: number) {
    setActiveIndex(index);
    setOutput(`Opened ${workExperience[index].id}`);
    panelRef.current?.scrollTo({ top: 0 });
  }

  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    if (command === 'clear') setOutput('');
    else if (command === 'help') setOutput('ls                List roles\nopen <role-id>    Open a role\nnext / prev      Switch roles\nclear            Clear console output');
    else if (command === 'ls') setOutput(workExperience.map(item => item.id).join('\n'));
    else if (command === 'next' || command === 'prev') {
      const next = (activeIndex + (command === 'next' ? 1 : -1) + workExperience.length) % workExperience.length;
      selectRole(next);
    } else if (command.startsWith('open ')) {
      const id = command.slice(5).trim();
      const index = workExperience.findIndex(item => item.id === id);
      if (index < 0) setOutput(`Role not found: ${id}. Run ls to list roles.`);
      else selectRole(index);
    } else setOutput(`Command not found: ${input.trim()}. Type help for commands.`);
    setInput('');
  }

  return (
    <section id="experience" aria-labelledby="experience-heading" className="section-border py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-10">
        <header className="mb-7 flex items-center gap-5 sm:mb-9">
          <h2 id="experience-heading" aria-label="Working experience" className="shrink-0 font-mono text-xl font-medium tracking-tight text-slate-100 sm:text-2xl"><span className="mr-1 text-emerald-300">~/</span>experience<span className="ml-1 text-emerald-300" aria-hidden>_</span></h2>
          <span className="h-px flex-1 bg-white/10" aria-hidden />
        </header>

        <ScrollRevealGroup animation="fade-up">
          <div>
            <div className="relative overflow-hidden rounded-[1.25rem] border border-white/20 bg-gradient-to-br from-white/[0.12] via-white/[0.025] to-white/[0.07] p-2 shadow-[0_30px_100px_-35px_rgba(60,110,95,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-xl sm:rounded-[1.75rem] sm:p-3 lg:p-4">
              <div className="pointer-events-none absolute -right-28 -top-40 h-[150%] w-64 rotate-[28deg] bg-gradient-to-r from-transparent via-white/[0.035] to-transparent" aria-hidden />
              <div className="relative overflow-hidden rounded-xl border border-black/70 bg-[#0b100e]/95 font-mono shadow-[0_0_0_1px_rgba(255,255,255,0.05)]">
                <div className="flex items-center gap-3 border-b border-white/10 bg-[#1b211e]/85 px-4 py-3 text-[10px] text-slate-400 sm:px-5 sm:text-xs">
                  <TerminalSquare className="h-4 w-4 shrink-0 text-emerald-300/80" aria-hidden />
                  <span className="min-w-0 flex-1 truncate">valentine@portfolio: ~/experience</span>
                  <span className="text-[10px] text-slate-500">bash</span>
                </div>

                <div className="grid lg:grid-cols-[240px_minmax(0,1fr)]">
                  <nav aria-label="Experience roles" className="min-w-0 border-b border-white/10 bg-black/20 p-3 lg:border-b-0 lg:border-r lg:p-4">
                    <p className="mb-3 flex items-center gap-2 px-2 text-[10px] text-slate-500"><Folder className="h-3.5 w-3.5" aria-hidden /> roles/</p>
                    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-1">
                      {workExperience.map((item, index) => (
                        <button key={item.id} type="button" onClick={() => selectRole(index)} aria-pressed={index === activeIndex} className={`flex min-h-11 items-center gap-2 rounded-md border px-3 py-2.5 text-left text-[11px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-300 ${index === activeIndex ? 'border-emerald-300/20 bg-emerald-300/[0.07] text-emerald-200' : 'border-transparent text-slate-500 hover:bg-white/[0.04] hover:text-slate-200'}`}>
                          <ChevronRight className="h-3 w-3 shrink-0" aria-hidden /><span className="break-all">{item.id}</span>
                        </button>
                      ))}
                    </div>
                  </nav>

                  <article ref={panelRef} aria-label="Selected experience" aria-live="polite" className="max-h-[620px] min-h-[470px] min-w-0 overflow-y-auto p-5 sm:p-7 lg:p-9" data-lenis-prevent>
                    <p className="mb-6 break-all text-xs leading-relaxed text-slate-300"><span className="text-emerald-300">valentine@portfolio</span><span className="text-slate-500">:</span><span className="text-sky-300">~/experience</span><span className="mx-2 text-slate-500">$</span>cat roles/{job.id}</p>
                    <header className="border-b border-white/10 pb-5">
                      <p className="mb-3 text-[10px] text-emerald-300/80">{job.dateRange}</p>
                      <h3 className="text-lg font-semibold leading-snug tracking-tight text-slate-100 sm:text-xl">{job.company}</h3>
                      <p className="mt-2 text-xs text-slate-500">{job.location}</p>
                    </header>
                    {job.roles.map(role => (
                      <div key={role.title} className="mt-6">
                        <h4 className="text-sm font-medium leading-relaxed text-sky-200">{role.title}</h4>
                        {role.dateRange && <p className="mt-1 text-xs text-slate-500">{role.dateRange}</p>}
                        <ul className="mt-5 space-y-4 text-xs leading-[1.9] text-slate-400 sm:text-[13px]">
                          {role.highlights.map(line => <li key={line} className="flex gap-3"><span className="shrink-0 text-emerald-300/70" aria-hidden>—</span><span>{line}</span></li>)}
                        </ul>
                      </div>
                    ))}
                    {job.stack?.length ? <p className="mt-7 border-t border-white/10 pt-5 text-[10px] leading-relaxed text-slate-500"><span className="mr-3 text-emerald-300/70">stack:</span>{job.stack.join(' / ')}</p> : null}
                  </article>
                </div>

                <div className="border-t border-white/10 bg-black/20 px-4 py-4 sm:px-5">
                  <pre role="log" aria-live="polite" aria-label="Experience terminal output" className="mb-2 max-h-28 overflow-y-auto whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-slate-500" data-lenis-prevent>{output}</pre>
                  <form onSubmit={runCommand} className="flex flex-wrap items-center gap-y-2">
                    <label htmlFor="experience-command" className="mr-2 text-xs text-emerald-300">valentine@portfolio<span className="text-slate-500">:~$</span><span className="sr-only">Experience terminal command</span></label>
                    <input id="experience-command" value={input} onChange={event => setInput(event.target.value)} placeholder="help" autoComplete="off" autoCapitalize="off" spellCheck={false} className="min-w-[100px] flex-1 bg-transparent px-1 py-2 font-mono text-base text-slate-200 caret-emerald-300 outline-none placeholder:text-slate-600 focus-visible:ring-1 focus-visible:ring-emerald-300/40" />
                    <button type="submit" className="ml-2 rounded border border-white/10 px-3 py-2 text-xs text-slate-400 hover:border-emerald-300/40 hover:text-emerald-200">Run ↵</button>
                  </form>
                </div>
              </div>
              <div className="relative flex items-center justify-center px-4 pb-0.5 pt-2.5 sm:pt-3" aria-hidden><span className="font-mono text-[8px] tracking-[0.25em] text-slate-500">VALENTINE</span><span className="absolute right-4 h-1 w-1 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.5)]" /></div>
            </div>
            <div aria-hidden className="mx-auto h-9 w-32 border-x border-white/10 bg-gradient-to-r from-[#161b19] via-[#303a34] to-[#161b19] sm:h-12 sm:w-40" style={{ clipPath: 'polygon(20% 0,80% 0,100% 100%,0 100%)' }} />
            <div aria-hidden className="mx-auto h-2 w-56 rounded-t-full border-t border-white/20 bg-gradient-to-b from-[#424c46] to-[#141916] shadow-[0_14px_35px_rgba(0,0,0,0.8)] sm:w-72" />
          </div>
        </ScrollRevealGroup>
      </div>
    </section>
  );
}
