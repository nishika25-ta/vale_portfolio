import type { ShowcaseItem } from '../types/portfolio';

/**
 * Folders under `public/images/contents/` and their image files.
 * Entries starting with `icons/` load from `public/icons/` and are used for the grid thumb only — not the detail carousel.
 */
const FOLDER_MANIFEST = [
  {
    folder: 'XAI',
    title: 'XAI-PE Analyzer',
    category: 'Security · ML',
    featured: true,
    desc: 'Explainable malware-analysis platform across 412 engineered PE security features with ranked SHAP contributions, single-file analysis, batch scanning, and an EMBER-compatible GPU-ready pipeline for up to 1.1 million samples.',
    tags: ['Python', 'XGBoost', 'LightGBM', 'SHAP', 'Flask'],
    files: ['icons/xai.webp', 'XAI.webp'],
  },
  {
    folder: 'Palm_Detection',
    title: 'Oil Palm Object Detection',
    category: 'Computer Vision',
    featured: true,
    desc: 'Deep learning computer vision model for automated oil palm anomaly detection from aerial imagery. Achieved 92% detection accuracy using YOLO, TensorFlow, and OpenCV with an automated detection-to-report workflow.',
    tags: ['YOLO', 'TensorFlow', 'OpenCV', 'Deep Learning'],
    files: ['icons/palms.webp', 'Detection.webp', 'FullStack.webp', 'Poster.webp', 'vale_poster.webp'],
  },
  {
    folder: 'DarkLace',
    title: 'Darklace AI Assistant',
    category: 'Applied AI',
    featured: true,
    desc: 'Real-time desktop meeting assistant with voice input, persistent WebSocket streaming, low-latency language-model responses, and a maintainable always-on-top workflow.',
    tags: ['Python', 'React', 'Electron', 'WebSockets'],
    files: ['DARKLACE_logo.webp', 'Darklace.webp'],
  },
  {
    folder: 'Super_Dim',
    title: 'Super Dim Mobile Application',
    category: 'Mobile',
    featured: true,
    desc: 'Flutter application for adaptive screen-brightness control, using a dark overlay and an accessible responsive interface for more comfortable low-light viewing.',
    tags: ['Flutter', 'Dart', 'Mobile', 'Accessibility'],
    files: ['icons/dimmer_icon.webp', 'super_dim.webp'],
  },
  {
    folder: 'Earthsee',
    title: 'Earth See',
    category: 'Geospatial',
    featured: false,
    desc: 'Tactical global picture: map tiles, live flight tracks, and satellite coverage combined in one view, wired to geospatial and tracking APIs.',
    tags: ['Geospatial', 'Maps', 'APIs'],
    files: ['icons/earthsee.webp', 'earthsee1.webp', 'earthsee2.webp'],
  },
  {
    folder: 'UNIMAS_AR',
    title: 'UNIMAS AR',
    category: 'AR · Mobile',
    featured: false,
    desc: 'Campus AR navigation for exploring UNIMAS, combining wayfinding, spatial overlays, and a mobile-first discovery flow.',
    tags: ['AR', 'Unity', 'Mobile'],
    files: ['icons/ar_app_icon.webp', 'UNIMAS_AR_mainpage.webp', 'Unimas_AR.webp'],
  },
  {
    folder: 'file_converter',
    title: 'File Converter',
    category: 'Utility',
    featured: false,
    desc: 'Convert files to WebP, WebM, JPG, PNG, and more. Powered by FFmpeg and Python for fast, efficient batch conversion.',
    tags: ['Web', 'Utility', 'FFmpeg', 'Python'],
    files: ['icons/file_converter.webp', 'fileconverter.png'],
  },
  {
    folder: 'Financial_Manage',
    title: 'Financial Manage',
    category: 'FinTech',
    featured: false,
    desc: 'Personal finance product with dashboard, authentication, investment, and motivation flows designed around clear daily money habits.',
    tags: ['Dashboard', 'FinTech'],
    files: ['icons/fma.webp', 'dashboard.webp', 'invest.webp', 'login.webp', 'motivation.webp'],
  },
  {
    folder: 'Bookabary',
    title: 'Bookabary',
    category: 'Product',
    featured: false,
    desc: 'Booking and discovery experience covering search, availability, and reservation flows for a service marketplace.',
    tags: ['Web', 'Product'],
    files: ['icons/bookabary.webp', 'bookabary1.webp', 'bookabary2.webp', 'bookabary3.webp'],
  },
  {
    folder: 'Trombol',
    title: 'Trombol',
    category: 'Web Product',
    featured: false,
    desc: 'Destination landing experience with a focused sign-in path and a clean, conversion-oriented first impression.',
    tags: ['Web', 'Auth'],
    files: ['icons/trombol_logo.webp', 'Trombol_Main_Page.webp', 'Trombol_signin.webp'],
  },
  {
    folder: 'Global_Connection',
    title: 'Global Connection',
    category: 'Web Product',
    featured: false,
    desc: 'Multi-screen product layout for a global-connection platform, emphasizing hierarchy, spacing, and a consistent visual system.',
    tags: ['Web', 'Layout'],
    files: ['icons/gsc.webp', 'gsc1.webp', 'gsc2.webp', 'gsc3.webp'],
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
      featured: entry.featured,
    };
  });
}
