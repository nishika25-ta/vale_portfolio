import { Cpu, Layers3 } from 'lucide-react';
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

export const CapabilityCards = memo(function CapabilityCards({
  onSelect,
}: {
  onSelect: (focus: 'web' | 'ai') => void;
}) {
  return (
    <div className={styles.grid}>
      <button
        type="button"
        className={`${styles.card} ${styles.web}`}
        aria-label="View full-stack and backend skills"
        onClick={() => onSelect('web')}
      >
        <span className={styles.iconBox} aria-hidden="true">
          <Layers3 size={18} />
        </span>

        <div className={styles.body}>
          <h3>Web, APIs &amp; cloud</h3>
          <p>Next.js interfaces, PostgreSQL systems, Docker &amp; Kubernetes deployments.</p>
        </div>

        <div className={styles.footer}>
          <span className={styles.logos} aria-hidden="true">
            {webLogos.map((item) => (
              <span key={item.name} title={item.name}>
                <img src={`/tech/${item.src}`} alt="" width={16} height={16} />
              </span>
            ))}
          </span>
        </div>
      </button>

      <button
        type="button"
        className={`${styles.card} ${styles.vision}`}
        aria-label="View AI, vision, and security skills"
        onClick={() => onSelect('ai')}
      >
        <span className={styles.iconBox} aria-hidden="true">
          <Cpu size={18} />
        </span>

        <div className={styles.body}>
          <h3>AI, vision &amp; security</h3>
          <p>Explainable ML, aerial object detection, geospatial analysis, and security tooling.</p>
        </div>

        <div className={styles.footer}>
          <span className={styles.logos} aria-hidden="true">
            {aiLogos.map((item) => (
              <span key={item.name} title={item.name}>
                <img src={`/tech/${item.src}`} alt="" width={16} height={16} />
              </span>
            ))}
          </span>
        </div>
      </button>
    </div>
  );
});
