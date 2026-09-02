"use client";

const WORDS = ["Design that sells", "Speed to ship", "without compromise"];

export default function Marquee() {
  const loopWords = [...WORDS, ...WORDS];
  return (
    <div className="absolute inset-0 flex items-center overflow-hidden select-none pointer-events-none">
      <div className="marquee-track">
        {loopWords.map((w, i) => (
          <span
            key={i}
            className="flex items-center text-[64px] sm:text-[110px] font-semibold text-black/90 tracking-tight whitespace-nowrap px-6"
          >
            {w}
            <span className="mx-6 w-3 h-3 rounded-full border-2 border-black/70 inline-block" />
          </span>
        ))}
      </div>
    </div>
  );
}
