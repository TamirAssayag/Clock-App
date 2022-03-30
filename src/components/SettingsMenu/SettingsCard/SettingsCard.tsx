import React, { Suspense } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";
import { transition, variants } from "../framer";

export const SettingsCard = ({ expanded, children, onAnimationComplete }) => {
  return (
    <motion.div
      variants={variants}
      transition={transition}
      initial="enter"
      animate="center"
      exit="exit"
      className={classNames("settings-menu", {
        "settings-expanded": expanded,
      })}
      onAnimationComplete={onAnimationComplete}
    >
      <motion.div className="settings-menu-title">
        <motion.h3 variants={variants} transition={transition}>
          Settings
        </motion.h3>
      </motion.div>
      {children}
    </motion.div>
  );
};
