"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import InteractiveTilt from "./InteractiveTilt";
import HudOverlay from "./HudOverlay";

export default function HeatpipesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hudActive, setHudActive] = useState(false);

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
          className="h-full w-full flex flex-col-reverse md:flex-row items-center justify-center px-6 md:px-24 max-w-7xl mx-auto"
        >
          <div className="w-full md:w-1/2 flex flex-col justify-center pr-0 md:pr-12 lg:pr-20 text-center md:text-left items-center md:items-start px-4 md:px-0 mt-8 md:mt-0">
            <motion.span
              style={{ opacity: labelOpacity, y: labelY }}
              className="text-white/50 font-mono tracking-[0.3em] text-xs uppercase mb-6 md:mb-8 block text-glow"
            >
              06 / Heatpipes
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
                The Transfer.
              </span>
              <span className="block text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white/40 mt-1 md:mt-2">
                The Arteries.
              </span>
            </motion.h2>

            <div className="flex flex-col gap-4 md:gap-5">
              <motion.p
                style={{ opacity: desc1Opacity, y: desc1Y }}
                className="text-base md:text-lg lg:text-xl text-zinc-400 font-light leading-relaxed"
              >
                Pure composite copper conduits spanning the entire thermal solution.
              </motion.p>
              <motion.p
                style={{ opacity: desc2Opacity, y: desc2Y }}
                className="text-base md:text-lg lg:text-xl text-zinc-400 font-light leading-relaxed"
              >
                Utilizing internal phase-transition liquid to rapidly wick heat away from the core.
              </motion.p>
              <motion.p
                style={{ opacity: desc3Opacity, y: desc3Y }}
                className="text-base md:text-lg lg:text-xl text-zinc-400 font-light leading-relaxed"
              >
                The crucial bridge between generation and dissipation.
              </motion.p>
            </div>
          </div>

          <motion.div
            style={{ x: imgX, opacity: imgOpacity, y: imgY, perspective: 1000 }}
            className="w-full md:w-1/2 flex items-center justify-center relative mb-12 md:mb-0 mt-8 md:mt-0"
          >
            <motion.div
              className="absolute w-[70%] h-[70%] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(217,119,6,0.08) 0%, transparent 70%)",
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
                src="/Copper Heatpipes.png"
                alt="Copper Heatpipes"
                className="relative z-10 w-[85%] md:w-[85%] max-w-lg drop-shadow-[0_0_60px_rgba(217,119,6,0.15)]"
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              />
              <HudOverlay 
                isVisible={hudActive} 
                side="right"
                stats={[
                  { label: "Technology", value: "Phase-Transition" },
                  { label: "Thermal Cap", value: "45W per Pipe" },
                  { label: "Material", value: "Composite Copper" }
                ]}
              />
            </InteractiveTilt>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
