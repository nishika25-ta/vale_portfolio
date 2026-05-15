import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import '@/index.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const SITE_TITLE = 'Valentine Agam — Backend & AI Engineer';
const SITE_DESCRIPTION =
  'Portfolio of Valentine Agam — Backend & AI engineer specializing in FastAPI, Next.js, TensorFlow, and production ML systems. Based in Miri, Sarawak.';

export const metadata: Metadata = {
  metadataBase: new URL('https://valentineagam.dev'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: 'Valentine Agam Portfolio',
  authors: [{ name: 'Valentine Agam' }],
  creator: 'Valentine Agam',
  keywords: [
    'Valentine Agam',
    'Backend Engineer',
    'AI Engineer',
    'FastAPI',
    'Next.js',
    'TensorFlow',
    'YOLO',
    'Computer Vision',
    'Portfolio',
    'Sarawak',
  ],
  icons: {
    icon: '/vale.webp',
    apple: '/vale.webp',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'en_US',
    siteName: 'Valentine Agam Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: '#050505',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#050505] text-slate-300 antialiased">{children}</body>
    </html>
  );
}
