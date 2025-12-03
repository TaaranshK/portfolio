import { useEffect, useState, useRef } from "react";
import Logo from "../assets/logo.png";
import OverlayMenu from "./OverlayMenu";
import { FiMenu } from "react-icons/fi";

export default function Navbar() {
  // State to control if the overlay menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // Controls whether the navbar is visible or hidden
  const [visible, setvisible] = useState(true);

  // True = Navbar must stay visible (only when user is in Home section)
  const [forceVisible, setForceVisible] = useState(false);

  // To track the last scroll position
  const lastScrollY = useRef(0);

  // To store the timeout ID for auto-hide behavior
  const timerId = useRef(null);

  // -------------------------------------------
  // 1) Detect if user is inside the Home section
  // -------------------------------------------
  useEffect(() => {
    /*
      Idea:
      - When the user is in the Home section → Navbar MUST always stay visible.
      - When user scrolls past Home → navbar can hide on scroll.
    */

    const homeSection = document.querySelector("#home");

    // IntersectionObserver helps to detect if '#home' is on screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // User is in Home → keep navbar visible
          setForceVisible(true);
          setvisible(true);
        } else {
          // User left the Home section
          setForceVisible(false);
        }
      },
      { threshold: 0.1 } // Trigger when at least 10% of home is visible
    );

    if (homeSection) observer.observe(homeSection);

    return () => {
      // Cleanup observer when component unmounts
      if (homeSection) observer.unobserve(homeSection);
    };
  }, []);

  // ----------------------------------------------------
  // 2) Handle auto-hide and show behavior while scrolling
  // ----------------------------------------------------
  useEffect(() => {
    /*
      Scroll Behavior Rules:
      - If forceVisible = true → always show navbar.
      - If user scrolls DOWN → hide navbar.
      - If user scrolls UP → show navbar.
      - After it becomes visible, hide it again after 3 seconds (auto-hide).
    */

    const handleScroll = () => {
      if (forceVisible) {
        // When inside Home section → always visible
        setvisible(true);
        return;
      }

      const currentScrollY = window.scrollY;

      // If scrolling down → hide navbar
      if (currentScrollY > lastScrollY.current) {
        setvisible(false);
      } else {
        // If scrolling up → show navbar
        setvisible(true);

        // Reset hide timer when navbar becomes visible
        if (timerId.current) clearTimeout(timerId.current);

        // Auto-hide after 3 seconds of not scrolling
        timerId.current = setTimeout(() => {
          setvisible(false);
        }, 3000);
      }

      // Update last scroll position
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [forceVisible]);

  // ----------------------------------------------------
  // 3) Navbar UI Rendering
  // ----------------------------------------------------
  return (
    <>
      <nav
        className={`fixed top-0 w-full flex items-center
                       justify-between px-6 py-4 z-50 
                       transition-transform duration-300
                        ${
                          visible
                            ? "translate-y-0"
                            : "translate-y-full"
                        }`}
      >
        {/* Logo + Name */}
        <div className="flex items-center space-x-2">
          <img src={Logo} alt="logo" className="w-8 h-8" />
          <div className="text-2xl font-bold text-white hidden sm:block ">
            Taaransh
          </div>
        </div>

        {/* Menu icon:
           - On large screens → stays centered
           - On small screens → moves to the right
        */}
        <div
          className="block lg:absolute lg:left-1/2
                     lg:transform lg:translate-x-1/2"
        >
          {/* Button that opens the overlay menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white text-3xl focus:outline-none"
            aria-label="open Menu"
          >
            <FiMenu />
          </button>
        </div>

        {/* "Reach Out" Button visible only on large screens */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-5 py-2 
      rounded-full font-medium shadow-lg hover:opacity-90 transition-opacity duration-300"
          >
            Reach Out
          </a>
        </div>
      </nav>

      {/* Overlay menu (Full-screen Menu) */}
      <OverlayMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}


