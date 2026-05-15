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
    title: 'DarkLace',
    desc: 'Brand identity and interface concepts for DarkLace.',
    tags: ['Branding', 'UI'],
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
    title: 'Palm Detection',
    desc: 'Computer vision and project collateral for palm detection work.',
    tags: ['YOLO', 'CV', 'ML'],
    files: ['icons/palms.webp', 'Detection.webp', 'FullStack.webp', 'Poster.webp', 'vale_poster.webp'],
  },
  {
    folder: 'Super_Dim',
    title: 'Super Dim',
    desc: 'Flutter app UI for adaptive screen brightness.',
    tags: ['Flutter', 'Mobile'],
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
    desc: 'Explainable PE malware detector—GPU-trained XGBoost/LightGBM on EMBER (1.1M samples), SHAP on 412 static features (pefile), with Flask API, web dashboard, and CLI batch scanning.',
    tags: ['Python', 'XGBoost', 'SHAP', 'Flask', 'ML'],
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
