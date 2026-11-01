export function Dreamscape() {
  return (
    <div className="dreamscape" aria-hidden="true">
      <div className="aurora aurora-mint" /><div className="aurora aurora-lilac" />
      <div className="dream-stars">{Array.from({ length: 38 }, (_, i) => <i key={i} style={{ left: `${(i * 37 + 11) % 100}%`, top: `${(i * 23 + 7) % 94}%`, animationDelay: `${-i * .7}s`, width: i % 5 === 0 ? 4 : 2, height: i % 5 === 0 ? 4 : 2 }} />)}</div>
      <svg className="constellation constellation-left" viewBox="0 0 280 300"><path d="m22 60 74 42 46-67 85 117-47 107-84-157" /><g><circle cx="22" cy="60" r="4" /><circle cx="96" cy="102" r="5" /><circle cx="142" cy="35" r="3" /><circle cx="227" cy="152" r="5" /><circle cx="180" cy="259" r="3" /></g></svg>
      <svg className="constellation constellation-right" viewBox="0 0 280 300"><path d="m33 225 51-86 108 20 42-91-150 71" /><g><circle cx="33" cy="225" r="3" /><circle cx="84" cy="139" r="5" /><circle cx="192" cy="159" r="3" /><circle cx="234" cy="68" r="5" /></g></svg>
      <div className="dream-planet"><div className="planet-ring ring-back" /><div className="planet-sphere"><span /></div><div className="planet-ring ring-front" /></div>
      <span className="meteor meteor-one" /><span className="meteor meteor-two" />
      <svg className="dream-terrain" viewBox="0 0 1440 360" preserveAspectRatio="none">
        <defs><linearGradient id="dream-land" x2="0" y2="1"><stop stopColor="#7948b8" /><stop offset="1" stopColor="#211437" /></linearGradient><linearGradient id="dream-stream"><stop stopColor="#b9f9d7" /><stop offset=".5" stopColor="#ba9aef" /><stop offset="1" stopColor="#5be7d6" /></linearGradient></defs>
        <path d="M0 190 120 115 210 139 310 63 407 145 520 118 650 190 780 146 905 105 1020 134 1165 44 1290 132 1440 98V360H0Z" fill="#302447" />
        <path d="m0 258 168-61 160 38 180-71 173 58 196-33 165 53 184-87 214 54v151H0Z" fill="url(#dream-land)" />
        <path d="M0 305q175-69 360-26t360-8 360 3 360-8" stroke="#b9a3e5" strokeOpacity=".35" fill="none" />
        <path d="M0 322q190-69 365-24t360-8 360 3 355-8" stroke="#b9a3e5" strokeOpacity=".2" fill="none" />
        <path d="M1440 243c-211-10-222 108-490 79-161-18-194-40-298-21" stroke="url(#dream-stream)" strokeWidth="3" fill="none" className="dream-river" />
        <g fill="#b0f3d9"><path d="m89 242 10-38 10 38Zm15 0 10-27 10 27Z" /><path d="m1216 205 12-46 12 46Zm23 3 9-29 9 29Z" /></g>
        <g fill="#edb6f3"><ellipse cx="66" cy="268" rx="17" ry="7" /><ellipse cx="1193" cy="247" rx="25" ry="10" /></g>
        <g stroke="#d4b6ef" strokeWidth="3"><path d="M66 270v15m1127-25v20" /></g>
      </svg>
      <div className="world-caption"><span /> LITTLE UNIVERSE / BIG IDEAS</div>
    </div>
  );
}

export function MoonBuddy() {
  return <svg className="note-sun moon-buddy" viewBox="0 0 60 60" aria-hidden="true"><path d="M44 10A23 23 0 1 0 50 43 22 22 0 0 1 44 10Z" fill="#e6d7ff" /><circle cx="24" cy="32" r="1.8" fill="#47326b" /><path d="M22 39q5 5 9 0" stroke="#47326b" strokeWidth="1.7" fill="none" strokeLinecap="round" /><circle cx="16" cy="38" r="3" fill="#e59cc6" /><path d="m45 17 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#acffdd" /></svg>;
}
