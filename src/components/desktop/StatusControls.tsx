'use client';

import { useCallback, useEffect, useRef, useState, type PointerEvent } from 'react';
import { BatteryFull, Moon, Search, Sun, Wifi } from 'lucide-react';
import styles from './status.module.css';

type Battery = EventTarget & { level: number; charging: boolean };

export function StatusControls({ clock, onSearch, darkMode, onToggleTheme }: { clock: Date | null; onSearch: () => void; darkMode: boolean; onToggleTheme: () => void }) {
  const [online, setOnline] = useState(true);
  const [battery, setBattery] = useState<{ level: number; charging: boolean } | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const glideFrame = useRef<number | null>(null);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    let disposed = false;
    let cleanup = () => {};
    const browser = navigator as Navigator & { getBattery?: () => Promise<Battery> };
    browser.getBattery?.().then(source => {
      if (disposed) return;
      const sync = () => setBattery({ level: Math.round(source.level * 100), charging: source.charging });
      sync();
      source.addEventListener('levelchange', sync);
      source.addEventListener('chargingchange', sync);
      cleanup = () => { source.removeEventListener('levelchange', sync); source.removeEventListener('chargingchange', sync); };
    }).catch(() => { /* Some browsers restrict battery information. */ });
    return () => {
      disposed = true;
      cleanup();
      if (glideFrame.current !== null) cancelAnimationFrame(glideFrame.current);
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  const trackButton = useCallback((event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'touch') return;
    const bar = barRef.current;
    const button = event.currentTarget;
    if (!bar) return;
    const alreadyActive = bar.dataset.hover === 'true';
    if (!alreadyActive) {
      bar.dataset.glide = 'false';
    }
    bar.style.setProperty('--menu-pill-x', `${button.offsetLeft}px`);
    bar.style.setProperty('--menu-pill-w', `${button.offsetWidth}px`);
    bar.dataset.hover = 'true';
    if (!alreadyActive) {
      if (glideFrame.current !== null) cancelAnimationFrame(glideFrame.current);
      glideFrame.current = requestAnimationFrame(() => {
        bar.dataset.glide = 'true';
        glideFrame.current = null;
      });
    }
  }, []);

  const clearHover = useCallback(() => {
    const bar = barRef.current;
    if (!bar) return;
    if (glideFrame.current !== null) {
      cancelAnimationFrame(glideFrame.current);
      glideFrame.current = null;
    }
    bar.dataset.hover = 'false';
  }, []);

  const local = clock ? new Date(clock.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' })) : null;
  const day = local?.getDate();
  const days = local ? new Date(local.getFullYear(), local.getMonth() + 1, 0).getDate() : 0;
  const offset = local ? new Date(local.getFullYear(), local.getMonth(), 1).getDay() : 0;

  return <div ref={barRef} className={styles.controls} onPointerLeave={clearHover}>
    <span className={styles.hoverPill} aria-hidden="true" />
    <button onPointerEnter={trackButton} onClick={onSearch} aria-label="Search projects" title="Search projects (Ctrl/⌘ K)"><Search size={14} /></button>
    <button onPointerEnter={trackButton} popoverTarget="connection-status" aria-label="Connection status" title="Connection status"><Wifi size={14} style={{ opacity: online ? 1 : .4 }} /></button>
    <button onPointerEnter={trackButton} popoverTarget="battery-status" aria-label="Battery status" title="Battery status"><BatteryFull size={18} /></button>
    <button onPointerEnter={trackButton} popoverTarget="desktop-calendar" aria-label="Open date and calendar" className={styles.clock}><span>{local?.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) ?? 'Malaysia'}</span><b>{local?.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) ?? '––:––'}</b></button>
    <button onPointerEnter={trackButton} className={styles.themeToggle} onClick={onToggleTheme} aria-label="Dark mode" aria-pressed={darkMode} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}><Moon className={styles.moon} size={14} aria-hidden="true" /><Sun className={styles.sun} size={14} aria-hidden="true" /></button>
    <div id="connection-status" popover="auto" className={styles.panel}><h2>Connection</h2><strong><Wifi size={17} /> {online ? 'Browser is online' : 'You’re offline'}</strong><p>{online ? 'Your browser reports a network connection. Internet access may still depend on your network.' : 'Your browser reports no network connection. Loaded portfolio content is still available.'}</p><small>Wi-Fi settings are managed on your device.</small></div>
    <div id="battery-status" popover="auto" className={styles.panel}><h2>Battery</h2>{battery ? <><strong><BatteryFull size={19} /> {battery.level}% · {battery.charging ? 'Charging / connected to power' : 'On battery'}</strong><meter min="0" max="100" value={battery.level} aria-label="Battery charge" /></> : <p>Battery information isn’t available in this browser. Check your device’s battery indicator.</p>}</div>
    <div id="desktop-calendar" popover="auto" className={styles.panel}><h2>{local?.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) ?? 'Calendar'}</h2><p>Malaysia time · MYT (UTC+8)</p><div className={styles.calendar}>{['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((label, index) => <span key={`week-${index}`} className={styles.weekday}>{label}</span>)}{Array.from({ length: offset }, (_, index) => <span key={`empty-${index}`} />)}{Array.from({ length: days }, (_, index) => <span key={index} aria-current={index + 1 === day ? 'date' : undefined}>{index + 1}</span>)}</div></div>
  </div>;
}
