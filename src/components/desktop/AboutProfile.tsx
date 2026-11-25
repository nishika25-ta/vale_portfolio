import {
  ArrowDownToLine,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { RESUME_HREF, SITE_LOCATION, SITE_NAME, SOCIALS } from '@/data/profile';
import { certificates, type Certificate } from '@/data/certificates';
import styles from './about.module.css';

const toneClasses = [styles.blue, styles.teal, styles.emerald, styles.amber];

export function AboutProfile({
  onSelectCertificate,
}: {
  onSelectCertificate: (certificate: Certificate) => void;
}) {
  return (
    <div className={styles.profile}>
      <aside className={styles.identity}>
        <div className={styles.avatar}>
          <img src="/hi.webp" alt={SITE_NAME} width={112} height={112} />
          <span aria-hidden="true">
            <Code2 size={14} />
          </span>
        </div>
        <h3>{SITE_NAME}</h3>
        <p className={styles.role}>Software Engineer</p>
        <p className={styles.location}>
          <MapPin size={13} aria-hidden="true" /> {SITE_LOCATION}
        </p>

        <div className={styles.actions}>
          <a href={SOCIALS.linkedin.href} target="_blank" rel="noreferrer">
            <Linkedin size={18} />
            <span>Connect</span>
          </a>
          <a href={SOCIALS.github.href} target="_blank" rel="noreferrer">
            <Github size={18} />
            <span>GitHub</span>
          </a>
          <a href={RESUME_HREF} target="_blank" rel="noreferrer">
            <ArrowDownToLine size={18} />
            <span>Résumé</span>
          </a>
        </div>

        <section className={styles.group} aria-label="Current roles">
          <div className={styles.fact}>
            <span className={`${styles.icon} ${styles.blue}`}>
              <BriefcaseBusiness size={16} />
            </span>
            <div>
              <small>Current workplace</small>
              <strong>Hospital Miri</strong>
            </div>
          </div>
          <div className={styles.fact}>
            <span className={`${styles.icon} ${styles.teal}`}>
              <Sparkles size={16} />
            </span>
            <div>
              <small>Co-founder &amp; developer</small>
              <strong>Scribear</strong>
            </div>
          </div>
        </section>
      </aside>

      <div className={styles.details}>
        <section aria-labelledby="about-story">
          <h4 id="about-story" className={styles.sectionTitle}>
            Background
          </h4>
          <div className={`${styles.group} ${styles.story}`}>
            <h5>Hospital systems and client applications.</h5>
            <p>
              I build digital systems at Hospital Miri and full-stack applications for clients as co-founder of
              Scribear. My work spans interfaces, backend APIs, PostgreSQL databases, container deployment,
              cybersecurity, and geospatial analytics.
            </p>
            <p>
              My degree is in Cognitive Science with a Computer Science minor focused on AI and machine learning.
            </p>
          </div>
        </section>

        <section aria-labelledby="about-education">
          <h4 id="about-education" className={styles.sectionTitle}>
            Education
          </h4>
          <div className={`${styles.group} ${styles.education}`}>
            <span className={`${styles.icon} ${styles.blue}`}>
              <GraduationCap size={18} />
            </span>
            <div>
              <strong>B.Sc. Cognitive Science</strong>
              <p>Universiti Malaysia Sarawak (UNIMAS)</p>
              <small>Computer Science minor in AI &amp; Machine Learning</small>
              <div className={styles.badges}>
                <span>Class of 2025</span>
                <span>CGPA 3.12</span>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="about-milestones">
          <h4 id="about-milestones" className={styles.sectionTitle}>
            Certificates &amp; awards ({certificates.length})
          </h4>
          <div className={styles.group}>
            {certificates.map((certificate, index) => (
              <button
                type="button"
                className={styles.certificate}
                key={certificate.id}
                onClick={() => onSelectCertificate(certificate)}
              >
                <span className={`${styles.icon} ${toneClasses[index % toneClasses.length]}`}>
                  <ShieldCheck size={17} />
                </span>
                <div>
                  <strong>{certificate.title}</strong>
                  <small>
                    {certificate.issuer} ({certificate.date})
                  </small>
                </div>
                <ChevronRight size={16} className={styles.certificateChevron} />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
