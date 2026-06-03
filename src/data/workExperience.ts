/**
 * Working history — aligned with Valentine_Resume_2026_Data.pdf.
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
    dateRange: 'Mar 2026 – Present',
    roles: [
      {
        title: 'Data Analyst & Full Stack Developer',
        highlights: [
          'Reduced client reporting turnaround by 40% by writing SQL queries and Python scripts to automate recurring data analysis workflows, replacing manual Excel-based processes with reproducible pipelines.',
          'Improved data quality for 3+ client projects by performing systematic data cleaning filtering, handling missing values, and error correction before surfacing findings to non-technical stakeholders via Power BI dashboards.',
          'Delivered trend analysis reports and stakeholder presentations translating backend system metrics into actionable business recommendations.',
          'Increased application reliability by 30% by building scalable APIs with FastAPI and Supabase PostgreSQL, enabling structured data capture for downstream statistical analysis.',
        ],
      },
    ],
    stack: ['Python', 'SQL', 'FastAPI', 'Supabase', 'PostgreSQL', 'Power BI', 'Excel'],
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
          'Reduced manual candidate screening time by 60% by building an AI-powered applicant classification system that identified and categorised normal vs. flagged candidate profiles using statistical pattern matching and the Claude API.',
          'Improved fraud and bot detection coverage by developing an anomaly identification layer that cross-referenced applicant data via SQL queries against a PostgreSQL database, flagging suspicious duplicate and bot-generated submissions.',
          'Ensured data integrity across 100+ candidate records by implementing structured data cleaning pipelines with OCR fallback for missing or malformed fields documented for reproducibility and team handover.',
          'Automated end-to-end recruitment operations using n8n workflows, cutting manual processing from 5 hours to under 2 hours per weekly cycle and generating weekly summary reports for management stakeholders.',
        ],
      },
    ],
    stack: ['FastAPI', 'PostgreSQL', 'Claude API', 'n8n', 'SQL', 'Python', 'OCR'],
  },
  {
    id: 'sarawak-oil-palm',
    company: 'Sarawak Oil Palms',
    location: 'Miri, Sarawak',
    dateRange: 'Jul 2024 – Oct 2024',
    logoSrc: '/company-logos/sarawak-oil-palms.png',
    roles: [
      {
        title: 'GIS Data Analyst Intern',
        highlights: [
          'Achieved 92% detection accuracy on a large-scale spatial dataset by training custom YOLO and TensorFlow models to automatically classify soil hole anomalies applying statistical methods to distinguish normal vs flagged conditions.',
          'Improved field data processing efficiency by 35% by writing Python automation scripts to convert and clean FIT-to-GPX datasets, eliminating a recurring manual data-handling bottleneck.',
          'Produced 3D data visualisation reports and stakeholder presentations using Global Mapper and QGIS, communicating geospatial trend analysis to management for land planning decisions.',
          'Conducted palm census correlation studies across multi-hectare datasets, performing SQL-structured data cleaning and trend analysis before reporting insights to the GIS team.',
        ],
      },
    ],
    stack: ['Python', 'TensorFlow', 'YOLO', 'OpenCV', 'QGIS', 'Global Mapper', 'SQL'],
  },
];
