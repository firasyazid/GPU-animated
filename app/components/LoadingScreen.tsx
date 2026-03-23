"use client";

import { motion } from "framer-motion";

interface LoadingScreenProps {
  progress: number;
}

export default function LoadingScreen({ progress }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
    >
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Brand Name */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-semibold tracking-widest text-white/90"
        >
          CORE ENGINE
        </motion.h1>

        {/* Loading Spinner Area */}
        <div className="relative flex flex-col items-center">
          {/* Subtle glowing ring */}
          <div className="absolute h-24 w-24 rounded-full border border-white/10" />
          
          {/* Active progress ring */}
          <svg className="h-24 w-24 -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="301.59" /* 2 * pi * r = ~301.59 */
              strokeDashoffset={301.59 - (progress / 100) * 301.59}
              className="transition-all duration-300 ease-out"
            />
          </svg>

          {/* Percentage text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-medium tabular-nums text-white/60">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xs uppercase tracking-[0.2em] text-white/40"
        >
          Loading Sequences
        </motion.p>
      </div>
    </motion.div>
  );
}
