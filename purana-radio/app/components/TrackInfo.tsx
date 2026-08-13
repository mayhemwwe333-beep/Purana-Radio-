type Props = {
  title: string;
  artist: string;
  className?: string;
};

export default function TrackInfo({ title, artist, className = "" }: Props) {
  return (
    <div className={`min-w-0 ${className}`}>
      <p className="truncate font-ui text-[15px] font-semibold leading-tight text-cream">
        {title}
      </p>
      <p className="truncate font-ui text-[12.5px] leading-tight text-cream/70">{artist}</p>
    </div>
  );
}
