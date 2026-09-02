"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.tagName.toLowerCase() === "a" || target.closest("a") || target.tagName.toLowerCase() === "button" || target.closest("button")) {
        setIsHovering(true);
        setHoverText("OPEN");
      } else if (target.closest("[data-cursor='view']")) {
        setIsHovering(true);
        setHoverText("VIEW");
      } else if (target.closest("[data-cursor='explore']")) {
        setIsHovering(true);
        setHoverText("EXPLORE");
      } else {
        setIsHovering(false);
        setHoverText("");
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-50 pointer-events-none flex items-center justify-center rounded-full bg-forest-green-light mix-blend-difference text-ivory text-xs font-bold"
      animate={{
        x: mousePosition.x - (isHovering ? 32 : 8),
        y: mousePosition.y - (isHovering ? 32 : 8),
        width: isHovering ? 64 : 16,
        height: isHovering ? 64 : 16,
        opacity: 1,
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    >
      {isHovering && <span className="pointer-events-none select-none">{hoverText}</span>}
    </motion.div>
  );
}
