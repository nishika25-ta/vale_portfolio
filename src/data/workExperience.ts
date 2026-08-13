/**
 * Working history — aligned with Valentine Agam resume (2026).
 */
export type WorkRole = {
  title: string;
  dateRange?: string;
  highlights: string[];
};

export type WorkExperienceItem = {
  id: string;
  company: string;
  location: string;
  dateRange: string;
  roles: WorkRole[];
  stack?: string[];
  logoSrc?: string;
};

export const workExperience: WorkExperienceItem[] = [
  {
    id: 'hospital-miri',
    company: 'Hospital Miri, Jabatan Kesihatan Sarawak',
    location: 'Miri, Sarawak',
    logoSrc: '/company-logos/Hospital_Miri_Logo.webp',
    dateRange: 'Jun 2026 – Present',
    roles: [
      {
        title: 'Pegawai Informasi Maklumat dan Komunikasi Korporat (MySTEP)',
        highlights: [
          'Designed, developed, and maintained the official Hospital Miri website, leading digital transformation initiatives that modernize hospital operations.',
          'Built a full-stack Employee Digital Onboarding System that replaces paper-based forms with a centralized digital workflow, including PostgreSQL database architecture and Next.js responsive interfaces.',
          'Developed a Wheelchair Tracking System to improve asset accountability and resource availability across hospital departments.',
          'Currently developing a digital hospital wayfinding platform to improve navigation for patients, visitors, and healthcare staff.',
          'Independently managed the complete software development lifecycle from planning to deployment and maintenance, deploying applications with Docker and Kubernetes.',
        ],
      },
    ],
    stack: ['Next.js', 'PostgreSQL', 'Docker', 'Kubernetes', 'Adminer', 'JavaScript', 'HTML', 'CSS', 'Git'],
  },
  {
    id: 'scribear',
    company: 'Scribear',
    location: 'Miri, Sarawak',
    logoSrc: '/company-logos/scribear.png',
    dateRange: 'Mar 2026 – Present',
    roles: [
      {
        title: 'Co-Founder & Full-Stack Developer',
        highlights: [
          'Designed and developed custom web applications for businesses, delivering responsive frontend interfaces and scalable backend services.',
          'Developed REST APIs and relational database solutions, deploying and maintaining production systems for client projects.',
          'Worked directly with clients to gather requirements and translate business needs into scalable software solutions.',
          'Managed the full software development lifecycle from concept to production deployment and ongoing maintenance.',
        ],
      },
    ],
    stack: ['Next.js', 'React', 'PostgreSQL', 'REST APIs', 'JavaScript', 'Docker', 'Git'],
  },
  {
    id: 'zenara-jaya',
    company: 'Zenara Jaya',
    location: 'Miri, Sarawak',
    dateRange: 'Dec 2025 – Mar 2026',
    logoSrc: '/company-logos/zenara.webp',
    roles: [
      {
        title: 'Junior Data & Backend Engineer',
        highlights: [
          'Developed backend applications supporting business operations, including an AI-assisted recruitment platform with resume parsing, OCR document extraction, and candidate fraud detection.',
          'Designed SQL databases and optimized data workflows, managing PostgreSQL databases and implementing reporting solutions for stakeholders.',
          'Automated internal business processes with role-based access control, audit logging, and management dashboards.',
          'Troubleshot backend systems and production issues while producing technical documentation for team handover.',
        ],
      },
    ],
    stack: ['FastAPI', 'Python', 'PostgreSQL', 'Claude API', 'OCR', 'SQL', 'REST APIs'],
  },
  {
    id: 'sarawak-oil-palm',
    company: 'Sarawak Oil Palms Berhad',
    location: 'Miri, Sarawak',
    dateRange: 'Jul 2024 – Oct 2024',
    logoSrc: '/company-logos/sarawak-oil-palms.png',
    roles: [
      {
        title: 'GIS Data Analyst Intern',
        highlights: [
          'Processed and analysed large geospatial datasets, supporting GIS data processing and spatial analysis across plantation operations.',
          'Achieved 92% detection accuracy by developing a YOLO and TensorFlow computer vision model for automated oil palm anomaly detection from aerial imagery.',
          'Worked with satellite imagery and remote sensing technologies, preparing operational reports and mapping outputs for management.',
          'Collaborated with technical teams to improve data quality and built automated detection-to-report workflows using Python, OpenCV, and QGIS.',
        ],
      },
    ],
    stack: ['Python', 'TensorFlow', 'YOLO', 'OpenCV', 'QGIS', 'Global Mapper', 'SQL'],
  },
];
