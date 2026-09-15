import {
  Linkedin,
  Mail,
  GraduationCap,
  Award,
  Briefcase,
  Calendar,
  MapPin,
  ChevronRight,
  Phone,
} from 'lucide-react';
import { DownloadCV } from '@/components/DownloadCV';
import { projects, experiences, type Project } from '@/data/portfolioData';

type Props = {
  setSelectedProject: (project: Project | null) => void;
};

export function CareerSections({ setSelectedProject }: Props) {
  return (
    <>
      {/* Experience */}
      <section id="experience" className="experience-section bg-secondary/30 px-6 py-24 lg:px-[6vw] lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-16">
            <span className="mono-label mb-4 block text-primary">Career Journey</span>
            <h2 className="section-headline max-w-2xl text-3xl font-light leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)]">
              Experience across{' '}
              <span className="font-medium text-primary">analytics, HR,</span> and product.
            </h2>
            <div className="section-hairline hairline mt-6 w-32 origin-left sm:w-44" />
          </div>

          <div className="section-content space-y-6">
            {experiences.map((role) => {
              const Icon = role.icon;
              return (
                <div
                  key={`${role.title}-${role.dates}`}
                  className="group rounded-3xl bg-card p-6 card-shadow transition-all duration-300 hover:-translate-y-1 lg:p-8"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <div className="flex-shrink-0">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                          role.current ? 'bg-primary/10' : 'bg-muted'
                        }`}
                      >
                        <Icon
                          className={`h-7 w-7 ${role.current ? 'text-primary' : 'text-muted-foreground'}`}
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h3 className="text-lg font-medium text-foreground">{role.title}</h3>
                        {role.current && (
                          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4" />
                          {role.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          {role.dates}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {role.location}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {role.bullets.map((bullet) => (
                          <li key={bullet.slice(0, 48)} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <span
                              className={`mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full ${
                                role.current ? 'bg-primary' : 'bg-muted-foreground'
                              }`}
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="projects-section px-6 py-24 lg:px-[6vw] lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-16">
            <span className="mono-label mb-4 block text-primary">Featured Work</span>
            <h2 className="section-headline max-w-2xl text-3xl font-light leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)]">
              Projects that drive <span className="font-medium text-primary">real impact.</span>
            </h2>
            <div className="section-hairline hairline mt-6 w-32 origin-left sm:w-44" />
          </div>

          <div className="section-content grid gap-6 lg:grid-cols-2">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer overflow-hidden rounded-3xl bg-card card-shadow transition-all duration-300 hover:-translate-y-2"
                onClick={() => setSelectedProject(project)}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-3 flex items-center gap-2">
                    <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                      {project.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-foreground">{project.title}</h3>
                  <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{project.subtitle}</p>
                  <button
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(project);
                    }}
                  >
                    View details
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section id="education" className="education-section bg-secondary/30 px-6 py-24 lg:px-[6vw] lg:py-32">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-12">
            <span className="mono-label mb-4 block text-primary">Credentials</span>
            <h2 className="section-headline max-w-2xl text-3xl font-light leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)]">
              Education & <span className="font-medium text-primary">certification.</span>
            </h2>
            <div className="section-hairline hairline mt-6 w-32 origin-left sm:w-44" />
          </div>

          <div className="section-content grid gap-6 lg:grid-cols-2">
            <div className="flex items-start gap-5 rounded-3xl bg-card p-6 card-shadow">
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="mb-1 font-medium text-foreground">Universitas Sumatera Utara</h3>
                <p className="mb-2 text-sm text-muted-foreground">
                  D3 Teknik Informatika — 2013 – 2016
                </p>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  GPA: 3.30
                </span>
              </div>
            </div>

            <div className="rounded-3xl bg-card p-6 card-shadow">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="mb-1 font-medium text-foreground">
                    Gojek Business Intelligence University
                  </h3>
                  <p className="mb-1 text-sm text-muted-foreground">Advanced Stream</p>
                  <p className="text-xs text-muted-foreground">2019</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section bg-[#111216] px-6 py-24 text-white lg:px-[6vw] lg:py-32">
        <div className="mx-auto grid w-full max-w-7xl items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="mono-label mb-4 block text-primary">Get in Touch</span>
            <h2 className="contact-headline mb-6 text-3xl font-light leading-[1.1] tracking-tight text-white sm:text-4xl lg:text-[clamp(34px,3.6vw,52px)]">
              Let's <span className="font-medium text-primary">connect.</span>
            </h2>
            <p className="contact-body mb-8 max-w-md text-lg leading-relaxed text-gray-400">
              Open to conversations on people analytics, performance management, and HR-tech.
            </p>
            <DownloadCV label="Download CV" variant="dark" />
          </div>

          <div className="contact-card rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm lg:p-8">
            <div className="space-y-4">
              <a
                href="mailto:achmad.f.faiz@gmail.com"
                className="group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 transition-colors group-hover:bg-primary/30">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-500">Email</p>
                  <p className="text-white">achmad.f.faiz@gmail.com</p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/achmadf18/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 transition-colors group-hover:bg-primary/30">
                  <Linkedin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-500">LinkedIn</p>
                  <p className="text-white">linkedin.com/in/achmadf18</p>
                </div>
              </a>

              <a
                href="tel:+6282274944294"
                className="group flex items-center gap-4 rounded-2xl p-4 transition-colors hover:bg-white/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 transition-colors group-hover:bg-primary/30">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="mb-1 text-sm text-gray-500">Phone</p>
                  <p className="text-white">+62 822 7494 4294</p>
                </div>
              </a>

              <a
                href="mailto:achmad.f.faiz@gmail.com"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 font-medium text-white transition-all hover:-translate-y-0.5 hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                Send an email
              </a>
            </div>
          </div>
        </div>
      </section>


    </>
  );
}
