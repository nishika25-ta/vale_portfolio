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
    title: 'CompTIA Security+ (2026)',
    subtitle: '',
    issuer: '',
    imageSrc: '/certs/compTIA.webp',
    imageAlt: 'CompTIA Security+ certification',
  },
  {
    id: 'mobile-dev-award',
    title: 'Mobile Application Development Award',
    subtitle: '',
    issuer: '',
    imageSrc: '/certs/MAD_Cert.webp',
    imageAlt: 'Mobile Development award certificate',
  },
  {
    id: 'unimas-degree',
    title: "Bachelor's Degree",
    subtitle: 'B.Sc. Cognitive Science · Minor in Computer Science (2025)',
    issuer: '',
    imageSrc: '/certs/Unimas.webp',
    imageAlt: 'UNIMAS degree certificate',
  },
];
