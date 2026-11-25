export type CertificateCategory = 'Cybersecurity' | 'Cloud' | 'AI & ML' | 'Academic';

export type Certificate = {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  date: string;
  category: CertificateCategory;
  badge?: string;
  verifyUrl?: string;
  courses?: string[];
  imageSrc?: string;
  imageAlt: string;
};

export const certificates: Certificate[] = [
  {
    id: 'ibm-ethical-hacking',
    title: 'IBM Ethical Hacking with Open Source Tools',
    subtitle:
      '6-course Professional Certificate covering penetration testing, Kali Linux, Metasploit, Wireshark traffic analysis, OpenVAS vulnerability assessment, and incident response.',
    issuer: 'IBM · Coursera',
    date: 'Nov 2026',
    category: 'Cybersecurity',
    badge: 'New',
    verifyUrl: 'https://coursera.org/verify/professional-cert/JQK4JZO7AS5B',
    courses: [
      'Introduction to Ethical Hacking Principles',
      'Ethical Hacking with Kali Linux',
      'Exploitation and Penetration Testing with Metasploit',
      'Network Traffic Analysis with Wireshark',
      'Incident Response and Defense with OpenVAS',
      'Ethical Hacking Capstone Project: Breach, Response, AI',
    ],
    imageSrc: '/certs/ibm-ethical-hacking.webp',
    imageAlt: 'IBM Ethical Hacking with Open Source Tools Professional Certificate awarded to Valentine Anak Agam',
  },
  {
    id: 'aws-cloud-technical-essentials',
    title: 'AWS Cloud Technical Essentials',
    subtitle:
      'Authorized Amazon Web Services course covering core AWS compute, storage, networking, security, and cloud architecture fundamentals.',
    issuer: 'Amazon Web Services · Coursera',
    date: 'Nov 2026',
    category: 'Cloud',
    badge: 'New',
    verifyUrl: 'https://coursera.org/verify/2T3YU9A8GI2S',
    imageSrc: '/certs/aws-cloud-technical-essentials.webp',
    imageAlt: 'AWS Cloud Technical Essentials certificate awarded to Valentine Anak Agam',
  },
  {
    id: 'comptia-security-plus',
    title: 'CompTIA Security+',
    subtitle: 'Industry-standard cybersecurity certification validating core security operations and risk management.',
    issuer: 'CompTIA',
    date: '2026',
    category: 'Cybersecurity',
    imageSrc: '/certs/compTIA.webp',
    imageAlt: 'CompTIA Security+ certification',
  },
  {
    id: 'machine-learning-specialization',
    title: 'Machine Learning Specialization',
    subtitle:
      'Three-course specialization covering supervised learning, advanced learning algorithms, and unsupervised learning.',
    issuer: 'Stanford Online & DeepLearning.AI',
    date: 'Oct 2026',
    category: 'AI & ML',
    imageSrc: '/certs/machine-learning.png',
    imageAlt: 'Machine Learning Specialization certificate awarded to Valentine Anak Agam',
  },
  {
    id: 'foundations-of-cybersecurity',
    title: 'Foundations of Cybersecurity',
    subtitle: 'Google cybersecurity foundations covering security frameworks, threat landscapes, and defensive practices.',
    issuer: 'Google · Coursera',
    date: 'Sep 2026',
    category: 'Cybersecurity',
    imageSrc: '/certs/foundations-of-cybersecurity.png',
    imageAlt: 'Google Foundations of Cybersecurity certificate awarded to Valentine Anak Agam',
  },
  {
    id: 'unimas-degree',
    title: 'B.Sc. Cognitive Science',
    subtitle: 'Minor in Computer Science focused on AI and Machine Learning (CGPA 3.12).',
    issuer: 'Universiti Malaysia Sarawak (UNIMAS)',
    date: '2025',
    category: 'Academic',
    imageSrc: '/certs/Unimas.webp',
    imageAlt: 'UNIMAS degree certificate',
  },
  {
    id: 'mobile-dev-award',
    title: 'Mobile Application Development Award',
    subtitle: 'Recognition for mobile application development excellence at UNIMAS.',
    issuer: 'Universiti Malaysia Sarawak',
    date: '2024',
    category: 'Academic',
    imageSrc: '/certs/MAD_Cert.webp',
    imageAlt: 'Mobile Development award certificate',
  },
];
