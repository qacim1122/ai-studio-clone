"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas particle field that forms a sphere/ring when `progress` is 0
 * and scatters outward across the section as `progress` approaches 1.
 * `progress` is driven externally (0..1) by scroll position.
 */
export default function ParticleSphere({
  progressRef,
}: {
  progressRef: React.MutableRefObject<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    const COUNT = 900;
    const particles = new Array(COUNT).fill(0).map(() => {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1;
      return {
        // sphere-surface home position (unit vector)
        hx: Math.sin(phi) * Math.cos(theta) * r,
        hy: Math.sin(phi) * Math.sin(theta) * r,
        hz: Math.cos(phi) * r,
        // scattered destination
        sx: (Math.random() - 0.5) * 2.4,
        sy: (Math.random() - 0.5) * 2.4,
        purple: Math.random() > 0.55,
        size: Math.random() * 1.8 + 0.6,
      };
    });

    let raf = 0;
    let rotation = 0;

    function resize() {
      const parent = canvas!.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = width + "px";
      canvas!.style.height = height + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const sphereRadius = Math.min(width, height) * 0.16;
      const p = progressRef.current; // 0..1
      rotation += 0.0015;

      for (const pt of particles) {
        // rotate sphere position around Y axis for subtle motion
        const cosR = Math.cos(rotation);
        const sinR = Math.sin(rotation);
        const rx = pt.hx * cosR - pt.hz * sinR;
        const rz = pt.hx * sinR + pt.hz * cosR;

        const homeX = cx + rx * sphereRadius;
        const homeY = cy + pt.hy * sphereRadius;
        const scatterX = cx + pt.sx * width * 0.5;
        const scatterY = cy + pt.sy * height * 0.5;

        const x = homeX + (scatterX - homeX) * p;
        const y = homeY + (scatterY - homeY) * p;

        const depth = (rz + 1) / 2; // 0..1
        const alpha = 0.25 + depth * 0.75 * (1 - p * 0.4);

        ctx.beginPath();
        ctx.arc(x, y, pt.size * (1 - p * 0.3), 0, Math.PI * 2);
        ctx.fillStyle = pt.purple
          ? `rgba(168,110,255,${alpha})`
          : `rgba(255,255,255,${alpha * 0.8})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [progressRef]);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}
