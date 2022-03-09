import React, { FC } from "react";
import { GreetingType } from "../../../types";
import { userSettings } from "../../../zustand";
import { motion, AnimatePresence } from "framer-motion";
import "./Background.scss";

interface BgProps {
  greeting: GreetingType;
}

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

export const Background: FC<BgProps> = ({ greeting }) => {
  const { data: dataSettings } = userSettings((state) => state);

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
          src={
            dataSettings === null ? greeting.background : dataSettings.bg?.src
          }
          key={dataSettings.bg?.id}
          alt=""
        />
      </AnimatePresence>
    </>
  );
};
