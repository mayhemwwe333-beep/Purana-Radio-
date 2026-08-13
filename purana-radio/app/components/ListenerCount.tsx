"use client";

import { useEffect, useState } from "react";

// There's no real listener backend here — this drifts a plausible number
// client-side so the corner isn't empty. Swap in a real count (e.g. from
// your own analytics) before treating this as anything but decoration.
function nextCount(prev: number) {
  const delta = Math.round((Math.random() - 0.45) * 6);
  return Math.max(120, prev + delta);
}

export default function ListenerCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    setCount(340);
    const id = setInterval(() => {
      setCount((c) => (c === null ? 340 : nextCount(c)));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-md">
      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" aria-hidden="true" />
      <span className="font-ui text-[12px] tabular-nums text-cream">
        {count.toLocaleString("en-IN")}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-cream/60">tuned in</span>
    </div>
  );
}
