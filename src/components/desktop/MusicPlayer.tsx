'use client';

import { memo, useId, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import { AudioLines, Check, ChevronLeft, ChevronRight, ListMusic, Pause, Play } from 'lucide-react';
import { musicTracks } from '@/data/music';
import styles from './music.module.css';

export type MusicController = {
  track: number;
  playing: boolean;
  elapsed: number;
  duration: number;
  error: string;
  togglePlay: () => void;
  selectTrack: (index: number, startPlaying?: boolean) => void;
  seek: (seconds: number) => void;
};

function formatTime(seconds: number) {
  const value = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, '0')}`;
}

export const MusicPlayer = memo(function MusicPlayer({
  controller,
  defaultExpanded = false,
  compact = false,
  usePopover = false,
}: {
  controller: MusicController;
  defaultExpanded?: boolean;
  compact?: boolean;
  usePopover?: boolean;
}) {
  const [showList, setShowList] = useState(defaultExpanded);
  const popoverId = useId();
  const { track, playing, elapsed, duration, error, togglePlay, selectTrack, seek } = controller;
  const song = musicTracks[track];
  const ratio = duration > 0 ? Math.min(1, Math.max(0, elapsed / duration)) : 0;
  const albumStyle = {
    '--album-accent': song.accent,
    '--track-ratio': String(ratio),
  } as CSSProperties;

  const renderTrackRows = () =>
    musicTracks.map((item, index) => (
      <button
        type="button"
        key={item.src}
        className={styles.trackRow}
        aria-pressed={track === index}
        onClick={() => selectTrack(index, true)}
      >
        <span className={styles.trackNumber}>
          {track === index ? <Check size={13} /> : String(index + 1).padStart(2, '0')}
        </span>
        <Image className={styles.trackCover} src={item.cover} alt="" width={34} height={34} />
        <span className={styles.trackName}>
          <strong>{item.title}</strong>
          <small>{item.artist}</small>
        </span>
        <span className={styles.trackTime}>{formatTime(item.duration)}</span>
      </button>
    ));

  return (
    <div>
      <div
        className={`${styles.shell} ${compact ? styles.compact : ''}`}
        data-playing={playing}
        style={albumStyle}
      >
        <div className={styles.ambience} aria-hidden="true">
          {musicTracks.map((item, index) => (
            <span
              key={item.src}
              data-active={track === index}
              style={{ backgroundImage: `url("${item.cover}")` }}
            />
          ))}
        </div>
        <div className={styles.artwork}>
          <Image
            key={song.cover}
            className={styles.cover}
            src={song.cover}
            alt={`${song.album} album cover by ${song.artist}`}
            width={120}
            height={120}
            sizes="60px"
          />
        </div>
        <div className={styles.trackInfo}>
          <div className={styles.topMeta}>
            <div className={styles.titles}>
              <h2 title={song.title}>{song.title}</h2>
              <p title={`${song.artist} — ${song.album}`}>
                {song.artist} · {song.album}
              </p>
            </div>
            <div className={styles.controls}>
              <button
                type="button"
                aria-label="Previous track"
                title="Previous track"
                onClick={() => selectTrack(track - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className={styles.playButton}
                aria-label={playing ? 'Pause music' : 'Play music'}
                title={playing ? 'Pause' : 'Play'}
                onClick={togglePlay}
              >
                {playing ? <Pause size={13} fill="currentColor" /> : <Play size={13} fill="currentColor" />}
              </button>
              <button
                type="button"
                aria-label="Next track"
                title="Next track"
                onClick={() => selectTrack(track + 1)}
              >
                <ChevronRight size={16} />
              </button>
              {usePopover ? (
                <button
                  type="button"
                  className={styles.playlistToggle}
                  popoverTarget={popoverId}
                  aria-label="Open playlist queue"
                  title="Choose a track"
                >
                  <ListMusic size={14} />
                  <span>
                    {track + 1}/{musicTracks.length}
                  </span>
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.playlistToggle}
                  aria-expanded={showList}
                  aria-label="Toggle playlist"
                  onClick={() => setShowList((open) => !open)}
                >
                  <ListMusic size={14} />
                  <span>
                    {track + 1}/{musicTracks.length}
                  </span>
                </button>
              )}
              <span className={`${styles.equalizer} ${playing ? styles.playing : ''}`} aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
            </div>
          </div>

          <div className={styles.progress}>
            <span>{formatTime(elapsed)}</span>
            <div className={styles.seek}>
              <span className={styles.seekFill} />
              <input
                type="range"
                min={0}
                max={duration}
                step={0.5}
                value={Math.min(elapsed, duration)}
                aria-label="Track progress"
                aria-valuetext={`${formatTime(elapsed)} of ${formatTime(duration)}`}
                disabled={!elapsed && !playing}
                onChange={(event) => seek(Number(event.target.value))}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {error && (
        <p className={styles.error} role="status">
          {error}
        </p>
      )}

      {usePopover ? (
        <div id={popoverId} popover="auto" className={styles.playlistPopover}>
          <header className={styles.popoverHeader}>
            <AudioLines size={16} />
            <div>
              <h3>Soundtrack queue</h3>
              <p>{musicTracks.length} tracks · ValeOS</p>
            </div>
          </header>
          <div className={styles.popoverList}>{renderTrackRows()}</div>
        </div>
      ) : (
        showList && (
          <div className={styles.trackList} role="list" aria-label="Playlist tracks">
            {renderTrackRows()}
          </div>
        )
      )}
    </div>
  );
});
