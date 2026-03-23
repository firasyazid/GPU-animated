"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import InteractiveTilt from "./InteractiveTilt";

export default function VramSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [120, 0, 0, 60]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.75, 1], [0, 1, 1, 0]);
  const imgY = useTransform(scrollYProgress, [0.75, 1], [0, -80]);

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
          <div className="w-1/2 flex flex-col justify-center pr-12 md:pr-20">
            <motion.span
              style={{ opacity: labelOpacity, y: labelY }}
              className="text-white/50 font-mono tracking-[0.3em] text-xs uppercase mb-8 block text-glow"
            >
              02 / VRAM
            </motion.span>

            <motion.div
              style={{ opacity: lineOpacity, width: lineWidth }}
              className="h-px bg-white/20 mb-10 max-w-xs"
            />

            <motion.h2
              style={{ opacity: headlineOpacity, y: headlineY }}
              className="mb-12"
            >
              <span className="block text-6xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-lg">
                The Memory.
              </span>
              <span className="block text-6xl md:text-7xl font-bold tracking-tighter text-white/40 mt-2">
                The Buffer.
              </span>
            </motion.h2>

            <div className="flex flex-col gap-5">
              <motion.p
                style={{ opacity: desc1Opacity, y: desc1Y }}
                className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed"
              >
                Lightning-fast GDDR video random access memory caching massive textures.
              </motion.p>
              <motion.p
                style={{ opacity: desc2Opacity, y: desc2Y }}
                className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed"
              >
                Billions of bytes of bandwidth feeding the pipeline without bottleneck.
              </motion.p>
              <motion.p
                style={{ opacity: desc3Opacity, y: desc3Y }}
                className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed"
              >
                The bridge where data becomes immersive reality.
              </motion.p>
            </div>
          </div>

          <motion.div
            style={{ x: imgX, opacity: imgOpacity, y: imgY, perspective: 1000 }}
            className="w-1/2 flex items-center justify-center relative"
          >
            <motion.div
              className="absolute w-[70%] h-[70%] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />

            <InteractiveTilt>
              <motion.img
                src="/VRAM.png"
                alt="VRAM — Video Memory"
                className="relative z-10 w-[75%] max-w-lg drop-shadow-[0_0_60px_rgba(236,72,153,0.15)]"
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
