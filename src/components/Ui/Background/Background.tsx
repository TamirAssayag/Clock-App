import React, { FC } from "react";
import { userSettings } from "../../../zustand";
import { motion, AnimatePresence } from "framer-motion";
import "./Background.scss";

const variants = {
  enter: {
    filter: "blur(0)",
    scale: 1,
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    filter: "blur(5px)",
    scale: 1.2,
  },
};

export const Background: FC = () => {
  const { data, backgroundImages } = userSettings();

  // If no selected user background, use the default background (first in current Images array)
  const bg = data.bg ?? backgroundImages[0];

  return (
    <>
      <AnimatePresence initial={false}>
        <motion.img
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          src={require("../../../assets/images/" + bg?.src)}
          key={bg?.id}
          alt=""
        />
      </AnimatePresence>
    </>
  );
};
