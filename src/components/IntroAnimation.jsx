import React, { useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroAnimation({ onFinish }) {
  // List of greetings (memoized for performance)
  const greetings = useMemo(
    () => [
      "Hello", "नमस्ते", "Hola", "Bonjour",
      "Ciao", "Olá", "Здравствуйте",
      "Merhaba", "Γειά", "Hej", "Hallo", "Salam"
    ],
    []
  );

  const [index, setIndex] = React.useState(0);   // Which greeting to show
  const [visible, setVisible] = React.useState(true); // Controls exit animation

  useEffect(() => {
    // If NOT on last greeting → keep switching text
    if (index < greetings.length - 1) {
      const id = setInterval(() => {
        setIndex((prev) => prev + 1);
      }, 200); // change every 200 ms

      return () => clearInterval(id);
    }

    // When LAST greeting → wait then exit animation
    const timeout = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(timeout);
  }, [index, greetings.length]);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden"
          initial={{ y: 0 }}
          exit={{
            y: "-100%",
            transition: {
              duration: 1.05,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        >
          {/* Animated Greeting Text */}
          <motion.h1
            key={index}
            className="text-5xl md:text-7xl lg:text-8xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.15 }}
          >
            {greetings[index]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
