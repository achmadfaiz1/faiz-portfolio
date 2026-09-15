import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type SectionNavArrowsProps = {
  sectionIds: string[];
};

function getActiveIndex(sectionIds: string[]) {
  const offset = window.innerHeight * 0.35;
  let active = 0;
  for (let i = 0; i < sectionIds.length; i++) {
    const el = document.getElementById(sectionIds[i]);
    if (!el) continue;
    const top = el.getBoundingClientRect().top;
    if (top - offset <= 0) active = i;
  }
  return active;
}

/**
 * Floating prev/next section arrows with smooth scroll.
 */
export function SectionNavArrows({ sectionIds }: SectionNavArrowsProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 120);
      setIndex(getActiveIndex(sectionIds));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sectionIds]);

  const scrollTo = (i: number) => {
    const id = sectionIds[i];
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const atFirst = index <= 0;
  const atLast = index >= sectionIds.length - 1;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex flex-col gap-2 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        type="button"
        onClick={() => scrollTo(Math.max(0, index - 1))}
        disabled={atFirst}
        aria-label="Previous section"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
      <button
        type="button"
        onClick={() => scrollTo(Math.min(sectionIds.length - 1, index + 1))}
        disabled={atLast}
        aria-label="Next section"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition hover:scale-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
    </div>
  );
}

export default SectionNavArrows;
