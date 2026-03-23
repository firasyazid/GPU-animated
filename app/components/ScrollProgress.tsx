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

      const sectionElements = sections
        .map((s) => document.getElementById(s.id))
        .filter(Boolean) as HTMLElement[];

      let bestIdx = 0;
      let bestVisibility = -Infinity;

      sectionElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
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
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDotClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-[90] flex flex-col items-center gap-1">
        <div className="absolute inset-y-0 w-px bg-white/10 left-1/2 -translate-x-1/2" />

        {sections.map((section, idx) => (
          <button
            key={section.id}
            onClick={() => handleDotClick(section.id)}
            className="relative group flex items-center py-3 cursor-pointer"
            aria-label={`Scroll to ${section.label}`}
          >
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

        <span className="mt-4 text-[9px] font-mono text-white/30 tabular-nums">
          {Math.round(scrollPercent * 100)}%
        </span>
      </div>

      <AnimatePresence mode="wait">
        {activeIndex > 0 && (
          <motion.button
            key={activeIndex === sections.length - 1 ? "top" : "next"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => {
              if (activeIndex < sections.length - 1) {
                handleDotClick(sections[activeIndex + 1].id);
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[90] flex flex-col items-center gap-3 group cursor-pointer"
            aria-label={activeIndex < sections.length - 1 ? "Scroll to next section" : "Scroll to top"}
          >
            <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase group-hover:text-white/90 transition-colors">
              {activeIndex < sections.length - 1 ? "Next Section" : "Back to Top"}
            </span>
            <div className="w-7 h-11 rounded-full border border-white/20 flex items-start justify-center p-1.5 group-hover:border-[#7ef8c0]/50 transition-colors bg-black/20 backdrop-blur-md">
              <motion.div
                className="w-1 h-3 rounded-full bg-white/50 group-hover:bg-[#7ef8c0] transition-colors"
                animate={{ 
                  y: activeIndex < sections.length - 1 ? [0, 14, 0] : [14, 0, 14]
                }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
