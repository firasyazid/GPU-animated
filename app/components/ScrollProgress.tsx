"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "gpu-die", label: "GPU Die" },
  { id: "vram", label: "VRAM" },
  { id: "vrm", label: "VRM" },
  { id: "pcb", label: "PCB" },
  { id: "heatsink", label: "Heatsink" },
  { id: "heatpipes", label: "Heatpipes" },
];

export default function ScrollProgress() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollPercent(percent);

      // Find which section is most visible
      const sectionElements = sections
        .map((s) => document.getElementById(s.id))
        .filter(Boolean) as HTMLElement[];

      let bestIdx = 0;
      let bestVisibility = -Infinity;

      sectionElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        // How much of this section is visible (center-biased)
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportH / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        const visibility = viewportH - distance;

        if (visibility > bestVisibility) {
          bestVisibility = visibility;
          bestIdx = idx;
        }
      });

      setActiveIndex(bestIdx);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDotClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] flex flex-col items-center gap-1">
      {/* Vertical progress line */}
      <div className="absolute inset-y-0 w-px bg-white/10 left-1/2 -translate-x-1/2" />

      {sections.map((section, idx) => (
        <button
          key={section.id}
          onClick={() => handleDotClick(section.id)}
          className="relative group flex items-center py-3 cursor-pointer"
          aria-label={`Scroll to ${section.label}`}
        >
          {/* Label tooltip */}
          <AnimatePresence>
            {activeIndex === idx && (
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-8 whitespace-nowrap text-xs font-mono tracking-wider text-white/60 uppercase pointer-events-none"
              >
                {section.label}
              </motion.span>
            )}
          </AnimatePresence>

          {/* Dot */}
          <motion.div
            className="relative z-10 rounded-full transition-all duration-300"
            animate={{
              width: activeIndex === idx ? 10 : 6,
              height: activeIndex === idx ? 10 : 6,
              backgroundColor:
                activeIndex === idx
                  ? "rgba(126, 248, 192, 1)"
                  : "rgba(255, 255, 255, 0.25)",
              boxShadow:
                activeIndex === idx
                  ? "0 0 12px rgba(126, 248, 192, 0.6)"
                  : "0 0 0px transparent",
            }}
            transition={{ duration: 0.3 }}
          />
        </button>
      ))}

      {/* Overall scroll percentage (tiny) */}
      <span className="mt-4 text-[9px] font-mono text-white/30 tabular-nums">
        {Math.round(scrollPercent * 100)}%
      </span>
    </div>
  );
}
