"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { label: "GPU Die", id: "gpu-die" },
  { label: "VRAM", id: "vram" },
  { label: "VRM", id: "vrm" },
  { label: "PCB", id: "pcb" },
  { label: "Heatsink", id: "heatsink" },
  { label: "Heatpipes", id: "heatpipes" },
];

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("gpu-die");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = navItems
        .map((s) => document.getElementById(s.id))
        .filter(Boolean) as HTMLElement[];

      let bestId = "gpu-die";
      let bestVisibility = -Infinity;

      sectionElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const viewportH = window.innerHeight;
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportH / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        const visibility = viewportH - distance;

        if (visibility > bestVisibility) {
          bestVisibility = visibility;
          bestId = el.id;
        }
      });

      setActiveItem(bestId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      // Delay so it animates in exactly when the loading screen finishes
      transition={{ duration: 0.8, ease: "easeOut", delay: 1.2 }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center p-1.5 rounded-2xl bg-[#0a0a0a]/80 md:bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl max-w-[95vw] md:max-w-none"
    >


      <div className="flex items-center gap-1 px-1 overflow-x-auto scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`whitespace-nowrap shrink-0 relative px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-xs md:text-sm font-medium transition-colors duration-[180ms] flex items-center gap-1.5 md:gap-2 border ${activeItem === item.id
              ? "bg-[#2A2A2A] border-white/10 text-white shadow-sm"
              : "bg-transparent border-transparent text-white/50 hover:text-white/90 hover:bg-white/5"
              }`}
          >
            {activeItem === item.id && (
              <div className="w-1.5 h-1.5 rounded-full bg-[#7ef8c0] shadow-[0_0_8px_rgba(126,248,192,0.8)]" />
            )}
            {item.label}
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
