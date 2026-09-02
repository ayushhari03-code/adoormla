"use client";

import { motion } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import { Link } from "@/i18n/routing";

interface PremiumButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export default function PremiumButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
}: PremiumButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative px-8 py-4 rounded-full font-medium text-sm tracking-widest uppercase overflow-hidden transition-colors duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-forest-green text-ivory hover:bg-forest-green-light",
    secondary: "bg-gold text-charcoal hover:bg-brass",
    outline: "border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory dark:border-ivory dark:text-ivory dark:hover:bg-ivory dark:hover:text-charcoal",
  };

  const buttonContent = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="inline-block"
    >
      <div className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return <button onClick={onClick} className="focus:outline-none">{buttonContent}</button>;
}
