import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import type { ShowcaseItem } from '@/types/portfolio';

export function ProjectDialog({ project, onClose, initialSlide = 0 }: { project: ShowcaseItem | null; onClose: () => void; initialSlide?: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const element = dialog.current;
    if (!project || !element) return;
    setSlide(Math.min(initialSlide, project.images.length - 1));
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    element.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previous;
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, [project, initialSlide]);

  if (!project) return null;
  const go = (direction: number) => setSlide((value) => (value + direction + project.images.length) % project.images.length);
  return <dialog className="project-dialog" ref={dialog} onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={(event) => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="project-dialog-title"><div className="dialog-shell"><div className="dialog-top"><span>PROJECT FILE / {project.category.toUpperCase()}</span><button onClick={onClose} aria-label="Close project"><X size={20} /></button></div><div className="dialog-image"><img src={project.images[slide % project.images.length]} alt={`${project.title}, screenshot ${slide + 1}`} /></div><div className="dialog-pagination"><span aria-live="polite">{String(slide + 1).padStart(2, '0')} / {String(project.images.length).padStart(2, '0')}</span><div><button onClick={() => go(-1)} disabled={project.images.length < 2} aria-label="Previous screenshot"><ArrowLeft size={18} /></button><button onClick={() => go(1)} disabled={project.images.length < 2} aria-label="Next screenshot"><ArrowRight size={18} /></button></div></div><div className="dialog-copy"><h2 id="project-dialog-title">{project.title}</h2><p>{project.desc}</p><div className="skill-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div></div></dialog>;
}
