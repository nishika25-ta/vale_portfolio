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
    logoSrc: '/company-logos/kkm.webp',
    dateRange: 'Jun 2026 – Present',
    roles: [
      {
        title: 'Pegawai Informasi Maklumat dan Komunikasi Korporat (MySTEP)',
        highlights: [
          'Develop digital systems for hospital operations, public information, and accessibility.',
          'Built a full-stack employee onboarding and document workflow using Next.js, PostgreSQL, Docker, and Kubernetes to replace repetitive paper-based processes and reduce duplicate data entry.',
          'Developed wheelchair asset tracking and a hospital-wide wayfinding platform to improve equipment visibility and navigation for patients, visitors, and emergency responders.',
          'Design and maintain the official Hospital Miri website, working with staff to define requirements.',
        ],
      },
    ],
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitHub', 'CI/CD'],
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
          'Build applications for clients, from requirements and database design to interfaces, APIs, deployment, and support.',
          'Manage production databases, access controls, CI/CD, documentation, and bug fixes.',
          'Work with clients to turn their business processes into application features.',
        ],
      },
    ],
    stack: ['Next.js', 'TypeScript', 'React', 'PostgreSQL', 'REST APIs', 'Docker', 'CI/CD'],
  },
  {
    id: 'zenara-jaya',
    company: 'Zenara Jaya',
    location: 'Miri, Sarawak',
    dateRange: 'Dec 2025 – Mar 2026',
    logoSrc: '/company-logos/zenara.webp',
    roles: [
      {
        title: 'Junior Data & Backend Engineer (Contract)',
        highlights: [
          'Developed an AI-assisted applicant tracking system with FastAPI, Next.js, Claude API, PDF extraction, and OCR fallback for scanned documents.',
          'Built and deployed a resume-parsing microservice on DigitalOcean with Supabase PostgreSQL, object storage, caching, role-based access control, and audit-ready workflows.',
        ],
      },
    ],
    stack: ['FastAPI', 'Next.js', 'Python', 'Supabase', 'PostgreSQL', 'Claude API', 'OCR', 'DigitalOcean'],
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
          'Developed a YOLO and TensorFlow aerial-imagery pipeline that achieved 92% detection accuracy for oil-palm anomaly identification.',
          'Processed remote-sensing datasets and automated detection-to-report workflows using Python, OpenCV, QGIS, and SQL-based validation.',
          'Prepared technical reports and worked with operational teams to check GIS data quality and use GIS software.',
        ],
      },
    ],
    stack: ['Python', 'TensorFlow', 'YOLO', 'OpenCV', 'QGIS', 'Global Mapper', 'SQL'],
  },
];
