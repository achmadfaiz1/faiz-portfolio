import { HeroSkills } from '@/components/HeroSkills';
import { CareerSections } from '@/components/CareerSections';
import type { Project } from '@/data/portfolioData';

type MainSectionsProps = {
  scrollToSection: (id: string) => void;
  setSelectedProject: (project: Project | null) => void;
};

export function MainSections({ scrollToSection, setSelectedProject }: MainSectionsProps) {
  return (
    <>
      <HeroSkills scrollToSection={scrollToSection} />
      <CareerSections setSelectedProject={setSelectedProject} />
    </>
  );
}
