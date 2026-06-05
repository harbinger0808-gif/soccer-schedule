"use client";

import { useEffect, useRef, useState } from "react";

let counter = 0;

// i-mobile 広告スポット（プラットフォームごとに別タグ。混在使用は規約違反）
const SP_SPOT = { pid: 84984, mid: 593267, asid: 1933658 }; // スマホ用
const PC_SPOT = { pid: 84984, mid: 593266, asid: 1933128 }; // PC用

function isMobileUA() {
  if (typeof navigator === "undefined") return true; // 当サイトはモバイル主体のため不明時はSP
  return /iphone|ipod|android|mobile|blackberry|iemobile|opera mini/i.test(
    navigator.userAgent
  );
}

export default function IMobileAd() {
  const elementId = useRef(`im-spot-${++counter}`);
  const pushed = useRef(false);
  // SSRとクライアントでDOMを一致させるため、判定はマウント後に確定
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || pushed.current) return;
    pushed.current = true;

    const spot = isMobileUA() ? SP_SPOT : PC_SPOT;

    const push = () => {
      (window as any).adsbyimobile = (window as any).adsbyimobile || [];
      (window as any).adsbyimobile.push({
        pid: spot.pid,
        mid: spot.mid,
        asid: spot.asid,
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
  }, [ready]);

  return (
    <div className="flex justify-center my-3">
      <div id={elementId.current} />
    </div>
  );
}
