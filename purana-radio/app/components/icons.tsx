type IconProps = { className?: string };

export function PrevIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M6 5h2v14H6zM20 5v14l-11-7z" />
    </svg>
  );
}

export function NextIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M16 5h2v14h-2zM4 5v14l11-7z" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export function PauseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 8.2s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.2-1C15.9 4.6 12 4.6 12 4.6h0s-3.9 0-6.9.3c-.4 0-1.4.1-2.2 1-.7.7-.9 2.3-.9 2.3S1.7 10 1.7 11.9v1.7c0 1.9.3 3.7.3 3.7s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.2.3 7.2.3s3.9 0 6.9-.3c.4-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.3-1.9.3-3.7v-1.7c0-1.9-.3-3.7-.3-3.7zM9.9 15.3V8.9l6 3.2z" />
    </svg>
  );
}
