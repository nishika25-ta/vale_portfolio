import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function highlightTsx(code: string): string {
  try {
    return Prism.highlight(code, Prism.languages.tsx, 'tsx');
  } catch {
    return escapeHtml(code);
  }
}
