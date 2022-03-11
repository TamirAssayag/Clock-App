import React, { FC } from "react";
import { AnimatePresence } from "framer-motion";
import "rc-slider/assets/index.css";
import settingsJson from "./settings.json";
import "./SettingsMenu.scss";
import {
  SettingsMenuItem,
  SettingsCard,
  MenuSwiper,
  ColorPicker,
  MenuSlider,
} from "../";
import { userSettings } from "../../zustand";
import { isNullOrUndefined } from "../../utils";

interface SettingsMenuProps {
  expanded?: boolean;
}

export const SettingsMenu: FC<SettingsMenuProps> = ({ expanded }) => {
  const [menuAnimDone, setMenuAnimDone] = React.useState(false);

  const settings = settingsJson.settings;

  const { setData, data: getUserSettings } = userSettings();

  const onChange = (data) => {
    return (val) => {
      if (data.cssVariable)
        document.documentElement.style.setProperty(data.cssVariable, val);

      setData({ [data.id]: val });
    };
  };

  const displayMenuItemByType = ({ ...item }) => {
    switch (item.type) {
      case "swiper":
        return {
          itemTitle: item.title,
          itemContent: menuAnimDone && <MenuSwiper />,
        };
      case "color-picker":
        return {
          className: "px-05",
          itemTitle: item.title,
          itemContent: (
            <ColorPicker colors={item.options} onChange={onChange(item)} />
          ),
        };
      case "slider":
        return {
          className: "px-1",
          itemTitle: item.title,
          itemContent: (
            <MenuSlider
              disabled={isNullOrUndefined(getUserSettings.background_color)}
              sliderStyle={item.style}
              data={item}
              onChange={onChange(item)}
            />
          ),
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
          {settings.map((setting, index) => (
            <SettingsMenuItem
              key={"compontent-" + index}
              className={setting.className}
              {...displayMenuItemByType(setting)}
            />
          ))}
        </SettingsCard>
      )}
    </AnimatePresence>
  );
};
