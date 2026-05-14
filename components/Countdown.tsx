"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate: string;
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    function calc() {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) {
        setExpired(true);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (expired) return <span className="text-yellow-400 text-sm font-bold">🔴 試合中 / 終了</span>;

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex gap-3 items-center justify-center">
      {[
        { label: "日", value: timeLeft.days },
        { label: "時", value: timeLeft.hours },
        { label: "分", value: timeLeft.minutes },
        { label: "秒", value: timeLeft.seconds },
      ].map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="bg-white/10 rounded-lg px-3 py-2 text-2xl font-mono font-bold tabular-nums min-w-[3rem]">
            {pad(value)}
          </div>
          <div className="text-xs text-white/50 mt-1">{label}</div>
        </div>
      ))}
    </div>
  );
}
