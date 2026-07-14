import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const videosDir = path.join(root, 'public', 'videos');
const thumbsDir = path.join(root, 'public', 'video-thumbs');

if (!existsSync(videosDir)) {
  console.error('Missing public/videos directory');
  process.exit(1);
}

mkdirSync(thumbsDir, { recursive: true });

const videos = readdirSync(videosDir).filter((file) => file.endsWith('.webm'));

for (const file of videos) {
  const input = path.join(videosDir, file);
  const output = path.join(thumbsDir, `${path.parse(file).name}.webp`);
  execSync(
    `ffmpeg -y -hide_banner -loglevel error -i "${input}" -ss 0.5 -vframes 1 -vf "scale=480:-2" -c:v libwebp -quality 82 "${output}"`,
    { stdio: 'inherit' }
  );
  console.log(`Generated ${path.relative(root, output)}`);
}

console.log(`Done. ${videos.length} poster(s) in public/video-thumbs/`);
