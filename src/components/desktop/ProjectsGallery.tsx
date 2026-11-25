'use client';

import { ChevronLeft, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { showcaseData } from '@/data/showcaseData';
import styles from './projects.module.css';

const categories = ['All work', 'AI & systems', 'Mobile & AR', 'Utilities'] as const;

const summaries: Record<string, string> = {
  One_in_All: 'Claude Code, Codex, and Hermes side by side in one desktop window.',
  XAI: 'Explainable malware detection with 412 PE-file features, SHAP explanations, and EMBER support up to 1.1M samples.',
  Palm_Detection: 'Oil-palm anomaly detection from aerial imagery at 92% accuracy.',
  DarkLace: 'Always-on-top desktop meeting assistant with voice input and streamed responses.',
  Super_Dim: 'Flutter utility that lowers screen brightness with an accessible dark overlay.',
  UNIMAS_AR: 'Mobile AR campus navigation with spatial overlays for UNIMAS.',
  file_converter: 'Batch image and media conversion powered by Python and FFmpeg.',
};

export function ProjectsGallery({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (value: string | null) => void;
}) {
  const [category, setCategory] = useState<(typeof categories)[number]>('All work');
  const [query, setQuery] = useState('');
  const [activeImage, setActiveImage] = useState(0);

  const project = showcaseData.find((item) => item.id === selected);

  useEffect(() => {
    setActiveImage(0);
  }, [selected]);

  const projects = showcaseData.filter((item) => {
    const matchesCategory =
      category === 'All work' ||
      (category === 'AI & systems' && ['One_in_All', 'XAI', 'Palm_Detection', 'DarkLace'].includes(item.folder)) ||
      (category === 'Mobile & AR' && ['Super_Dim', 'UNIMAS_AR'].includes(item.folder)) ||
      (category === 'Utilities' && item.folder === 'file_converter');

    if (!matchesCategory) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q) ||
      item.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  });

  if (project) {
    const currentImg = project.images[activeImage] ?? project.images[0];
    return (
      <article className={styles.detail}>
        <button type="button" className={styles.back} onClick={() => onSelect(null)}>
          <ChevronLeft size={16} /> Back to projects
        </button>

        <div className={styles.detailImage}>
          <img src={currentImg} alt={`${project.title} screenshot ${activeImage + 1}`} />
        </div>

        {project.images.length > 1 && (
          <div className={styles.thumbStrip} role="group" aria-label="Project screenshots">
            {project.images.map((src, idx) => (
              <button
                type="button"
                key={src}
                className={styles.thumbBtn}
                aria-pressed={idx === activeImage}
                aria-label={`View screenshot ${idx + 1}`}
                onClick={() => setActiveImage(idx)}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        <div className={styles.detailHeading}>
          <span className={styles.category}>{project.category}</span>
          <h3>{project.title}</h3>
          <p className={styles.lead}>{summaries[project.folder]}</p>
          {project.links && (
            <div className={styles.links}>
              {project.links.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>

        <div className={styles.detailBody}>
          <section>
            <h4>About the project</h4>
            <p>{project.desc}</p>
          </section>
          <section>
            <h4>Built with</h4>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </section>
        </div>
      </article>
    );
  }

  return (
    <div className={styles.gallery}>
      <header className={styles.header}>
        <div>
          <h3>Selected work</h3>
          <p>AI developer tools, explainable security ML, computer vision, mobile apps, and utilities.</p>
        </div>
        <span className={styles.countChip}>{showcaseData.length} projects</span>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.filters} role="group" aria-label="Filter projects by category">
          {categories.map((value) => (
            <button
              type="button"
              key={value}
              aria-pressed={category === value}
              onClick={() => setCategory(value)}
            >
              {value}
            </button>
          ))}
        </div>

        <label className={styles.search}>
          <Search size={14} aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter projects..."
            aria-label="Filter projects"
          />
        </label>
      </div>

      <div className={styles.grid}>
        {projects.map((item) => (
          <button type="button" className={styles.card} key={item.id} onClick={() => onSelect(item.id)}>
            <div className={styles.cover}>
              <img src={item.images[0]} alt={`${item.title} screenshot`} loading="lazy" />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.category}>{item.category}</span>
              <h4>{item.title}</h4>
              <p>{summaries[item.folder]}</p>
              <div className={styles.cardFooter}>
                <span>{item.tags.slice(0, 3).join(', ')}</span>
                <span className={styles.viewLink}>Explore</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {!projects.length && (
        <div className={styles.empty}>
          <h4>No matching projects</h4>
          <p>Try clearing your search or picking another category.</p>
          <button
            type="button"
            onClick={() => {
              setCategory('All work');
              setQuery('');
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
