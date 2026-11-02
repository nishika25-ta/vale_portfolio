'use client';

import { ArrowUpRight, ChevronLeft } from 'lucide-react';
import { useState, type RefObject } from 'react';
import { showcaseData } from '@/data/showcaseData';
import styles from './projects.module.css';

const categories = ['All work', 'AI & systems', 'Mobile & AR', 'Utilities'] as const;
const summaries: Record<string, string> = {
  XAI: 'PE-file malware analysis with SHAP feature explanations.',
  Palm_Detection: 'Oil-palm anomaly detection from aerial imagery.',
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
      (category === 'AI & systems' && ['XAI', 'Palm_Detection', 'DarkLace'].includes(item.folder)) ||
      (category === 'Mobile & AR' && ['Super_Dim', 'UNIMAS_AR'].includes(item.folder)) ||
      (category === 'Utilities' && item.folder === 'file_converter');
  });

  if (project) return <article className={styles.detail}>
    <button className={styles.back} onClick={() => onSelect(null)}><ChevronLeft size={16} /> Selected work</button>
    <div className={`${styles.detailImage} ${!project.cover ? styles.originalImage : ''}`}><img src={project.cover ?? project.images[0]} alt={project.cover ? `${project.title} project preview` : `${project.title} original detection results`} /></div>
    {project.cover && <p className={styles.imageNote}>Interface visualization · design concept</p>}
    <div className={styles.detailHeading}><span className={styles.category}>{project.category}</span><h3>{project.title}</h3><p className={styles.lead}>{summaries[project.folder]}</p></div>
    <div className={styles.detailBody}><section><h4>About the project</h4><p>{project.desc}</p></section><section><h4>Built with</h4><div className={styles.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div></section></div>
    {!project.cover && project.images.slice(1).map((src, index) => <img className={styles.supportingImage} key={src} src={src} alt={`${project.title} original project view ${index + 2}`} loading="lazy" />)}
  </article>;

  return <div className={styles.gallery}>
    <header className={styles.header}><div><span className={styles.eyebrow}>PROJECTS</span><h3>Selected <span>work.</span><sup>06</sup></h3><p>Security tools, computer vision, mobile apps, and file conversion.</p></div><span className={styles.headerNote}>06<br />PROJECTS <ArrowUpRight size={15} /></span></header>
    <div className={styles.toolbar}><div className={styles.filters} role="group" aria-label="Filter projects by category">{categories.map(value => <button key={value} aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</div></div>
    <div className={styles.grid}>{projects.map(item => <button className={styles.card} key={item.id} onClick={() => onSelect(item.id)}>
      <div className={`${styles.cover} ${!item.cover ? styles.originalImage : ''}`}><img src={item.cover ?? item.images[0]} alt={item.cover ? `${item.title} project preview` : `${item.title} original detection results`} loading="lazy" /><span className={styles.number}>{String(showcaseData.indexOf(item) + 1).padStart(2, '0')}</span><span className={styles.open}><ArrowUpRight size={18} /></span></div>
      <div className={styles.cardBody}><span className={styles.category}>{item.category}</span><h4>{item.title}</h4><p>{summaries[item.folder]}</p><div className={styles.cardFooter}><span>{item.tags.slice(0, 3).join(' / ')}</span><span>View project <ArrowUpRight size={11} /></span></div></div>
    </button>)}</div>
    {!projects.length && <div className={styles.empty}><h4>No projects found</h4><p>Choose a different category.</p><button onClick={() => setCategory('All work')}>Reset filters</button></div>}
    <footer className={styles.galleryFooter}><span>{String(projects.length).padStart(2, '0')} / 06 PROJECTS</span><span>Valentine Agam</span></footer>
  </div>;
}
