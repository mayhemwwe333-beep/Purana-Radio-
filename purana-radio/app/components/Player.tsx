"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { track as reportEvent } from "@vercel/analytics";
import { playlists } from "../lib/tracks";
import { useYouTubeApi } from "../lib/useYouTubeApi";
import { useAlignToVisible } from "../lib/useAlignToVisible";
import Vinyl from "./Vinyl";
import TrackInfo from "./TrackInfo";
import SeekBar from "./SeekBar";
import Transport from "./Transport";
import TimeReadout from "./TimeReadout";
import PlaylistTabs from "./PlaylistTabs";

// The glass recipe, verbatim: a flat white/10 fill reads as a grey slab,
// not glass — the gradient + backdrop-saturate is what sells it.
const GLASS =
  "border border-white/10 bg-gradient-to-b from-white/[0.15] to-white/[0.055] backdrop-blur-3xl backdrop-saturate-[1.7] shadow-[0_16px_48px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)]";

export default function Player() {
  const ytReady = useYouTubeApi();

  const [playlistIndex, setPlaylistIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playlist = playlists[playlistIndex];
  const track = playlist?.tracks[trackIndex] ?? null;
  const hasTrack = Boolean(track);

  const playerRef = useRef<YT.Player | null>(null);
  const loadedVideoId = useRef<string | null>(null);

  // Always-current copy of the indices, so event handlers registered once
  // (onStateChange/onError) never close over stale state.
  const stateRef = useRef({ playlistIndex, trackIndex });
  stateRef.current = { playlistIndex, trackIndex };

  const desktopSpacerRef = useRef<HTMLDivElement | null>(null);
  const mobileSpacerRef = useRef<HTMLDivElement | null>(null);
  const vinylRect = useAlignToVisible([desktopSpacerRef, mobileSpacerRef]);

  const nextTrack = useCallback(() => {
    const { playlistIndex: p } = stateRef.current;
    const list = playlists[p];
    if (!list || list.tracks.length === 0) return;
    setTrackIndex((i) => (i + 1) % list.tracks.length);
  }, []);

  const prevTrack = useCallback(() => {
    const { playlistIndex: p } = stateRef.current;
    const list = playlists[p];
    if (!list || list.tracks.length === 0) return;
    setTrackIndex((i) => (i - 1 + list.tracks.length) % list.tracks.length);
  }, []);

  const nextTrackRef = useRef(nextTrack);
  nextTrackRef.current = nextTrack;

  const handlePlaybackError = useCallback((code: number, videoId: string) => {
    // Videos get deleted or have embedding switched off after ship day —
    // skip forward instead of stalling, and log which track/track broke.
    reportEvent("youtube_playback_error", { code, videoId });
    nextTrackRef.current();
  }, []);
  const handlePlaybackErrorRef = useRef(handlePlaybackError);
  handlePlaybackErrorRef.current = handlePlaybackError;

  // Create the player once, the first time a track is available. Never
  // define this as a nested component — it's an effect, but the same
  // "module scope only" logic applies to keep identities stable.
  useEffect(() => {
    if (!ytReady || !track || playerRef.current) return;
    const mount = document.getElementById("yt-player-mount");
    if (!mount) return;

    loadedVideoId.current = track.videoId;
    playerRef.current = new window.YT!.Player("yt-player-mount", {
      width: "100%",
      height: "100%",
      videoId: track.videoId,
      playerVars: {
        playsinline: 1,
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
      },
      events: {
        onStateChange: (e) => {
          const state = window.YT!.PlayerState;
          if (e.data === state.PLAYING) setIsPlaying(true);
          else if (e.data === state.PAUSED) setIsPlaying(false);
          else if (e.data === state.ENDED) nextTrackRef.current();
        },
        onError: (e) => {
          handlePlaybackErrorRef.current(e.data, track.videoId);
        },
      },
    });
    // Only (re)run this when the API becomes ready or the mount point
    // needs its first player — not on every track change (see below).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ytReady, track]);

  // Load a different video when the track changes (skip, next/prev,
  // playlist switch) without tearing down and recreating the player.
  useEffect(() => {
    const player = playerRef.current;
    if (!player || !track) return;
    if (loadedVideoId.current === track.videoId) return;
    loadedVideoId.current = track.videoId;
    player.loadVideoById(track.videoId);
  }, [track]);

  // YouTube's API has no timeupdate event — poll while actually playing.
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      const player = playerRef.current;
      if (!player) return;
      const d = player.getDuration();
      if (d) setDuration(d);
      setCurrentTime(player.getCurrentTime());
    }, 400);
    return () => clearInterval(id);
  }, [isPlaying]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [track?.id]);

  const togglePlay = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    if (isPlaying) player.pauseVideo();
    else player.playVideo();
  }, [isPlaying]);

  const handleSeek = useCallback((time: number) => {
    const player = playerRef.current;
    if (!player) return;
    player.seekTo(time, true);
    setCurrentTime(time);
  }, []);

  const switchPlaylist = useCallback((index: number) => {
    setPlaylistIndex(index);
    setTrackIndex(0);
  }, []);

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-3">
      <PlaylistTabs playlists={playlists} activeIndex={playlistIndex} onSelect={switchPlaylist} />

      {!hasTrack ? (
        <div className={`w-full rounded-[26px] px-5 py-4 text-center text-sm text-cream/70 ${GLASS}`}>
          No tracks yet — add one in <code className="text-cream">app/lib/tracks.ts</code>.
        </div>
      ) : (
        <>
          {/* Desktop — one horizontal pill */}
          <div className={`hidden w-full items-center gap-3 rounded-full p-3 pr-5 sm:flex ${GLASS}`}>
            <div ref={desktopSpacerRef} className="h-20 w-20 shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <TrackInfo title={track!.title} artist={track!.artist} />
              <SeekBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
              <TimeReadout currentTime={currentTime} duration={duration} />
            </div>
            <Transport isPlaying={isPlaying} onPrev={prevTrack} onToggle={togglePlay} onNext={nextTrack} />
          </div>

          {/* Mobile — stacked card */}
          <div className={`flex w-full flex-col gap-3 rounded-[26px] p-4 sm:hidden ${GLASS}`}>
            <div className="flex items-center gap-3">
              <div ref={mobileSpacerRef} className="h-16 w-16 shrink-0" />
              <TrackInfo title={track!.title} artist={track!.artist} className="flex-1" />
            </div>
            <SeekBar currentTime={currentTime} duration={duration} onSeek={handleSeek} />
            <div className="grid grid-cols-3 items-center">
              <TimeReadout currentTime={currentTime} duration={duration} className="justify-self-start" />
              <div className="justify-self-center">
                <Transport isPlaying={isPlaying} onPrev={prevTrack} onToggle={togglePlay} onNext={nextTrack} />
              </div>
              <div aria-hidden="true" />
            </div>
          </div>
        </>
      )}

      <Vinyl rect={vinylRect} spinning={isPlaying} hasTrack={hasTrack} />
    </div>
  );
}
