import { Variants } from "framer-motion";

export const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
  transition: {
    delayChildren: 0.1,
    staggerChildren: 0.3,
  },
};

export const variants: Variants = {
  enter: {
    opacity: 0,
    y: "-115%",
  },
  center: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: "-115%",
  },
};
