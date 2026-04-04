import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Silk + three.js stays large even when code-split; 500 kB default is noisy for WebGL apps.
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('three')) return 'vendor-three';
          if (id.includes('@react-three')) return 'vendor-r3f';
          if (id.includes('gsap') || id.includes('@gsap')) return 'vendor-gsap';
          if (id.includes('/motion/') || id.includes('\\motion\\')) return 'vendor-motion';
          if (id.includes('lucide-react')) return 'vendor-lucide';
          if (id.includes('prismjs')) return 'vendor-prism';
          if (id.includes('react-dom')) return 'vendor-react-dom';
          if (id.includes('/react/') && !id.includes('react-dom')) return 'vendor-react';
        },
      },
    },
  },
});
