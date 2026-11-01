'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronFirst, ChevronLast, Download, Github, Headphones, Linkedin, Pause, Play, Terminal, Volume2, VolumeX, X } from 'lucide-react';
import { CassetteArt, type TapeInfo } from './CassetteArt';
import { TapeDeck, MiniReels } from './TapeDeck';
import { FloatingScenery, PlayfulNotes } from './PlayfulScenery';
import { Dreamscape, MoonBuddy } from './Dreamscape';
import { ProjectDialog } from './ProjectDialog';
import { showcaseData } from '@/data/showcaseData';
import { workExperience } from '@/data/workExperience';
import { programmingSkills, fullStackSkills, aiSkills, designDataSkills } from '@/data/skills';
import { certificates } from '@/data/certificates';
import { RESUME_HREF, SOCIALS } from '@/data/profile';
import type { ShowcaseItem } from '@/types/portfolio';

const tapes: TapeInfo[] = [
  { id: 'works', title: 'WORKS', japanese: '作品', description: 'Things I’ve built', color: '#ed9665', accent: '#263f59', count: showcaseData.length },
  { id: 'experience', title: 'EXPERIENCE', japanese: '経験', description: 'Good work, good people', color: '#91cfa3', accent: '#438e88', count: workExperience.length },
  { id: 'about', title: 'ABOUT', japanese: '自己紹介', description: 'The person behind the code', color: '#f5d176', accent: '#e77e75', count: 3 },
  { id: 'stack', title: 'TOOLBOX', japanese: '技術', description: 'What I build with', color: '#7fc4d0', accent: '#246c7d', count: 4 },
  { id: 'education', title: 'EDUCATION', japanese: '学び', description: 'A foundation for curiosity', color: '#b9a0dd', accent: '#64508a', count: 1 },
  { id: 'certificates', title: 'CREDENTIALS', japanese: '資格', description: 'A few milestones along the way', color: '#ee9f96', accent: '#c6676e', count: certificates.length },
  { id: 'contact', title: 'CONTACT', japanese: '連絡', description: 'Good things start with hello', color: '#eda4c0', accent: '#c55a88', count: 3 },
];

const skillGroups = [
  { title: 'Languages & backend', skills: programmingSkills, note: 'From a useful script to a dependable API. Python and TypeScript are usually where I start.' },
  { title: 'Full-stack & infrastructure', skills: fullStackSkills, note: 'The interface, the services underneath, and everything it takes to keep them running.' },
  { title: 'AI & machine learning', skills: aiSkills, note: 'Practical intelligence: computer vision, explainability, language models, and automation.' },
  { title: 'Data & geospatial', skills: designDataSkills, note: 'Making sense of data, from relational models to the view from above.' },
];
const aboutTracks = ['Hello, I’m Valentine', 'What I like to build', 'A little closer to home'];
const contactTracks = ['Let’s connect', 'Follow the code', 'The formal introduction'];
const contactLinks = [SOCIALS.linkedin.href, SOCIALS.github.href, RESUME_HREF];
const contactIcons = [Linkedin, Github, Download];
const contactCopy = [
  'Have a project in mind, an interesting problem, or just want to say hello? Find me on LinkedIn. I’m always happy to talk about building useful things.',
  'A look at the code, experiments, and projects behind the portfolio. Follow along on GitHub.',
  'For the full picture: my experience, education, technical skills, and professional background. All in one résumé.',
];

function trackNames(id: string) {
  switch (id) {
    case 'works': return showcaseData.map((project) => project.title);
    case 'experience': return workExperience.map((job) => job.company);
    case 'about': return aboutTracks;
    case 'stack': return skillGroups.map((group) => group.title);
    case 'education': return ['Universiti Malaysia Sarawak'];
    case 'certificates': return certificates.map((certificate) => certificate.title);
    case 'contact': return contactTracks;
    default: return [];
  }
}



export default function CassettePortfolio() {
  const [view, setView] = useState('home');
  const [selected, setSelected] = useState(0);
  const [track, setTrack] = useState(0);
  const [calm, setCalm] = useState(false);
  const [motionOverride, setMotionOverride] = useState(false);
  const [sound, setSound] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [visited, setVisited] = useState<string[]>([]);
  const [overlay, setOverlay] = useState<'shortcuts' | 'stamps' | 'terminal' | null>(null);
  const [command, setCommand] = useState('');
  const [terminalLines, setTerminalLines] = useState(['VALETAPE OS / PERSONAL EDITION', 'Type help to see what’s inside.']);
  const [project, setProject] = useState<ShowcaseItem | null>(null);
  const [projectSlide, setProjectSlide] = useState(0);
  const [clock, setClock] = useState('SARAWAK · MYT');
  const [greeting, setGreeting] = useState('HELLO THERE');
  const [inserting, setInserting] = useState(false);
  const overlayRef = useRef<HTMLDialogElement>(null);
  const audio = useRef<AudioContext | null>(null);
  const insertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const activeTape = tapes.find((tape) => tape.id === view) ?? tapes[selected];
  const names = trackNames(activeTape.id);
  const currentTitle = names[track] ?? names[0];

  const tick = useCallback((enabled: boolean = sound, chime = false) => {
    if (!enabled) return;
    const context = audio.current ?? new AudioContext();
    audio.current = context;
    void context.resume();
    const notes = chime ? [660, 880, 1100] : [440];
    notes.forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const start = context.currentTime + index * 0.11;
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(chime ? 0.035 : 0.018, start + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.001, start + (chime ? 0.55 : 0.07));
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(start);
      oscillator.stop(start + (chime ? 0.6 : 0.09));
    });
  }, [sound]);

  const goHome = useCallback(() => {
    if (insertTimer.current) clearTimeout(insertTimer.current);
    setInserting(false);
    setPlaying(false);
    setView('home');
    window.location.hash = 'home';
    window.scrollTo({ top: 0 });
  }, []);

  const navigate = useCallback((id: string) => {
    const index = tapes.findIndex((tape) => tape.id === id);
    if (index < 0) return;
    setSelected(index);
    setTrack(0);
    setPlaying(false);
    setView(id);
    setVisited((old) => old.includes(id) ? old : [...old, id]);
    window.location.hash = id;
    window.scrollTo({ top: 0 });
  }, []);

  const insert = useCallback((index: number) => {
    if (insertTimer.current) clearTimeout(insertTimer.current);
    setSelected(index);
    setInserting(true);
    tick();
    insertTimer.current = setTimeout(() => {
      setInserting(false);
      navigate(tapes[index].id);
    }, calm || (!motionOverride && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ? 0 : 520);
  }, [calm, motionOverride, navigate, tick]);

  const nextTrack = useCallback((direction: number) => {
    setTrack((old) => (old + direction + names.length) % names.length);
    tick();
  }, [names.length, tick]);

  useEffect(() => {
    const readHash = () => {
      const hash = window.location.hash.slice(1);
      const id = hash === 'projects' ? 'works' : hash;
      const index = tapes.findIndex((tape) => tape.id === id);
      setPlaying(false);
      setTrack(0);
      if (index >= 0) {
        setView(id);
        setSelected(index);
        setVisited((old) => old.includes(id) ? old : [...old, id]);
      } else setView('home');
    };
    readHash();
    setCalm(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    window.addEventListener('hashchange', readHash);
    const updateClock = () => {
      const time = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kuala_Lumpur' }).format(new Date());
      const hour = Number(time.split(':')[0]);
      setClock('SARAWAK · ' + time + ' MYT');
      setGreeting(hour < 12 ? 'GOOD MORNING' : hour < 18 ? 'GOOD AFTERNOON' : 'GOOD EVENING');
    };
    updateClock();
    const timer = setInterval(updateClock, 60_000);
    return () => {
      window.removeEventListener('hashchange', readHash);
      clearInterval(timer);
      if (insertTimer.current) clearTimeout(insertTimer.current);
      void audio.current?.close();
    };
  }, []);

  useEffect(() => {
    if (view !== 'home') headingRef.current?.focus({ preventScroll: true });
  }, [view]);

  useEffect(() => {
    if (!playing || view === 'home' || project || overlay) return;
    const timer = setInterval(() => setTrack((old) => (old + 1) % names.length), 8000 / speed);
    return () => clearInterval(timer);
  }, [playing, view, names.length, speed, project, overlay]);

  useEffect(() => {
    const dialog = overlayRef.current;
    if (!overlay || !dialog) return;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [overlay]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('input,textarea,[contenteditable=true],dialog') || project || event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === '`') { event.preventDefault(); setOverlay('terminal'); return; }
      if (event.key === '?') { setOverlay('shortcuts'); return; }
      if (event.key === 'Escape') { goHome(); return; }
      if (view === 'home' && (event.key === 'ArrowLeft' || event.key === 'ArrowRight')) {
        event.preventDefault();
        const next = (selected + (event.key === 'ArrowLeft' ? -1 : 1) + tapes.length) % tapes.length;
        setSelected(next);
        document.querySelectorAll<HTMLButtonElement>('.orbit-tape')[next]?.focus({ preventScroll: true });
        tick();
      } else if (view === 'home' && event.key === 'Enter' && !target.closest('button,a')) {
        event.preventDefault();
        insert(selected);
      } else if (view !== 'home' && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
        event.preventDefault();
        nextTrack(event.key === 'ArrowUp' ? -1 : 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, selected, project, goHome, insert, nextTrack, tick]);

  const toggleSound = () => {
    setSound(!sound);
    tick(!sound, true);
  };

  const runCommand = (event: React.FormEvent) => {
    event.preventDefault();
    const input = command.trim().toLowerCase();
    setCommand('');
    if (input === 'clear') { setTerminalLines([]); return; }
    const aliases: Record<string, string> = { work: 'works', tools: 'stack', certs: 'certificates', hello: 'contact' };
    const destination = aliases[input] ?? input;
    if (tapes.some((tape) => tape.id === destination)) {
      setOverlay(null);
      navigate(destination);
    } else if (input === 'home' || input === 'eject') {
      setOverlay(null);
      goHome();
    } else {
      setTerminalLines((old) => [...old, '> ' + input, input === 'help' ? 'works · experience · about · stack · education · certificates · contact · home · clear' : 'Unknown command. Try help.']);
    }
  };

  const openProject = (item: ShowcaseItem, slide = 0) => { setProjectSlide(slide); setProject(item); };
  const ContactIcon = contactIcons[track] ?? Linkedin;

  return (
    <div className={`cassette-portfolio ${calm ? 'is-calm' : ''} ${motionOverride ? 'motion-on' : ''} ${view === 'home' ? 'home-view' : 'inside-view'}`}>
      <a className="skip-link" href="#tape-content" onClick={(event) => { event.preventDefault(); document.getElementById('tape-content')?.focus(); }}>Skip to content</a>
      <Dreamscape />
      <header className="cassette-header">
        <a className="cassette-wordmark" href="#home" onClick={goHome} aria-label="Valentine Agam, all tapes"><span className="brand-stamp">✳</span><strong>valentine.agam</strong></a>
        <div className="header-controls">
          <button onClick={() => { setMotionOverride(true); setCalm(!calm); }} aria-pressed={!calm} aria-label="Toggle animations">♪ <span>{calm ? 'Motion off' : 'Motion on'}</span></button>
          <button onClick={toggleSound} aria-pressed={sound} aria-label={sound ? 'Mute interface sounds' : 'Enable interface sounds'}>{sound ? <Volume2 size={13} /> : <VolumeX size={13} />}<span>{sound ? 'Sound on' : 'Sound off'}</span></button>
        </div>
        <span className="header-location">{clock}</span>
      </header>

      <button className="cosmic-chime" aria-label="Play a cosmic chime" onClick={() => tick(true, true)}>✧</button>
      <span className="side-writing" aria-hidden="true">MADE OF CURIOSITY <i /> SARAWAK · EARTH</span>

      {view === 'home' ? (
        <main className={`tape-home ${inserting ? 'is-inserting' : ''}`} id="tape-content" tabIndex={-1}>
          <article className="intro-note">
            <span className="intro-coordinate" aria-hidden="true">CREATIVE ORBIT / 001</span>
            <p className="note-greeting">✦ <span>{greeting}, EXPLORER</span></p>
            <h1>I’m Valentine.</h1>
            <h2>Curiosity, turned into code.</h2><p className="note-mobile-summary">Full-stack · Backend · AI / ML</p><MoonBuddy />
            <p className="note-bio">Software engineer in Sarawak. I build full-stack products, backend systems, and useful AI — with a little personality along the way.</p>
            <p className="note-location">⌁ {clock}</p>
            <div className="note-links"><button onClick={() => insert(0)}>See my work <ArrowRight size={14} /></button><button onClick={() => insert(3)}>My toolbox</button></div>
          </article>
          <div className="tape-orbit" aria-label="Portfolio tapes">
            {tapes.map((tape, index) => (
              <button key={tape.id} className={`orbit-tape tape-position-${index} ${index === selected ? 'is-selected' : ''} ${visited.includes(tape.id) ? 'is-visited' : ''}`} aria-label={`${tape.title}: ${tape.description}, ${tape.count} ${tape.count === 1 ? 'track' : 'tracks'}`} aria-pressed={index === selected} onFocus={() => { if (!inserting) setSelected(index); }} onMouseEnter={() => { if (!inserting) setSelected(index); }} onClick={() => insert(index)}>
                <CassetteArt tape={tape} /><span className="mobile-tape-caption">{tape.title === 'TOOLBOX' ? 'Toolbox' : tape.title.charAt(0) + tape.title.slice(1).toLowerCase()}</span>
                {visited.includes(tape.id) && <span className="tape-visited" aria-hidden="true">✓</span>}
              </button>
            ))}
          </div>

          <div className="home-deck"><PlayfulNotes />
            <TapeDeck tape={tapes[selected]} loaded={inserting} sound={sound} onSound={toggleSound} onPrevious={() => { setSelected((selected + tapes.length - 1) % tapes.length); tick(); }} onNext={() => { setSelected((selected + 1) % tapes.length); tick(); }} onPlay={() => insert(selected)} onStop={() => { if (insertTimer.current) clearTimeout(insertTimer.current); setInserting(false); setSelected(0); tick(); }} />
          </div>


          <div className="home-hint"><span>✦</span><span className="hint-long">Every tape is a little world. Pick your orbit.</span><span className="hint-short">Pick a tape. Find your next rabbit hole ↗</span></div><FloatingScenery />
          
        </main>
      ) : (
        <main className="tape-content" id="tape-content" tabIndex={-1}>
          <div className="tape-page-heading">
            <button className="all-tapes-button" onClick={goHome}><ArrowLeft size={14} /> All tapes</button>
            <span className="heading-mini-tape"><CassetteArt tape={activeTape} compact /></span>
            <h1 ref={headingRef} tabIndex={-1}><span>{activeTape.japanese}</span>{activeTape.title === 'TOOLBOX' ? 'Toolbox' : activeTape.title.charAt(0) + activeTape.title.slice(1).toLowerCase()}</h1>
            <p>{activeTape.description.toUpperCase()} · {activeTape.count} {activeTape.count === 1 ? 'TRACK' : 'TRACKS'}</p>
          </div>
          <div className="track-layout">
            <aside className="track-sidebar" aria-label={activeTape.title.toLowerCase() + ' tracks'}>
              <p><span>A面</span> SIDE A / THE COLLECTION</p>
              {names.map((name, index) => <button key={name} onClick={() => { setTrack(index); tick(); }} aria-current={track === index ? 'true' : undefined} className={track === index ? 'current-track' : ''}><span>{String(index + 1).padStart(2, '0')}</span><strong>{name}</strong><i>{track === index ? '▶' : '↗'}</i></button>)}
              <div className="sidebar-note"><Headphones size={18} /><p>A little collection of<br />the things I do.</p><span>RECORDED IN SARAWAK</span></div>
            </aside>
            <article className="track-article" key={view + track}>
              <p className="track-eyebrow"><span>{activeTape.japanese}　 A面　 第{String(track + 1).padStart(2, '0')}曲</span>{activeTape.title} · SIDE A · TRACK {String(track + 1).padStart(2, '0')}</p>

              {view === 'works' && (() => {
                const item = showcaseData[track];
                const mainImage = item.folder === 'DarkLace' ? item.images[1] : item.images[0];
                return <><h2 className="track-title">{item.title}</h2><p className="track-subtitle">{item.category} <span className="small-stamp">BUILT WITH CURIOSITY</span></p><div className="track-story-grid"><div className="track-story"><p>{item.desc}</p><dl className="track-facts"><div><dt>BUILT WITH</dt><dd>{item.tags.join(', ')}</dd></div><div><dt>THE COLLECTION</dt><dd>Project {track + 1} of {showcaseData.length} · {item.images.length} screenshots</dd></div></dl><button className="ink-button" onClick={() => openProject(item)}>Explore screenshots <ArrowUpRight size={14} /></button><button className="next-text" onClick={() => nextTrack(1)}>Next: {names[(track + 1) % names.length]} <ArrowRight size={13} /></button></div><div className="project-scrapbook"><button className="photo-print main-print" onClick={() => openProject(item, item.folder === 'DarkLace' ? 1 : 0)} aria-label={`Open ${item.title} screenshots`}><span className="paper-tape" /><img src={mainImage} alt={item.title + ' interface'} /><span>{item.title} / a closer look ↗</span></button><div className="print-thumbnails">{item.images.slice(0, 3).map((image, index) => <button className="photo-print" key={image} onClick={() => openProject(item, index)} aria-label={`Open ${item.title} screenshot gallery, image ${index + 1}`}><img src={image} alt={item.title + ' screenshot ' + (index + 1)} /><span>Snapshot {index + 1}</span></button>)}</div></div></div></>;
              })()}

              {view === 'experience' && (() => {
                const job = workExperience[track];
                return <><h2 className="track-title">{job.company}</h2><p className="track-subtitle">{job.roles[0].title}</p><div className="track-story-grid"><div className="track-story"><p className="date-sticker">{job.dateRange} · {job.location}</p>{job.roles[0].highlights.map((line) => <p key={line}>{line}</p>)}<div className="skill-tags">{job.stack?.map((skill) => <span key={skill}>{skill}</span>)}</div></div><div className="experience-postcard photo-print"><span className="paper-tape" />{job.logoSrc ? <img src={job.logoSrc} alt={job.company + ' logo'} /> : <Headphones size={90} />}<strong>{job.company}</strong><span>Good work. Good people. / {job.location}</span></div></div></>;
              })()}

              {view === 'about' && <><h2 className="track-title">{aboutTracks[track]}</h2><p className="track-subtitle">Software engineer. Curious by nature.</p><div className="track-story-grid"><div className="track-story">{track === 0 ? <><p>I’m Valentine Agam, a software engineer and product builder based in Sarawak, Malaysia. I like figuring out how things work, then making them work a little better.</p><p>My work spans full-stack applications, backend services, enterprise workflows, and applied AI/ML systems.</p><p>Right now, I’m building digital systems at Hospital Miri and creating client products as co-founder of Scribear.</p></> : track === 1 ? <><p>I turn operational problems into software people can actually use. That might mean a hospital onboarding workflow, an AI-assisted recruitment system, or computer vision for aerial imagery.</p><p>I enjoy the whole journey: understanding a problem, designing the data, building the interface, and getting the product into people’s hands.</p></> : <><p>Sarawak, Malaysia is home. My work has taken me across healthcare, recruitment, geospatial analytics, and client-facing products — often alongside teams right here in Miri.</p><p>I work in English and Bahasa Melayu. My background in Cognitive Science keeps me interested in both the systems we build and the people who use them.</p></>}<a className="ink-button" href={RESUME_HREF} target="_blank" rel="noreferrer">Read my résumé <Download size={14} /></a></div><div className="portrait-print photo-print"><span className="paper-tape" /><img src="/hi.webp" alt="Valentine Agam" /><span>Valentine Agam / made in Sarawak ☀</span></div></div></>}

              {view === 'stack' && <><h2 className="track-title">{skillGroups[track].title}</h2><p className="track-subtitle">A few tools I think with.</p><div className="track-story-grid"><div className="track-story"><p>{skillGroups[track].note}</p><p>I choose the tools around the problem, with an emphasis on maintainable systems, practical results, and a good experience for the people using them.</p><div className="tool-stickers">{skillGroups[track].skills.map((skill, index) => <span key={skill} className={'sticker-color-' + index % 4}>{skill}</span>)}</div></div><div className="code-postcard"><div><i /><i /><i /><span>valentine@toolbox:~</span></div><pre><span>$ whoami</span>{'\n'}valentine agam{'\n\n'}<span>$ cat approach.txt</span>{'\n'}stay curious{'\n'}build useful things{'\n'}make them work well{'\n'}keep learning<span className="terminal-cursor">▊</span></pre><p>SMALL TOOLS. BIG POSSIBILITIES.</p></div></div></>}

              {view === 'education' && <><h2 className="track-title">A curious mind,<br />a solid foundation.</h2><p className="track-subtitle">Universiti Malaysia Sarawak · 2025</p><div className="track-story-grid"><div className="track-story"><h3>Bachelor of Science in Cognitive Science</h3><p>Minor in Computer Science (AI/ML).</p><p>Interdisciplinary training across cognition, software, and applied intelligence — a foundation for building systems that people can actually operate.</p><dl className="track-facts"><div><dt>RECOGNITION</dt><dd>Dean’s List · Year 3 Semester 2</dd></div><div><dt>COURSEWORK</dt><dd>Artificial Intelligence, Data Analysis, Statistics, Software Development, Web Development</dd></div></dl></div><a className="photo-print certificate-print" href="/certs/Unimas.webp" target="_blank" rel="noreferrer"><span className="paper-tape" /><img src="/certs/Unimas.webp" alt="UNIMAS degree certificate" /><span>The foundation / UNIMAS ↗</span></a></div></>}

              {view === 'certificates' && <><h2 className="track-title">{certificates[track].title}</h2><p className="track-subtitle">{certificates[track].issuer}</p><div className="track-story-grid"><div className="track-story"><p>{certificates[track].subtitle}</p><p>One of the milestones along the way. There’s always something new to learn, and another idea to put into practice.</p><a className="ink-button" href={certificates[track].imageSrc} target="_blank" rel="noreferrer">View credential <ArrowUpRight size={14} /></a></div><a className="photo-print certificate-print" href={certificates[track].imageSrc} target="_blank" rel="noreferrer"><span className="paper-tape" /><img src={certificates[track].imageSrc} alt={certificates[track].imageAlt} /><span>{certificates[track].title} ↗</span></a></div></>}

              {view === 'contact' && <><h2 className="track-title">{contactTracks[track]}</h2><p className="track-subtitle">Good things start with a hello.</p><div className="track-story-grid"><div className="track-story"><p>{contactCopy[track]}</p><p>Based in Sarawak, Malaysia. Building things for the real world.</p><a className="ink-button" href={contactLinks[track]} target="_blank" rel="noreferrer"><ContactIcon size={16} />{track === 0 ? 'Say hello on LinkedIn' : track === 1 ? 'Find me on GitHub' : 'Open my résumé'}<ArrowUpRight size={14} /></a><div className="contact-socials"><a href={SOCIALS.github.href} target="_blank" rel="noreferrer">GitHub ↗</a><a href={SOCIALS.linkedin.href} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={RESUME_HREF} target="_blank" rel="noreferrer">Résumé ↗</a></div></div><div className="hello-postcard"><span className="paper-tape" /><ContactIcon strokeWidth={1.3} /><strong>{track === 0 ? 'hello, world.' : track === 1 ? 'made of code.' : 'nice to meet you.'}</strong><p>FROM SARAWAK, WITH CURIOSITY.</p><span>VA / 2026</span></div></div></>}
            </article>
          </div>
          
        </main>
      )}

      {view === 'home' ? <div className="home-bottom-bar"><div className="keyboard-guide"><kbd>← →</kbd> Choose <kbd>Enter</kbd> Put it in</div><div className="bottom-buttons"><button onClick={() => setOverlay('terminal')}><Terminal size={12} /><span>Terminal</span></button><button onClick={() => setOverlay('shortcuts')}>? <span>Shortcuts</span></button><button className="stamp-button" onClick={() => setOverlay('stamps')}>印 <span>Stamps {visited.length}/7</span></button></div></div> : <div className="now-playing"><MiniReels playing={playing} /><div className="now-playing-copy"><span>IN THE DECK · {activeTape.title} · SIDE A</span><strong>{String(track + 1).padStart(2, '0')} {currentTitle}</strong><div className="track-progress" key={view + track + speed}><i style={{ animationDuration: 8000 / speed + 'ms', animationPlayState: playing && !project && !overlay ? 'running' : 'paused' }} /></div></div><div className="playback-buttons"><button onClick={() => nextTrack(-1)} aria-label="Previous track"><ChevronFirst size={18} /></button><button onClick={() => setPlaying(!playing)} aria-label={playing ? 'Pause automatic track browsing' : 'Automatically browse tracks'} aria-pressed={playing}>{playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</button><button onClick={() => nextTrack(1)} aria-label="Next track"><ChevronLast size={18} /></button><button onClick={goHome} aria-label="Eject tape and return home"><span className="eject-icon">⏏</span></button><button onClick={() => setSpeed(speed === 1 ? 2 : 1)} aria-label="Change automatic browsing speed">{speed}×</button></div><div className="player-shortcuts"><kbd>↑ ↓</kbd> Track <button onClick={goHome}><kbd>Esc</kbd> Tapes</button><button onClick={() => setOverlay('terminal')}><Terminal size={13} /> Terminal</button></div></div>}

      <ProjectDialog project={project} initialSlide={projectSlide} onClose={() => setProject(null)} />
      {overlay && <dialog ref={overlayRef} className={'utility-dialog ' + (overlay === 'terminal' ? 'terminal-dialog' : '')} aria-labelledby="utility-title" onCancel={(event) => { event.preventDefault(); setOverlay(null); }} onClick={(event) => { if (event.target === event.currentTarget) setOverlay(null); }}><div className="utility-heading"><h2 id="utility-title">{overlay === 'terminal' ? 'valentine@valetape:~' : overlay === 'stamps' ? 'Your little collection' : 'A few handy shortcuts'}</h2><button aria-label="Close window" onClick={() => setOverlay(null)}><X size={18} /></button></div>{overlay === 'terminal' ? <div className="terminal-body"><div className="terminal-output" role="log">{terminalLines.map((line, index) => <p key={index}>{line}</p>)}</div><form onSubmit={runCommand}><label htmlFor="terminal-command">❯</label><input id="terminal-command" value={command} onChange={(event) => setCommand(event.target.value)} autoFocus autoComplete="off" spellCheck={false} aria-label="Terminal command" /></form></div> : overlay === 'stamps' ? <><p className="utility-intro">Explore a tape to collect its stamp. {visited.length} of 7 discovered.</p><div className="stamp-collection">{tapes.map((tape, index) => <button key={tape.id} className={visited.includes(tape.id) ? 'collected' : ''} onClick={() => { setOverlay(null); insert(index); }}><span>{tape.japanese}</span><strong>{tape.title}</strong><small>{visited.includes(tape.id) ? 'DISCOVERED ✓' : 'KEEP EXPLORING'}</small></button>)}</div></> : <div className="shortcuts-list">{[['← / →', 'Choose a tape on the home screen'], ['Enter', 'Insert the selected tape'], ['↑ / ↓', 'Browse the tracks in a tape'], ['Esc', 'Eject the tape / close a window'], ['`', 'Open the little terminal'], ['?', 'See these shortcuts']].map(([key, text]) => <p key={key}><kbd>{key}</kbd><span>{text}</span></p>)}</div>}</dialog>}
    </div>
  );
}
