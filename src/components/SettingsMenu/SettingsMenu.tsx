import React, { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "rc-slider/assets/index.css";
import settingsJson from "./settings.json";
import "./SettingsMenu.scss";

import { SettingsMenuItem } from "./SettingsMenuItem";
import { SettingsCard } from "./SettingsCard";
import { MenuSwiper } from "./MenuSwiper";
import { ColorPicker } from "./ColorPicker";
import { MenuSlider } from "./MenuSlider";

interface SettingsMenuProps {
  expanded?: boolean;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({ expanded }) => {
  const [menuAnimDone, setMenuAnimDone] = React.useState(false);

  const settings = settingsJson.settings;

  const displayMenuItemByType = ({ ...props }) => {
    switch (props.type) {
      case "swiper":
        return {
          itemTitle: props.title,
          itemContent: menuAnimDone && <MenuSwiper />,
        };
      case "hue":
        return {
          className: "py-1",
          itemTitle: props.title,
          itemContent: <ColorPicker />,
        };
      case "hue-slider":
        return {
          className: "py-1",
          itemTitle: props.title,
          itemContent: <MenuSlider />,
        };
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {expanded && (
        <SettingsCard
          expanded={expanded}
          onAnimationComplete={() => setMenuAnimDone(true)}
        >
          {settings.map((setting) => (
            <SettingsMenuItem {...displayMenuItemByType(setting)} />
          ))}
        </SettingsCard>
      )}
    </AnimatePresence>
  );
};
