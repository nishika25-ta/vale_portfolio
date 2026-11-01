import type { Destination } from './AstroArt';

export function VoyageEffect({ destination }: { destination: Destination }) {
  return <div className="voyage-effect" aria-hidden="true"><div className="warp-tunnel">{Array.from({ length: 20 }, (_, index) => <i key={index} style={{ '--ray-angle': `${index * 18}deg`, '--ray-delay': `${(index % 4) * 30}ms` } as React.CSSProperties} />)}</div><div className="voyage-target"><span>SETTING COURSE</span><strong>{destination.title}</strong><i /><small>A new world of curiosity.</small></div></div>;
}
