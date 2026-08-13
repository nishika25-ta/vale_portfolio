import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import '@/index.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const SITE_TITLE = 'Valentine Agam — Software Engineer, Data & AI';
const SITE_DESCRIPTION =
  'Valentine Agam designs and ships full-stack products, enterprise workflows, data systems, and applied AI from Miri, Sarawak, Malaysia.';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.valeport.space'),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: 'Valentine Agam Portfolio',
  authors: [{ name: 'Valentine Agam' }],
  creator: 'Valentine Agam',
  keywords: [
    'Valentine Agam',
    'Software Engineer',
    'Full-Stack Developer',
    'Backend Engineer',
    'Digital Transformation',
    'Next.js',
    'PostgreSQL',
    'AI Engineer',
    'Machine Learning',
    'Docker',
    'Kubernetes',
    'Portfolio',
    'Sarawak',
    'Miri',
  ],
  icons: {
    icon: '/cat.png',
    apple: '/cat.png',
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'en_US',
    siteName: 'Valentine Agam Portfolio',
    images: [{ url: '/og.png', width: 1739, height: 909, alt: 'Valentine Agam — Software, Data, AI' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#f1efe8',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
