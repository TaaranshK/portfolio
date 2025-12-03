import { useEffect, useState, useMemo, useRef } from "react";
import {
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  motion,
} from "framer-motion";

import FitpulseDesktop from "../assets/FitPulse.png";
import FitpulseMobileVertical from "../assets/Fitpulse_vertical.png"; // NEW MOBILE POSTER IMAGE


// ----------------------
// 📌 FIXED Mobile Detector (Works on ALL Devices)
// ----------------------
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 850); // REAL mobile width
    };

    check(); // Run once

    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
};


// ----------------------
// 📌 Main Component
// ----------------------
export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
      {
        title: "FitPulse",
        link: "https://github.com/TaaranshK/Health-Anomaly-Detection-System-",
        bgColor: "#0d4d3d",

        // ⭐ Desktop vs Mobile image switching
        image: isMobile ? FitpulseMobileVertical : FitpulseDesktop,
      },
    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">

        {/* ⭐ NK-STUDIO STYLE HERO TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            absolute
            left-6 sm:left-20
            top-6 sm:top-20
            text-[clamp(2.2rem,6vw,4.5rem)]
            font-bold italic
            text-white/90
            drop-shadow-lg
            pointer-events-none
            z-[30]
          "
        >
          My Work
        </motion.h1>

        {/* PROJECT IMAGE BLOCK */}
        <div
          className={`relative w-full flex-1 flex items-center justify-center ${
            isMobile ? "mt-12" : "mt-10"
          }`}
        >
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx
                  ? "opacity-100 z-20"
                  : "opacity-0 z-0 sm:z-10"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <>
                    <div
                      className={`relative w-full overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${
                        isMobile
                          ? "mb-6 rounded-lg"
                          : "mb-10 sm:mb-12 rounded-xl"
                      } h-[62vh] sm:h-[66vh]`}
                      style={{
                        zIndex: 10,
                        transition: "box-shadow 250ms ease",
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover drop-shadow-xl md:drop-shadow-2xl"
                        style={{
                          position: "relative",
                          zIndex: 10,
                          filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                          transition: "filter 200ms ease",
                        }}
                        loading="lazy"
                      />

                      {/* Gradient Layer */}
                      <div
                        className="pointer-events-none absolute inset-0"
                        style={{
                          zIndex: 11,
                          background:
                            "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                        }}
                      ></div>
                    </div>
                  </>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* VIEW PROJECT BUTTON */}
        <div
          className={`absolute ${isMobile ? "bottom-20" : "bottom-10"}`}
        >
          <a
            href={activeProject?.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition-all"
            aria-label={`View ${activeProject?.title}`}
          >
            View Project
          </a>
        </div>
      </div>
    </section>
  );
}
