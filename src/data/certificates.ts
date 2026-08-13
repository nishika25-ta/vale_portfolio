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
    subtitle: 'Industry-standard cybersecurity certification',
    issuer: 'CompTIA · 2026',
    imageSrc: '/certs/compTIA.webp',
    imageAlt: 'CompTIA Security+ certification',
  },
  {
    id: 'mobile-dev-award',
    title: 'Mobile Application Development Award',
    subtitle: 'Recognition for mobile application development excellence',
    issuer: 'Universiti Malaysia Sarawak',
    imageSrc: '/certs/MAD_Cert.webp',
    imageAlt: 'Mobile Development award certificate',
  },
  {
    id: 'unimas-degree',
    title: "Bachelor's Degree",
    subtitle: 'B.Sc. Cognitive Science · Minor in Computer Science (2025) · CGPA 3.12',
    issuer: 'Universiti Malaysia Sarawak (UNIMAS)',
    imageSrc: '/certs/Unimas.webp',
    imageAlt: 'UNIMAS degree certificate',
  },
];
