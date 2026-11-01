import { ChevronFirst, ChevronLast, Play, Square, Volume2, VolumeX } from 'lucide-react';
import { CassetteArt, Reel, type TapeInfo } from './CassetteArt';

type TapeDeckProps = {
  tape: TapeInfo;
  loaded: boolean;
  sound: boolean;
  onSound: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onPlay: () => void;
  onStop: () => void;
};

export function TapeDeck({ tape, loaded, sound, onSound, onPrevious, onNext, onPlay, onStop }: TapeDeckProps) {
  return (
    <div className="tape-deck" role="group" aria-label="Valetape cassette player">
      <div className="deck-handle" aria-hidden="true" />
      <div className="deck-shell">
        <div className="deck-body">
          <span className="deck-shine" aria-hidden="true" />
          <div className="headphone-jacks" aria-hidden="true"><i /><i /><span>PHONES</span></div>
          <span className="deck-brand">VALENTINE</span>
          <div className={`deck-window ${loaded ? 'has-tape' : ''}`}>
            {loaded ? <CassetteArt tape={tape} compact /> : <><span className="window-highlight" /><span>NO TAPE</span></>}
          </div>
          <button className="deck-skip deck-prev" onClick={onPrevious} aria-label="Choose previous tape"><ChevronFirst /></button>
          <button className="deck-skip deck-next" onClick={onNext} aria-label="Choose next tape"><ChevronLast /></button>
          <span className="deck-selected">{tape.title} · 01</span>
          <button className="deck-play" onClick={onPlay} aria-label={`Insert ${tape.title.toLowerCase()} tape`}><Play fill="currentColor" size={22} /><i /></button>
          <button className="deck-stop" onClick={onStop} aria-label="Stop and reset the deck"><Square fill="currentColor" size={16} /><i /></button>
        </div>
        <div className="deck-side">
          <span>VOLUME</span>
          <button className={`volume-knob ${sound ? 'sound-enabled' : ''}`} onClick={onSound} aria-label={sound ? 'Mute sound' : 'Turn sound on'} aria-pressed={sound}><i /></button>
          <span className="deck-sound-label">{sound ? <Volume2 size={11} /> : <VolumeX size={11} />}{sound ? 'SOUND ON' : 'SOUND OFF'}</span>
        </div>
        <div className="deck-footer"><div><span>STEREO · PERSONAL PORTFOLIO</span><strong>VALETAPE</strong></div><em>VA-26</em></div>
      </div>
      <span className="deck-spark spark-left" aria-hidden="true">✧</span>
      <span className="deck-spark spark-right" aria-hidden="true">✧</span>
      <div className="deck-under-label"><span>{tape.title} <small>{tape.japanese}</small></span><p>{tape.description} · {tape.count} {tape.count === 1 ? 'track' : 'tracks'}</p></div>
    </div>
  );
}

export function MiniReels({ playing }: { playing: boolean }) {
  return <span className="mini-reels"><Reel spinning={playing} /><Reel spinning={playing} /></span>;
}
