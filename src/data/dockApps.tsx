import { Award, Briefcase, FileText, FolderOpen, GraduationCap, Home, Mail, TerminalSquare, User } from 'lucide-react';
import type { DockAppItem } from '../types/portfolio';

export const dockApps: DockAppItem[] = [
  { id: 'home', name: 'Home', icon: <Home /> },
  { id: 'about', name: 'About Me', icon: <User /> },
  { id: 'certificates', name: 'Certs', icon: <Award /> },
  { id: 'experience', name: 'Experience', icon: <Briefcase /> },
  { id: 'education', name: 'Education', icon: <GraduationCap /> },
  { id: 'skills', name: 'Skills', icon: <TerminalSquare /> },
  { id: 'projects', name: 'Work', icon: <FolderOpen /> },
  { id: 'contact', name: 'Contact', icon: <Mail /> },
  {
    id: 'divider',
    name: '',
    icon: <div className="w-px h-full bg-white/20 mx-1.5" />,
    isDivider: true,
  },
  { id: 'resume', name: 'Resume', icon: <FileText /> },
];
