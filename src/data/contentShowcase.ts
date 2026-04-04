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
    files: [ 'icons/bookabary.jpeg', 'bookabary1.png', 'bookabary2.png', 'bookabary3.png'],
  },
  {
    folder: 'DarkLace',
    title: 'DarkLace',
    desc: 'Brand identity and interface concepts for DarkLace.',
    tags: ['Branding', 'UI'],
    files: ['DARKLACE_logo.jpeg', 'Darklace.png', ],
  },
  {
    folder: 'Financial_Manage',
    title: 'Financial Manage',
    desc: 'Dashboard, auth, and motivation flows for a finance experience.',
    tags: ['Dashboard', 'FinTech'],
    files: ['icons/fma.jpeg','dashboard.png', 'invest.png', 'login.png', 'motivation.png'],
  },
  {
    folder: 'Global_Connection',
    title: 'Global Connection',
    desc: 'Multi-screen layout for a global connection product.',
    tags: ['Web', 'Layout'],
    files: ['icons/gsc.jpeg','gsc1.png', 'gsc2.png', 'gsc3.png'],
  },
  {
    folder: 'Palm_Detection',
    title: 'Palm Detection',
    desc: 'Computer vision and project collateral for palm detection work.',
    tags: ['YOLO', 'CV', 'ML'],
    files: ['icons/palms.png','Detection.jpg', 'FullStack.jpg', 'Poster.jpg', 'vale_poster.jpg'],
  },
  {
    folder: 'Screen_Link',
    title: 'Screen Link',
    desc: 'Architecture, hero, and desktop UI for Screen Link.',
    tags: ['UX', 'Desktop'],
    files: ['icons/screenlink.png','architecture.png', 'desktop_ui.png', 'hero.png'],
  },
  {
    folder: 'Super_Dim',
    title: 'Super Dim',
    desc: 'Flutter app UI for adaptive screen brightness.',
    tags: ['Flutter', 'Mobile'],
    files: ['icons/dimmer_icon.jpeg','super_dim.png'],
  },
  {
    folder: 'Trombol',
    title: 'Trombol',
    desc: 'Main experience and sign-in screens.',
    tags: ['Web', 'Auth'],
    files: ['icons/trombol_logo.jpeg','Trombol_Main_Page.jpg', 'Trombol_signin.jpg'],
  },
  {
    folder: 'UNIMAS_AR',
    title: 'UNIMAS AR',
    desc: 'AR navigation — main flow and campus exploration.',
    tags: ['AR', 'Unity', 'Mobile'],
    files: ['icons/ar_app_icon.jpeg','UNIMAS_AR_mainpage.jpg','Unimas_AR.jpg'],
  },
  {
    folder: 'XAI',
    title: 'XAI',
    desc: 'Explainable AI interface concept.',
    tags: ['AI', 'Research'],
    files: ['icons/xai.png','XAI.png'],
  },
  {
    folder: 'Earthsee',
    title: 'Earth See',
    desc: 'Tactical global picture: map tiles, live flight tracks, and satellite coverage combined in one view, wired to geospatial and tracking APIs.',
    tags: ['Geospatial', 'Maps', 'APIs'],
    files: ['icons/earthsee.jpeg', 'earthsee1.png', 'earthsee2.png'],
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
