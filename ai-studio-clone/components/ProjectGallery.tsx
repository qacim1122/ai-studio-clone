"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const PROJECTS = [
  {
    name: "Urchin",
    author: "logan cee",
    year: "2023",
    tags: "Architecture Design · Website",
    from: "#0b2a52",
    to: "#0a1f3d",
    note: "Coral-blue toned bouquet cascading over rock formation",
  },
  {
    name: "Zumar",
    author: "zumar",
    year: "2024",
    tags: "Web Design & Development",
    from: "#25324a",
    to: "#0d1420",
    note: "Mirrored swirling tunnel of light, silhouette walking through",
  },
  {
    name: "Nova",
    author: "nova",
    year: "2024",
    tags: "Brand · Motion · Web",
    from: "#2a2440",
    to: "#0c0a16",
    note: "Desert dunes under a starlit purple night sky",
  },
];

export default function ProjectGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

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
    <div ref={wrapperRef} className="relative w-full h-screen overflow-hidden">
      <div ref={trackRef} className="flex h-full w-max">
        {PROJECTS.map((p) => (
          <div
            key={p.name}
            className="relative h-full w-screen shrink-0 flex flex-col justify-between p-8 sm:p-12"
            style={{
              background: `linear-gradient(160deg, ${p.from} 0%, ${p.to} 100%)`,
            }}
          >
            <div className="flex items-center gap-2 text-white/70 text-sm pt-16">
              <span>{p.author}</span>
              <span>·</span>
              <span>{p.year}</span>
              <span>·</span>
              <span>{p.tags}</span>
            </div>
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/15 text-xs text-center max-w-xs">
              [ IMAGE PLACEHOLDER ] {p.note}
            </span>
            <h3 className="text-white text-6xl sm:text-7xl font-semibold">
              {p.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
