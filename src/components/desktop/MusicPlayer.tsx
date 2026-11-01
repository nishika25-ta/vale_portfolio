'use client';

import { memo, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { AudioLines, Check, ChevronLeft, ChevronRight, ListMusic, Pause, Play } from 'lucide-react';
import { musicTracks } from '@/data/music';
import mac from './workspace.module.css';
import styles from './music.module.css';

function formatTime(seconds: number) {
  const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
}

export const MusicPlayer = memo(function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const selected = useRef(0);
  const [track, setTrack] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState<number>(musicTracks[0].duration);
  const [error, setError] = useState('');
  const song = musicTracks[track];
  const albumStyle = { '--album-accent': song.accent, '--track-progress': `${duration > 0 ? Math.min(100, Math.max(0, elapsed / duration * 100)) : 0}%` } as CSSProperties;

  useEffect(() => {
    const player = audio.current;
    if (!player) return;
    player.src = musicTracks[0].src;
    player.volume = .45;
    return () => { player.pause(); player.removeAttribute('src'); player.load(); };
  }, []);

  function play() {
    const player = audio.current;
    if (!player) return;
    setError('');
    void player.play().catch(() => {
      if (player.error) setError('This track could not be loaded. Try another song.');
      else if (player.paused) setError('Press Play to start this track.');
    });
  }

  function select(index: number, startPlaying = false) {
    const player = audio.current;
    if (!player) return;
    const next = (index + musicTracks.length) % musicTracks.length;
    const resume = startPlaying || !player.paused;
    player.pause();
    selected.current = next;
    setTrack(next);
    setElapsed(0);
    setDuration(musicTracks[next].duration);
    setError('');
    player.src = musicTracks[next].src;
    if (resume) play();
  }

  return <>
    <audio ref={audio} preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onTimeUpdate={event => setElapsed(event.currentTarget.currentTime)} onLoadedMetadata={event => { if (Number.isFinite(event.currentTarget.duration)) setDuration(event.currentTarget.duration); }} onEnded={() => select(selected.current + 1, true)} onError={() => { setPlaying(false); setError('This track could not be loaded. Try another song.'); }} />
    <div className={`${mac.musicBody} ${styles.shell}`} data-playing={playing} style={albumStyle}>
      <div className={styles.ambience} aria-hidden="true">{musicTracks.map((item, index) => <span key={item.src} data-active={track === index} style={{ backgroundImage: `url("${item.cover}")` }} />)}</div>
      <div className={`${mac.album} ${styles.artwork}`}><Image key={song.cover} className={styles.cover} src={song.cover} alt={`${song.album} album cover by ${song.artist}`} width={600} height={600} sizes="67px" /></div>
      <div className={`${mac.musicInfo} ${styles.trackInfo}`}>
        <span>{playing ? 'Now playing' : elapsed > 0 ? 'Paused' : 'Ready to play'}</span><h2 title={song.title}>{song.title}</h2><p title={`${song.artist} · ${song.album}`}>{song.artist}<span> · {song.album}</span></p>
        <div className={`${mac.player} ${styles.controls}`}>
          <button aria-label="Previous track" title="Previous track" onClick={() => select(selected.current - 1)}><ChevronLeft size={16} /></button>
          <button className={styles.playButton} aria-label={playing ? 'Pause music' : 'Play music'} title={playing ? 'Pause' : 'Play'} onClick={() => { if (audio.current?.paused) play(); else audio.current?.pause(); }}>{playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}</button>
          <button aria-label="Next track" title="Next track" onClick={() => select(selected.current + 1)}><ChevronRight size={16} /></button>
          <button className={styles.playlistButton} popoverTarget="music-playlist" aria-label="Choose a track" title="Your playlist"><ListMusic size={15} /><span>{track + 1}/{musicTracks.length}</span></button>
          <span className={[mac.equalizer, playing ? mac.playing : ''].join(' ')} aria-hidden="true"><i /><i /><i /><i /><i /></span>
        </div>
        <div className={styles.progress}><span>{formatTime(elapsed)}</span><div className={styles.seek}><span className={styles.seekFill} /><input type="range" min={0} max={duration} step={.1} value={Math.min(elapsed, duration)} aria-label="Track progress" aria-valuetext={`${formatTime(elapsed)} of ${formatTime(duration)}`} disabled={!elapsed && !playing} onChange={event => { const player = audio.current; if (player && player.readyState > 0) { player.currentTime = Number(event.target.value); setElapsed(player.currentTime); } }} /></div><span>{formatTime(duration)}</span></div>
      </div>
    </div>
    {error && <p className={styles.error} role="status">{error}</p>}
    <div id="music-playlist" popover="auto" className={styles.playlist}>
      <header><AudioLines size={17} /><div><h2>Your collection</h2><p>{musicTracks.length} songs · Valentine’s space</p></div></header>
      {musicTracks.map((item, index) => <button key={item.src} aria-label={`Play ${item.title} by ${item.artist}`} aria-pressed={track === index} onClick={() => select(index, true)}><span className={styles.trackNumber}>{track === index ? <Check size={13} /> : String(index + 1).padStart(2, '0')}</span><Image className={styles.trackCover} src={item.cover} alt="" width={36} height={36} /><span className={styles.trackName}><strong>{item.title}</strong><small>{item.artist}</small></span><span className={styles.trackTime}>{formatTime(item.duration)}</span><Play size={11} /></button>)}
    </div>
  </>;
});
