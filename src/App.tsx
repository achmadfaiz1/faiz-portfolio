import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Linkedin, 
  Mail, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  ChevronUp, 
  ChevronDown,
  Download,
  Database,
  BarChart3,
  Users,
  GraduationCap,
  Phone,
  TrendingUp,
  Award,
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

const projects: Project[] = [
  {
    id: 'performance',
    title: 'Performance Management System',
    subtitle: 'Led enhancements in internal 360 tools through cross-functional collaboration',
    category: 'HR Tech',
    year: '2022',
    image: '/project_performance.jpg',
    description: 'Enhanced the internal 360-degree feedback and performance management system to improve employee evaluation processes and calibration workflows.',
    achievements: [
      'Improved 360 feedback collection process with streamlined user interface',
      'Enhanced calibration analysis workflows for HR leaders',
      'Collaborated with engineering teams to implement system improvements',
      'Supported system reliability through continuous testing and iteration',
      'Delivered performance insights and calibration analysis for HR leaders'
    ],
    technologies: ['BigQuery', 'PostgreSQL', '360 Tools', 'HR Analytics']
  },
  {
    id: 'pac',
    title: 'Project PAC Data Warehouse',
    subtitle: 'Unified HR data layer for reliable reporting and analytics',
    category: 'Data Engineering',
    year: '2022',
    image: '/project_atlas.jpg',
    description: 'Collaborated with the People Analytics team to consolidate and integrate HR-related data into a centralized data warehouse using BigQuery.',
    achievements: [
      'Consolidated HR data into a centralized data warehouse using BigQuery',
      'Ensured all data sources were accurately recorded and updated in a timely manner',
      'Supported better data accessibility and integrity across HR systems',
      'Enabled self-service data access for HR teams to perform analysis',
      'Contributed to building a more structured and scalable data infrastructure'
    ],
    technologies: ['BigQuery', 'Data Warehouse', 'ETL', 'People Analytics']
  },
  {
    id: 'fraud',
    title: 'Merchant Fraud Checking System',
    subtitle: 'Fraud detection and incentive protection for merchant transactions',
    category: 'Risk Analytics',
    year: '2019',
    image: '/project_fraud.jpg',
    description: 'Participated in defining key fraud detection metrics to analyze merchant behavior from acquisition to transaction stage.',
    achievements: [
      'Defined key fraud detection metrics across merchant lifecycle',
      'Identified suspicious or generic transaction patterns',
      'Enabled selective targeting of eligible merchants for promo cashback offerings',
      'Improved sales incentive accuracy by ensuring only valid transactions were counted',
      'Acted as first-level checker reviewing merchant activity before escalating to Fraud and Risk team'
    ],
    technologies: ['Salesforce', 'BigQuery', 'Fraud Detection', 'Risk Analysis']
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [atBottom, setAtBottom] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const mainRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Handle scroll direction and button visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
      
      // Show scroll button after scrolling down a bit
      setShowScrollButton(currentScrollY > 300);
      
      // Check if at bottom
      setAtBottom(currentScrollY + windowHeight >= documentHeight - 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const heroTl = gsap.timeline({ delay: 0.2 });
      
      heroTl.fromTo('.hero-portrait', 
        { x: '-12vw', opacity: 0, scale: 0.98 },
        { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
      )
      .fromTo('.hero-headline span',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out' },
        '-=0.6'
      )
      .fromTo('.hero-subheadline',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-hairline',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.hero-cta',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo('.hero-stats',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo('.hero-location',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );

      // Section reveal animations
      const sections = ['.skills-section', '.experience-section', '.projects-section'];
      
      sections.forEach((section) => {
        const sectionHeadline = document.querySelector(`${section} .section-headline`);
        const sectionContent = document.querySelector(`${section} .section-content`);
        const sectionHairline = document.querySelector(`${section} .section-hairline`);
        
        if (sectionHeadline && sectionContent) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
              end: 'top 35%',
              scrub: 0.5,
              onEnter: () => setActiveSection(section.replace('.', '').replace('-section', '')),
            }
          });
          
          tl.fromTo(sectionHeadline,
            { x: '-6vw', opacity: 0 },
            { x: 0, opacity: 1, ease: 'power2.out' }
          )
          .fromTo(sectionHairline,
            { scaleX: 0 },
            { scaleX: 1, ease: 'power2.out' },
            '-=0.5'
          )
          .fromTo(sectionContent,
            { x: '6vw', opacity: 0, y: 30 },
            { x: 0, opacity: 1, y: 0, ease: 'power2.out' },
            '-=0.6'
          );
          
          if (tl.scrollTrigger) {
            scrollTriggersRef.current.push(tl.scrollTrigger);
          }
        }
      });

      // Contact section animation
      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 75%',
          end: 'top 40%',
          scrub: 0.4,
          onEnter: () => setActiveSection('contact'),
        }
      });
      
      contactTl.fromTo('.contact-headline',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' }
      )
      .fromTo('.contact-body',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.contact-card',
        { x: '6vw', opacity: 0, y: 20 },
        { x: 0, opacity: 1, y: 0, ease: 'power2.out' },
        '-=0.5'
      );
      
      if (contactTl.scrollTrigger) {
        scrollTriggersRef.current.push(contactTl.scrollTrigger);
      }
    }, mainRef);

    return () => {
      scrollTriggersRef.current.forEach(st => st.kill());
      scrollTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
      setActiveSection(id);
    }
  };

  // Scroll to top or bottom based on direction
  const handleScrollButtonClick = () => {
    if (atBottom || scrollDirection === 'up') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const documentHeight = document.documentElement.scrollHeight;
      window.scrollTo({ top: documentHeight, behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'hero', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div ref={mainRef} className="relative min-h-screen bg-background transition-colors duration-300">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-background/80 backdrop-blur-xl border-b border-border/50 transition-colors duration-300">
        <button 
          onClick={() => scrollToSection('hero')}
          className="text-lg font-medium tracking-tight text-foreground hover:text-primary transition-colors"
        >
          Achmad Faiz
        </button>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeSection === item.id 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="ml-4 p-2.5 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-foreground" />
            ) : (
              <Moon className="w-5 h-5 text-foreground" />
            )}
          </button>
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 rounded-full hover:bg-secondary transition-colors"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`text-left px-4 py-4 rounded-xl text-xl font-light transition-colors ${
                  activeSection === item.id 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Project Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div 
            className="relative bg-card rounded-3xl card-shadow max-w-3xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative aspect-video">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-medium">
                    {selectedProject.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs">
                    {selectedProject.year}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-medium text-white">{selectedProject.title}</h3>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 md:p-8">
              <p className="text-muted-foreground mb-6 leading-relaxed">{selectedProject.description}</p>
              
              <div className="mb-6">
                <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Key Achievements
                </h4>
                <ul className="space-y-3">
                  {selectedProject.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-foreground mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 rounded-full bg-secondary text-sm text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center pt-24 pb-16 px-6 lg:px-[6vw]">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Portrait Card */}
          <div className="hero-portrait relative order-2 lg:order-1">
            <div className="relative bg-card rounded-[32px] card-shadow overflow-hidden aspect-[3/4] max-w-md mx-auto lg:mx-0 group">
              <img 
                src="/hero_portrait.jpg" 
                alt="Achmad Faiz" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 lg:right-8 bg-primary text-white px-5 py-3 rounded-2xl card-shadow flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">5+ Years Exp.</span>
            </div>
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2 lg:pl-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium">Available for opportunities</span>
            </div>
            
            <h1 className="hero-headline text-4xl sm:text-5xl lg:text-[clamp(44px,5vw,72px)] font-light tracking-tight leading-[1.05] text-foreground mb-4">
              <span className="inline-block">Hello,</span>{' '}
              <span className="inline-block">I'm</span>{' '}
              <span className="inline-block font-medium">Faiz.</span>
            </h1>
            
            <p className="hero-subheadline text-xl sm:text-2xl text-muted-foreground font-light mb-8">
              Performance Data Analyst & HR Tech Specialist
            </p>
            
            <div className="hero-hairline hairline w-full max-w-xs mb-8 origin-left" />
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="hero-stats">
                <p className="text-2xl sm:text-3xl font-light text-primary">5+</p>
                <p className="text-xs text-muted-foreground mt-1">Years Experience</p>
              </div>
              <div className="hero-stats">
                <p className="text-2xl sm:text-3xl font-light text-primary">3</p>
                <p className="text-xs text-muted-foreground mt-1">Companies</p>
              </div>
              <div className="hero-stats">
                <p className="text-2xl sm:text-3xl font-light text-primary">10+</p>
                <p className="text-xs text-muted-foreground mt-1">Projects</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <button className="hero-cta inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20">
                <Download className="w-4 h-4" />
                Download resume
              </button>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium border border-border hover:bg-secondary transition-all"
              >
                Get in touch
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="hero-location mt-8 flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Jakarta, Indonesia</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-muted-foreground" />
              <div className="flex items-center gap-3">
                <a 
                  href="https://linkedin.com/in/achmadfaiz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="mailto:achmad.f.faiz@gmail.com"
                  className="p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section id="skills" className="skills-section py-24 lg:py-32 px-6 lg:px-[6vw]">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="mono-label text-primary mb-4 block">Capabilities</span>
            <h2 className="section-headline text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-light tracking-tight leading-[1.1] text-foreground max-w-2xl">
              I turn raw data into{' '}
              <span className="text-primary font-medium">clear decisions.</span>
            </h2>
            <div className="section-hairline hairline w-32 sm:w-44 mt-6 origin-left" />
          </div>
          
          {/* Skills Grid */}
          <div className="section-content grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-card rounded-3xl p-6 card-shadow hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all">
                <Database className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-medium text-foreground mb-3">Data Analysis</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">SQL, PostgreSQL, BigQuery, R Studio, DBeaver</p>
            </div>
            
            <div className="group bg-card rounded-3xl p-6 card-shadow hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all">
                <BarChart3 className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-medium text-foreground mb-3">Visualization</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Tableau, Looker, Google Sheets, Metabase</p>
            </div>
            
            <div className="group bg-card rounded-3xl p-6 card-shadow hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all">
                <Users className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-medium text-foreground mb-3">HR & Operations</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Performance Management, Talent Management, Internal Comms</p>
            </div>
            
            <div className="group bg-card rounded-3xl p-6 card-shadow hover:-translate-y-1 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all">
                <Briefcase className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-medium text-foreground mb-3">Collaboration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Project Management, Stakeholder Management, Usability Testing</p>
            </div>
          </div>
          
          {/* Tools Tags */}
          <div className="mt-12 flex flex-wrap gap-3">
            {['Figma', 'MS Office', 'Google Workspace', 'Lever ATS', 'Git'].map((tool) => (
              <span key={tool} className="px-4 py-2 rounded-full bg-secondary text-sm text-muted-foreground">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      {/* Experience Section */}
      <section id="experience" className="experience-section py-24 lg:py-32 px-6 lg:px-[6vw] bg-secondary/30">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="mono-label text-primary mb-4 block">Career Journey</span>
            <h2 className="section-headline text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-light tracking-tight leading-[1.1] text-foreground max-w-2xl">
              Experience across{' '}
              <span className="text-primary font-medium">analytics, HR,</span>{' '}
              and product.
            </h2>
            <div className="section-hairline hairline w-32 sm:w-44 mt-6 origin-left" />
          </div>
          
          {/* Experience Cards */}
          <div className="section-content space-y-6">
            {/* Role 1 - Performance Data Analyst */}
            <div className="bg-card rounded-3xl p-6 lg:p-8 card-shadow group hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-foreground">Performance Data Analyst</h3>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Current</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      GOTO HoldCo
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Jan 2020 - Present
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      Jakarta, Indonesia
                    </span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Delivered performance insights and calibration analysis for HR leaders</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Developed dashboards and trackers using BigQuery and PostgreSQL</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Led enhancements in internal 360 tools through cross-functional collaboration</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Supported system reliability through continuous testing with engineering teams</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Role 2 - Talent Acquisition Analyst */}
            <div className="bg-card rounded-3xl p-6 lg:p-8 card-shadow group hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-foreground">Talent Acquisition Analyst</h3>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">Current</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      GOTO HoldCo
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Jun 2025 - Present
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      Jakarta, Indonesia
                    </span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Supported recruitment analytics and dashboard reporting across hiring stages in Lever</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>Streamlined SLA tracking and delivered hiring projections to support workforce planning</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Role 3 - Business Analyst */}
            <div className="bg-card rounded-3xl p-6 lg:p-8 card-shadow group hover:-translate-y-1 transition-all duration-300">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
                    <BarChart3 className="w-7 h-7 text-muted-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-foreground mb-2">Business Analyst</h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4" />
                      GOTO GoPay
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      Jan 2019 - Dec 2019
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4" />
                      Jakarta, Indonesia
                    </span>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      <span>Provided data-driven insights to support operational decision-making</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      <span>Analyzed key metrics: merchant acquisition, customer transactions, fraud patterns</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      <span>Built real-time performance dashboards using Metabase and Google Data Studio</span>
                    </li>
                    <li className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                      <span>Conducted fraud analysis by combining Salesforce and BigQuery data</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="projects-section py-24 lg:py-32 px-6 lg:px-[6vw]">
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <span className="mono-label text-primary mb-4 block">Featured Work</span>
            <h2 className="section-headline text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-light tracking-tight leading-[1.1] text-foreground max-w-2xl">
              Projects that drive{' '}
              <span className="text-primary font-medium">real impact.</span>
            </h2>
            <div className="section-hairline hairline w-32 sm:w-44 mt-6 origin-left" />
          </div>
          
          {/* Projects Grid */}
          <div className="section-content grid lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div 
                key={project.id}
                className="group bg-card rounded-3xl overflow-hidden card-shadow hover:-translate-y-2 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.subtitle}</p>
                  <button 
                    className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    View details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Education & Certifications Section */}
      <section className="py-24 lg:py-32 px-6 lg:px-[6vw] bg-secondary/30">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Education */}
            <div>
              <span className="mono-label text-primary mb-4 block">Education</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-light tracking-tight leading-[1.1] text-foreground mb-8">
                Academic{' '}
                <span className="text-primary font-medium">background.</span>
              </h2>
              
              <div className="space-y-6">
                <div className="bg-card rounded-3xl p-6 card-shadow flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Universitas Sumatera Utara</h3>
                    <p className="text-sm text-muted-foreground mb-2">Teknik Informatika (D3) — 2013 - 2016</p>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">GPA: 3.30</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Certifications */}
            <div>
              <span className="mono-label text-primary mb-4 block">Certifications</span>
              <h2 className="text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-light tracking-tight leading-[1.1] text-foreground mb-8">
                Professional{' '}
                <span className="text-primary font-medium">credentials.</span>
              </h2>
              
              <div className="space-y-4">
                {/* Gojek BI University */}
                <div className="bg-card rounded-3xl p-6 card-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">Gojek Business Intelligence University</h3>
                      <p className="text-sm text-muted-foreground mb-1">Advanced Stream</p>
                      <p className="text-xs text-muted-foreground">2019</p>
                    </div>
                  </div>
                </div>
                
                {/* Udemy - Project Management */}
                <div className="bg-card rounded-3xl p-6 card-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">The Project Management Course: Beginner to PROject Manager</h3>
                      <p className="text-sm text-muted-foreground mb-2">Udemy — August 2025</p>
                      <p className="text-sm text-muted-foreground mb-3">Certification covering project lifecycle, planning, execution, risk management, and stakeholder communication.</p>
                      <a 
                        href="https://www.udemy.com/certificate/UC-8f286218-177b-4f0f-9348-4009768a0ab0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Show credentials
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Udemy - Global HR Management */}
                <div className="bg-card rounded-3xl p-6 card-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground mb-1">Global HR Management</h3>
                      <p className="text-sm text-muted-foreground mb-2">Udemy — July 2025</p>
                      <p className="text-sm text-muted-foreground mb-3">Certification covering Navigating International Talent Acquisition, Engagement, and Retention Strategies.</p>
                      <a 
                        href="https://www.udemy.com/certificate/UC-dd5c84ac-57a4-4f39-b9d8-84898d437ba5/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Show credentials
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section id="contact" className="contact-section bg-[#111216] text-white py-24 lg:py-32 px-6 lg:px-[6vw]">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div>
            <span className="mono-label text-primary mb-4 block">Get in Touch</span>
            <h2 className="contact-headline text-3xl sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)] font-light tracking-tight leading-[1.1] text-white mb-6">
              Let's work{' '}
              <span className="text-primary font-medium">together.</span>
            </h2>
            <p className="contact-body text-gray-400 text-lg mb-8 max-w-md leading-relaxed">
              Open to analytics, product, and HR-tech projects. Available for freelance and advisory roles.
            </p>
            <button className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline">
              <Download className="w-4 h-4" />
              Download resume
            </button>
          </div>
          
          {/* Contact Card */}
          <div className="contact-card bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-6 lg:p-8">
            <div className="space-y-4">
              <a 
                href="mailto:achmad.f.faiz@gmail.com"
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <p className="text-white">achmad.f.faiz@gmail.com</p>
                </div>
              </a>
              
              <a 
                href="https://wa.me/6282274944294"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">WhatsApp</p>
                  <p className="text-white">+62 822 7494 4294</p>
                </div>
              </a>
              
              <a 
                href="https://linkedin.com/in/achmadfaiz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <Linkedin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">LinkedIn</p>
                  <p className="text-white">linkedin.com/in/achmadfaiz</p>
                </div>
              </a>
              
              <a 
                href="mailto:achmad.f.faiz@gmail.com"
                className="flex items-center justify-center gap-2 w-full bg-primary text-white py-4 rounded-full font-medium hover:opacity-90 transition-all hover:-translate-y-0.5 mt-4"
              >
                <Mail className="w-4 h-4" />
                Send an email
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#111216] text-white py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 Achmad Faiz. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Credits</a>
          </div>
        </div>
      </footer>
      
      {/* Dynamic Scroll Button */}
      <button
        onClick={handleScrollButtonClick}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-110 ${
          showScrollButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label={atBottom || scrollDirection === 'up' ? 'Scroll to top' : 'Scroll to bottom'}
      >
        {atBottom || scrollDirection === 'up' ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

export default App;
