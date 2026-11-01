'use client';

import { useEffect, useRef, useState } from 'react';
import { RotateCcw, Sparkles } from 'lucide-react';

const stars = [{ x: 15, y: 24 }, { x: 43, y: 16 }, { x: 78, y: 30 }, { x: 66, y: 70 }, { x: 27, y: 74 }];

export function StarGame({ onCollect }: { onCollect: () => void }) {
  const [collected, setCollected] = useState<number[]>([]);
  const starRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const replayRef = useRef<HTMLButtonElement>(null);
  const resetFocus = useRef(false);
  const complete = collected.length === stars.length;
  useEffect(() => {
    if (!collected.length) {
      if (resetFocus.current) { starRefs.current[0]?.focus({ preventScroll: true }); resetFocus.current = false; }
      return;
    }
    if (complete) replayRef.current?.focus({ preventScroll: true });
    else starRefs.current[stars.findIndex((_, index) => !collected.includes(index))]?.focus({ preventScroll: true });
  }, [collected, complete]);
  return <div className={`star-game ${complete ? 'is-complete' : ''}`}>
    <p className="game-kicker">A TINY DETOUR THROUGH THE COSMOS</p>
    <h3>Catch a little wonder.</h3>
    <p className="game-instructions">Collect five stars to reveal your constellation. Take your time.</p>
    <div className="star-field" role="group" aria-label="Star field">
      <div className="game-nebula" aria-hidden="true" />
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path className="constellation-trace" d="m15 24 28-8 35 14-12 40-39 4-12-50" /></svg>
      {stars.map((star, index) => <button key={index} ref={(node) => { starRefs.current[index] = node; }} style={{ left: star.x + '%', top: star.y + '%' }} className={collected.includes(index) ? 'caught' : ''} disabled={collected.includes(index)} aria-label={`Collect star ${index + 1}`} onClick={() => { setCollected((previous) => [...previous, index]); onCollect(); }}><span aria-hidden="true">{collected.includes(index) ? '✧' : '✦'}</span></button>)}
      {complete && <div className="constellation-reward"><Sparkles size={24} /><strong>The Curious Explorer</strong><span>Your constellation, made of small discoveries.</span></div>}
    </div>
    <div className="game-footer"><p role="status">{complete ? 'Constellation unlocked! ✦' : `${collected.length} of 5 stars collected`}</p><button ref={replayRef} onClick={() => { resetFocus.current = true; setCollected([]); }}><RotateCcw size={13} /> {complete ? 'Play again' : 'Reset'}</button></div>
  </div>;
}
