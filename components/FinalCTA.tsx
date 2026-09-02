"use client";

export default function FinalCTA() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[radial-gradient(120%_100%_at_20%_100%,#c4b5fd_0%,#7c3aed_35%,#2c1466_65%,#0a0614_100%)] flex items-center px-6 sm:px-16">
      <div className="relative z-10 max-w-lg">
        <h2 className="text-[48px] sm:text-[64px] font-semibold leading-[1.02] text-white/95">
          Build beyond
          <br />
          <span className="text-white/50">all limits</span>
        </h2>
        <p className="text-white/70 text-[16px] leading-relaxed mt-6 max-w-sm">
          Templates, prompts, and tools that think ahead — start shipping
          faster today.
        </p>
        <button className="mt-8 text-sm font-semibold text-black bg-white rounded-lg px-6 py-3.5 hover:bg-white/90 transition-colors">
          Get started
        </button>
      </div>

      {/* Chrome star graphic, bottom-right, echoing the loading-screen mark */}
      <div className="chrome-star pointer-events-none absolute -right-[8%] top-1/2 -translate-y-1/2 w-[65%] max-w-[900px] aspect-square">
        <ChromeStar />
      </div>
    </section>
  );
}

function ChromeStar() {
  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <defs>
        <linearGradient id="chrome" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f5f5f7" />
          <stop offset="45%" stopColor="#8a8a92" />
          <stop offset="55%" stopColor="#3a3a40" />
          <stop offset="100%" stopColor="#0a0a0c" />
        </linearGradient>
      </defs>
      <path
        d="M200 0C200 100 233 167 300 200C233 233 200 300 200 400C200 300 167 233 100 200C167 167 200 100 200 0Z"
        fill="url(#chrome)"
      />
    </svg>
  );
}
