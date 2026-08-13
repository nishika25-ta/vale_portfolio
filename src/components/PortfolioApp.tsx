'use client';

import Image from 'next/image';
import {
  ArrowDownRight,
  ArrowUpRight,
  Award,
  CheckCircle2,
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { showcaseData } from '@/data/showcaseData';

const experience = [
  {
    period: 'Jun 2026 — Present',
    company: 'Hospital Miri · Jabatan Kesihatan Sarawak',
    role: 'Information & Corporate Communications Officer (MySTEP)',
    location: 'Miri, Sarawak',
    summary: 'Leading hands-on digital transformation for hospital operations, from discovery and database architecture to deployment and maintenance.',
    outcomes: [
      'Designed and maintain the official Hospital Miri website.',
      'Built a full-stack digital employee onboarding system with Next.js and PostgreSQL, replacing paper-based forms with one centralized workflow.',
      'Developed a wheelchair tracking system for better asset accountability and availability across departments.',
      'Developing a hospital wayfinding platform for patients, visitors, and healthcare staff.',
      'Own the full software lifecycle and deploy production systems with Docker and Kubernetes.',
    ],
    stack: ['Next.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'JavaScript'],
  },
  {
    period: 'Mar 2026 — Present',
    company: 'Scribear',
    role: 'Co-Founder · Data Analyst & Full-Stack Developer',
    location: 'Miri, Sarawak',
    summary: 'Building custom applications and data workflows directly with clients, turning business requirements into reliable software and clear reporting.',
    outcomes: [
      'Reduced recurring client reporting turnaround by 40% with reproducible SQL and Python pipelines.',
      'Improved data quality across 3+ client projects through systematic cleaning, validation, and Power BI reporting.',
      'Increased application reliability by 30% with scalable APIs and structured PostgreSQL data capture.',
      'Deliver responsive interfaces, REST APIs, relational database solutions, deployment, and ongoing maintenance.',
    ],
    stack: ['Python', 'SQL', 'FastAPI', 'Next.js', 'Supabase', 'Power BI'],
  },
  {
    period: 'Dec 2025 — Mar 2026',
    company: 'Zenara Jaya',
    role: 'Junior Data & Backend Engineer · Contract',
    location: 'Miri, Sarawak',
    summary: 'Built an AI-assisted recruitment platform that combined candidate classification, OCR extraction, anomaly detection, and operational automation.',
    outcomes: [
      'Cut manual candidate screening time by 60% with AI-assisted classification and statistical pattern matching.',
      'Added duplicate and bot-submission detection by cross-referencing applicant data in PostgreSQL.',
      'Maintained data integrity across 100+ candidate records with structured cleaning and OCR fallback.',
      'Automated weekly recruitment operations with n8n, reducing processing from 5 hours to under 2 hours.',
    ],
    stack: ['FastAPI', 'Python', 'PostgreSQL', 'Claude API', 'OCR', 'n8n'],
  },
  {
    period: 'Jul 2024 — Oct 2024',
    company: 'Sarawak Oil Palms Berhad',
    role: 'GIS Data Analyst Intern',
    location: 'Miri, Sarawak',
    summary: 'Applied computer vision, geospatial analysis, and automation to large plantation datasets and translated findings into management-ready reports.',
    outcomes: [
      'Achieved 92% anomaly-detection accuracy with custom YOLO and TensorFlow models.',
      'Improved field-data processing efficiency by 35% with Python FIT-to-GPX conversion and cleaning scripts.',
      'Produced 3D visualisation reports with Global Mapper and QGIS for land-planning decisions.',
      'Conducted palm-census correlation studies across multi-hectare datasets.',
    ],
    stack: ['Python', 'TensorFlow', 'YOLO', 'OpenCV', 'QGIS', 'Global Mapper'],
  },
];

const skillGroups = [
  { number: '01', title: 'Product engineering', text: 'Next.js, React, JavaScript, HTML5, CSS3, responsive design, REST APIs, FastAPI, C++, and Dart.' },
  { number: '02', title: 'Data & intelligence', text: 'Python, SQL, pandas, NumPy, Scikit-learn, Power BI, Excel, data cleaning, trend analysis, and visualisation.' },
  { number: '03', title: 'AI & computer vision', text: 'TensorFlow, YOLO, OpenCV, deep learning, machine learning, OCR, NLP, anomaly detection, and classification.' },
  { number: '04', title: 'Infrastructure & data', text: 'PostgreSQL, Supabase, Firebase, Docker, Kubernetes, DigitalOcean, Linux, Git, Adminer, RBAC, and audit logging.' },
  { number: '05', title: 'Geospatial systems', text: 'QGIS, Global Mapper, GIS, remote sensing, spatial analysis, map APIs, and automated detection-to-report workflows.' },
];

const credentials = [
  { title: 'CompTIA Security+', meta: 'CompTIA · 2026', text: 'Cybersecurity foundations spanning access control, account abuse patterns, risk, and data integrity.' },
  { title: 'Python for Data Science', meta: 'IBM Cognitive Class', text: 'Statistical analysis, data cleaning, visualisation, and practical Python workflows.' },
  { title: 'Mobile Application Development Award', meta: 'UNIMAS · 2024', text: 'Recognition for excellence in mobile application development.' },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

function SectionIntro({ index, title, text }: { index: string; title: string; text: string }) {
  return <div className="section-intro"><p className="section-index">({index})</p><h2>{title}</h2><p className="section-copy">{text}</p></div>;
}

export default function PortfolioApp() {
  const featuredProjects = showcaseData.filter((project) => ['palm-detection', 'xai', 'earthsee', 'file-converter'].includes(project.id));

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="wordmark" href="#top" aria-label="Valentine Agam, back to top">VA<span>®</span></a>
        <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#experience">Experience</a><a href="#about">About</a></nav>
        <a className="topbar-contact" href="mailto:valentineagam6@gmail.com">Let&apos;s talk <ArrowUpRight size={15} /></a>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="availability"><span /> Available for select opportunities</div>
              <h1 id="hero-title">I build systems<em> people can use.</em></h1>
              <p>Valentine Agam is a software engineer and data specialist designing full-stack products, enterprise workflows, and applied AI from Miri, Sarawak.</p>
              <div className="hero-actions">
                <a className="button button-dark" href="#work">Explore my work <ArrowDownRight size={17} /></a>
                <a className="text-link" href="/Valentine_Resume_2026_Data.pdf" download><Download size={16} /> Download résumé</a>
              </div>
            </div>
            <div className="hero-portrait">
              <div className="portrait-frame"><Image src="/hi.webp" alt="Portrait of Valentine Agam" fill priority sizes="(max-width: 900px) 86vw, 36vw" /></div>
              <p className="portrait-note">Engineer · Analyst · Builder</p>
              <div className="portrait-stamp"><Sparkles size={18} /><span>Ideas into<br />working systems</span></div>
            </div>
          </div>
          <div className="hero-proof" aria-label="Career highlights">
            <div><strong>92%</strong><span>ML detection accuracy</span></div>
            <div><strong>60%</strong><span>less manual processing</span></div>
            <div><strong>4</strong><span>industry roles</span></div>
            <div><strong>11+</strong><span>products & explorations</span></div>
          </div>
        </section>

        <section className="statement" id="about">
          <Eyebrow>Profile · 2026</Eyebrow>
          <p>I work at the point where <span>software, data, and operations</span> meet—understanding the messy real-world problem, shaping a useful system, and staying close enough to the implementation to make sure it ships.</p>
          <div className="statement-meta"><span><MapPin size={16} /> Miri, Sarawak, Malaysia</span><span><CheckCircle2 size={16} /> English & Bahasa Melayu</span><span><ShieldCheck size={16} /> CompTIA Security+ certified</span></div>
        </section>

        <section className="work-section" id="work">
          <SectionIntro index="01" title="Selected work" text="A cross-section of machine learning, geospatial systems, developer tools, and product engineering." />
          <div className="featured-grid">
            {featuredProjects.map((project, index) => (
              <article className={`project-card project-${index + 1}`} key={project.id}>
                <div className="project-image"><Image src={project.images[0] || project.thumb} alt={`${project.title} interface`} fill sizes="(max-width: 900px) 100vw, 55vw" /><p>{String(index + 1).padStart(2, '0')} / FEATURED</p></div>
                <div className="project-info"><h3>{project.title}</h3><p>{project.desc}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
              </article>
            ))}
          </div>
          <div className="project-archive">
            <div className="archive-heading"><h3>Product archive</h3><span>{showcaseData.length} projects</span></div>
            {showcaseData.map((project, index) => (
              <details className="archive-row" key={project.id}>
                <summary><span className="archive-number">{String(index + 1).padStart(2, '0')}</span><span className="archive-title">{project.title}</span><span className="archive-tags">{project.tags.slice(0, 3).join(' · ')}</span><span className="archive-toggle">+</span></summary>
                <div className="archive-detail"><p>{project.desc}</p><div className="archive-visual"><Image src={project.images[0] || project.thumb} alt={`${project.title} preview`} fill sizes="(max-width: 760px) 100vw, 40vw" /></div></div>
              </details>
            ))}
          </div>
        </section>

        <section className="experience-section" id="experience">
          <SectionIntro index="02" title="Experience" text="Four roles across healthcare, client services, AI recruitment, and plantation intelligence." />
          <div className="timeline">
            {experience.map((item, index) => (
              <article className="timeline-row" key={item.company}>
                <div className="timeline-marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
                <div className="timeline-meta"><p>{item.period}</p><span><MapPin size={13} /> {item.location}</span></div>
                <div className="timeline-body"><h3>{item.company}</h3><h4>{item.role}</h4><p className="timeline-summary">{item.summary}</p><ul>{item.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul><div className="tag-row">{item.stack.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
              </article>
            ))}
          </div>
        </section>

        <section className="capabilities-section">
          <SectionIntro index="03" title="Capabilities" text="A practical toolkit for taking a system from first conversation to production." />
          <div className="capability-list">{skillGroups.map((group) => <article key={group.number}><span>{group.number}</span><h3>{group.title}</h3><p>{group.text}</p></article>)}</div>
        </section>

        <section className="credentials-section">
          <SectionIntro index="04" title="Education & credentials" text="Cognitive science gave me a human-centered lens; computer science gave me the tools to build." />
          <div className="education-card"><div className="education-icon"><GraduationCap size={28} /></div><div><Eyebrow>Universiti Malaysia Sarawak · November 2025</Eyebrow><h3>B.Sc. Cognitive Science</h3><h4>Minor in Computer Science · CGPA 3.12</h4><p>Dean&apos;s List, Year 3 Semester 2. Relevant coursework included artificial intelligence, data analysis, statistics, software development, and web development.</p></div></div>
          <div className="credential-grid">{credentials.map((credential) => <article key={credential.title}><div className="credential-top"><Award size={22} /><span>{credential.meta}</span></div><h3>{credential.title}</h3><p>{credential.text}</p></article>)}</div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-copy"><Eyebrow>Have a useful problem?</Eyebrow><h2>Let&apos;s build something that works.</h2><p>I&apos;m open to software engineering, data, AI, and digital-transformation opportunities in Malaysia and beyond.</p></div>
          <div className="contact-links"><a href="mailto:valentineagam6@gmail.com"><Mail size={19} /> Email me <ArrowUpRight size={18} /></a><a href="https://wa.me/60146521429" target="_blank" rel="noreferrer"><MessageCircle size={19} /> WhatsApp <ArrowUpRight size={18} /></a></div>
          <div className="contact-details"><a href="mailto:valentineagam6@gmail.com">valentineagam6@gmail.com</a><a href="tel:+60146521429">+60 14-652 1429</a><span>Miri, Sarawak · MY</span></div>
        </section>
      </main>
      <footer><p>© 2026 Valentine Agam</p><div><a href="https://github.com/nishika25-ta" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a><a href="https://www.linkedin.com/in/valentine-a-a278a7254" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a></div><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
