"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface SectionTransitionProps {
  children: ReactNode;
  /** Extra height multiplier for the scroll region (default: no extra — uses children's own height) */
  disableEntry?: boolean;
  disableExit?: boolean;
  /** Parallax Y offset in px applied during entry/exit (default 80) */
  parallaxOffset?: number;
}

export default function SectionTransition({
  children,
  disableEntry = false,
  disableExit = false,
  parallaxOffset = 80,
}: SectionTransitionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const entryOpacity = useTransform(
    scrollYProgress,
    [0, 0.12],
    disableEntry ? [1, 1] : [0, 1]
  );
  const entryY = useTransform(
    scrollYProgress,
    [0, 0.12],
    disableEntry ? [0, 0] : [parallaxOffset, 0]
  );
  const entryScale = useTransform(
    scrollYProgress,
    [0, 0.12],
    disableEntry ? [1, 1] : [0.97, 1]
  );

  const exitOpacity = useTransform(
    scrollYProgress,
    [0.88, 1],
    disableExit ? [1, 1] : [1, 0]
  );
  const exitY = useTransform(
    scrollYProgress,
    [0.88, 1],
    disableExit ? [0, 0] : [0, -parallaxOffset]
  );
  const exitScale = useTransform(
    scrollYProgress,
    [0.88, 1],
    disableExit ? [1, 1] : [1, 0.97]
  );

  const combinedOpacity = useTransform(
    () => entryOpacity.get() * exitOpacity.get()
  );
  const combinedY = useTransform(() => entryY.get() + exitY.get());
  const combinedScale = useTransform(() => entryScale.get() * exitScale.get());

  return (
    <div ref={wrapperRef} className="relative">
      <motion.div
        style={{
          opacity: combinedOpacity,
          y: combinedY,
          scale: combinedScale,
          willChange: "opacity, transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
