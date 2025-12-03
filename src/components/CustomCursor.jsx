import { useEffect, useState } from "react";

function CustomCursor() {
  //So Neeche Jo humne Cursor ka Animation banaya hai usko HUmee Jaha Jaha Cursor move karega vaha vah move karna hai
  const [position, setposition] = useState({ x: 0, y: 0 }); // IN starting keep x and y values 0

  useEffect(() => {
    const moveHandler = (e) => {
      setposition({ x: e.clientX, y: e.clientY });
    };
    //The Eventhandler tracks movemovement and no of times our mouse moves it calls the function movehandler
    window.addEventListener("mousemove", moveHandler);

    return () => window.removeEventListener("mousemove", moveHandler);
  }, []); // <-- Missing dependency array FIXED

  return (
    <>
      {/* //pointer-events-non   will not block any cursor or button */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999]"
        // below Line Keeps The Cursor in centre of the GGlow
        style={{
          transform: `translate(${position.x - 40}px, ${position.y - 40}px)`,
        }}
      >
        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 blur-3xl opacity-80"></div>
      </div>
    </>
  );
}

export default CustomCursor;
