import { useState } from "react";

// Custom hook to track hover state
const useHover = () => {
  const [isHovered, setIsHovered] = useState(false);

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  return {
    isHovered,
    onMouseEnter,
    onMouseLeave,
  };
};

export default useHover;
