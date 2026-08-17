import type { ShowcaseItem } from '../types/portfolio';
import { SHOWCASE_VIDEO_FILES, videoPublicUrl } from './videoShowcaseFiles';

/**
 * Folders under `public/images/contents/` and their image files.
 * Entries starting with `icons/` load from `public/icons/` and are used for the grid thumb only — not the detail carousel.
 */
const FOLDER_MANIFEST = [
  {
    folder: 'Bookabary',
    title: 'Bookabary',
    desc: 'Booking and discovery flow — UI exploration and product screens.',
    tags: ['Web', 'Product'],
    files: ['icons/bookabary.webp', 'bookabary1.webp', 'bookabary2.webp', 'bookabary3.webp'],
  },
  {
    folder: 'DarkLace',
    title: 'Darklace AI Assistant',
    desc: 'Real-time desktop meeting assistant with voice input, persistent WebSocket streaming, low-latency language-model responses, and a maintainable always-on-top workflow.',
    tags: ['Python', 'React', 'Electron', 'WebSockets'],
    files: ['DARKLACE_logo.webp', 'Darklace.webp'],
  },
  {
    folder: 'Financial_Manage',
    title: 'Financial Manage',
    desc: 'Dashboard, auth, and motivation flows for a finance experience.',
    tags: ['Dashboard', 'FinTech'],
    files: ['icons/fma.webp', 'dashboard.webp', 'invest.webp', 'login.webp', 'motivation.webp'],
  },
  {
    folder: 'Global_Connection',
    title: 'Global Connection',
    desc: 'Multi-screen layout for a global connection product.',
    tags: ['Web', 'Layout'],
    files: ['icons/gsc.webp', 'gsc1.webp', 'gsc2.webp', 'gsc3.webp'],
  },
  {
    folder: 'Palm_Detection',
    title: 'Oil Palm Object Detection',
    desc: 'Deep learning computer vision model for automated oil palm anomaly detection from aerial imagery. Achieved 92% detection accuracy using YOLO, TensorFlow, and OpenCV with an automated detection-to-report workflow.',
    tags: ['YOLO', 'TensorFlow', 'OpenCV', 'Deep Learning'],
    files: ['icons/palms.webp', 'Detection.webp', 'FullStack.webp', 'Poster.webp', 'vale_poster.webp'],
  },
  {
    folder: 'Super_Dim',
    title: 'Super Dim Mobile Application',
    desc: 'Flutter application for adaptive screen-brightness control, using a dark overlay and an accessible responsive interface for more comfortable low-light viewing.',
    tags: ['Flutter', 'Dart', 'Mobile', 'Accessibility'],
    files: ['icons/dimmer_icon.webp', 'super_dim.webp'],
  },
  {
    folder: 'Trombol',
    title: 'Trombol',
    desc: 'Main experience and sign-in screens.',
    tags: ['Web', 'Auth'],
    files: ['icons/trombol_logo.webp', 'Trombol_Main_Page.webp', 'Trombol_signin.webp'],
  },
  {
    folder: 'UNIMAS_AR',
    title: 'UNIMAS AR',
    desc: 'AR navigation — main flow and campus exploration.',
    tags: ['AR', 'Unity', 'Mobile'],
    files: ['icons/ar_app_icon.webp', 'UNIMAS_AR_mainpage.webp', 'Unimas_AR.webp'],
  },
  {
    folder: 'XAI',
    title: 'XAI-PE Analyzer',
    desc: 'Explainable malware-analysis platform across 412 engineered PE security features with ranked SHAP contributions, single-file analysis, batch scanning, and an EMBER-compatible GPU-ready pipeline for up to 1.1 million samples.',
    tags: ['Python', 'XGBoost', 'LightGBM', 'SHAP', 'Flask'],
    files: ['icons/xai.webp', 'XAI.webp'],
  },
  {
    folder: 'Earthsee',
    title: 'Earth See',
    desc: 'Tactical global picture: map tiles, live flight tracks, and satellite coverage combined in one view, wired to geospatial and tracking APIs.',
    tags: ['Geospatial', 'Maps', 'APIs'],
    files: ['icons/earthsee.webp', 'earthsee1.webp', 'earthsee2.webp'],
  },
  {
    folder: 'file_converter',
    title: 'File Converter',
    desc: 'Convert files to WebP, WebM, JPG, PNG, and more. Powered by FFmpeg and Python for fast, efficient batch conversion.',
    tags: ['Web', 'Utility', 'FFmpeg', 'Python'],
    files: ['icons/file_converter.webp', 'fileconverter.png'],
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

/** Pair each project (sorted by folder) with a sorted local demo video when available */
function assignVideos(): (string | undefined)[] {
  const sortedVideos = [...SHOWCASE_VIDEO_FILES].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  );
  return FOLDER_MANIFEST.map((_, i) =>
    sortedVideos[i] ? videoPublicUrl(sortedVideos[i]) : undefined
  );
}

const videoUrls = assignVideos();

export type ContentShowcaseEntry = (typeof FOLDER_MANIFEST)[number];

export function buildShowcaseFromContents(): ShowcaseItem[] {
  return FOLDER_MANIFEST.map((entry, i) => {
    const iconFiles = entry.files.filter((f) => f.startsWith('icons/'));
    const carouselFiles = entry.files.filter((f) => !f.startsWith('icons/'));

    const thumbUrls = iconFiles.map((f) => showcaseAssetUrl(entry.folder, f));
    const images = carouselFiles.map((f) => showcaseAssetUrl(entry.folder, f));
    const thumb = thumbUrls[0] ?? images[0] ?? '';

    const videoUrl = videoUrls[i];
    return {
      id: entry.folder.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      folder: entry.folder,
      category: 'PROJECT SHOWCASE',
      title: entry.title,
      desc: entry.desc,
      tags: [...entry.tags],
      images,
      thumb,
      videoUrl,
    };
  });
}
