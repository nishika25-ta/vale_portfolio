/**
 * Working history — aligned with Valentine_Resume_2026.pdf.
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
    id: 'freelance',
    company: 'Self-Employed',
    location: 'Miri, Sarawak',
    dateRange: 'Mar 2026 — Present',
    roles: [
      {
        title: 'Freelance Full Stack Developer',
        highlights: [
          'Developed responsive full-stack web applications for client-based projects using modern frontend and backend technologies.',
          'Designed mobile-friendly and desktop-optimized user interfaces with strong focus on usability and performance.',
          'Developed scalable backend APIs, authentication systems, and database integrations using Python, FastAPI, and Supabase.',
          'Collaborated directly with clients to gather requirements and maintain deployed applications.',
        ],
      },
    ],
    stack: ['Python', 'FastAPI', 'Next.js', 'React', 'Supabase', 'REST APIs'],
  },
  {
    id: 'zenara-jaya',
    company: 'Zenara Jaya',
    location: 'Miri, Sarawak',
    dateRange: 'Dec 2025 — Mar 2026',
    logoSrc: '/company-logos/zenara.webp',
    roles: [
      {
        title: 'Junior Backend Engineer',
        highlights: [
          'Developed an AI-powered Applicant Tracking System (ATS) using FastAPI and Next.js to automate recruitment workflows.',
          'Implemented resume parsing with Claude API, OCR fallback, and PDF extraction using PyMuPDF and pdfplumber.',
          'Built RBAC authentication and permission systems for Admin, Recruiter, and Client Manager roles.',
          'Automated recruitment operations using n8n workflows, reducing manual processing time by 60%.',
          'Deployed scalable backend services on DigitalOcean with Supabase PostgreSQL integration and cloud storage.',
        ],
      },
    ],
    stack: ['FastAPI', 'Python', 'Next.js', 'Claude API', 'n8n', 'Supabase', 'DigitalOcean'],
  },
  {
    id: 'sarawak-oil-palm',
    company: 'Sarawak Oil Palms',
    location: 'Miri, Sarawak',
    dateRange: 'Jul 2024 — Oct 2024',
    logoSrc: '/company-logos/sarawak-oil-palms.png',
    roles: [
      {
        title: 'Geographic Information Systems (GIS) Intern',
        highlights: [
          'Conducted GIS digitization and palm census analysis using QGIS for operational planning and land management.',
          'Developed Python automation scripts for FIT-to-GPX conversion to improve field data processing efficiency.',
          'Built TensorFlow and OpenCV-based object detection solutions for automated soil hole identification.',
          'Produced 3D spatial visualization videos using Global Mapper to support data presentation and analysis.',
        ],
      },
    ],
    stack: ['Python', 'TensorFlow', 'OpenCV', 'QGIS', 'Global Mapper'],
  },
];
