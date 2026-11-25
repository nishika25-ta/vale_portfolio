'use client';

import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import {
  AudioLines,
  Award,
  BriefcaseBusiness,
  Code2,
  FileText,
  Folder,
  MessageCircle,
  Moon,
  Search,
  Settings2,
  Sun,
  UserRound,
  Wallpaper,
  X,
} from 'lucide-react';
import { showcaseData } from '@/data/showcaseData';
import { certificates, type Certificate } from '@/data/certificates';
import styles from './desktop.module.css';

export type SpotlightApp =
  | 'About'
  | 'Projects'
  | 'Experience'
  | 'Skills'
  | 'Certificates'
  | 'Music'
  | 'Résumé'
  | 'Contact'
  | 'Appearance';

type SpotlightEntry = {
  id: string;
  title: string;
  subtitle: string;
  kind: 'App' | 'Project' | 'Certificate' | 'Action';
  icon: ReactNode;
  run: () => void;
};

export function SpotlightModal({
  open,
  onClose,
  onOpenApp,
  onOpenProject,
  onOpenCertificate,
  darkMode,
  onToggleTheme,
  onCycleWallpaper,
}: {
  open: boolean;
  onClose: () => void;
  onOpenApp: (app: SpotlightApp) => void;
  onOpenProject: (id: string) => void;
  onOpenCertificate: (cert: Certificate) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
  onCycleWallpaper: () => void;
}) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();

  const entries = useMemo<SpotlightEntry[]>(() => {
    const apps: SpotlightEntry[] = [
      { id: 'app-about', title: 'About Valentine', subtitle: 'Background, education & current work', kind: 'App', icon: <UserRound size={16} />, run: () => onOpenApp('About') },
      { id: 'app-projects', title: 'Projects', subtitle: `${showcaseData.length} shipped apps, AI & systems`, kind: 'App', icon: <Folder size={16} />, run: () => onOpenApp('Projects') },
      { id: 'app-certs', title: 'Certificates', subtitle: `${certificates.length} verified credentials including AWS & IBM`, kind: 'App', icon: <Award size={16} />, run: () => onOpenApp('Certificates') },
      { id: 'app-exp', title: 'Experience', subtitle: 'Hospital Miri, Scribear, Zenara Jaya, SOPB', kind: 'App', icon: <BriefcaseBusiness size={16} />, run: () => onOpenApp('Experience') },
      { id: 'app-skills', title: 'Skills & Stack', subtitle: 'Languages, full-stack, AI/ML & geospatial', kind: 'App', icon: <Code2 size={16} />, run: () => onOpenApp('Skills') },
      { id: 'app-music', title: 'Soundtrack', subtitle: 'Play music & browse 5-track queue', kind: 'App', icon: <AudioLines size={16} />, run: () => onOpenApp('Music') },
      { id: 'app-resume', title: 'Résumé', subtitle: 'Preview or download 2026 PDF résumé', kind: 'App', icon: <FileText size={16} />, run: () => onOpenApp('Résumé') },
      { id: 'app-contact', title: 'Contact', subtitle: 'LinkedIn, GitHub & Sarawak location', kind: 'App', icon: <MessageCircle size={16} />, run: () => onOpenApp('Contact') },
      { id: 'app-appearance', title: 'Appearance & Music', subtitle: 'Wallpapers, animations & soundtrack', kind: 'App', icon: <Settings2 size={16} />, run: () => onOpenApp('Appearance') },
    ];

    const projects: SpotlightEntry[] = showcaseData.map((item) => ({
      id: `proj-${item.id}`,
      title: item.title,
      subtitle: `${item.category} — ${item.tags.slice(0, 3).join(', ')}`,
      kind: 'Project',
      icon: <Folder size={16} />,
      run: () => onOpenProject(item.id),
    }));

    const certs: SpotlightEntry[] = certificates.map((cert) => ({
      id: `cert-${cert.id}`,
      title: cert.title,
      subtitle: `${cert.issuer} (${cert.date})`,
      kind: 'Certificate',
      icon: <Award size={16} />,
      run: () => onOpenCertificate(cert),
    }));

    const actions: SpotlightEntry[] = [
      {
        id: 'act-theme',
        title: darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        subtitle: 'Toggle ValeOS liquid glass appearance',
        kind: 'Action',
        icon: darkMode ? <Sun size={16} /> : <Moon size={16} />,
        run: () => onToggleTheme(),
      },
      {
        id: 'act-wallpaper',
        title: 'Cycle Desktop Wallpaper',
        subtitle: 'Switch atmospheric wallpaper treatment',
        kind: 'Action',
        icon: <Wallpaper size={16} />,
        run: () => onCycleWallpaper(),
      },
    ];

    return [...apps, ...certs, ...projects, ...actions];
  }, [darkMode, onCycleWallpaper, onOpenApp, onOpenCertificate, onOpenProject, onToggleTheme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return entries.slice(0, 10);
    return entries.filter(
      (entry) =>
        entry.title.toLowerCase().includes(q) ||
        entry.subtitle.toLowerCase().includes(q) ||
        entry.kind.toLowerCase().includes(q),
    );
  }, [entries, query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setQuery('');
      setActiveIndex(0);
      dialog.showModal();
      inputRef.current?.focus();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const updateQuery = (value: string) => {
    setQuery(value);
    setActiveIndex(0);
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.spotlightOverlay}
      aria-label="Spotlight search"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && !event.nativeEvent.isComposing) {
          event.preventDefault();
          onClose();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.spotlightPanel}>
        <div className={styles.spotlightInputRow}>
          <Search size={18} aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => updateQuery(event.target.value)}
            placeholder="Search apps, projects, and more"
            aria-label="Search ValeOS"
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={open}
            aria-controls={listId}
            aria-activedescendant={filtered[activeIndex] ? `${listId}-${activeIndex}` : undefined}
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing || !filtered.length) return;
              if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();
                const step = event.key === 'ArrowDown' ? 1 : -1;
                const next = (activeIndex + step + filtered.length) % filtered.length;
                setActiveIndex(next);
                document.getElementById(`${listId}-${next}`)?.scrollIntoView({ block: 'nearest' });
              } else if (event.key === 'Enter' && filtered[activeIndex]) {
                event.preventDefault();
                filtered[activeIndex].run();
                onClose();
              }
            }}
          />
          {query && (
            <button
              type="button"
              className={styles.spotlightEsc}
              aria-label="Clear search"
              onClick={() => {
                updateQuery('');
                inputRef.current?.focus();
              }}
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
          <button type="button" className={styles.spotlightEsc} onClick={onClose} aria-label="Close Spotlight">
            Esc
          </button>
        </div>

        <div id={listId} className={styles.spotlightList} role="listbox" aria-label="Search results">
          {filtered.length > 0 ? (
            filtered.map((item, index) => (
              <button
                type="button"
                key={item.id}
                id={`${listId}-${index}`}
                role="option"
                tabIndex={-1}
                aria-selected={index === activeIndex}
                data-selected={index === activeIndex ? 'true' : 'false'}
                className={styles.spotlightItem}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  item.run();
                  onClose();
                }}
              >
                <span className={styles.spotlightItemIcon}>{item.icon}</span>
                <span className={styles.spotlightItemText}>
                  <strong>{item.title}</strong>
                  <small>{item.subtitle}</small>
                </span>
                <span className={styles.spotlightItemKind}>{item.kind}</span>
              </button>
            ))
          ) : (
            <div className={styles.spotlightEmpty}>No matches for &ldquo;{query}&rdquo;</div>
          )}
        </div>
      </div>
    </dialog>
  );
}
