"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import InteractiveTilt from "./InteractiveTilt";

export default function VrmSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // --- IMAGE ANIMATIONS ---
  // Slide in from RIGHT & fade in (mirrored from GPU Die)
  const imgX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [120, 0, 0, 60]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 1, 1, 0]);
  const imgY = useTransform(scrollYProgress, [0.75, 1], [0, -80]);

  // --- TEXT ANIMATIONS (staggered reveals) ---
  const labelOpacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const labelY = useTransform(scrollYProgress, [0.1, 0.25], [20, 0]);

  const lineOpacity = useTransform(scrollYProgress, [0.15, 0.3], [0, 1]);
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.35], ["0%", "100%"]);

  const headlineOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const headlineY = useTransform(scrollYProgress, [0.2, 0.35], [40, 0]);

  const desc1Opacity = useTransform(scrollYProgress, [0.3, 0.42], [0, 1]);
  const desc1Y = useTransform(scrollYProgress, [0.3, 0.42], [20, 0]);

  const desc2Opacity = useTransform(scrollYProgress, [0.35, 0.47], [0, 1]);
  const desc2Y = useTransform(scrollYProgress, [0.35, 0.47], [20, 0]);

  const desc3Opacity = useTransform(scrollYProgress, [0.4, 0.52], [0, 1]);
  const desc3Y = useTransform(scrollYProgress, [0.4, 0.52], [20, 0]);

  // Fade out everything on exit
  const sectionOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ opacity: sectionOpacity }}
          className="h-full w-full flex items-center justify-center px-8 md:px-24 max-w-7xl mx-auto"
        >
          {/* ===== LEFT: TEXT ===== */}
          <div className="w-1/2 flex flex-col justify-center pr-12 md:pr-20">
            {/* Label */}
            <motion.span
              style={{ opacity: labelOpacity, y: labelY }}
              className="text-white/50 font-mono tracking-[0.3em] text-xs uppercase mb-8 block text-glow"
            >
              02 / VRM
            </motion.span>

            {/* Hairline separator */}
            <motion.div
              style={{ opacity: lineOpacity, width: lineWidth }}
              className="h-px bg-white/20 mb-10 max-w-xs"
            />

            {/* Headline */}
            <motion.h2
              style={{ opacity: headlineOpacity, y: headlineY }}
              className="mb-12"
            >
              <span className="block text-6xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-lg">
                The Lifeline
              </span>
              <span className="block text-6xl md:text-7xl font-bold tracking-tighter text-white/40 mt-2">
                of Power.
              </span>
            </motion.h2>

            {/* Description lines */}
            <div className="flex flex-col gap-5">
              <motion.p
                style={{ opacity: desc1Opacity, y: desc1Y }}
                className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed"
              >
                Voltage Regulator Modules convert and stabilize raw power from the PSU.
              </motion.p>
              <motion.p
                style={{ opacity: desc2Opacity, y: desc2Y }}
                className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed"
              >
                Dozens of phases working in parallel to deliver clean, unwavering current.
              </motion.p>
              <motion.p
                style={{ opacity: desc3Opacity, y: desc3Y }}
                className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed"
              >
                The silent guardian between stability and catastrophic failure.
              </motion.p>
            </div>
          </div>

          {/* ===== RIGHT: IMAGE ===== */}
          <motion.div
            style={{ x: imgX, opacity: imgOpacity, y: imgY, perspective: 1000 }}
            className="w-1/2 flex items-center justify-center relative"
          >
            {/* Warm amber ambient glow behind VRM */}
            <motion.div
              className="absolute w-[70%] h-[70%] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />

            <InteractiveTilt>
              {/* The floating VRM */}
              <motion.img
                src="/VRM.png"
                alt="VRM — Voltage Regulator Module"
                className="relative z-10 w-[75%] max-w-lg drop-shadow-[0_0_60px_rgba(251,191,36,0.15)]"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              />
            </InteractiveTilt>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
