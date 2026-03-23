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
      {!isLoading && <Navbar />}

      {!isLoading && <ScrollProgress />}

      <AnimatePresence>
        {isLoading && (
          <LoadingScreen progress={loadProgress} />
        )}
      </AnimatePresence>

      <div id="hero">
        <SectionTransition disableEntry>
          <Hero
            onProgress={setLoadProgress}
            onLoadComplete={() => {
              setTimeout(() => setIsLoading(false), 500);
            }}
          />
        </SectionTransition>
      </div>

      <div id="gpu-die">
        <SectionTransition parallaxOffset={100}>
          <GpuDieSection />
        </SectionTransition>
      </div>

      <div id="vram">
        <SectionTransition parallaxOffset={100}>
          <VramSection />
        </SectionTransition>
      </div>

      <div id="vrm">
        <SectionTransition parallaxOffset={100}>
          <VrmSection />
        </SectionTransition>
      </div>

      <div id="pcb">
        <SectionTransition parallaxOffset={100}>
          <PcbSection />
        </SectionTransition>
      </div>

      <div id="heatsink">
        <SectionTransition parallaxOffset={100}>
          <HeatsinkSection />
        </SectionTransition>
      </div>

      <div id="heatpipes">
        <SectionTransition parallaxOffset={100}>
          <HeatpipesSection />
        </SectionTransition>
      </div>

      <div id="footer">
        <SectionTransition disableExit parallaxOffset={60}>
          <section className="bg-black pt-32 pb-16 px-8 md:px-24 flex flex-col justify-end relative z-10">

            <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-start md:items-center justify-between border-t border-white/10 pt-8 mt-32">
              <div className="text-white/40 text-sm font-light tracking-wide mb-6 md:mb-0">
                &copy; {new Date().getFullYear()} Made with passion by Firas Yazid.
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
