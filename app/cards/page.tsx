// app/transactions/page.tsx
export default function TransactionsPage() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="p-4 bg-income/10 rounded-full">
        <div className="w-12 h-12 bg-income rounded-xl flex items-center justify-center text-white">
          {/* Re-using your brand colors! */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </div>
      </div>
      <h1 className="text-2xl font-bold text-slate-900">Cards</h1>
      <p className="text-slate-500 text-center max-w-sm">Coming soon!</p>
    </div>
  );
}
