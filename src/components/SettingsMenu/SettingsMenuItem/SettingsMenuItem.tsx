import React from "react";
import { transition, variants } from "../framer";
import { motion } from "framer-motion";

interface MenuItemProps {
  itemTitle: string;
  itemContent: JSX.Element;
}

export const SettingsMenuItem: React.FC<MenuItemProps> = ({
  itemTitle,
  itemContent,
}) => {
  return (
    <motion.div className="settings-menu__item">
      <motion.p
        variants={variants}
        className="uppercase letter-spacing"
        transition={{ ...transition, delay: 0.1 }}
      >
        {itemTitle}
      </motion.p>
      <motion.div className="settings-menu__item-content">
        {itemContent}
      </motion.div>
    </motion.div>
  );
};
