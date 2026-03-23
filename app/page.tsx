"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import GpuDieSection from "./components/GpuDieSection";
import VramSection from "./components/VramSection";
import VrmSection from "./components/VrmSection";
import PcbSection from "./components/PcbSection";
import HeatsinkSection from "./components/HeatsinkSection";
import HeatpipesSection from "./components/HeatpipesSection";
import SectionTransition from "./components/SectionTransition";
import ScrollProgress from "./components/ScrollProgress";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Prevent scrolling while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLoading]);

  return (
    <main className="min-h-screen bg-black">
      {/* Floating Header */}
      {!isLoading && <Navbar />}

      {/* Scroll Progress Indicator */}
      {!isLoading && <ScrollProgress />}

      {/* Loading Overlay */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen progress={loadProgress} />
        )}
      </AnimatePresence>

      {/* Main Experience */}
      <div id="hero">
        <SectionTransition disableEntry>
          <Hero
            onProgress={setLoadProgress}
            onLoadComplete={() => {
              // Add a tiny delay so the 100% is visible before fading
              setTimeout(() => setIsLoading(false), 500);
            }}
          />
        </SectionTransition>
      </div>

      {/* GPU Die Component Section */}
      <div id="gpu-die">
        <SectionTransition parallaxOffset={100}>
          <GpuDieSection />
        </SectionTransition>
      </div>

      {/* VRAM Component Section */}
      <div id="vram">
        <SectionTransition parallaxOffset={100}>
          <VramSection />
        </SectionTransition>
      </div>

      {/* VRM Component Section */}
      <div id="vrm">
        <SectionTransition parallaxOffset={100}>
          <VrmSection />
        </SectionTransition>
      </div>

      {/* PCB Component Section */}
      <div id="pcb">
        <SectionTransition parallaxOffset={100}>
          <PcbSection />
        </SectionTransition>
      </div>

      {/* Heatsink Component Section */}
      <div id="heatsink">
        <SectionTransition parallaxOffset={100}>
          <HeatsinkSection />
        </SectionTransition>
      </div>

      {/* Heatpipes Component Section */}
      <div id="heatpipes">
        <SectionTransition parallaxOffset={100}>
          <HeatpipesSection />
        </SectionTransition>
      </div>

      {/* Cinematic Placeholder / Footer Edge */}
      <div id="footer">
        <SectionTransition disableExit parallaxOffset={60}>
          <section className="bg-black pt-32 pb-16 px-8 md:px-24 flex flex-col justify-end relative z-10">

            {/* The user will build the next scroll sequences here instead of flat text! */}

            {/* Genuine Footer Bottom */}
            <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/10 pt-8 mt-32">
              <div className="text-white/40 text-sm font-light tracking-wide mb-6 md:mb-0">
                &copy; {new Date().getFullYear()} Firas Yazid. All rights reserved.
              </div>
              <div className="flex gap-8 text-sm text-white/50 font-light">
                <a href="https://firas-yazid-portfolio.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Developer</a>
              </div>
            </div>
          </section>
        </SectionTransition>
      </div>
    </main>
  );
}
