export type Track = {
  id: string;
  title: string;
  artist: string;
  film: string;
  year: number;
  /** mm:ss shown before the live player reports the real duration. */
  duration: string;
  /** The 11-character id from youtube.com/watch?v=XXXXXXXXXXX */
  videoId: string;
};

export type Playlist = {
  id: string;
  name: string;
  tracks: Track[];
};

/**
 * HOW TO ADD A SONG (one-line change)
 * ------------------------------------
 * Push one object into a playlist's `tracks` array:
 *
 *   {
 *     id: "unique-slug",
 *     title: "Song title",
 *     artist: "Singer(s)",
 *     film: "Film name",
 *     year: 1958,
 *     duration: "4:12",
 *     videoId: "XXXXXXXXXXX",
 *   }
 *
 * ONLY do this if one of the following is true:
 *   1. You hold the rights (it's your own upload), or
 *   2. It's uploaded by the actual rights holder — the studio, label, or an
 *      official artist/channel — AND that specific video has embedding
 *      switched on.
 *
 * I haven't pre-filled any songs here on purpose. Old Hindi film music is
 * almost always still under copyright, and I can't verify from here who
 * owns a given upload or whether embedding is enabled on it — so I'm not
 * going to search for or guess at "safe" video IDs. Drop in the ones you've
 * confirmed and everything downstream (player, seek bar, next/prev,
 * playlist switching) already works with zero other changes.
 */
export const playlists: Playlist[] = [
  { id: "golden-era", name: "Golden Era", tracks: [] },
  { id: "qawwali-ghazal", name: "Qawwali & Ghazal", tracks: [] },
  { id: "monsoon-melodies", name: "Monsoon Melodies", tracks: [] },
];
