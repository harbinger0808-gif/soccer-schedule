"use client";

import { useEffect, useRef } from "react";

let scriptLoaded = false;

export default function IMobileAd() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const elementId = `im-${Math.random().toString(36).slice(2, 10)}`;
    ref.current.id = elementId;

    const loadAd = () => {
      (window as any).adsbyimobile = (window as any).adsbyimobile || [];
      (window as any).adsbyimobile.push({
        pid: 84984,
        mid: 593266,
        asid: 1933128,
        type: "banner",
        display: "inline",
        elementid: elementId,
      });
    };

    if (scriptLoaded) {
      loadAd();
    } else {
      const s = document.createElement("script");
      s.async = true;
      s.src = "https://imp-adedge.i-mobile.co.jp/script/v1/spot.js?20220104";
      s.onload = () => {
        scriptLoaded = true;
        loadAd();
      };
      document.head.appendChild(s);
      scriptLoaded = true;
    }
  }, []);

  return (
    <div className="flex justify-center my-3">
      <div ref={ref} />
    </div>
  );
}
