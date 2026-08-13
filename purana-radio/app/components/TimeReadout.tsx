function formatTime(seconds: number): string {
  const safe = Number.isFinite(seconds) && seconds > 0 ? seconds : 0;
  const m = Math.floor(safe / 60);
  const s = Math.floor(safe % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

type Props = {
  currentTime: number;
  duration: number;
  className?: string;
};

export default function TimeReadout({ currentTime, duration, className = "" }: Props) {
  return (
    <span className={`font-ui text-[10.5px] tabular-nums text-cream/70 ${className}`}>
      {formatTime(currentTime)} / {formatTime(duration)}
    </span>
  );
}
