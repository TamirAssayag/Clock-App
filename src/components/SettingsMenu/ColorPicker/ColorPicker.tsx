import React, { FC } from "react";
import { hexToRGB } from "../../../utils";
import "./ColorPicker.scss";

interface Color {
  id: number;
  hex: string;
}

interface ColorPickerProps {
  colors: Color[];
  onChange: (val: string) => void;
}

export const ColorPicker: FC<ColorPickerProps> = ({ colors, onChange }) => {
  const onColorChange = (value: Color) => {
    const color = hexToRGB(value.hex);
    onChange(color.toString());
  };

  return (
    <div className="color-picker mb-1">
      <div className="color-picker__wrapper">
        <div
          className="color-picker__item remove"
          style={{ backgroundColor: "transparent" }}
          onClick={() => onChange(null)}
        />
        {colors.map((color, index) => (
          <div
            key={color + "-" + index}
            className="color-picker__item"
            style={{ backgroundColor: color.hex }}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>
    </div>
  );
};
