import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const JAKARTA_TZ = 'Asia/Jakarta';

function formatJakarta(now: Date) {
  const time = new Intl.DateTimeFormat('en-GB', {
    timeZone: JAKARTA_TZ,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(now);

  const date = new Intl.DateTimeFormat('en-GB', {
    timeZone: JAKARTA_TZ,
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(now);

  return { time, date };
}

/**
 * Live Asia/Jakarta clock labeled JKT/WIB.
 * Kept as a standalone component so teammates can restyle easily.
 */
export function JakartaClock({ className = '' }: { className?: string }) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const { time, date } = formatJakarta(now);

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 backdrop-blur-sm ${className}`}
      title="Asia/Jakarta (WIB)"
      aria-live="polite"
    >
      <Clock className="h-3.5 w-3.5 text-primary" aria-hidden />
      <span className="mono-label !normal-case !tracking-wider text-[11px] text-muted-foreground">
        JKT/WIB
      </span>
      <span className="font-mono text-xs tabular-nums text-foreground">{time}</span>
      <span className="hidden text-[11px] text-muted-foreground sm:inline">{date}</span>
    </div>
  );
}

export default JakartaClock;
