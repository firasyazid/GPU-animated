"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import InteractiveTilt from "./InteractiveTilt";
import HudOverlay from "./HudOverlay";

export default function GpuDieSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hudActive, setHudActive] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imgX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [-120, 0, 0, -60]);
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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.2 && latest < 0.8) {
      if (!hudActive) setHudActive(true);
    } else {
      if (hudActive) setHudActive(false);
    }
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[150vh] bg-black"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <motion.div
          style={{ opacity: sectionOpacity }}
          className="h-full w-full flex flex-col md:flex-row items-center justify-center px-6 md:px-24 max-w-7xl mx-auto"
        >
          <motion.div
            style={{ x: imgX, opacity: imgOpacity, y: imgY, perspective: 1000 }}
            className="w-full md:w-1/2 flex items-center justify-center relative mb-12 md:mb-0"
          >
            <motion.div
              className="absolute w-[70%] h-[70%] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(126,248,192,0.08) 0%, transparent 70%)",
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
                src="/GPU-DIE.png"
                alt="GPU Die Silicon"
                className="relative z-10 w-[80%] md:w-[75%] max-w-lg drop-shadow-[0_0_60px_rgba(126,248,192,0.15)]"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              />
              <HudOverlay 
                isVisible={hudActive} 
                side="left"
                stats={[
                  { label: "Architecture", value: "Ada Lovelace" },
                  { label: "Process Node", value: "4nm TSMC Custom" },
                  { label: "Transistors", value: "76.3 Billion" }
                ]}
              />
            </InteractiveTilt>
          </motion.div>

          <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-12 md:pl-20 items-center md:items-start text-center md:text-left">
            <motion.span
              style={{ opacity: labelOpacity, y: labelY }}
              className="text-white/50 font-mono tracking-[0.3em] text-xs uppercase mb-6 md:mb-8 block text-glow"
            >
              01 / GPU Die
            </motion.span>

            <motion.div
              style={{ opacity: lineOpacity, width: lineWidth }}
              className="h-px bg-white/20 mb-8 md:mb-10 w-full max-w-[200px] md:max-w-xs mx-auto md:mx-0"
            />

            <motion.h2
              style={{ opacity: headlineOpacity, y: headlineY }}
              className="mb-12"
            >
              <span className="block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white drop-shadow-lg">
                The Brain
              </span>
              <span className="block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/40 mt-1 md:mt-2">
                of Everything.
              </span>
            </motion.h2>

            <div className="flex flex-col gap-4 md:gap-5">
              <motion.p
                style={{ opacity: desc1Opacity, y: desc1Y }}
                className="text-base md:text-lg lg:text-xl text-zinc-400 font-light leading-relaxed"
              >
                Billions of transistors etched into a single monolithic silicon die.
              </motion.p>
              <motion.p
                style={{ opacity: desc2Opacity, y: desc2Y }}
                className="text-base md:text-lg lg:text-xl text-zinc-400 font-light leading-relaxed"
              >
                The command center for every pixel rendered and every model trained.
              </motion.p>
              <motion.p
                style={{ opacity: desc3Opacity, y: desc3Y }}
                className="text-base md:text-lg lg:text-xl text-zinc-400 font-light leading-relaxed"
              >
                Where raw sand becomes intelligence.
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
