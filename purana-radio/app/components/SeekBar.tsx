"use client";

import { useCallback, useRef, type PointerEvent } from "react";

type Props = {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
  className?: string;
};

export default function SeekBar({ currentTime, duration, onSeek, className = "" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const progress = duration > 0 ? Math.min(currentTime / duration, 1) : 0;

  const seekFromClientX = useCallback(
    (clientX: number) => {
      const el = trackRef.current;
      if (!el || duration <= 0) return;
      const rect = el.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      onSeek(ratio * duration);
    },
    [duration, onSeek]
  );

  // onPointerDown (not onClick) so dragging works, and touch-none below so
  // a drag on mobile seeks instead of scrolling the page.
  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      seekFromClientX(e.clientX);
    },
    [seekFromClientX]
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (e.buttons !== 1) return;
      seekFromClientX(e.clientX);
    },
    [seekFromClientX]
  );

  return (
    <div
      ref={trackRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      className={`group relative flex h-6 w-full touch-none items-center ${className}`}
      role="slider"
      aria-label="Seek"
      aria-valuemin={0}
      aria-valuemax={Math.round(duration) || 0}
      aria-valuenow={Math.round(currentTime) || 0}
    >
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/15">
        <div
          className="h-full rounded-full bg-amber shadow-[0_0_10px_2px_rgba(217,164,65,0.55)]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      <div
        className="pointer-events-none absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-cream opacity-0 shadow-[0_0_6px_rgba(0,0,0,0.5)] transition-opacity duration-150 group-hover:opacity-100"
        style={{ left: `calc(${progress * 100}% - 6px)` }}
      />
    </div>
  );
}
