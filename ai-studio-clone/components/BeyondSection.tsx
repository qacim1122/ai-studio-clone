"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import ParticleSphere from "./ParticleSphere";
import ProjectGallery from "./ProjectGallery";

export default function BeyondSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom center",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-between px-6 sm:px-16 pt-28 pb-16"
      >
        <ParticleSphere progressRef={progressRef} />

        <h2 className="relative z-10 text-[56px] sm:text-[88px] font-semibold leading-[0.95] bg-gradient-to-r from-white to-white/30 bg-clip-text text-transparent">
          Beyond
        </h2>

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-10">
          <div className="max-w-sm space-y-4 text-white/50 text-[15px] leading-relaxed">
            <p>
              Superconscious is a neural engine that turns intent into action
              — anticipating your next move before you make it, across every
              device you already own.
            </p>
            <p>
              One model, every surface: wearable, neural, and beyond. No
              ceilings, no limits — just intelligence that keeps pace with the
              way you think.
            </p>
          </div>
          <h2 className="text-[56px] sm:text-[88px] font-semibold leading-[0.95] text-white/40 text-right">
            all
            <br />
            limits
          </h2>
        </div>
      </section>

      <ProjectGallery />
    </>
  );
}
