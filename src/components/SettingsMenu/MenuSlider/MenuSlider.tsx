import Slider from "rc-slider";
import React from "react";

// interface MenuSliderProps {
//   data: any;
//   onChange: (value: number) => void;
// }

export const MenuSlider = () => {
  const [opacityValue, setOpacityValue] = React.useState(0);

  const onSliderChange = (value) => {
    const actualVal = value / 100;
    setOpacityValue(actualVal);
    const mainBgEl = document.querySelector(".main__bg") as HTMLElement;
    mainBgEl.style.setProperty("--background-fade", `${actualVal}`);
  };

  return (
    <div className="opacity-slider">
      <Slider
        dotStyle={{ backgroundColor: "black" }}
        handleStyle={{ backgroundColor: "black", borderColor: "gray" }}
        railStyle={{ backgroundColor: "white" }}
        trackStyle={{ backgroundColor: "black" }}
        onChange={onSliderChange}
        value={opacityValue * 100}
      />
      <span>{(opacityValue * 100).toFixed(0)}</span>
    </div>
  );
};
