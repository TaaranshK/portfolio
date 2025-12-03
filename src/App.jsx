import React from "react";

// COMPONENT IMPORTS
import Navbar from "./components/Navbar.jsx";
import CustomCursor from "./components/CustomCursor";
import IntroAnimation from "./components/IntroAnimation"; // Fixed spelling

// SECTION IMPORTS
import Home from "./Sections/Home";
import About from "./Sections/About";
import Skills from "./Sections/Skills";
import Projects from "./Sections/Projects";

import Contact from "./Sections/Contact";
import Footer from "./Sections/Footer";

export default function App() {
  // This state tracks whether the Intro animation is finished.
  // Until it becomes true, the entire site stays hidden.
  const [introDone, setIntroDone] = React.useState(false);

  return (
    <>
      {/* 
        SHOW INTRO FIRST
        - IntroAnimation runs when the site loads.
        - When it finishes, it calls onFinish() which sets introDone = true.
      */}
      {!introDone && (
        <IntroAnimation onFinish={() => setIntroDone(true)} />
      )}

      {/* 
        WHEN INTRO IS DONE → SHOW COMPLETE WEBSITE 
        - The moment introDone becomes true, the main site becomes visible.
      */}
      {introDone && (
        <div className="relative gradient text-white">
          <CustomCursor />
          <Navbar />

          {/* WEBSITE SECTIONS */}
          <Home />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
}
