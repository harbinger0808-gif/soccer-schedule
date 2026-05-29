"use client";

import { useEffect, useRef } from "react";

let counter = 0;

export default function IMobileAd() {
  const elementId = useRef(`im-spot-${++counter}`);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    pushed.current = true;

    const push = () => {
      (window as any).adsbyimobile = (window as any).adsbyimobile || [];
      (window as any).adsbyimobile.push({
        pid: 84984,
        mid: 593266,
        asid: 1933128,
        type: "banner",
        display: "inline",
        elementid: elementId.current,
      });
    };

    // spot.js がロード済みなら即push、まだなら待つ
    if ((window as any).adsbyimobile !== undefined) {
      push();
    } else {
      const timer = setInterval(() => {
        push();
        clearInterval(timer);
      }, 500);
    }
  }, []);

  return (
    <div className="flex justify-center my-3">
      <div id={elementId.current} />
    </div>
  );
}
