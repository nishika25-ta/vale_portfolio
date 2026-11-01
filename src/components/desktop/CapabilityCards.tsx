import { ArrowUpRight } from 'lucide-react';
import { memo } from 'react';
import styles from './capabilities.module.css';

const webLogos = [
  { name: 'Next.js', src: 'nextjs.svg' },
  { name: 'React', src: 'react.svg' },
  { name: 'TypeScript', src: 'typescript.svg' },
  { name: 'PostgreSQL', src: 'postgresql.svg' },
];

const aiLogos = [
  { name: 'TensorFlow', src: 'tensorflow.svg' },
  { name: 'OpenCV', src: 'opencv.svg' },
  { name: 'Python', src: 'python.svg' },
  { name: 'QGIS', src: 'qgis.svg' },
];

export const CapabilityCards = memo(function CapabilityCards({ onSelect }: { onSelect: (focus: 'web' | 'ai') => void }) {
  return <div className={styles.grid}>
    <button className={`${styles.card} ${styles.web}`} aria-label="View web and backend skills" onClick={() => onSelect('web')}>
      <span className={styles.scene} aria-hidden="true">
        <svg viewBox="0 0 300 132" fill="none">
          <defs>
            <linearGradient id="cap-web-glow" x1="150" y1="0" x2="150" y2="132" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" stopOpacity=".18" />
              <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="cap-web-win" x1="18" y1="10" x2="18" y2="119" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="#f2f6fd" />
            </linearGradient>
            <linearGradient id="cap-web-bar" x1="18" y1="10" x2="18" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fbfcfe" />
              <stop offset="1" stopColor="#eef3fb" />
            </linearGradient>
            <linearGradient id="cap-web-hero" x1="66" y1="40" x2="186" y2="68" gradientUnits="userSpaceOnUse">
              <stop stopColor="#007aff" />
              <stop offset="1" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="cap-db-shell" x1="226" y1="24" x2="288" y2="112" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e293b" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="cap-db-cyl" x1="242" y1="41" x2="272" y2="75" gradientUnits="userSpaceOnUse">
              <stop stopColor="#60a5fa" stopOpacity=".28" />
              <stop offset="1" stopColor="#2563eb" stopOpacity=".08" />
            </linearGradient>
            <linearGradient id="cap-pipe" x1="196" y1="68" x2="226" y2="68" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3b82f6" stopOpacity=".35" />
              <stop offset=".5" stopColor="#007aff" />
              <stop offset="1" stopColor="#38bdf8" stopOpacity=".8" />
            </linearGradient>
          </defs>

          <ellipse cx="148" cy="66" rx="135" ry="62" fill="url(#cap-web-glow)" />

          {/* API Pipeline Bridge */}
          <path d="M195 66C207 66 207 55 216 55H228" stroke="#60a5fa" strokeOpacity=".28" strokeWidth="4" strokeLinecap="round" />
          <path className={styles.connection} d="M195 66C207 66 207 55 216 55H228" stroke="url(#cap-pipe)" strokeWidth="1.6" strokeDasharray="3.5 3.5" strokeLinecap="round" />
          <path d="M195 79C208 79 208 86 218 86H228" stroke="#60a5fa" strokeOpacity=".22" strokeWidth="1.2" strokeLinecap="round" />
          <g className={styles.packet}>
            <circle cx="204" cy="62" r="4.5" fill="#007aff" fillOpacity=".24" />
            <circle cx="204" cy="62" r="2.2" fill="#38bdf8" />
          </g>

          {/* macOS Application Window */}
          <g className={styles.browser}>
            {/* Ambient shadow */}
            <rect x="20" y="15" width="178" height="106" rx="11" fill="#0f294d" fillOpacity=".14" />
            {/* Window frame */}
            <rect className={styles.winFrame} x="16" y="10" width="180" height="108" rx="10.5" fill="url(#cap-web-win)" stroke="#b8cde8" strokeWidth="1" />
            {/* Titlebar */}
            <path className={styles.winBar} d="M16.5 20.5C16.5 15 21 10.5 26.5 10.5H185.5C191 10.5 195.5 15 195.5 20.5V31.5H16.5V20.5Z" fill="url(#cap-web-bar)" />
            <line className={styles.winDivider} x1="16.5" y1="31.5" x2="195.5" y2="31.5" stroke="#d5e2f2" strokeWidth="1" />
            {/* Traffic lights */}
            <circle cx="27.5" cy="21" r="2.7" fill="#ff5f57" />
            <circle cx="36.5" cy="21" r="2.7" fill="#febc2e" />
            <circle cx="45.5" cy="21" r="2.7" fill="#28c840" />
            {/* URL / File Pill */}
            <rect className={styles.winPill} x="74" y="15.5" width="66" height="11" rx="3.5" fill="#e5eefb" />
            <circle cx="81" cy="21" r="1.6" fill="#007aff" />
            <text className={styles.winTitleText} x="86" y="23.5" fill="#476285" fontSize="6.5" fontWeight="600" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">App.tsx</text>
            {/* Status badge */}
            <rect x="167" y="16.5" width="21" height="9" rx="4.5" fill="#10b981" fillOpacity=".14" />
            <circle cx="172" cy="21" r="1.5" fill="#10b981" />
            <text x="176" y="23" fill="#059669" fontSize="5" fontWeight="600" fontFamily="ui-monospace, SFMono-Regular, monospace">200</text>

            {/* Sidebar */}
            <rect className={styles.winSidebar} x="23" y="38" width="34" height="73" rx="5.5" fill="#eaf1fb" />
            <rect x="27" y="43" width="26" height="8" rx="3" fill="#007aff" fillOpacity=".15" />
            <circle cx="31.5" cy="47" r="1.5" fill="#007aff" />
            <path d="M36 47H48" stroke="#007aff" strokeWidth="1.6" strokeLinecap="round" />
            <path className={styles.winLines} d="M29 57H47M29 64H43M29 71H46M29 78H41" stroke="#94afd3" strokeWidth="1.6" strokeLinecap="round" />
            <rect className={styles.winMiniCard} x="27" y="92" width="26" height="14" rx="3" fill="#dbe7f9" />
            <path d="M31 99H44M31 102.5H39" stroke="#6488b8" strokeWidth="1.3" strokeLinecap="round" />

            {/* Code / Component Hero Banner */}
            <rect x="64" y="38" width="124" height="32" rx="6" fill="url(#cap-web-hero)" />
            <rect x="64.5" y="38.5" width="123" height="31" rx="5.5" stroke="#ffffff" strokeOpacity=".22" />
            <circle cx="177" cy="46" r="10" fill="#ffffff" fillOpacity=".08" />
            <text x="73" y="51" fill="#93c5fd" fontSize="6" fontFamily="ui-monospace, SFMono-Regular, monospace">export default</text>
            <text x="73" y="62.5" fill="#ffffff" fontSize="9.2" fontWeight="600" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">{'<HelloWorld />'}</text>

            {/* Bento Metric Widgets */}
            <rect className={styles.winSubCard} x="64" y="76" width="38" height="35" rx="5.5" fill="#e6effc" stroke="#cddff7" strokeWidth=".8" />
            <path d="M70 102L76.5 95.5L82 98.5L90.5 88.5L96 91" stroke="#007aff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="90.5" cy="88.5" r="1.8" fill="#007aff" />
            <text className={styles.winSubText} x="70" y="84.5" fill="#5e7ba3" fontSize="5.5" fontWeight="600" fontFamily="sans-serif">99.9%</text>

            <rect className={styles.winSubCard} x="107" y="76" width="38" height="35" rx="5.5" fill="#edf4fd" stroke="#cddff7" strokeWidth=".8" />
            <rect x="114" y="94" width="4" height="10" rx="1.5" fill="#60a5fa" />
            <rect x="121" y="88" width="4" height="16" rx="1.5" fill="#007aff" />
            <rect x="128" y="91" width="4" height="13" rx="1.5" fill="#3b82f6" />
            <rect x="135" y="85" width="4" height="19" rx="1.5" fill="#1d4ed8" />
            <text className={styles.winSubText} x="113" y="83.5" fill="#5e7ba3" fontSize="5" fontWeight="600" fontFamily="ui-monospace, monospace">REST</text>

            <rect className={styles.winSubCard} x="150" y="76" width="38" height="35" rx="5.5" fill="#e6effc" stroke="#cddff7" strokeWidth=".8" />
            <path d="M157 86H178M157 92.5H173M157 99H180" stroke="#5b83bd" strokeWidth="1.7" strokeLinecap="round" />
            <circle cx="180" cy="86" r="1.8" fill="#10b981" />
          </g>

          {/* Database Node */}
          <g className={styles.database}>
            <rect x="228" y="29" width="58" height="82" rx="12" fill="#091526" fillOpacity=".2" />
            <rect x="226" y="25" width="58" height="82" rx="11.5" fill="url(#cap-db-shell)" stroke="#476b9e" strokeWidth="1" />
            <rect x="227" y="26" width="56" height="80" rx="10.5" stroke="#ffffff" strokeOpacity=".08" />
            {/* Server status header */}
            <circle cx="236" cy="34.5" r="2" fill="#34d399" />
            <text x="241.5" y="36.5" fill="#94a3b8" fontSize="5.5" fontWeight="600" fontFamily="ui-monospace, SFMono-Regular, monospace">PG:5432</text>

            {/* 3D Cylinder Stack */}
            <ellipse cx="255" cy="48" rx="15.5" ry="5.2" fill="url(#cap-db-cyl)" stroke="#60a5fa" strokeWidth="1.15" />
            <path d="M239.5 48V60C239.5 63.2 246.4 65.5 255 65.5C263.6 65.5 270.5 63.2 270.5 60V48" fill="url(#cap-db-cyl)" stroke="#60a5fa" strokeWidth="1.15" />
            <path d="M239.5 60V72C239.5 75.2 246.4 77.5 255 77.5C263.6 77.5 270.5 75.2 270.5 72V60" fill="url(#cap-db-cyl)" stroke="#38bdf8" strokeWidth="1.15" />
            <circle cx="264" cy="56.5" r="1.2" fill="#38bdf8" />
            <circle cx="264" cy="68.5" r="1.2" fill="#34d399" />

            {/* SQL Pill */}
            <rect x="236" y="85" width="38" height="13" rx="4.5" fill="#0f172a" stroke="#334155" strokeWidth=".9" />
            <text x="245.5" y="94" fill="#7dd3fc" fontSize="7" fontWeight="600" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace">SQL</text>
          </g>
        </svg>
      </span>
      <span className={styles.body}>
        <span className={styles.titleRow}>
          <h3>Web &amp; backend</h3>
          <span className={styles.badge}>Full-Stack</span>
        </span>
        <span className={styles.description}>React interfaces, APIs, and PostgreSQL.</span>
      </span>
      <span className={styles.footer}>
        <span className={styles.logos} aria-hidden="true">
          {webLogos.map(item => <span key={item.name} title={item.name}><img src={`/tech/${item.src}`} alt="" width={18} height={18} /></span>)}
        </span>
        <span className={styles.action}>View stack <ArrowUpRight size={12} /></span>
      </span>
    </button>

    <button className={`${styles.card} ${styles.vision}`} aria-label="View AI and data skills" onClick={() => onSelect('ai')}>
      <span className={`${styles.scene} ${styles.visionScene}`} aria-hidden="true">
        <svg viewBox="0 0 300 132" fill="none">
          <defs>
            <radialGradient id="cap-vision-light" cx="50%" cy="50%" r="55%">
              <stop stopColor="#a855f7" stopOpacity=".32" />
              <stop offset=".55" stopColor="#6366f1" stopOpacity=".12" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cap-vision-hud" x1="76" y1="18" x2="224" y2="114" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2e1d4a" stopOpacity=".72" />
              <stop offset="1" stopColor="#16132b" stopOpacity=".86" />
            </linearGradient>
            <linearGradient id="cap-vision-scan" x1="82" y1="0" x2="218" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#5eead4" stopOpacity="0" />
              <stop offset=".2" stopColor="#5eead4" stopOpacity=".85" />
              <stop offset=".5" stopColor="#e9d5ff" />
              <stop offset=".8" stopColor="#c084fc" stopOpacity=".85" />
              <stop offset="1" stopColor="#c084fc" stopOpacity="0" />
            </linearGradient>
          </defs>

          <ellipse cx="150" cy="66" rx="132" ry="64" fill="url(#cap-vision-light)" />

          {/* Side Telemetry Tracks */}
          <path d="M24 82H52L68 66H76" stroke="#a78bfa" strokeOpacity=".4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M224 66H234L248 50H276" stroke="#5eead4" strokeOpacity=".4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="24" cy="82" r="3.2" fill="#1b1530" stroke="#5eead4" strokeWidth="1.4" />
          <circle cx="276" cy="50" r="3.2" fill="#1b1530" stroke="#c084fc" strokeWidth="1.4" />

          {/* Left Telemetry Pill */}
          <rect x="16" y="42" width="46" height="19" rx="5" fill="#1c1632" fillOpacity=".85" stroke="#8b5cf6" strokeOpacity=".35" strokeWidth=".9" />
          <text x="22" y="50.5" fill="#a78bfa" fontSize="5" fontWeight="600" fontFamily="ui-monospace, SFMono-Regular, monospace">YOLO·CV</text>
          <text x="22" y="57.5" fill="#5eead4" fontSize="6" fontWeight="700" fontFamily="ui-monospace, SFMono-Regular, monospace">98.4%</text>

          {/* Right Geospatial Telemetry Pill */}
          <rect x="238" y="73" width="46" height="19" rx="5" fill="#1c1632" fillOpacity=".85" stroke="#5eead4" strokeOpacity=".35" strokeWidth=".9" />
          <text x="244" y="81.5" fill="#94a3b8" fontSize="5" fontWeight="600" fontFamily="ui-monospace, SFMono-Regular, monospace">GIS·DEM</text>
          <text x="244" y="88.5" fill="#e9d5ff" fontSize="5.8" fontWeight="600" fontFamily="ui-monospace, SFMono-Regular, monospace">4.39°N</text>

          {/* Vision HUD Glass Frame */}
          <rect x="76" y="18" width="148" height="96" rx="11" fill="url(#cap-vision-hud)" stroke="#a78bfa" strokeOpacity=".24" />

          {/* Subtle Geospatial Contour Rings */}
          <g className={styles.cloud}>
            <ellipse cx="150" cy="66" rx="58" ry="22" transform="rotate(-22 150 66)" stroke="#a78bfa" strokeOpacity=".35" strokeWidth="1" />
            <ellipse cx="150" cy="66" rx="58" ry="22" transform="rotate(22 150 66)" stroke="#5eead4" strokeOpacity=".28" strokeWidth="1" />
            <ellipse cx="150" cy="66" rx="24" ry="39" stroke="#c084fc" strokeOpacity=".28" strokeWidth="1" strokeDasharray="2.5 2.5" />

            {/* Neural Mesh Edges */}
            <path d="M111 56L134 38L166 44L189 66L169 89L136 94L115 77Z M134 38L136 94M166 44L115 77M111 56L169 89M189 66L134 38M134 38L169 89" stroke="#d8b4fe" strokeOpacity=".48" strokeWidth=".95" />

            {/* Neural Nodes */}
            {[
              [111, 56],
              [134, 38],
              [166, 44],
              [189, 66],
              [169, 89],
              [136, 94],
              [115, 77],
            ].map(([cx, cy], index) => (
              <g key={index}>
                <circle cx={cx} cy={cy} r="4.5" fill={index % 2 ? '#c084fc' : '#5eead4'} fillOpacity=".2" />
                <circle cx={cx} cy={cy} r="2.3" fill={index % 2 ? '#e9d5ff' : '#5eead4'} />
              </g>
            ))}
            {/* Core Attention Node */}
            <circle cx="150" cy="66" r="8" fill="#a855f7" fillOpacity=".25" />
            <circle cx="150" cy="66" r="4.2" fill="#f3e8ff" stroke="#c084fc" strokeWidth="1.2" />
          </g>

          {/* Detection Bounding Box Brackets */}
          <g className={styles.target}>
            <rect x="86" y="27" width="128" height="78" rx="4" stroke="#e9d5ff" strokeOpacity=".14" strokeDasharray="3 3" />
            <path d="M86 41V30C86 28.3 87.3 27 89 27H100M200 27H211C212.7 27 214 28.3 214 30V41M214 91V102C214 103.7 212.7 105 211 105H200M100 105H89C87.3 105 86 103.7 86 102V91" stroke="#d8b4fe" strokeWidth="1.7" strokeLinecap="round" />
            {/* Detection Label Tag */}
            <rect x="86" y="15" width="54" height="11" rx="3.5" fill="#7c3aed" />
            <circle cx="92" cy="20.5" r="1.6" fill="#5eead4" />
            <text x="96.5" y="23" fill="#ffffff" fontSize="5.5" fontWeight="600" fontFamily="ui-monospace, SFMono-Regular, monospace">DETECT · 0.98</text>
          </g>

          {/* Laser Scan Line */}
          <g className={styles.scan}>
            <line x1="84" y1="30" x2="216" y2="30" stroke="url(#cap-vision-scan)" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        </svg>
      </span>
      <span className={styles.body}>
        <span className={styles.titleRow}>
          <h3>AI &amp; computer vision</h3>
          <span className={styles.badge}>ML · GIS</span>
        </span>
        <span className={styles.description}>Detection, image processing, and geospatial data.</span>
      </span>
      <span className={styles.footer}>
        <span className={styles.logos} aria-hidden="true">
          {aiLogos.map(item => <span key={item.name} title={item.name}><img src={`/tech/${item.src}`} alt="" width={18} height={18} /></span>)}
        </span>
        <span className={styles.action}>View stack <ArrowUpRight size={12} /></span>
      </span>
    </button>
  </div>;
});
