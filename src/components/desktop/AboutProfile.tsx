import { ArrowDownToLine, BriefcaseBusiness, ChevronRight, Code2, Github, GraduationCap, Linkedin, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { RESUME_HREF, SITE_LOCATION, SITE_NAME, SOCIALS } from '@/data/profile';
import { certificates } from '@/data/certificates';
import styles from './about.module.css';

export function AboutProfile() {
  return <div className={styles.profile}>
    <aside className={styles.identity}>
      <div className={styles.avatar}><img src="/hi.webp" alt={SITE_NAME} width={128} height={128} /><span aria-label="Software engineer"><Code2 size={14} /></span></div>
      <h3>{SITE_NAME}</h3>
      <p className={styles.role}>Software Engineer</p>
      <p className={styles.location}><MapPin size={12} /> {SITE_LOCATION}</p>
      <div className={styles.actions}>
        <a href={SOCIALS.linkedin.href} target="_blank" rel="noreferrer"><Linkedin size={19} /><span>Connect</span></a>
        <a href={SOCIALS.github.href} target="_blank" rel="noreferrer"><Github size={19} /><span>GitHub</span></a>
        <a href={RESUME_HREF} target="_blank" rel="noreferrer"><ArrowDownToLine size={19} /><span>Résumé</span></a>
      </div>
      <section className={styles.group} aria-label="Current work">
        <div className={styles.fact}><span className={`${styles.icon} ${styles.blue}`}><BriefcaseBusiness size={15} /></span><div><small>Current workplace</small><strong>Hospital Miri</strong></div></div>
        <div className={styles.fact}><span className={`${styles.icon} ${styles.purple}`}><Sparkles size={15} /></span><div><small>Co-founder & developer</small><strong>Scribear</strong></div></div>
      </section>
      
    </aside>
    <div className={styles.details}>
      <section aria-labelledby="about-story"><h4 id="about-story" className={styles.sectionTitle}>ABOUT ME</h4><div className={`${styles.group} ${styles.story}`}><h5>Hospital systems<br />and client applications.</h5><p>I build digital systems at Hospital Miri and applications for clients as co-founder of Scribear. My work covers interfaces, APIs, databases, and deployment in healthcare, recruitment, and geospatial analytics.</p><p>My degree is in Cognitive Science, with a Computer Science minor focused on AI and machine learning.</p></div></section>
      <section aria-labelledby="about-education"><h4 id="about-education" className={styles.sectionTitle}>EDUCATION</h4><div className={`${styles.group} ${styles.education}`}><span className={`${styles.icon} ${styles.blue}`}><GraduationCap size={19} /></span><div><strong>B.Sc. Cognitive Science</strong><p>Universiti Malaysia Sarawak</p><small>Computer Science minor · AI/ML</small><div className={styles.badges}><span>Class of 2025</span><span>CGPA 3.12</span></div></div></div></section>
      <section aria-labelledby="about-milestones"><h4 id="about-milestones" className={styles.sectionTitle}>CERTIFICATES & AWARDS</h4><div className={styles.group}>{certificates.map((certificate, index) => <a className={styles.certificate} key={certificate.id} href={certificate.imageSrc} target="_blank" rel="noreferrer"><span className={`${styles.icon} ${[styles.green, styles.orange, styles.purple][index]}`}><ShieldCheck size={17} /></span><div><strong>{certificate.title}</strong><small>{certificate.issuer}</small></div><ChevronRight size={15} /></a>)}</div><p className={styles.hint}>Select an item to view its certificate.</p></section>
    </div>
  </div>;
}
