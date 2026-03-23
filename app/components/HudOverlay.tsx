"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HudStat {
  label: string;
  value: string;
}

interface HudOverlayProps {
  stats: HudStat[];
  isVisible: boolean;
  side?: "left" | "right";
}

export default function HudOverlay({ stats, isVisible, side = "right" }: HudOverlayProps) {
  return (
    <div className={`absolute top-1/2 -translate-y-1/2 ${side === "right" ? "left-full ml-8" : "right-full mr-8"} pointer-events-none hidden md:block`}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: side === "right" ? -20 : 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: side === "right" ? -20 : 20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl min-w-[240px] overflow-hidden"
          >
            {/* HUD Corner Accents */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#7ef8c0]/40" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#7ef8c0]/40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#7ef8c0]/40" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#7ef8c0]/40" />

            {/* Scanning Line Effect */}
            <motion.div
              className="absolute left-0 right-0 h-[1px] bg-[#7ef8c0]/20 z-0"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
            />

            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7ef8c0] animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">System Analysis</span>
              </div>
              
              <div className="space-y-3">
                {stats.map((stat, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider">{stat.label}</span>
                    <TypewriterText text={stat.value} delay={idx * 0.4 + 0.5} />
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-between items-center text-[8px] font-mono text-white/20 uppercase tracking-widest">
                <span>Ref: 0x{Math.floor(Math.random() * 16777215).toString(16).toUpperCase()}</span>
                <span className="animate-pulse">Active</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function TypewriterText({ text, delay }: { text: string; delay: number }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Reset text when starting
    setDisplayedText("");
    
    const startTimeout = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index <= text.length) {
          setDisplayedText(text.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30); // Speed of typing
      
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [text, delay]);

  return (
    <span className="text-sm font-mono text-white truncate inline-block">
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-3 ml-1 bg-[#7ef8c0] align-middle"
      />
    </span>
  );
}
