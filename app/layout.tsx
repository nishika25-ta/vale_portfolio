import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import '@/index.css';
import {
  OG_IMAGE,
  SITE_DESCRIPTION,
  SITE_HEADLINE,
  SITE_NAME,
  SITE_URL,
  SOCIALS,
} from '@/data/profile';

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

const SITE_TITLE = `${SITE_NAME} — ${SITE_HEADLINE}`;

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_NAME,
  jobTitle: 'Software Engineer',
  url: SITE_URL,
  image: `${SITE_URL}${OG_IMAGE}`,
  description: SITE_DESCRIPTION,
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Sarawak',
    addressCountry: 'MY',
  },
  knowsAbout: [
    'Full-Stack Development',
    'Backend Engineering',
    'Artificial Intelligence',
    'Machine Learning',
    'Digital Transformation',
  ],
  sameAs: [SOCIALS.github.href, SOCIALS.linkedin.href],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  applicationName: `${SITE_NAME} Portfolio`,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  alternates: {
    canonical: '/',
  },
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
    icon: OG_IMAGE,
    apple: OG_IMAGE,
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: 'website',
    locale: 'en_MY',
    url: SITE_URL,
    siteName: `${SITE_NAME} Portfolio`,
    images: [
      {
        url: OG_IMAGE,
        alt: `${SITE_NAME} — Software Engineer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
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
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-[#050505] text-slate-300 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
