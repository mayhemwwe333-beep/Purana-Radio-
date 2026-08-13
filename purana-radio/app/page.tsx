import Clock from "./components/Clock";
import ListenerCount from "./components/ListenerCount";
import SocialLinks from "./components/SocialLinks";
import Player from "./components/Player";

export default function Home() {
  return (
    <main className="relative flex min-h-dvh flex-1 flex-col items-center justify-between overflow-hidden">
      {/* Background plate, swapped for portrait via CSS media query */}
      <div className="hero-bg fixed inset-0 -z-20 bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/80" />
      </div>

      {/* Film grain */}
      <div className="grain-overlay fixed inset-0 -z-10" />

      {/* Top row: clock / listener count / social links */}
      <div
        className="fixed inset-x-0 top-0 z-10 grid grid-cols-3 items-start
          pl-[max(1rem,env(safe-area-inset-left))]
          pr-[max(1rem,env(safe-area-inset-right))]
          pt-[max(1rem,env(safe-area-inset-top))]"
      >
        <div className="justify-self-start">
          <Clock />
        </div>
        <div className="justify-self-center">
          <ListenerCount />
        </div>
        <div className="justify-self-end">
          <SocialLinks />
        </div>
      </div>

      {/* Bottom-anchored player */}
      <div
        className="z-10 mt-auto flex w-full flex-col items-center gap-4
          pl-[max(1rem,env(safe-area-inset-left))]
          pr-[max(1rem,env(safe-area-inset-right))]
          pb-[max(1rem,env(safe-area-inset-bottom))]"
      >
        <h1 className="select-none text-center font-display text-2xl text-cream drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] sm:text-3xl">
          पुराना रेडियो
        </h1>
        <Player />
      </div>
    </main>
  );
}
