// Import the animated particle background
import ParticlesBackground from "../components/ParticlesBackground";

// Import animation tools from Framer Motion
import { motion } from "framer-motion";

// Import React utilities
import React, { useMemo } from "react";

// Import social icons (correct import source)
import { FaXTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6";

// Import avatar image (fixed path)
import avatar from "../assets/avatar.png";

// Social media links mapped with respective icons
const socials = [
  { Icon: FaXTwitter, label: "X", href: "https://x.com/KapoorTaaransh" },
  { Icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/taaransh-kapoor" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/TaaranshK" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/_taaransh01_/" }
];

// Glow animation for hover effects on social icons
const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13,88,204,0.9)) drop-shadow(0 0 18px rgba(16,185,129,0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 }
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } }
};

export default function Home() {
  // Memoized list of typewriter job roles (prevents re-creation on re-renders)
  const roles = useMemo(
    () => ["Software Developer", "Android Developer", "Web Developer", "Data Engineer"],
    []
  );

  // Typewriter states
  const [index, setIndex] = React.useState(0); // active job title index
  const [subIndex, setSubIndex] = React.useState(0); // characters typed so far
  const [deleting, setDeleting] = React.useState(false); // whether typing or deleting

  // TYPEWRITER EFFECT LOGIC
  React.useEffect(() => {
    const current = roles[index];

    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) {
        // Typing characters
        setSubIndex((v) => v + 1);
      } else if (!deleting && subIndex === current.length) {
        // Pause before deleting
        setDeleting(true);
      } else if (deleting && subIndex > 0) {
        // Deleting characters
        setSubIndex((v) => v - 1);
      } else if (deleting && subIndex === 0) {
        // Move to the next role
        setDeleting(false);
        setIndex((prev) => (prev + 1) % roles.length);
      }
    },
    deleting ? 80 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <section id="Home" className="w-full h-screen relative bg-black overflow-hidden">
      
      {/* Background Particles Layer */}
      <div className="absolute inset-0 h-full w-full">
        <ParticlesBackground />
      </div>

      {/* Soft gradient glow backgrounds */}
      <div className="absolute inset-0">
        <div
          className="
            absolute -top-32 -left-32
            w-[70vw] sm:w-[50vw] md:w-[40vw]
            h-[70vw] sm:h-[50vw] md:h-[40vw]
            max-w-[500px] max-h-[500px]
            rounded-full
            bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
            opacity-30 sm:opacity-20 md:opacity-10
            blur-[100px] sm:blur-[130px] md:blur-[150px]
            animate-pulse
          "
        ></div>

        <div
          className="
            absolute -bottom-32 -right-32
            w-[70vw] sm:w-[50vw] md:w-[40vw]
            h-[70vw] sm:h-[50vw] md:h-[40vw]
            max-w-[500px] max-h-[500px]
            rounded-full
            bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2]
            opacity-30 sm:opacity-20 md:opacity-10
            blur-[100px] sm:blur-[130px] md:blur-[150px]
            animate-pulse delay-500
          "
        ></div>
      </div>

      {/* MAIN HERO CONTENT */}
      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 
      grid grid-cols-1 lg:grid-cols-2">

        {/* LEFT SECTION: Text, Typewriter, Buttons, Socials */}
        <div className="flex flex-col justify-center h-full text-center lg:text-left">
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">

            {/* TYPEWRITER SECTION */}
            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl 
              font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>

              {/* Blinking cursor */}
              <span
                className="inline-block w-[2px] ml-1 bg-white animate-pulse"
                style={{ height: "1em" }}
              ></span>
            </motion.div>

            {/* MAIN HEADING */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Gradient text: "Hello, I'm" */}
              <span className="text-transparent bg-clip-text 
              bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]">
                Hello, I'm
              </span>

              <br />

              {/* White text: Your Name */}
              <span className="text-white font-extrabold 
text-5xl sm:text-6xl md:text-7xl lg:text-8xl whitespace-nowrap">
  Taaransh Kapoor
</span>
            </motion.h1>

            {/* SUBTEXT DESCRIPTION */}
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I build smart, efficient, and user-focused solutions — solving real problems through
              code, creativity, and clean engineering.
            </motion.p>

            {/* CALL TO ACTION BUTTONS */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-full font-medium text-lg text-white 
                bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] 
                shadow-lg hover:scale-105 transition-all"
              >
                View My Work
              </a>

              <a
                href="https://drive.google.com/file/d/1svqZlPVfwrlNRl8DCm3w6_5A6yHarZUF/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full text-lg font-medium text-black 
                bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
              >
                My Resume
              </a>
            </motion.div>

            {/* SOCIAL ICONS ROW */}
            <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  aria-label={label}
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION — AVATAR IMAGE */}
        <div className="relative hidden lg:block">
          {/* Background glow behind avatar */}
          <div
            className="absolute top-1/2 -translate-y-1/2 rounded-full select-none pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vh, 410px)",
              height: "min(40vh, 760px)",
              filter: "blur(38px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302b63, #1cd8d2)"
            }}
          />

          {/* Avatar image */}
          <motion.img
            src={avatar}
            alt="Taaransh"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{
              right: "-30px",
              width: "min(45vw, 780px)",
              maxHeight: "90vh"
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
}
