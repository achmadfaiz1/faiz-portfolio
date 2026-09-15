import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

const COUNT_KEY = 'faiz-portfolio-visitor-count';
const VISITED_KEY = 'faiz-portfolio-visited';

/**
 * Local visitor counter: increments once per browser (localStorage) on first visit.
 */
export function VisitorCounter({ className = '' }: { className?: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(COUNT_KEY);
      let next = raw ? parseInt(raw, 10) : 0;
      if (Number.isNaN(next) || next < 0) next = 0;

      const alreadyVisited = localStorage.getItem(VISITED_KEY) === '1';
      if (!alreadyVisited) {
        next += 1;
        localStorage.setItem(COUNT_KEY, String(next));
        localStorage.setItem(VISITED_KEY, '1');
      } else if (!raw) {
        localStorage.setItem(COUNT_KEY, String(next));
      }

      setCount(next);
    } catch {
      setCount(null);
    }
  }, []);

  if (count === null) return null;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 backdrop-blur-sm ${className}`}
      title="Unique visits from this browser (local)"
    >
      <Eye className="h-3.5 w-3.5 text-primary" aria-hidden />
      <span className="mono-label !normal-case !tracking-wider text-[11px] text-muted-foreground">
        Visits
      </span>
      <span className="font-mono text-xs tabular-nums text-foreground">
        {count.toLocaleString('en-US')}
      </span>
    </div>
  );
}

export default VisitorCounter;
