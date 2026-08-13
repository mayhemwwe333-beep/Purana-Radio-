"use client";

import { memo } from "react";
import type { Rect } from "../lib/useAlignToVisible";

type Props = {
  rect: Rect | null;
  spinning: boolean;
  hasTrack: boolean;
};

/**
 * The one and only vinyl/iframe on the page. It's `position: fixed` and
 * repositioned (via `rect`) to sit exactly over whichever of the desktop
 * pill or mobile card is currently visible — so there's a single live
 * YouTube player, never two, and never a remount that would reset its
 * spin animation or its playback.
 */
function VinylBase({ rect, spinning, hasTrack }: Props) {
  if (!rect) return null;

  return (
    <div
      className="fixed z-20 rounded-full shadow-[0_6px_18px_rgba(0,0,0,0.55)]"
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
        animation: "spin 8s linear infinite",
        animationPlayState: spinning ? "running" : "paused",
      }}
    >
      <div className="absolute inset-0 overflow-hidden rounded-full bg-black ring-2 ring-white/15">
        {hasTrack && (
          // YouTube's IFrame API mounts its <iframe> into this element by
          // id. It's oversized (16:9 source, square target) and centered
          // so the crop reads as "cover", not a squeezed video.
          <div
            id="yt-player-mount"
            className="absolute left-1/2 top-1/2 h-[178%] w-[178%] -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </div>
      {/* Spindle hole. pointer-events-none so a click here still reaches
          the real player controls underneath (e.g. an ad's skip button). */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/70 ring-2 ring-white/40" />
    </div>
  );
}

// Only re-renders on rect/spinning/hasTrack changes — never on the
// currentTime ticks the player above emits every ~400ms. Re-rendering the
// same DOM node doesn't restart a CSS animation, but this also keeps a
// progress-driven re-render from ever being tempted to touch this subtree.
export default memo(VinylBase);
