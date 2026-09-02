"use client";

import { useEffect, useState } from "react";
import Marquee from "./Marquee";
import { StarIcon } from "./Navbar";

type CardId = "templates" | "lending" | "analyser" | "neural";

const ORDER: CardId[] = ["templates", "lending", "analyser", "neural"];
const AUTOPLAY_MS = 3200;

export default function CardCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % ORDER.length);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col items-center justify-center py-32">
      <Marquee />

      <div
        className="carousel-stage relative w-full max-w-[420px] h-[520px] mx-auto z-10"
        aria-label="Template showcase carousel"
      >
        {ORDER.map((id, i) => {
          // offset in [-2..2] range relative to current, shortest path
          let offset = i - current;
          const len = ORDER.length;
          if (offset > len / 2) offset -= len;
          if (offset < -len / 2) offset += len;

          const abs = Math.abs(offset);
          const visible = abs <= 1;

          const style: React.CSSProperties = {
            transform: `translateX(-50%) translateX(${
              offset * 220
            }px) translateZ(${-abs * 180}px) rotateY(${offset * -28}deg) scale(${
              1 - abs * 0.14
            })`,
            opacity: visible ? (abs === 0 ? 1 : 0.55) : 0,
            zIndex: 10 - abs,
            pointerEvents: abs === 0 ? "auto" : "none",
          };

          return (
            <div key={id} className="carousel-card w-[280px] h-[420px]" style={style}>
              <CardFace id={id} />
            </div>
          );
        })}
      </div>

      <button className="relative z-10 mt-10 text-sm font-semibold text-white bg-[#0d0a24] rounded-full px-6 py-3 hover:bg-[#171241] transition-colors">
        Explore the collection
      </button>
    </section>
  );
}

function CardFace({ id }: { id: CardId }) {
  switch (id) {
    case "templates":
      return (
        <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl bg-gradient-to-b from-lime-300 via-black to-black flex items-center justify-center">
          <span className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] text-white/40 tracking-wide">
            [ IMAGE PLACEHOLDER: portrait, green rim-light ]
          </span>
          <p className="text-white text-2xl font-semibold text-center px-6">
            Browse our
            <br />
            templates
          </p>
        </div>
      );
    case "lending":
      return (
        <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl bg-gradient-to-b from-[#0b0b12] via-[#241a4d] to-[#7c3aed] p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-black text-sm font-bold">+</span>
            </div>
            <span className="text-white/70 text-xs">Catalist.co.uk</span>
          </div>
          <div className="bg-black/40 rounded-2xl px-4 py-3 flex items-center justify-between mb-auto">
            <div>
              <p className="text-white/50 text-[11px]">Catalist Lendings</p>
              <p className="text-white text-sm font-medium">Apply for Loan</p>
            </div>
            <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center text-white text-sm">
              +
            </div>
          </div>
          <p className="text-white text-xl leading-snug mt-6">
            The Ultimate Engine for{" "}
            <span className="font-bold">Business Lending</span>
          </p>
        </div>
      );
    case "analyser":
      return (
        <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl bg-gradient-to-b from-[#7c3aed] via-[#241a4d] to-[#0b0b12] p-5 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <span className="text-black text-sm font-bold">+</span>
            </div>
            <span className="text-white/70 text-xs">Catalist.co.uk</span>
          </div>
          <div className="bg-black/50 rounded-full px-4 py-3 flex items-center justify-between mb-auto">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-white text-xs shrink-0">
                +
              </div>
              <span className="text-white/80 text-xs truncate">
                Analyze impact of lending i...
              </span>
            </div>
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-black text-xs shrink-0">
              &gt;
            </div>
          </div>
          <p className="text-white text-xl leading-snug mt-6">
            Use AI-based system analyser —{" "}
            <span className="font-bold">
              all through one intelligent platform.
            </span>
          </p>
        </div>
      );
    case "neural":
      return (
        <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl bg-[radial-gradient(circle_at_50%_30%,#c4b5fd_0%,#7c3aed_45%,#3f1c8c_100%)] p-5 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-white bg-white/15 rounded-full px-3 py-1.5">
              Neural Core
            </span>
            <span className="text-white/70 text-xs">superconscious.ai</span>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <StarIcon className="w-16 h-16 text-white" />
          </div>
          <p className="text-white text-2xl leading-snug">
            Intelligence,
            <br />
            beyond limits
          </p>
        </div>
      );
  }
}
