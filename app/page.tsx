"use client";

import dynamic from "next/dynamic";

// This tells Next.js to ignore this component during server-side building
const DashboardContent = dynamic(() => import("@/components/Dashboard"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-pulse text-slate-400 font-medium">
        Loading Finance Dashboard...
      </div>
    </div>
  ),
});

export default function Page() {
  return <DashboardContent />;
}
