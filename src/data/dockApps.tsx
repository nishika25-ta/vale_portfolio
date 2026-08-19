import { Award, Briefcase, FileText, FolderOpen, GraduationCap, Home, Mail, TerminalSquare, User } from 'lucide-react';
import type { DockAppItem } from '../types/portfolio';

export const dockApps: DockAppItem[] = [
  { id: 'home', name: 'Home', icon: <Home /> },
  { id: 'about', name: 'About Me', icon: <User /> },
  { id: 'experience', name: 'Experience', icon: <Briefcase /> },
  { id: 'projects', name: 'Work', icon: <FolderOpen /> },
  { id: 'skills', name: 'Skills', icon: <TerminalSquare /> },
  { id: 'education', name: 'Education', icon: <GraduationCap /> },
  { id: 'certificates', name: 'Certs', icon: <Award /> },
  { id: 'contact', name: 'Connect', icon: <Mail /> },
  {
    id: 'divider',
    name: '',
    icon: <div className="w-px h-full bg-white/20 mx-1.5" />,
    isDivider: true,
  },
  { id: 'resume', name: 'Resume', icon: <FileText /> },
];
