/**
 * Working history — align dates and bullets with your resume (e.g. Valentine_Resume_2026.pdf).
 */
export type WorkRole = {
  title: string;
  /** Optional if the whole job uses one tenure badge */
  dateRange?: string;
  highlights: string[];
};

export type WorkExperienceItem = {
  id: string;
  company: string;
  location: string;
  /** Overall tenure at the company (sidebar badge) */
  dateRange: string;
  roles: WorkRole[];
  /** Shown once under all roles — e.g. stack for engineering-heavy work */
  stack?: string[];
  /** Public URL under `/public` (e.g. `/company-logos/scribear.svg`). Shows a dashed placeholder if load fails. */
  logoSrc?: string;
};

export const workExperience: WorkExperienceItem[] = [
  {
    id: 'scribear',
    company: 'Scribear',
    location: 'Startup · Remote',
    dateRange: '2026 — Present',
    logoSrc: '/company-logos/scribear.svg',
    roles: [
      {
        title: 'Front End & Fullstack Developer',
        highlights: [
          'Hold both titles at the same time: build product UI while owning API integration, data shaping, and features end to end.',
          'Ship responsive interfaces with reusable components and sensible state patterns that stay maintainable as the product moves fast.',
          'Wire authentication, forms, and dashboards to real backends with clear types, contracts, and thoughtful loading and error states.',
          'Collaborate with design and backend in a startup setting — prioritize impact, test critical paths, and refine based on feedback.',
        ],
      },
    ],
    stack: ['React', 'TypeScript', 'Tailwind CSS', 'REST APIs'],
  },
  {
    id: 'zenara-jaya',
    company: 'Zenara Jaya',
    location: 'Miri, Sarawak, Malaysia',
    dateRange: 'Dec 2025 — Mar 2026',
    roles: [
      {
        title: 'Backend Engineer',
        dateRange: 'Feb 2026 — Mar 2026',
        highlights: [
          'Designed and deployed an AI-powered resume parsing microservice with FastAPI, hosted on DigitalOcean.',
          'Shipped and maintained REST APIs and SaaS-style backend services for internal workflows and integrations.',
          'Emphasized reliability, clear service boundaries, and production-ready deployments.',
        ],
      },
      {
        title: 'Business Development Executive',
        dateRange: 'Dec 2025 — Jan 2026',
        highlights: [
          'Led digital transformation initiatives with stakeholders, linking business goals to technical delivery.',
          'Scoped opportunities, facilitated alignment between teams, and supported client-facing engagements.',
          'Bridged commercial priorities with engineering roadmaps so solutions matched real operational needs.',
        ],
      },
    ],
    stack: ['FastAPI', 'Python', 'DigitalOcean', 'REST APIs', 'SaaS'],
  },
];
