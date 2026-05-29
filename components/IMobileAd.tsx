"use client";

import { useEffect, useRef } from "react";

export default function IMobileAd() {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current || !ref.current) return;
    loaded.current = true;

    // spot.js を動的ロード
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://imp-adedge.i-mobile.co.jp/script/v1/spot.js?20220104";
    document.head.appendChild(s);

    // push設定
    const push = document.createElement("script");
    push.innerHTML = `(window.adsbyimobile=window.adsbyimobile||[]).push({pid:84984,mid:593266,asid:1933128,type:"banner",display:"inline",elementid:"im-e121dbbf34234f8c95505dc83f847e10"})`;
    ref.current.appendChild(push);
  }, []);

  return (
    <div className="flex justify-center my-4">
      <div id="im-e121dbbf34234f8c95505dc83f847e10" ref={ref} />
    </div>
  );
}
