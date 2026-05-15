export type Certificate = {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  imageSrc: string;
  imageAlt: string;
};

export const certificates: Certificate[] = [
  {
    id: 'comptia-security-plus',
    title: 'CompTIA Security+',
    subtitle: 'Industry certification · cybersecurity fundamentals',
    issuer: 'CompTIA',
    imageSrc: '/certs/compTIA.webp',
    imageAlt: 'CompTIA Security+ certification',
  },
  {
    id: 'mobile-dev-award',
    title: 'Mobile Development Award',
    subtitle: 'Recognition for mobile application development',
    issuer: 'Academic Achievement',
    imageSrc: '/certs/MAD_Cert.webp',
    imageAlt: 'Mobile Development award certificate',
  },
  {
    id: 'unimas-degree',
    title: "Bachelor's Degree",
    subtitle: 'B.Sc. Cognitive Science · Minor in Computer Science',
    issuer: 'University Malaysia Sarawak (UNIMAS)',
    imageSrc: '/certs/Unimas.webp',
    imageAlt: 'UNIMAS degree certificate',
  },
];
