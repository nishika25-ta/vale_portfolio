'use client';

import { useEffect, useState, type PointerEvent } from 'react';
import {
  BatteryFull,
  Moon,
  Search,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Wallpaper,
  Wifi,
} from 'lucide-react';
import { motion, useSpring } from 'motion/react';
import { musicTracks } from '@/data/music';
import { MusicPlayer, type MusicController } from './MusicPlayer';
import styles from './status.module.css';

type Battery = EventTarget & { level: number; charging: boolean };
const DOCK_SPRING = { stiffness: 361, damping: 24 };

export function StatusControls({
  clock,
  onSearch,
  darkMode,
  onToggleTheme,
  dockMotion,
  motionEnabled,
  onToggleMotion,
  wallpaperName,
  onCycleWallpaper,
  music,
}: {
  clock: Date | null;
  onSearch: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  dockMotion: boolean;
  motionEnabled: boolean;
  onToggleMotion: () => void;
  wallpaperName: string;
  onCycleWallpaper: () => void;
  music: MusicController;
}) {
  const [online, setOnline] = useState(true);
  const [battery, setBattery] = useState<{ level: number; charging: boolean } | null>(null);
  const spotlightAmount = useSpring(0, DOCK_SPRING);
  const spotlightPointer = useSpring(0, DOCK_SPRING);

  useEffect(() => {
    if (motionEnabled) return;
    spotlightAmount.jump(0);
    spotlightPointer.jump(0);
  }, [motionEnabled, spotlightAmount, spotlightPointer]);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    update();
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    let disposed = false;
    let cleanup = () => { };
    const browser = navigator as Navigator & { getBattery?: () => Promise<Battery> };
    browser
      .getBattery?.()
      .then((source) => {
        if (disposed) return;
        const sync = () => setBattery({ level: Math.round(source.level * 100), charging: source.charging });
        sync();
        source.addEventListener('levelchange', sync);
        source.addEventListener('chargingchange', sync);
        cleanup = () => {
          source.removeEventListener('levelchange', sync);
          source.removeEventListener('chargingchange', sync);
        };
      })
      .catch(() => {
        /* Battery API is optional across browsers. */
      });

    return () => {
      disposed = true;
      cleanup();
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  function moveSpotlight(event: PointerEvent<HTMLButtonElement>) {
    if (!motionEnabled || event.pointerType !== 'mouse' || window.innerWidth < 900) return;
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const offset = (event.clientX - left) / width * 2 - 1;
    spotlightPointer.set(Math.max(-1, Math.min(1, offset)));
    if (event.type !== 'pointermove') spotlightAmount.set(event.buttons === 1 ? 0.65 : 1);
  }

  function resetSpotlight() {
    spotlightAmount.set(0);
    spotlightPointer.set(0);
  }

  const local = clock ? new Date(clock.toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' })) : null;
  const day = local?.getDate();
  const days = local ? new Date(local.getFullYear(), local.getMonth() + 1, 0).getDate() : 0;
  const offset = local ? new Date(local.getFullYear(), local.getMonth(), 1).getDay() : 0;
  return (
    <>
      <button
        type="button"
        className={styles.spotlightBtn}
        onClick={onSearch}
        onPointerEnter={moveSpotlight}
        onPointerMove={moveSpotlight}
        onPointerDown={moveSpotlight}
        onPointerUp={moveSpotlight}
        onPointerLeave={resetSpotlight}
        onPointerCancel={resetSpotlight}
        aria-label="Open Spotlight search"
        aria-haspopup="dialog"
        title="Spotlight Search (Ctrl/⌘ K)"
      >
        <motion.span
          className={styles.spotlightSurface}
          style={{
            ['--spotlight-amount' as string]: spotlightAmount,
            ['--spotlight-pointer' as string]: spotlightPointer,
          }}
        >
          <Search size={15} aria-hidden="true" />
          <span className={styles.searchLabel}>Search ValeOS</span>
          <kbd className={styles.kbdHint}>Ctrl / ⌘ K</kbd>
        </motion.span>
      </button>

      <div className={styles.controls}>
        <button
          type="button"
          popoverTarget="control-center-panel"
          aria-label="Open Control Center"
          title={music.playing ? `Now playing ${musicTracks[music.track].title}` : 'Control Center'}
        >
          {music.playing ? (
            <span className={styles.miniEq} aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          ) : (
            <SlidersHorizontal size={15} aria-hidden="true" />
          )}
        </button>

        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
        </button>

        <button
          type="button"
          popoverTarget="desktop-calendar"
          aria-label="Open date and calendar"
          title="Malaysia time and calendar"
          className={styles.clock}
        >
          <span>{local?.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }) ?? 'MYT'}</span>
          <b>{local?.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) ?? '--:--'}</b>
        </button>
      </div>

      <div id="control-center-panel" popover="auto" className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2>Control Center</h2>
            <p className={styles.panelSub}>Quick OS controls and audio</p>
          </div>
        </div>

        <div className={styles.ccGrid}>
          <button type="button" className={styles.ccTile} aria-pressed={darkMode} onClick={onToggleTheme}>
            <span className={styles.ccIcon}>{darkMode ? <Moon size={15} /> : <Sun size={15} />}</span>
            <span>
              <strong>Appearance</strong>
              <small>{darkMode ? 'Dark glass' : 'Light glass'}</small>
            </span>
          </button>

          <button type="button" className={styles.ccTile} aria-pressed={dockMotion} onClick={onToggleMotion}>
            <span className={styles.ccIcon}>
              <Sparkles size={15} />
            </span>
            <span>
              <strong>Animations</strong>
              <small>{dockMotion ? 'Smooth' : 'Reduced'}</small>
            </span>
          </button>

          <button type="button" className={styles.ccTile} onClick={onCycleWallpaper}>
            <span className={styles.ccIcon}>
              <Wallpaper size={15} />
            </span>
            <span>
              <strong>Wallpaper</strong>
              <small>{wallpaperName}</small>
            </span>
          </button>

          <button type="button" className={styles.ccTile} onClick={onSearch}>
            <span className={styles.ccIcon}>
              <Search size={15} />
            </span>
            <span>
              <strong>Spotlight</strong>
              <small>Quick jump</small>
            </span>
          </button>
        </div>

        <div className={styles.ccStatusRow}>
          <span className={styles.ccStatusItem}>
            <Wifi size={14} style={{ opacity: online ? 1 : 0.4 }} />
            {online ? 'Online' : 'Offline'}
          </span>
          <span className={styles.ccStatusItem}>
            <BatteryFull size={15} />
            {battery ? `${battery.level}%${battery.charging ? ' charging' : ''}` : 'Malaysia (UTC+8)'}
          </span>
        </div>

        <div className={styles.ccMusicSlot}>
          <MusicPlayer controller={music} />
        </div>
      </div>

      <div id="desktop-calendar" popover="auto" className={styles.panel}>
        <h2>{local?.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) ?? 'Calendar'}</h2>
        <p className={styles.panelSub}>Malaysia time (MYT, UTC+8)</p>
        <div className={styles.calendar}>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((label, index) => (
            <span key={`week-${index}`} className={styles.weekday}>
              {label}
            </span>
          ))}
          {Array.from({ length: offset }, (_, index) => (
            <span key={`empty-${index}`} />
          ))}
          {Array.from({ length: days }, (_, index) => (
            <span key={index} aria-current={index + 1 === day ? 'date' : undefined}>
              {index + 1}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
