"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, MouseEvent } from "react";

export default function InteractiveTilt({ children }: { children: ReactNode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to make the movement feel heavy, physical, and premium
  const mouseX = useSpring(x, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 30 });

  // Map to 3D rotation (-20 to 20 degrees for high sensitivity without breaking)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-20, 20]);
  
  // Magnetic translate (pulls the image slightly towards the mouse linearly)
  const translateX = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const translateY = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(nx);
    y.set(ny);
  };

  const handleMouseLeave = () => {
    // Snap cleanly back to center when mouse exits
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        x: translateX,
        y: translateY,
        transformStyle: "preserve-3d",
      }}
      className="w-full flex items-center justify-center relative z-10 cursor-crosshair group hover:z-50"
    >
      <motion.div 
        style={{ z: 60 }} 
        className="w-full flex items-center justify-center pointer-events-none"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
