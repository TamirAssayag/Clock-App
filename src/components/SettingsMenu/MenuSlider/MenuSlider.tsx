import classNames from "classnames";
import Slider from "rc-slider";
import React, { FC } from "react";
import { useDidUpdateEffect } from "../../../hooks";
import { userSettings } from "../../../zustand";

interface MenuSliderProps {
  data: any;
  disabled?: boolean;
  onChange: (value: number) => void;
  sliderStyle?: {};
}

export const MenuSlider: FC<MenuSliderProps> = ({
  data,
  sliderStyle,
  disabled,
  onChange,
}) => {
  const { data: settings } = userSettings();

  const onSliderChange = (value: number) => onChange(value / 100);

  const { finalVal } = {
    get sliderValue() {
      const value = settings[data.id];
      if (value && !disabled) {
        return value;
      } else {
        return data.default;
      }
    },

    get finalVal() {
      const v = this.sliderValue;
      return v > 1 ? v / 100 : v * 100;
    },
  };

  useDidUpdateEffect(() => {
    onChange(data.default);
  }, [disabled]);

  return (
    <div className={classNames("menu-slider", { disabled })}>
      <Slider {...sliderStyle} onChange={onSliderChange} value={finalVal} />
      <span>{finalVal.toFixed(0)}</span>
    </div>
  );
};
