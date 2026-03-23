"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

const TOTAL_FRAMES = 50;

interface HeroProps {
  onLoadComplete: () => void;
  onProgress: (progress: number) => void;
}

export default function Hero({ onLoadComplete, onProgress }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isReady, setIsReady] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 32,
    mass: 0.25,
    restDelta: 0.0005,
  });

  // Complete the hero sequence a bit earlier to feel faster while keeping scroll control.
  const tunedProgress = useTransform(smoothProgress, [0, 0.82, 1], [0, 1, 1]);

  const currentFrameIndex = useTransform(
    tunedProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  const opacity1 = useTransform(tunedProgress, [0, 0.15, 0.20], [1, 1, 0]);
  const y1 = useTransform(tunedProgress, [0, 0.20], [0, -50]);
  const scale1 = useTransform(tunedProgress, [0, 0.20], [1, 1.05]);

  const opacity2 = useTransform(tunedProgress, [0.20, 0.25, 0.40, 0.45], [0, 1, 1, 0]);
  const y2 = useTransform(tunedProgress, [0.20, 0.25, 0.45], [50, 0, -50]);
  const scale2 = useTransform(tunedProgress, [0.20, 0.25, 0.45], [0.95, 1, 1.05]);

  const opacity3 = useTransform(tunedProgress, [0.45, 0.50, 0.65, 0.70], [0, 1, 1, 0]);
  const y3 = useTransform(tunedProgress, [0.45, 0.50, 0.70], [50, 0, -50]);
  const scale3 = useTransform(tunedProgress, [0.45, 0.50, 0.70], [0.95, 1, 1.05]);

  const opacity4 = useTransform(tunedProgress, [0.70, 0.75, 0.95, 1], [0, 1, 1, 0]);
  const y4 = useTransform(tunedProgress, [0.70, 0.75, 1], [50, 0, -50]);
  const scale4 = useTransform(tunedProgress, [0.70, 0.75, 1], [0.95, 1, 1.05]);

  useEffect(() => {
    let loadedCount = 0;

    const loadImages = async () => {
      const promises = Array.from({ length: TOTAL_FRAMES }).map((_, index) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          const frameNumber = index.toString().padStart(3, "0");
          img.src = `/kling_20260323_作品_Start_with_1922_0_${frameNumber}.jpg`;

          img.onload = () => {
            loadedCount++;
            onProgress((loadedCount / TOTAL_FRAMES) * 100);
            resolve(img);
          };
          img.onerror = () => {
            console.error(`Failed to load image index ${index}`);
            reject();
          };
        });
      });

      try {
        const results = await Promise.all(promises);
        setImages(results);
        setIsReady(true);
        onLoadComplete();
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    loadImages();
  }, [onLoadComplete, onProgress]);

  useEffect(() => {
    if (!isReady || images.length === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const frameIndex = Math.floor(currentFrameIndex.get() || 0);
      const img = images[frameIndex];

      if (img) {
        const dpr = window.devicePixelRatio || 1;
        const cWidth = window.innerWidth;
        const cHeight = window.innerHeight;

        canvas.width = cWidth * dpr;
        canvas.height = cHeight * dpr;
        canvas.style.width = `${cWidth}px`;
        canvas.style.height = `${cHeight}px`;

        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.scale(dpr, dpr);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";

        let scale;
        if (cWidth > cHeight) {
          scale = Math.max((cWidth * 0.45) / img.width, cHeight / img.height);
        } else {
          scale = Math.max(cWidth / img.width, cHeight / img.height);
        }

        const drawW = img.width * scale;
        const drawH = img.height * scale;

        const dx = (cWidth - drawW) / 2;
        const dy = (cHeight - drawH) / 2;

        ctx.drawImage(img, dx, dy, drawW, drawH);

        if (dx > 0) {
          ctx.drawImage(img, 0, 0, 1, img.height, 0, dy, dx + 1, drawH); // Left edge
        }
        if (dx + drawW < cWidth) {
          ctx.drawImage(img, img.width - 1, 0, 1, img.height, dx + drawW - 1, dy, cWidth - (dx + drawW) + 2, drawH); // Right edge
        }
        if (dy > 0) {
          ctx.drawImage(img, 0, 0, img.width, 1, dx, 0, drawW, dy + 1); // Top edge
        }
        if (dy + drawH < cHeight) {
          ctx.drawImage(img, 0, img.height - 1, img.width, 1, dx, dy + drawH - 1, drawW, cHeight - (dy + drawH) + 2); // Bottom edge
        }

        if (dx > 0 && dy > 0) ctx.drawImage(img, 0, 0, 1, 1, 0, 0, dx + 1, dy + 1);
        if (dx + drawW < cWidth && dy > 0) ctx.drawImage(img, img.width - 1, 0, 1, 1, dx + drawW - 1, 0, cWidth - (dx + drawW) + 2, dy + 1);
        if (dx > 0 && dy + drawH < cHeight) ctx.drawImage(img, 0, img.height - 1, 1, 1, 0, dy + drawH - 1, dx + 1, cHeight - (dy + drawH) + 2);
        if (dx + drawW < cWidth && dy + drawH < cHeight) ctx.drawImage(img, img.width - 1, img.height - 1, 1, 1, dx + drawW - 1, dy + drawH - 1, cWidth - (dx + drawW) + 2, cHeight - (dy + drawH) + 2);

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isReady, images, currentFrameIndex]);

  return (
    <div ref={containerRef} className="relative h-[1000vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
        />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_black_80%)] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-l from-black via-transparent to-black opacity-80 pointer-events-none" />

        <div ref={textContainerRef} className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">

          <motion.div
            style={{ opacity: opacity1, y: y1, scale: scale1 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="absolute -inset-32 bg-black/60 blur-[60px] rounded-full pointer-events-none" />

              <div className="relative">
                <span className="text-white/50 font-mono tracking-[0.3em] text-sm md:text-base uppercase mb-6 block text-glow">Welcome to the Machine</span>
                <h2 className="text-7xl md:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                  Anatomy of <br /> A GPU.
                </h2>
              </div>
            </div>

            <motion.div
              className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/40 pointer-events-none"
            >
              <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white/30 to-transparent relative overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 w-full h-1/2 bg-white"
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ opacity: opacity2, y: y2, scale: scale2 }}
            className="absolute inset-0 flex flex-col items-start justify-center px-10 md:px-32 max-w-7xl mx-auto"
          >
            <div className="flex flex-col items-start text-left max-w-2xl relative">
              <div className="absolute -inset-24 bg-black/60 blur-[50px] rounded-full pointer-events-none" />

              <div className="relative z-10 border-l border-white/20 pl-8 py-2">
                <span className="text-white/50 font-mono tracking-[0.2em] text-sm uppercase mb-4 block text-glow">01 // What is a GPU</span>
                <h3 className="text-5xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-lg mb-6">
                  The Engine of Reality.
                </h3>
                <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light">
                  A massively parallel supercomputer designed to process thousands of mathematical operations simultaneously.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: opacity3, y: y3, scale: scale3 }}
            className="absolute inset-0 flex flex-col items-end justify-center text-right px-10 md:px-32 max-w-7xl mx-auto"
          >
            <div className="flex flex-col items-end text-right max-w-2xl relative">
              <div className="absolute -inset-24 bg-black/60 blur-[50px] rounded-full pointer-events-none" />

              <div className="relative z-10 border-r border-white/20 pr-8 py-2">
                <span className="text-white/50 font-mono tracking-[0.2em] text-sm uppercase mb-4 block text-glow">02 // The Necessity</span>
                <h3 className="text-5xl md:text-6xl font-bold tracking-tighter text-white drop-shadow-lg mb-6">
                  Brute-Force Acceleration.
                </h3>
                <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light">
                  Traditional CPUs simply cannot keep up with photorealistic ray-tracing or AI. The GPU handles workloads requiring massive throughput.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{ opacity: opacity4, y: y4, scale: scale4 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
          >
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="absolute -inset-32 bg-black/60 blur-[60px] rounded-full pointer-events-none" />

              <div className="relative">
                <span className="text-white/50 font-mono tracking-[0.3em] text-sm md:text-base uppercase mb-6 block text-glow">03 // The Innovation</span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 drop-shadow-xl">
                  A Masterpiece <br /> of Engineering.
                </h2>
                <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light max-w-2xl mx-auto">
                  Billions of transistors packed at the atomic scale, bleeding-edge thermal management, and memory bandwidth measured in terabytes per second.
                </p>
                <div className="mt-12 opacity-50 uppercase tracking-[0.4em] text-sm text-[#7ef8c0] animate-pulse">
                  Scroll to Disassemble
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
