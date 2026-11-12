export type Certificate = {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  imageSrc?: string;
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
    id: 'machine-learning-specialization',
    title: 'Machine Learning Specialization',
    subtitle: 'Completed three courses covering supervised learning, advanced algorithms, and unsupervised learning · October 29, 2026',
    issuer: 'Stanford Online & DeepLearning.AI · Coursera',
    imageSrc: '/certs/machine-learning.png',
    imageAlt: 'Machine Learning Specialization certificate awarded to Valentine Anak Agam',
  },
  {
    id: 'unimas-degree',
    title: "Bachelor's Degree",
    subtitle: 'B.Sc. Cognitive Science · Minor in Computer Science (2025) · CGPA 3.12',
    issuer: 'Universiti Malaysia Sarawak (UNIMAS)',
    imageSrc: '/certs/Unimas.webp',
    imageAlt: 'UNIMAS degree certificate',
  },
  {
    id: 'mobile-dev-award',
    title: 'Mobile Application Development Award',
    subtitle: 'Recognition for mobile application development excellence · 2024',
    issuer: 'Universiti Malaysia Sarawak',
    imageSrc: '/certs/MAD_Cert.webp',
    imageAlt: 'Mobile Development award certificate',
  },
  {
    id: 'foundations-of-cybersecurity',
    title: 'Foundations of Cybersecurity',
    subtitle: 'Completed the Google cybersecurity foundations course · September 23, 2026',
    issuer: 'Google · Coursera',
    imageSrc: '/certs/foundations-of-cybersecurity.png',
    imageAlt: 'Google Foundations of Cybersecurity certificate awarded to Valentine Anak Agam',
  },
];
