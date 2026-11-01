import { useId } from 'react';

export type Destination = { id: string; title: string; description: string; color: string; accent: string; count: number };

export function PlanetArt({ destination, index = 0 }: { destination: Destination; index?: number }) {
  const id = useId().replace(/:/g, '');
  return <svg className={`planet-art planet-kind-${index % 4}`} viewBox="0 0 100 88" aria-hidden="true">
    <defs><radialGradient id={id} cx="30%" cy="24%" r="78%"><stop stopColor="#fff" stopOpacity=".75" /><stop offset=".28" stopColor={destination.color} /><stop offset="1" stopColor={destination.accent} /></radialGradient><clipPath id={id + 'clip'}><circle cx="50" cy="42" r="27" /></clipPath></defs>
    {index % 3 === 0 && <ellipse cx="50" cy="42" rx="45" ry="12" fill="none" stroke={destination.color} strokeOpacity=".3" strokeWidth="5" transform="rotate(-25 50 42)" />}
    <circle cx="50" cy="42" r="29" fill={destination.color} opacity=".09" />
    <circle cx="50" cy="42" r="27" fill={`url(#${id})`} />
    <g clipPath={`url(#${id}clip)`} fill="none" stroke={destination.accent} strokeOpacity=".3" strokeWidth={index % 2 ? '8' : '4'}><path d={index % 2 ? 'M20 26q20 18 60 6M18 48q24-8 65 7' : 'M25 18q38 18 52 5M17 43q30 17 66 2M24 62q24-5 46 2'} /></g>
    {index % 3 === 0 && <ellipse cx="50" cy="42" rx="45" ry="12" fill="none" stroke={destination.color} strokeWidth="4" transform="rotate(-25 50 42)" strokeDasharray="78 200" strokeDashoffset="-4" />}
    {index % 3 === 1 && <g fill="#fff" opacity=".24"><circle cx="39" cy="32" r="6" /><circle cx="58" cy="50" r="9" /><circle cx="66" cy="29" r="3" /></g>}
    <path d="m81 10 1.5 4.5L87 16l-4.5 1.5L81 22l-1.5-4.5L75 16l4.5-1.5Z" fill={destination.color} opacity=".8" />
    <ellipse cx="50" cy="80" rx="19" ry="2" fill={destination.color} opacity=".12" />
  </svg>;
}

export function CodingAstronaut() {
  return <svg className="coding-astronaut" viewBox="0 0 460 420" fill="none" aria-hidden="true">
    <defs><linearGradient id="astro-suit" x1="160" y1="120" x2="310" y2="330" gradientUnits="userSpaceOnUse"><stop stopColor="#f5edff" /><stop offset="1" stopColor="#a99acf" /></linearGradient><linearGradient id="astro-visor" x1="160" y1="95" x2="290" y2="185" gradientUnits="userSpaceOnUse"><stop stopColor="#373652" /><stop offset="1" stopColor="#10192a" /></linearGradient><linearGradient id="astro-rock" x1="118" y1="330" x2="330" y2="420" gradientUnits="userSpaceOnUse"><stop stopColor="#7e67a2" /><stop offset="1" stopColor="#38284f" /></linearGradient><linearGradient id="astro-laptop" x1="220" y1="210" x2="340" y2="300" gradientUnits="userSpaceOnUse"><stop stopColor="#c0ffe0" /><stop offset="1" stopColor="#6eb2b3" /></linearGradient></defs>
    <ellipse cx="236" cy="388" rx="153" ry="18" fill="#080a22" opacity=".2" />
    <path d="m73 355 47-28 39 10 45-17 49 11 53-13 65 28 24 29-45 23-84-3-43 11-75-17-50 3Z" fill="url(#astro-rock)" stroke="#bda8da" strokeOpacity=".3" strokeWidth="2" />
    <path d="m112 353 48 13 38-7m83 20 38-27 37 9M173 337l17 14" stroke="#b99bd5" strokeWidth="2" strokeOpacity=".35" strokeLinecap="round" />
    <rect x="121" y="184" width="52" height="105" rx="23" fill="#a095c7" stroke="#71628f" strokeWidth="3" transform="rotate(-12 121 184)" /><rect x="124" y="204" width="14" height="49" rx="7" fill="#e8b1c7" transform="rotate(-12 124 204)" />
    <path d="M185 277c-8 33-17 48-42 58l-26 3c-13 5-15 20-1 25 25 11 63 2 78-15l29-37" fill="url(#astro-suit)" stroke="#76658e" strokeWidth="3" />
    <path d="m231 285 18 37 35 13c16 5 24 16 15 26-8 10-26 4-42 0l-31-9c-18-5-35-20-42-40" fill="url(#astro-suit)" stroke="#76658e" strokeWidth="3" />
    <path d="m123 340-6 20m158-23-8 23" stroke="#9680af" strokeWidth="7" /><path d="M113 359q22 9 40 0m114 1q21 9 31 0" stroke="#51436d" strokeWidth="4" strokeLinecap="round" />
    <path d="M155 202q-6-26 30-32h45q35 4 39 40l-5 65c-3 34-35 44-66 33-36-12-48-24-46-56Z" fill="url(#astro-suit)" stroke="#75648d" strokeWidth="3" />
    <rect x="173" y="211" width="65" height="43" rx="12" fill="#8e80b4" stroke="#76658f" strokeWidth="2" /><text x="184" y="239" fill="#c0ffe1" fontSize="20" fontFamily="monospace" fontWeight="700">{'</>'}</text><circle cx="186" cy="266" r="4" fill="#f2bfcb" /><circle cx="201" cy="268" r="4" fill="#b9f5d5" /><path d="m226 274 4 8 8 1-6 6 1 8-7-4-7 4 1-8-6-6 8-1Z" fill="#e7c082" />
    <g className="astro-helmet"><circle cx="206" cy="131" r="78" fill="url(#astro-suit)" stroke="#8c7da6" strokeWidth="3" /><path d="M150 115c10-44 69-61 101-30" stroke="white" strokeOpacity=".7" strokeWidth="8" strokeLinecap="round" /><rect x="145" y="100" width="123" height="76" rx="35" fill="url(#astro-visor)" stroke="#9486b4" strokeWidth="5" /><path d="M163 118q17-13 37-9" stroke="#e7faff" strokeOpacity=".22" strokeWidth="6" strokeLinecap="round" /><path className="astro-eyes" d="M182 135v9m48-9v9" stroke="#b5ffdf" strokeWidth="7" strokeLinecap="round" /><path d="M196 157q11 9 21 0" stroke="#b5ffdf" strokeWidth="3" strokeLinecap="round" /><rect x="128" y="121" width="13" height="31" rx="6" fill="#b8edda" stroke="#817097" strokeWidth="2" /><rect x="272" y="121" width="13" height="31" rx="6" fill="#b8edda" stroke="#817097" strokeWidth="2" /><path d="m264 76 14-19" stroke="#b6a6d5" strokeWidth="4" strokeLinecap="round" /><circle cx="282" cy="52" r="6" fill="#b1ffdc" className="astro-antenna" /></g>
    <g className="astro-typing-arm"><path d="M247 210q23 7 36 32l28-2" stroke="#77668f" strokeWidth="29" strokeLinecap="round" /><path d="M247 210q23 7 36 32l28-2" stroke="#ddd0f0" strokeWidth="23" strokeLinecap="round" /><ellipse cx="316" cy="239" rx="15" ry="12" fill="#b0f0d7" stroke="#77668f" strokeWidth="2" /></g>
    <g className="astro-wave-arm"><path d="M164 213q-20 24-4 44l51 12" stroke="#77668f" strokeWidth="30" strokeLinecap="round" /><path d="M164 213q-20 24-4 44l51 12" stroke="#e7dcf5" strokeWidth="24" strokeLinecap="round" /><ellipse cx="216" cy="269" rx="16" ry="12" fill="#b9f4d9" stroke="#77668f" strokeWidth="2" /></g>
    <path d="m215 271 114-2 41 19-119 5Z" fill="#dcfff0" stroke="#5e929b" strokeWidth="2" /><path d="m251 293 119-5v6l-119 6-36-24v-5Z" fill="#6cb1b1" />
    <path d="m254 212 103-7q8 0 5 8l-20 62-105 6 14-62q1-6 3-7Z" fill="url(#astro-laptop)" stroke="#75aeb5" strokeWidth="3" /><path d="m281 239-10 8 7 8m32-18 7 8-12 10m-13-20-5 24" stroke="#46818f" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="m340 137 7 14 16 2-12 11 3 16-14-8-14 8 3-16-12-11 16-2Z" fill="#f5c8a7" opacity=".9" className="astro-floating-star" />
    <g stroke="#a2eacf" strokeWidth="2" opacity=".6"><path d="M92 178h12m-6-6v12m258 150h12m-6-6v12" /></g>
  </svg>;
}
