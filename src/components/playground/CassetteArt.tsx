import { useId } from 'react';

export type TapeInfo = {
  id: string;
  title: string;
  japanese: string;
  description: string;
  color: string;
  accent: string;
  count: number;
};

export function CassetteArt({ tape, compact = false }: { tape: TapeInfo; compact?: boolean }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 230 150" className={compact ? 'cassette-svg compact' : 'cassette-svg'} aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ffffff" stopOpacity=".4" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="12" y="15" width="207" height="128" rx="15" fill="#132c4c" opacity=".17" />
      <rect x="7" y="6" width="207" height="128" rx="15" fill={tape.color} stroke="#19314e" strokeWidth="4.5" />
      <rect x="11" y="10" width="199" height="120" rx="11" fill={`url(#${id})`} stroke="#ffffff" strokeOpacity=".55" strokeWidth="2" />
      <rect x="22" y="22" width="177" height="77" rx="5" fill="#f6f4e9" stroke="#19314e" strokeWidth="2.5" />
      <path d="M27 22h167q5 0 5 5v12H22V27q0-5 5-5" fill={tape.accent} />
      <text x="30" y="33" fill="#ffffff" fontSize="5.4" fontFamily="monospace" fontWeight="700" letterSpacing="1">VA · MIXTAPE SERIES</text>
      <text x="190" y="33" textAnchor="end" fill="#ffffff" fontSize="6" fontFamily="monospace" fontWeight="700">{tape.count} TRACK{tape.count !== 1 ? 'S' : ''}</text>
      <text x="30" y="59" fill="#19314e" fontSize={tape.title.length > 9 ? '15' : '21'} fontWeight="900" letterSpacing="-1">{tape.title}</text>
      <text x="187" y="59" textAnchor="end" fill={tape.accent} fontSize="9" fontWeight="800">{tape.japanese}</text>
      <rect x="38" y="67" width="145" height="24" rx="12" fill="#19314e" />
      {[67, 151].map((x) => (
        <g key={x} className="tape-reel">
          <circle cx={x} cy="79" r="9.5" fill="#e4e9e5" />
          <circle cx={x} cy="79" r="6.4" fill="#637b8d" />
          <path d={`M${x} 70v18M${x - 8} 79h16M${x - 6} 73l12 12M${x - 6} 85l12-12`} stroke="#eef4ed" strokeWidth="2.8" />
          <circle cx={x} cy="79" r="2.2" fill="#19314e" />
        </g>
      ))}
      <rect x="93" y="74" width="32" height="10" rx="2" fill={tape.color} />
      <path d="m64 134 8-29h80l9 29" fill={tape.color} stroke="#19314e" strokeWidth="2.5" />
      <circle cx="88" cy="120" r="3.3" fill="#19314e" />
      <circle cx="137" cy="120" r="3.3" fill="#19314e" />
      <rect x="102" y="115" width="20" height="7" rx="2" fill="#19314e" />
      {[ [18,18], [202,18], [18,121], [202,121] ].map(([x,y]) => <g key={x + '-' + y}><circle cx={x} cy={y} r="3.4" fill="#eef3ed" stroke="#19314e" strokeWidth="1.5" /><path d={`M${x - 1.6} ${y}h3.2`} stroke="#19314e" /></g>)}
      <path d="M30 108h20m-20 5h14m124-5h18m-18 5h18m-18 5h18" stroke="#19314e" strokeWidth="1.3" opacity=".5" />
      <path d="m219 5 3 5 5 2-5 3-3 5-2-5-5-3 5-2Z" fill="#f6f9f5" stroke="#19314e" strokeWidth="1.4" />
    </svg>
  );
}

export function Reel({ spinning = false }: { spinning?: boolean }) {
  return <svg viewBox="0 0 36 36" className={`reel-icon ${spinning ? 'spinning' : ''}`} aria-hidden="true"><circle cx="18" cy="18" r="16" fill="#e9eee7" stroke="#19314e" strokeWidth="2" /><circle cx="18" cy="18" r="11" fill="#7f94a2" /><path d="M18 4v28M4 18h28M8 8l20 20M8 28 28 8" stroke="#f3f7ee" strokeWidth="5" /><circle cx="18" cy="18" r="4" fill="#19314e" /></svg>;
}
