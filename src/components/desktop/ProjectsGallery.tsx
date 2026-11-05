'use client';

import { ArrowUpRight, ChevronLeft } from 'lucide-react';
import { useState, type RefObject } from 'react';
import { showcaseData } from '@/data/showcaseData';
import styles from './projects.module.css';

const categories = ['All work', 'AI & systems', 'Mobile & AR', 'Utilities'] as const;
const summaries: Record<string, string> = {
  One_in_All: 'Claude Code, Codex and Hermes side by side in one desktop window.',
  XAI: 'Explainable malware detection: 412 PE-file features, SHAP explanations, scales to 1.1M samples.',
  Palm_Detection: 'Oil-palm anomaly detection from aerial imagery at 92% accuracy.',
  DarkLace: 'A desktop meeting assistant with voice input and streamed responses.',
  Super_Dim: 'A Flutter app that dims the screen with a dark overlay.',
  UNIMAS_AR: 'AR navigation for the UNIMAS campus.',
  file_converter: 'Batch image and media conversion with Python and FFmpeg.',
};

export function ProjectsGallery({ selected, onSelect }: {
  selected: string | null;
  onSelect: (value: string | null) => void;
  query?: string;
  onQueryChange?: (value: string) => void;
  searchRef?: RefObject<HTMLInputElement | null>;
}) {
  const [category, setCategory] = useState<(typeof categories)[number]>('All work');
  const project = showcaseData.find(item => item.id === selected);
  const projects = showcaseData.filter(item => {
    return category === 'All work' ||
      (category === 'AI & systems' && ['One_in_All', 'XAI', 'Palm_Detection', 'DarkLace'].includes(item.folder)) ||
      (category === 'Mobile & AR' && ['Super_Dim', 'UNIMAS_AR'].includes(item.folder)) ||
      (category === 'Utilities' && item.folder === 'file_converter');
  });

  if (project) return <article className={styles.detail}>
    <button className={styles.back} onClick={() => onSelect(null)}><ChevronLeft size={16} /> Selected work</button>
    <div className={`${styles.detailImage} ${styles.originalImage}`}><img src={project.images[0]} alt={`${project.title} screenshot`} /></div>
    <div className={styles.detailHeading}><span className={styles.category}>{project.category}</span><h3>{project.title}</h3><p className={styles.lead}>{summaries[project.folder]}</p>{project.links && <div className={styles.links}>{project.links.map(link => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={14} /></a>)}</div>}</div>
    <div className={styles.detailBody}><section><h4>About the project</h4><p>{project.desc}</p></section><section><h4>Built with</h4><div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></section></div>
    {project.images.slice(1).map((src, index) => <img className={styles.supportingImage} key={src} src={src} alt={`${project.title} screenshot ${index + 2}`} loading="lazy" />)}
  </article>;

  return <div className={styles.gallery}>
    <header className={styles.header}><div><span className={styles.eyebrow}>PROJECTS</span><h3>Selected <span>work.</span><sup>{String(showcaseData.length).padStart(2, '0')}</sup></h3><p>AI developer tools, security tools, computer vision, mobile apps, and file conversion.</p></div><span className={styles.headerNote}>{String(showcaseData.length).padStart(2, '0')}<br />PROJECTS <ArrowUpRight size={15} /></span></header>
    <div className={styles.toolbar}><div className={styles.filters} role="group" aria-label="Filter projects by category">{categories.map(value => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</div></div>
    <div className={styles.grid}>{projects.map(item => <button className={styles.card} key={item.id} onClick={() => onSelect(item.id)}>
      <div className={`${styles.cover} ${styles.originalImage}`}><img src={item.images[0]} alt={`${item.title} screenshot`} loading="lazy" /><span className={styles.number}>{String(showcaseData.indexOf(item) + 1).padStart(2, '0')}</span><span className={styles.open}><ArrowUpRight size={18} /></span></div>
      <div className={styles.cardBody}><span className={styles.category}>{item.category}</span><h4>{item.title}</h4><p>{summaries[item.folder]}</p><div className={styles.cardFooter}><span>{item.tags.slice(0, 3).join(' / ')}</span><span>View project <ArrowUpRight size={11} /></span></div></div>
    </button>)}</div>
    {!projects.length && <div className={styles.empty}><h4>No projects found</h4><p>Choose a different category.</p><button onClick={() => setCategory('All work')}>Reset filters</button></div>}
    <footer className={styles.galleryFooter}><span>{String(projects.length).padStart(2, '0')} / {String(showcaseData.length).padStart(2, '0')} PROJECTS</span><span>Valentine Agam</span></footer>
  </div>;
}
