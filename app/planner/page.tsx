import { CalendarRange } from "lucide-react";

// app/planner/page.tsx
export default function Planner() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="p-4 bg-income/10 rounded-full">
        <div className="w-12 h-12 bg-income rounded-xl flex items-center justify-center text-white">
          {/* Re-using your brand colors! */}
          <CalendarRange className="w-6 h-6" />
        </div>
      </div>
      <h1 className="text-2xl font-bold text-slate-900">Planner</h1>
      <p className="text-slate-500 text-center max-w-sm">Coming soon!</p>
    </div>
  );
}
