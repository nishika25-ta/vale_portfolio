/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        hero: {
          primary: '#61dca3',
          secondary: '#61b3dc',
          deep: '#2b4539',
        },
        content: {
          primary: '#818cf8',
          secondary: '#a78bfa',
          deep: '#1e1b4b',
        },
        ink: {
          50: '#f8fafc',
          200: '#e2e8f0',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          800: '#1e293b',
          900: '#0f172a',
          950: '#050505',
        },
      },
      fontFamily: {
        mono: ['var(--font-jetbrains-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['var(--font-inter)', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['var(--font-display)', 'Georgia', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
};
