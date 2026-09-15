import {
  Linkedin,
  Mail,
  MapPin,
  ChevronRight,
  Sparkles,
  Phone,
} from 'lucide-react';
import { JakartaClock } from '@/components/JakartaClock';
import { VisitorCounter } from '@/components/VisitorCounter';
import { DownloadCV } from '@/components/DownloadCV';
import { skillGroups } from '@/data/portfolioData';

type Props = { scrollToSection: (id: string) => void };

export function HeroSkills({ scrollToSection }: Props) {
  return (
    <>
      {/* Hero */}
      <section id="hero" className="flex min-h-screen items-center px-6 pb-16 pt-24 lg:px-[6vw]">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="hero-portrait relative order-2 lg:order-1">
            <div className="group relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-[32px] bg-card card-shadow lg:mx-0">
              <img
                src="/hero_portrait.jpg"
                alt="Achmad Faiz"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-white card-shadow lg:right-8">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">7+ Years Exp.</span>
            </div>
          </div>

          <div className="order-1 lg:order-2 lg:pl-4">
            <div className="mb-4 flex flex-wrap gap-2 lg:hidden">
              <JakartaClock />
              <VisitorCounter />
            </div>

            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <span className="text-sm font-medium">Performance Management & People Analytics</span>
            </div>

            <h1 className="hero-headline mb-4 text-4xl font-light leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-[clamp(44px,5vw,72px)]">
              <span className="inline-block">Hello,</span>{' '}
              <span className="inline-block">I'm</span>{' '}
              <span className="inline-block font-medium">Faiz.</span>
            </h1>

            <p className="hero-subheadline mb-6 text-lg font-light text-muted-foreground sm:text-xl">
              Performance Management and People Analytics professional with 7+ years building HR data
              infrastructure, analytics, and internal tools from the ground up. Built GoTo's Performance
              Management function from scratch — including 360, calibration, PIP, and Critical Talent —
              strong in SQL, BigQuery, Tableau, Looker, and R.
            </p>

            <div className="hero-hairline hairline mb-8 w-full max-w-xs origin-left" />

            <div className="mb-8 grid grid-cols-3 gap-6">
              <div className="hero-stats">
                <p className="text-2xl font-light text-primary sm:text-3xl">7+</p>
                <p className="mt-1 text-xs text-muted-foreground">Years Experience</p>
              </div>
              <div className="hero-stats">
                <p className="text-2xl font-light text-primary sm:text-3xl">3k+</p>
                <p className="mt-1 text-xs text-muted-foreground">Employees supported</p>
              </div>
              <div className="hero-stats">
                <p className="text-2xl font-light text-primary sm:text-3xl">15m</p>
                <p className="mt-1 text-xs text-muted-foreground">Dashboard refresh</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <DownloadCV className="hero-cta" label="Download CV" />
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-all hover:bg-secondary"
              >
                Get in touch
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="hero-location mt-8 flex flex-wrap items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Jakarta, Indonesia</span>
              </div>
              <div className="hidden h-1 w-1 rounded-full bg-muted-foreground sm:block" />
              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/achmadf18/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full p-2 transition-colors hover:bg-secondary"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
                <a
                  href="mailto:achmad.f.faiz@gmail.com"
                  className="rounded-full p-2 transition-colors hover:bg-secondary"
                  aria-label="Email"
                >
                  <Mail className="h-4 w-4" />
                </a>
                <a
                  href="tel:+6282274944294"
                  className="rounded-full p-2 transition-colors hover:bg-secondary"
                  aria-label="Phone"
                >
                  <Phone className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="skills-section px-6 py-24 lg:px-[6vw] lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-16">
            <span className="mono-label mb-4 block text-primary">Capabilities</span>
            <h2 className="section-headline max-w-2xl text-3xl font-light leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)]">
              People data into{' '}
              <span className="font-medium text-primary">clear decisions.</span>
            </h2>
            <div className="section-hairline hairline mt-6 w-32 origin-left sm:w-44" />
          </div>

          <div className="section-content grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.title}
                  className="group rounded-3xl bg-card p-6 card-shadow transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 transition-all group-hover:scale-110 group-hover:bg-primary">
                    <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-white" />
                  </div>
                  <h3 className="mb-3 font-medium text-foreground">{group.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{group.items}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 space-y-4">
            <p className="text-sm font-medium text-foreground">Analytics methods</p>
            <div className="flex flex-wrap gap-3">
              {[
                'Funnel Analysis',
                'Cohort Analysis',
                'Behavioral Analytics',
                'Text/Verbatim Analytics',
                'UAT',
                'Fraud Checking',
              ].map((tool) => (
                <span key={tool} className="rounded-full bg-secondary px-4 py-2 text-sm text-muted-foreground">
                  {tool}
                </span>
              ))}
            </div>
            <p className="pt-2 text-sm text-muted-foreground">
              Languages: English (Professional), Bahasa Indonesia (Native) · Soft skills: Executive
              Storytelling, Stakeholder Management, Cross-functional Collaboration, Product Thinking
            </p>
          </div>
        </div>
      </section>

    </>
  );
}
