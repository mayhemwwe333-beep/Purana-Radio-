"use client";

import { useEffect, useState } from "react";

type Parts = { hour: string; minute: string; dayPeriod: string };

function getParts(date: Date): Parts {
  const parts = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).formatToParts(date);

  return {
    hour: parts.find((p) => p.type === "hour")?.value ?? "--",
    minute: parts.find((p) => p.type === "minute")?.value ?? "--",
    dayPeriod: parts.find((p) => p.type === "dayPeriod")?.value ?? "",
  };
}

export default function Clock() {
  // Start unset so server and first client render match; fill in after mount.
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    setParts(getParts(new Date()));
    const id = setInterval(() => setParts(getParts(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  if (!parts) return null;

  return (
    <div className="flex items-baseline gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 backdrop-blur-md">
      <span className="font-ui text-[13px] tabular-nums tracking-wide text-cream">
        {parts.hour}
        <span className="animate-blink">:</span>
        {parts.minute}
      </span>
      <span className="text-[10px] uppercase tracking-wide text-cream/60">
        {parts.dayPeriod}
      </span>
    </div>
  );
}
