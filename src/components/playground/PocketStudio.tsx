import { useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Code2, Cpu, FolderOpen, Heart, Sparkles } from 'lucide-react';

const modes = [
  { label: 'WORK', title: 'Ideas → reality.', subtitle: '11 builds. A few happy accidents.', destination: 'projects', icon: FolderOpen, code: 'SELECTED_WORK / 01' },
  { label: 'ABOUT', title: 'Hi, I’m Valentine.', subtitle: 'Human first. Engineer second.', destination: 'about', icon: Heart, code: 'THE_HUMAN / 02' },
  { label: 'STACK', title: 'Made to make.', subtitle: 'A few tools I think with.', destination: 'stack', icon: Code2, code: 'THE_TOOLBOX / 03' },
];

export function PocketStudio() {
  const [selected, setSelected] = useState(0);
  const current = modes[selected];
  const Icon = current.icon;
  const cycle = (direction: number) => setSelected((index) => (index + direction + modes.length) % modes.length);
  return <div className="studio-assembly"><div className="studio-unit" role="group" aria-label="Pocket Studio, interactive portfolio explorer"><div className="studio-top"><span><Sparkles size={14} /> POCKET STUDIO</span><span>VA—026</span></div><div className="studio-screen-frame"><div className="studio-screen"><div className="screen-status"><span><i /> SYSTEM READY</span><span>◧ ◧ ▰</span></div><div className="screen-content" aria-live="polite"><Icon className="screen-icon" strokeWidth={1.3} /><span className="screen-code">{current.code}</span><strong>{current.title}</strong><p>{current.subtitle}</p></div><div className="screen-bottom"><span>◉ {String(selected + 1).padStart(2, '0')} / 03</span><span>CHOOSE YOUR ADVENTURE ↗</span></div></div></div><div className="studio-mode-tabs" aria-label="Choose a studio mode">{modes.map((mode, index) => <button key={mode.label} onClick={() => setSelected(index)} aria-pressed={index === selected} className={index === selected ? 'selected' : ''}><i />{mode.label}</button>)}</div><div className="studio-controls"><div className="studio-direction"><button onClick={() => cycle(-1)} aria-label="Previous studio mode"><ArrowLeft size={19} /></button><span aria-hidden="true">+</span><button onClick={() => cycle(1)} aria-label="Next studio mode"><ArrowRight size={19} /></button></div><div className="studio-speaker" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <i key={i} />)}</div><a className="studio-open" href={`#${current.destination}`} aria-label={`Open ${current.label.toLowerCase()} section`}><ArrowUpRight size={25} /><span>OPEN</span></a></div><div className="studio-bottom"><span><Cpu size={12} /> POWERED BY CURIOSITY</span><span>PRESS SOMETHING <ArrowDown size={10} /></span></div><span className="studio-screw screw-one" aria-hidden="true" /><span className="studio-screw screw-two" aria-hidden="true" /></div><div className="studio-shadow" aria-hidden="true" /></div>;
}
