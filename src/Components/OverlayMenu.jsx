import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

function OverlayMenu({ isOpen, onClose }) {
  //If  User On Mobile phone Than Overlay animation comes from right side
  //If user on BigScreen Then It will come form Top
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 1024;

  const origin = isMobile ? "95% 8%" : "50% 8%";

  //So We need To Understand What IS Our Overlay Menus
  //IT basically an Entry Animation and Exit Animation
  //its a part Of Framer Motion
  //We use Animatepresence

  return (
    <AnimatePresence>
      {/* //When We Open Menu We need To Render The Animation*/}
      {isOpen && (
        //To Animate We Use Motion.div
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ backgroundColor: "rgba(0,0,0,0.952)" }}
        >
          {/* X button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Close Menu"
          >
            <FiX />
          </button>

          <ul className="space-y-6 text-center">
            {[
              "Home",
              "About",
              "Skills",
              "Projects",
              "Contact",
            ].map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  // we want when we click on any List Item Our Overlay Menu Closes
                  onClick={onClose}
                  className="text-4xl text-white font-semibold hover:text-pink-400 transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default OverlayMenu;
