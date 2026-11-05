import type { ShowcaseItem } from '../types/portfolio';

/**
 * Folders under `public/images/contents/` and their image files.
 * Entries starting with `icons/` load from `public/icons/` and are used for the grid thumb only — not the detail carousel.
 */
const FOLDER_MANIFEST = [
  {
    folder: 'One_in_All',
    title: 'One-in-All',
    category: 'Developer Tools · AI',
    featured: true,
    desc: 'A Windows desktop app that runs Claude Code, Codex and Hermes side by side, each in its own pane with its own chat, folder, model picker and built-in PowerShell terminal. Supports image prompts, permission modes and automatic fallback to models your account can use. It drives the official CLIs with your own accounts instead of proxying their APIs.',
    tags: ['Electron', 'Node.js', 'xterm.js', 'WebSockets'],
    files: ['one_in_all_main.webp', 'one_in_all_models.webp'],
    links: [
      { label: 'Download for Windows', href: 'https://github.com/nishika25-ta/all_in_one/releases/latest' },
      { label: 'Source code', href: 'https://github.com/nishika25-ta/all_in_one' },
    ],
  },
  {
    folder: 'XAI',
    title: 'XAI-PE Analyzer',
    category: 'Security · ML',
    featured: true,
    desc: 'Analyzes Windows PE files for malware using 412 security features and shows which features influenced each prediction with SHAP. Supports single-file analysis, batch scanning, and a GPU-ready pipeline compatible with EMBER datasets of up to 1.1 million samples.',
    tags: ['Python', 'XGBoost', 'LightGBM', 'SHAP', 'Flask'],
    files: ['icons/xai.webp', 'XAI.webp'],
    links: [{ label: 'Source code', href: 'https://github.com/nishika25-ta/XAI' }],
  },
  {
    folder: 'Palm_Detection',
    title: 'Oil Palm Object Detection',
    category: 'Computer Vision',
    featured: true,
    desc: 'Detects oil-palm anomalies in aerial imagery using YOLO, TensorFlow, and OpenCV. Achieved 92% detection accuracy and automates reporting from detection results.',
    tags: ['YOLO', 'TensorFlow', 'OpenCV', 'Deep Learning'],
    files: ['icons/palms.webp', 'Detection.webp', 'FullStack.webp', 'Poster.webp', 'vale_poster.webp'],
  },
  {
    folder: 'DarkLace',
    title: 'Darklace AI Assistant',
    category: 'Applied AI',
    featured: true,
    desc: 'A desktop meeting assistant with voice input and language-model responses streamed over WebSockets. Its always-on-top window keeps responses visible during meetings.',
    tags: ['Python', 'React', 'Electron', 'WebSockets'],
    files: ['Darklace.webp', 'DARKLACE_logo.webp'],
    links: [{ label: 'Source code', href: 'https://github.com/nishika25-ta/Darklace-AI' }],
  },
  {
    folder: 'Super_Dim',
    title: 'Super Dim Mobile Application',
    category: 'Mobile',
    featured: true,
    desc: 'A Flutter app that uses a dark overlay to reduce screen brightness for low-light viewing.',
    tags: ['Flutter', 'Dart', 'Mobile', 'Accessibility'],
    files: ['icons/dimmer_icon.webp', 'super_dim.webp'],
  },
  {
    folder: 'UNIMAS_AR',
    title: 'UNIMAS AR',
    category: 'AR · Mobile',
    featured: false,
    desc: 'A mobile AR app for navigating the UNIMAS campus with directions and spatial overlays.',
    tags: ['AR', 'Unity', 'Mobile'],
    files: ['icons/ar_app_icon.webp', 'UNIMAS_AR_mainpage.webp', 'Unimas_AR.webp'],
  },
  {
    folder: 'file_converter',
    title: 'File Converter',
    category: 'Utility',
    featured: false,
    desc: 'Converts images and media to WebP, WebM, JPG, PNG, and other formats in batches using Python and FFmpeg.',
    tags: ['Web', 'Utility', 'FFmpeg', 'Python'],
    files: ['icons/file_converter.webp', 'fileconverter.webp'],
  },
] as const;

function showcaseAssetUrl(folder: string, file: string): string {
  if (file.startsWith('icons/')) {
    const pathAfterIcons = file.slice('icons/'.length);
    const segments = pathAfterIcons.split('/').filter(Boolean);
    return `/icons/${segments.map(encodeURIComponent).join('/')}`;
  }
  return `/images/contents/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

export type ContentShowcaseEntry = (typeof FOLDER_MANIFEST)[number];

export function buildShowcaseFromContents(): ShowcaseItem[] {
  return FOLDER_MANIFEST.map((entry) => {
    const iconFiles = entry.files.filter((f) => f.startsWith('icons/'));
    const carouselFiles = entry.files.filter((f) => !f.startsWith('icons/'));

    const thumbUrls = iconFiles.map((f) => showcaseAssetUrl(entry.folder, f));
    const images = carouselFiles.map((f) => showcaseAssetUrl(entry.folder, f));
    const thumb = thumbUrls[0] ?? images[0] ?? '';

    return {
      id: entry.folder.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      folder: entry.folder,
      category: entry.category,
      title: entry.title,
      desc: entry.desc,
      tags: [...entry.tags],
      images,
      thumb,
      links: 'links' in entry ? [...entry.links] : undefined,
      featured: entry.featured,
    };
  });
}
