'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight, Rocket, Play, Orbit } from 'lucide-react';
import { OrbitalPortal } from './OrbitalPortal';
import { CodingAstronaut, type Destination } from './AstroArt';

export function AstroStation({ destination, onLaunch, launching }: { destination: Destination; onLaunch: () => void; launching: boolean }) {
  const [waving, setWaving] = useState(false);
  const [zeroG, setZeroG] = useState(false);
  const [runState, setRunState] = useState<'idle' | 'running' | 'done'>('idle');
  useEffect(() => {
    if (runState !== 'running') return;
    const timer = setTimeout(() => setRunState('done'), 750);
    return () => clearTimeout(timer);
  }, [runState]);
  useEffect(() => {
    if (!waving) return;
    const timer = setTimeout(() => setWaving(false), 2200);
    return () => clearTimeout(timer);
  }, [waving]);
  return <div className={`astro-station ${waving ? 'is-waving' : ''} ${launching ? 'is-launching' : ''} ${zeroG ? 'is-zero-g' : ''} ${runState === 'running' ? 'is-compiling' : ''}`}>
    <OrbitalPortal /><div className="holo-platform" aria-hidden="true"><i /><i /><span /></div>
    <button className="zero-g-button" aria-label="Toggle zero gravity" aria-pressed={zeroG} onClick={() => setZeroG(!zeroG)}><Orbit size={13} /><span>{zeroG ? 'Gravity off' : 'Zero G'}</span></button><span className="floating-code code-tag" aria-hidden="true">{'</>'}</span>
    <div className="astronaut-figure"><CodingAstronaut /><button className="astro-highfive" onClick={() => setWaving(true)} aria-label="High five the coding astronaut" title="High five!" /><span className="astro-speech" role="status">{waving ? 'Hey, fellow explorer! ✦' : ''}</span></div>
    <div className="astro-console">
      <div className="console-toolbar"><span className="console-dots" aria-hidden="true"><i /><i /><i /></span><span>valentine.ts</span><button className="run-code" onClick={() => setRunState('running')} disabled={runState === 'running'} aria-label="Run code demo"><Play size={9} fill="currentColor" /> Run</button><span className="console-live"><i /> live</span></div>
      <div className="console-code" aria-hidden="true"><div><b>01</b><span className="syntax-purple">const</span> developer = {'{'}</div><div><b>02</b><span className="code-indent">name: <span className="syntax-mint">"Valentine"</span>,</span></div><div><b>03</b><span className="code-indent">craft: <span className="syntax-peach">"useful things"</span>,</span></div><div><b>04</b><span className="code-indent">curiosity: <span className="syntax-purple">Infinity</span></span></div><div><b>05</b>{'};'}</div><div className="console-launch-line"><b>06</b><span className="syntax-mint">explore</span>(<span className="syntax-peach">"{destination.id}"</span>);<i className="code-cursor" /></div></div>
      <div className="console-output" role="status"><span className="status-orb" /> {launching ? 'Opening a new world…' : runState === 'running' ? 'Building a little wonder…' : runState === 'done' ? '✓ Hello, universe. Build successful!' : zeroG ? 'Zero gravity. Infinite possibilities.' : 'All systems curious.'}<span className="typing-dots" aria-hidden="true"><i /><i /><i /></span></div>
      <button className="mission-launch" onClick={onLaunch} disabled={launching}><Rocket size={15} /><span>Explore {destination.title === 'TOOLBOX' ? 'toolbox' : destination.title.toLowerCase()}</span><ArrowUpRight size={15} /></button>
    </div>
    <div className="station-caption"><span /> HUMAN IN THE LOOP. WONDER IN THE CODE.</div>
  </div>;
}
