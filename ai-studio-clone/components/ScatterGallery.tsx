"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type Item = {
  id: string;
  top: string;
  width: number;
  height: number;
  kind: "photo" | "card";
  label?: string;
  sub?: string;
  from: string;
  to: string;
};

const ITEMS: Item[] = [
  {
    id: "portrait-1",
    top: "8%",
    width: 210,
    height: 170,
    kind: "photo",
    from: "#1c5570",
    to: "#0a1520",
    label: "portrait, teal backlight",
  },
  {
    id: "portrait-2",
    top: "38%",
    width: 170,
    height: 210,
    kind: "photo",
    from: "#173028",
    to: "#0a0f0d",
    label: "portrait, dark studio",
  },
  {
    id: "midjourney",
    top: "62%",
    width: 240,
    height: 260,
    kind: "card",
    label: "MIDJOURNEY",
    sub: "PROMPT",
    from: "#7a1f1f",
    to: "#2b0b0b",
  },
  {
    id: "nano-banana",
    top: "18%",
    width: 340,
    height: 400,
    kind: "card",
    label: "Nano Banana",
    sub: "See description ↓",
    from: "#0d3a66",
    to: "#020a14",
  },
  {
    id: "portrait-3",
    top: "44%",
    width: 130,
    height: 170,
    kind: "photo",
    from: "#0f2a3a",
    to: "#050d12",
    label: "portrait, small",
  },
  {
    id: "portrait-4",
    top: "3%",
    width: 220,
    height: 280,
    kind: "photo",
    from: "#3a3a26",
    to: "#0c0c08",
    label: "portrait, olive jacket",
  },
  {
    id: "star-card",
    top: "35%",
    width: 520,
    height: 360,
    kind: "card",
    from: "#3b1f7a",
    to: "#0a0614",
    label: "STAR",
  },
];

export default function ScatterGallery() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const wrapper = wrapperRef.current;
      if (!track || !wrapper) return;
      const scrollLength = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollLength,
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${scrollLength}`,
          scrub: true,
          pin: true,
        },
      });
    }, wrapperRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative w-full h-screen overflow-hidden bg-black">
      <div
        ref={trackRef}
        className="relative h-full"
        style={{ width: `${ITEMS.length * 420 + 600}px` }}
      >
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            className="absolute rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex items-end p-4"
            style={{
              top: item.top,
              left: `${140 + i * 420}px`,
              width: item.width,
              height: item.height,
              background: `linear-gradient(160deg, ${item.from} 0%, ${item.to} 100%)`,
            }}
          >
            {item.kind === "card" && item.label && (
              <div className="absolute top-3 left-4 z-10">
                <p className="text-white text-sm font-bold tracking-wide">
                  {item.label}
                </p>
                {item.sub && (
                  <p className="text-white/60 text-[10px] mt-0.5">
                    {item.sub}
                  </p>
                )}
              </div>
            )}
            <span className="text-white/25 text-[10px] leading-relaxed">
              [ IMAGE PLACEHOLDER: {item.label ?? item.id} ]
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
