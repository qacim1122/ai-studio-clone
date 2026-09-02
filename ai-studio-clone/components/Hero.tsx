"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const AVATARS = [
  "bg-[#e8b4a0]",
  "bg-[#7a8fa6]",
  "bg-[#c9a876]",
  "bg-[#a67a9e]",
  "bg-[#d97757]",
];

export default function Hero() {
  const cardRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero card flips away in 3D as the user scrolls past it,
      // revealing the section underneath — matches the coverflow
      // "flip transition" seen in the source video.
      gsap.to(cardRef.current, {
        rotateX: -70,
        y: -80,
        scale: 0.92,
        opacity: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[100vh] w-full bg-white px-4 pt-24 pb-4 sm:px-6"
      style={{ perspective: "1800px" }}
    >
      <div
        ref={cardRef}
        className="hero-card relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl"
      >
        {/* headline */}
        <div className="absolute top-16 left-8 sm:left-16 z-10">
          <h1 className="text-[42px] sm:text-[64px] leading-[0.95] font-semibold text-white tracking-tight">
            Prompts that
            <br />
            <span className="text-white/40">think ahead.</span>
          </h1>
        </div>

        {/* hero image placeholder */}
        <div className="absolute right-[8%] top-[18%] w-[46%] max-w-[420px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)]">
          <div className="w-full h-full bg-gradient-to-br from-[#3a2f6b] via-[#241a4d] to-black flex items-center justify-center text-center p-4">
            <span className="text-white/30 text-xs leading-relaxed">
              [ IMAGE PLACEHOLDER ]
              <br />
              Abstract draped-fabric portrait
              <br />
              with warm backlight, reflected
              <br />
              in water — matches source video
            </span>
          </div>
        </div>

        {/* copy + CTAs */}
        <div className="absolute left-8 sm:left-16 bottom-24 max-w-sm z-10">
          <p className="text-white/70 text-[15px] leading-relaxed mb-5">
            Turn engagement into conversions, trends into traffic, and views
            into revenue. All with a team that knows how to make social media
            work for you.
          </p>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-white bg-white/10 border border-white/25 rounded-full px-5 py-2.5 hover:bg-white/20 transition-colors">
              See Pricing
            </button>
            <button className="text-sm font-semibold text-black bg-white rounded-full px-5 py-2.5 hover:bg-white/90 transition-colors">
              Start Journey
            </button>
          </div>
        </div>

        {/* trusted-by row */}
        <div className="absolute left-8 sm:left-16 bottom-8 flex items-center gap-3">
          <div className="flex -space-x-2">
            {AVATARS.map((c, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full border-2 border-[#120a2e] ${c}`}
              />
            ))}
          </div>
          <span className="text-white/70 text-[13px]">
            Trusted by 4000+ creatives
          </span>
        </div>

        {/* right-side supporting copy */}
        <div className="absolute right-8 sm:right-16 bottom-8 max-w-xs text-right hidden md:block">
          <p className="text-white/50 text-[13px] leading-relaxed">
            From crafting scroll-stopping content to engineering algorithms we
            help your brand break through the noise and go viral.
          </p>
        </div>

        <div className="absolute left-8 right-8 sm:left-16 sm:right-16 bottom-[76px] h-px bg-white/10" />
      </div>
    </section>
  );
}
