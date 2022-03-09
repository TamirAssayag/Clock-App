import React, { FC } from "react";
import { SettingsMenu } from "../SettingsMenu/SettingsMenu";
import { SettingsIcon } from "../";
import "./Header.scss";

export const Header: FC = () => {
  const [toggledSetting, setToggledSetting] = React.useState(false);

  const handleToggleSettings = () => {
    setToggledSetting(() => !toggledSetting);
  };

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__cta" onClick={handleToggleSettings}>
          <h2>Settings</h2>
          <SettingsIcon id="settings-icon" />
        </div>
      </div>
      <SettingsMenu expanded={toggledSetting} />
    </header>
  );
};
