import {
  Database,
  BarChart3,
  Users,
  TrendingUp,
  Briefcase,
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  image: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

const SECTION_IDS = ['hero', 'skills', 'experience', 'projects', 'education', 'contact'] as const;

const projects: Project[] = [
  {
    id: 'pac',
    title: 'PAC Data Warehouse',
    subtitle: 'Centralized BigQuery warehouse for self-service HR analytics',
    category: 'Data Engineering',
    year: '2022',
    image: '/project_atlas.jpg',
    description:
      'Led the integration of fragmented HR data sources into a centralized BigQuery warehouse, enabling self-service analytics for HR teams at GoTo HoldCo.',
    achievements: [
      'Led the integration of fragmented HR data sources into a centralized BigQuery warehouse, enabling self-service analytics for HR teams.',
      'Established data standards, source documentation, and update cadences to ensure reliability and accessibility.',
    ],
    technologies: ['BigQuery', 'Data Warehouse', 'People Analytics', 'HR Data'],
  },
  {
    id: 'fraud',
    title: 'Merchant Acquisition & Fraud Analysis',
    subtitle: 'Fraud detection metrics across acquisition-to-transaction journey',
    category: 'Risk Analytics',
    year: '2019',
    image: '/project_fraud.jpg',
    description:
      'Defined fraud detection metrics across the acquisition-to-transaction journey and identified anomalous patterns to target eligible merchants for cashback programs at GoTo GoPay.',
    achievements: [
      'Defined fraud detection metrics across the acquisition-to-transaction journey.',
      'Identified anomalous patterns to target eligible merchants for cashback programs, improving incentive accuracy and reducing fraud exposure.',
    ],
    technologies: ['Salesforce', 'BigQuery', 'Fraud Detection', 'Metabase'],
  },
];

const skillGroups = [
  {
    title: 'People Analytics & HR',
    icon: Users,
    items: 'Performance Management, Calibration Analytics, Talent Acquisition Analytics, Employee Lifecycle Analytics',
  },
  {
    title: 'Analytics & Data',
    icon: Database,
    items: 'SQL, PostgreSQL, BigQuery, Dataworks, R/RStudio, Google Sheets, DBeaver',
  },
  {
    title: 'Visualization & BI',
    icon: BarChart3,
    items: 'Tableau, Looker, Metabase, Google Data Studio, Quick-BI',
  },
  {
    title: 'HR Tech & Product',
    icon: Briefcase,
    items: 'Workday, Lever ATS, Figma, Google Workspace',
  },
];

const experiences = [
  {
    title: 'Performance Management, People Analytics',
    company: 'GoTo HoldCo',
    dates: 'December 2019 – Present',
    location: 'Jakarta, Indonesia',
    current: true,
    icon: TrendingUp,
    bullets: [
      "Built and led GoTo's Performance Management System function, owning performance analytics end-to-end and translating large-scale people data into executive narratives for CHRO-level and PAC leadership.",
      "Designed and implemented a calibration analytics that surfaced rating distribution patterns and manager quality across [+3,000 employees / +800 managers], directly informing GoTo's performance improvement strategy.",
      'Built and maintained the performance data infrastructure (Dataworks, and PostgreSQL) powering real-time dashboard integrated directly with backend data for automated refresh (refresh schedule every 15 minutes during active cycle), cutting manual reporting [from 2-3 hours daily to about 1 hour per week] and enabling HR Self-service.',
      'Developed an R-based code (AI-assisted) to run verbatim analysis that processed 10,000+ performance review responses, extracting themes and keywords that shaped the redesign of further learning material and performance improvement.',
      'Led cross-functional work with Engineering and Product team to design and ship internal tools (360 performance system, PIP module, Critical Talent app), acting as both system and analyst, and product owner.',
    ],
  },
  {
    title: 'Talent Acquisition Analytics (concurrent)',
    company: 'GoTo HoldCo',
    dates: 'June 2025 – Present',
    location: 'Jakarta, Indonesia',
    current: true,
    icon: Users,
    bullets: [
      'Own recruitment and hiring-funnel analytics across all stages in Lever ATS, giving TA and the leads end-to-end pipeline visibility.',
      "Built an automated onboarding tracker that pulls Lever ATS data directly via API and refreshes daily, replacing HR Services' manual onboarding process and saving them an average of 3-4 hours per day.",
      'Oversee semi-annual Lever ATS enhancements to support TA initiatives and keep the hiring system aligned with evolving recruitment needs.',
    ],
  },
  {
    title: 'Business Analyst',
    company: 'GoTo GoPay',
    dates: 'January 2019 – December 2019',
    location: 'Jakarta, Indonesia',
    current: false,
    icon: BarChart3,
    bullets: [
      'Analyzed full-funnel business performance across merchant acquisition, transactions, and retention, delivering weekly insights to operational leadership.',
      'Built real-time performance dashboards in Metabase and Google Data Studio to monitor merchant and transaction KPIs across regions.',
      'Led fraud pattern detection by integrating Salesforce CRM and BigQuery data, identifying anomalous transaction behavior and supporting risk mitigation decisions.',
      'Served as first-level data reviewer for the Sales Performance team, validating merchant transactions before escalation to the Fraud and Risk team.',
    ],
  },
  {
    title: 'Product Research Intern',
    company: 'GoTo GoPay',
    dates: 'October 2018 – December 2018',
    location: 'Jakarta, Indonesia',
    current: false,
    icon: Users,
    bullets: [
      'Supported qualitative research (IDI, FGD, usability testing) to surface user insights, including KYC flow testing within the Gojek app.',
      'Recruited and managed research participants, then synthesized findings into structured insight reports informing product improvements.',
    ],
  },
  {
    title: 'Competitive Intelligence Analyst',
    company: 'Uber Indonesia, Driver Ops',
    dates: 'July 2017 – July 2018',
    location: 'Medan, Indonesia',
    current: false,
    icon: TrendingUp,
    bullets: [
      'Led the Medan competitive intelligence team, gathering market insights on the competitive dynamics between Uber, Gojek, and Grab.',
      'Designed and ran on-field surveys and recruited competitor drivers to collect data on app experience, incentives, and usability, synthesizing findings into strategic reports for product and ops decisions.',
    ],
  },
];

export type { Project };
export { SECTION_IDS, projects, skillGroups, experiences };
