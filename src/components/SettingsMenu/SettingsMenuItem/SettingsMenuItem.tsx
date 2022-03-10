import React from "react";
import { transition, variants } from "../framer";
import { motion } from "framer-motion";
import classNames from "classnames";

interface MenuItemProps {
  itemTitle: string;
  itemContent: JSX.Element;
  className?: string;
}

export const SettingsMenuItem: React.FC<MenuItemProps> = ({
  itemTitle,
  itemContent,
  className,
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
      <motion.div
        className={classNames("settings-menu__item-content", {
          [className]: className,
        })}
      >
        {itemContent}
      </motion.div>
    </motion.div>
  );
};
