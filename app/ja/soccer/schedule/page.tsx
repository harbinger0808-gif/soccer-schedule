import { Suspense } from "react";
import ScheduleClient from "./ScheduleClient";

export default function SchedulePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a1628] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-spin">⚽</div>
          <p className="text-white/60">試合データを取得中...</p>
        </div>
      </div>
    }>
      <ScheduleClient />
    </Suspense>
  );
}
