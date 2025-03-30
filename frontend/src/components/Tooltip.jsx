import { useState } from "react";

const Tooltip = ({ children, text, dealy = 500 }) => {
  const [display, setDisplay] = useState(false);

  let timeout;
  const MouseEnterHandler = () => {
    timeout = setTimeout(() => setDisplay(true), dealy);
  };

  const MouseLeaveHandler = () => {
    clearTimeout(timeout);
    setDisplay(false);
  };

  return (
    <div
      className="relative group"
      onMouseEnter={MouseEnterHandler}
      onMouseLeave={MouseLeaveHandler}
    >
      {children}
      {display && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 transition-opacity duration-300 opacity-100">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
