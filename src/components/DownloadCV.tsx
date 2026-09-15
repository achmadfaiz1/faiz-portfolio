import { Download } from 'lucide-react';

// Achmad_Faiz_CV.pdf could not be uploaded via MCP (binary); use existing public/Faiz Resume.pdf
const CV_HREF = '/Faiz%20Resume.pdf';
const CV_FILENAME = 'Faiz Resume.pdf';

type DownloadCVProps = {
  className?: string;
  label?: string;
  variant?: 'primary' | 'ghost' | 'dark';
};

/**
 * CV download button pointing at public/Faiz Resume.pdf
 * (fallback until Achmad_Faiz_CV.pdf can be uploaded as binary).
 */
export function DownloadCV({
  className = '',
  label = 'Download CV',
  variant = 'primary',
}: DownloadCVProps) {
  const base =
    'inline-flex items-center gap-2 rounded-full text-sm font-medium transition-all hover:-translate-y-0.5';

  const variants: Record<NonNullable<DownloadCVProps['variant']>, string> = {
    primary:
      'bg-primary text-primary-foreground px-6 py-3.5 hover:opacity-90 hover:shadow-lg hover:shadow-primary/20',
    ghost:
      'border border-border px-6 py-3.5 hover:bg-secondary text-foreground',
    dark:
      'bg-primary text-primary-foreground px-6 py-3.5 hover:opacity-90 hover:shadow-lg hover:shadow-primary/20',
  };

  return (
    <a
      href={CV_HREF}
      download={CV_FILENAME}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <Download className="h-4 w-4" aria-hidden />
      {label}
    </a>
  );
}

export default DownloadCV;
