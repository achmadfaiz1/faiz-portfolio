import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Menu,
  X,
  Sun,
  Moon,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { JakartaClock } from '@/components/JakartaClock';
import { VisitorCounter } from '@/components/VisitorCounter';
import { SectionNavArrows } from '@/components/SectionNavArrows';
import { SECTION_IDS, type Project } from '@/data/portfolioData';
import { MainSections } from '@/components/MainSections';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.2 });

      heroTl
        .fromTo(
          '.hero-portrait',
          { x: '-12vw', opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        )
        .fromTo(
          '.hero-headline span',
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power2.out' },
          '-=0.6',
        )
        .fromTo(
          '.hero-subheadline',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
          '-=0.4',
        )
        .fromTo(
          '.hero-hairline',
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.4',
        )
        .fromTo(
          '.hero-cta',
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
          '-=0.3',
        )
        .fromTo(
          '.hero-stats',
          { y: 12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' },
          '-=0.3',
        )
        .fromTo(
          '.hero-location',
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
          '-=0.3',
        );

      const sections = ['.skills-section', '.experience-section', '.projects-section', '.education-section'];

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
              onEnter: () =>
                setActiveSection(section.replace('.', '').replace('-section', '')),
            },
          });

          tl.fromTo(sectionHeadline, { x: '-6vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'power2.out' })
            .fromTo(sectionHairline, { scaleX: 0 }, { scaleX: 1, ease: 'power2.out' }, '-=0.5')
            .fromTo(
              sectionContent,
              { x: '6vw', opacity: 0, y: 30 },
              { x: 0, opacity: 1, y: 0, ease: 'power2.out' },
              '-=0.6',
            );

          if (tl.scrollTrigger) {
            scrollTriggersRef.current.push(tl.scrollTrigger);
          }
        }
      });

      const contactTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.contact-section',
          start: 'top 75%',
          end: 'top 40%',
          scrub: 0.4,
          onEnter: () => setActiveSection('contact'),
        },
      });

      contactTl
        .fromTo('.contact-headline', { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' })
        .fromTo('.contact-body', { y: 30, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, '-=0.4')
        .fromTo(
          '.contact-card',
          { x: '6vw', opacity: 0, y: 20 },
          { x: 0, opacity: 1, y: 0, ease: 'power2.out' },
          '-=0.5',
        );

      if (contactTl.scrollTrigger) {
        scrollTriggersRef.current.push(contactTl.scrollTrigger);
      }
    }, mainRef);

    return () => {
      scrollTriggersRef.current.forEach((st) => st.kill());
      scrollTriggersRef.current = [];
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const offset = window.innerHeight * 0.35;
      let current = 'hero';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
      setActiveSection(id);
    }
  };

  const navItems = [
    { id: 'hero', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div ref={mainRef} className="relative min-h-screen bg-background transition-colors duration-300">
      <div className="grain-overlay" />

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-border/50 bg-background/80 px-4 py-3 backdrop-blur-xl transition-colors duration-300 sm:px-6 sm:py-4">
        <button
          onClick={() => scrollToSection('hero')}
          className="text-lg font-medium tracking-tight text-foreground transition-colors hover:text-primary"
        >
          Achmad Faiz
        </button>

        <div className="hidden items-center gap-2 lg:flex">
          <JakartaClock />
          <VisitorCounter />
        </div>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`rounded-full px-3 py-2 text-sm transition-all lg:px-4 ${
                activeSection === item.id
                  ? 'bg-primary/10 font-medium text-primary'
                  : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
              }`}
            >
              {item.label}
            </button>
          ))}

          <button
            onClick={toggleDarkMode}
            className="ml-2 rounded-full p-2.5 transition-colors hover:bg-secondary"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDarkMode}
            className="rounded-full p-2.5 transition-colors hover:bg-secondary"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="h-5 w-5 text-foreground" /> : <Moon className="h-5 w-5 text-foreground" />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-full p-2.5 transition-colors hover:bg-secondary"
            aria-label="Open menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 px-6 pt-24 backdrop-blur-xl md:hidden">
          <div className="mb-6 flex flex-wrap gap-2">
            <JakartaClock />
            <VisitorCounter />
          </div>
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`rounded-xl px-4 py-4 text-left text-xl font-light transition-colors ${
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

      {selectedProject && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl bg-card card-shadow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-colors hover:bg-white/30"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="mb-2 flex items-center gap-2">
                  <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-white">
                    {selectedProject.category}
                  </span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs text-white">
                    {selectedProject.year}
                  </span>
                </div>
                <h3 className="text-2xl font-medium text-white md:text-3xl">{selectedProject.title}</h3>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <p className="mb-6 leading-relaxed text-muted-foreground">{selectedProject.description}</p>

              <div className="mb-6">
                <h4 className="mb-4 flex items-center gap-2 font-medium text-foreground">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Key Achievements
                </h4>
                <ul className="space-y-3">
                  {selectedProject.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3 font-medium text-foreground">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span key={tech} className="rounded-full bg-secondary px-3 py-1.5 text-sm text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <MainSections scrollToSection={scrollToSection} setSelectedProject={setSelectedProject} />

      <footer className="border-t border-white/10 bg-[#111216] px-6 py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">© 2026 Achmad Faiz · Jakarta</p>
          <div className="flex flex-wrap items-center gap-3">
            <JakartaClock className="!border-white/10 !bg-white/5" />
            <VisitorCounter className="!border-white/10 !bg-white/5" />
          </div>
        </div>
      </footer>

      <SectionNavArrows sectionIds={[...SECTION_IDS]} />
    </div>
  );
}

export default App;
