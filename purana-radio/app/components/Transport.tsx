"use client";

import { PauseIcon, PlayIcon, PrevIcon, NextIcon } from "./icons";

type Props = {
  isPlaying: boolean;
  onPrev: () => void;
  onToggle: () => void;
  onNext: () => void;
};

export default function Transport({ isPlaying, onPrev, onToggle, onNext }: Props) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Previous track"
        className="flex h-11 w-11 items-center justify-center rounded-full text-cream/80 transition hover:text-cream active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
      >
        <PrevIcon className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onToggle}
        aria-label={isPlaying ? "Pause" : "Play"}
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full bg-gradient-to-b from-amber to-amber/70 ring-1 ring-white/25 shadow-[0_8px_20px_-4px_rgba(217,164,65,0.65)] transition active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
      >
        {isPlaying ? (
          <PauseIcon className="h-5 w-5 text-ink" />
        ) : (
          <PlayIcon className="h-5 w-5 translate-x-[1px] text-ink" />
        )}
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Next track"
        className="flex h-11 w-11 items-center justify-center rounded-full text-cream/80 transition hover:text-cream active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber"
      >
        <NextIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
