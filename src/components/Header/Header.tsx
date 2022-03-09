import React, { FC } from "react";
import { SettingsMenu } from "../SettingsMenu/SettingsMenu";
import { SettingsIcon } from "../";
import { motion } from "framer-motion";
import "./Header.scss";

export const Header: FC = () => {
  const [toggledSetting, setToggledSetting] = React.useState(false);

  const handleToggleSettings = () => {
    setToggledSetting(() => !toggledSetting);
  };

  return (
    <header className="header">
      <motion.div
        className="header__wrapper"
        whileHover={{ scale: 1.1, opacity: 1 }}
      >
        <div className="header__cta" onClick={handleToggleSettings}>
          <h2>Settings</h2>
          <SettingsIcon id="settings-icon" />
        </div>
      </motion.div>
      <SettingsMenu expanded={toggledSetting} />
    </header>
  );
};
