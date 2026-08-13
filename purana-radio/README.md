# पुराना रेडियो — Purana Radio

Single-page nostalgia radio: a floating glass player, driven by the YouTube
IFrame API, sitting over a bazaar-at-golden-hour background.

## Setup

```bash
npm install
npm run dev
```

This sandbox has no network access, so dependencies haven't been installed
here — run `npm install` wherever you actually build/run this.

## Before it does anything

1. **Background art** — drop your two images in:
   - `public/bg/scene-wide.png` (landscape)
   - `public/bg/scene-tall.png` (portrait — a separate composition, not a
     crop of the wide one)

2. **Songs** — `app/lib/tracks.ts` ships with three empty playlists on
   purpose. I didn't pre-fill any old Hindi film tracks: that catalogue is
   almost always still copyrighted, and I have no way to verify from here
   who owns a given YouTube upload or whether its owner has embedding
   switched on. Add a track by pushing one object into a playlist's
   `tracks` array — the file has the exact shape and the rules for which
   videoIds are safe to use. Everything else (player, seek bar, next/prev,
   playlist switching) already works once a track exists.

3. **Social links** — placeholders in `app/components/SocialLinks.tsx`,
   marked with a `TODO`.

## Notes on a couple of judgment calls

- **The listener count is simulated**, not real analytics — it drifts a
  plausible number client-side. Said so in a code comment; wire up a real
  source before treating it as more than décor.
- **One shared YouTube player, not two.** The brief calls for two genuinely
  separate DOM blocks (desktop pill / mobile card), but there can only be
  one live `<iframe>` — two would mean two audio streams. `Vinyl.tsx` is
  the single instance; `useAlignToVisible.ts` measures whichever of the two
  blocks is currently visible (via `display: none` detection) and
  positions the vinyl over it with `position: fixed`. It's never
  unmounted, so playback and the spin animation both survive switching
  between blocks at the `sm:` breakpoint.
- **`playerVars.controls` is left at its default (on)**, not switched off.
  The brief is right that a hidden player traps people behind an
  unskippable ad — but at 64–80px, a real skip button would be nearly
  unusable either way. Leaving native controls on is the closer read of
  "don't take away the listener's way out," even though it means YouTube's
  own chrome is technically visible (tiny) inside the vinyl when paused.
