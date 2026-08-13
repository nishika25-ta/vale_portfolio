import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = process.cwd();
const output = join(root, 'dist');

await rm(output, { recursive: true, force: true });
await mkdir(join(output, 'server'), { recursive: true });
await cp(join(root, 'out'), join(output, 'client'), {
  recursive: true,
  filter: (source) => !source.includes(`${join('public', 'videos')}`) && !source.includes(`${join('out', 'videos')}`),
});

await writeFile(
  join(output, 'server', 'index.js'),
  `export default {\n  async fetch(request, env) {\n    return env.ASSETS.fetch(request);\n  },\n};\n`,
  'utf8',
);
