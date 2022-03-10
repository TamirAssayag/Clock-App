import classNames from "classnames";
import Slider from "rc-slider";
import React, { FC } from "react";
import { isNullOrUndefined } from "../../../utils";
import { userSettings } from "../../../zustand";

interface MenuSliderProps {
  data: any;
  onChange: (value: number) => void;
  sliderStyle?: {};
}

export const MenuSlider: FC<MenuSliderProps> = ({
  data,
  sliderStyle,
  onChange,
}) => {
  const { data: settings } = userSettings();

  const onSliderChange = (value: number) => onChange(value / 100);

  const sliderValue = () => {
    const value = settings[data.id];
    if (value) {
      if (value > 0 && isNullOrUndefined(settings.background_color)) return 0;
      return value * 100;
    } else {
      return 0;
    }
  };

  return (
    <div
      className={classNames("menu-slider", {
        disabled: isNullOrUndefined(settings.background_color),
      })}
    >
      <Slider
        {...sliderStyle}
        onChange={onSliderChange}
        value={sliderValue()}
      />
      <span>{sliderValue().toFixed(0)}</span>
    </div>
  );
};
