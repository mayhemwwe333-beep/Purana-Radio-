import type { Playlist } from "../lib/tracks";

type Props = {
  playlists: Playlist[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function PlaylistTabs({ playlists, activeIndex, onSelect }: Props) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 p-1 backdrop-blur-md">
      {playlists.map((playlist, i) => (
        <button
          key={playlist.id}
          type="button"
          onClick={() => onSelect(i)}
          aria-pressed={i === activeIndex}
          className={`rounded-full px-3 py-1.5 font-ui text-[12px] transition ${
            i === activeIndex ? "bg-amber text-ink" : "text-cream/70 hover:text-cream"
          }`}
        >
          {playlist.name}
        </button>
      ))}
    </div>
  );
}
