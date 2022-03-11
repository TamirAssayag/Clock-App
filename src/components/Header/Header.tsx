import React, { FC } from "react";
import { SettingsMenu } from "../SettingsMenu/SettingsMenu";
import { SettingsIcon } from "../";
import { motion } from "framer-motion";
import "./Header.scss";

interface HeaderProps {
  expanded?: boolean;
  onClick?: () => void;
}

export const Header: FC<HeaderProps> = ({ onClick, expanded }) => {
  return (
    <header className="header">
      <motion.div
        className="header__wrapper"
        whileHover={{ scale: 1.1, opacity: 1 }}
      >
        <div className="header__cta" onClick={onClick}>
          <h2>Settings</h2>
          <SettingsIcon id="settings-icon" />
        </div>
      </motion.div>
      <SettingsMenu expanded={expanded} />
    </header>
  );
};
