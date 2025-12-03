import { motion } from "framer-motion";
import React from "react";
import p from "../assets/p.jpg";

export default function About() {
  const stats = [
    { label: "Experience", value: "Fresher" },
    { label: "Speciality", value: "Frontend & Data Science" },
    { label: "Focus", value: "Performance & UX" },
  ];

  const glows = [
    "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]",
  ];

  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden"
    >
      {/* Background animated glows */}
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-start gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Profile Image */}
          <motion.div
            className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px]
            rounded-2xl overflow-hidden shadow-2xl
            bg-gradient-to-br from-[#1cd8d2]/20 to-[#1cd8d2]/10
            border border-[#1cd8d2]/25"
          >
            <img
  src={p}
  alt="profile"
  className="w-full h-full object-cover"
/>

          </motion.div>

          {/* Text Section */}
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl font-bold text-white">Taaransh Kapoor</h2>

            <p className="mt-0 text-lg sm:text-xl text-white/90 font-semibold">
              Software Developer
            </p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              I craft modern, efficient, and user-friendly applications backed by
              solid architecture and refined UI/UX design. With a growing focus
              on Machine Learning, Data Science, Python, and React as well for building
              dynamic interfaces, I transform ideas into intelligent, scalable
              products—designed for clarity, accessibility, and smooth
              end-to-end user experiences.
            </p>

            {/* Stats */}
            {/* Stats Section */}
<div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl">
  {stats.map((item, i) => (
    <motion.div
      key={i}
      className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-center backdrop-blur-md"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * i, duration: 0.4 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="text-sm text-gray-300">{item.label}</div>
      <div className="text-xl font-semibold mt-1 leading-tight">
        {item.value}
      </div>
    </motion.div>
  ))}
</div>

{/* ⭐ BUTTONS BELOW ⭐ */}
<div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
  <a
    href="#projects"
    className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-6 py-3 hover:bg-gray-200 transition"
  >
    View Projects
  </a>

  <a
    href="#contact"
    className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 text-white px-6 py-3 hover:bg-white/20 transition"
  >
    Get in Touch
  </a>
</div>
</div>


        </motion.div>
      </div>
    </section>
  );
}
