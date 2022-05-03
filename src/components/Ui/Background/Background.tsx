import React, { FC, useEffect } from "react";
import { checkIfNight, userSettings } from "../../../zustand";
import { AnimatePresence, Variants } from "framer-motion";
import "./Background.scss";
import { UiImage } from "../UiImage";
import { useMobile, useDidUpdateEffect } from "../../../hooks";

interface BackgroundProps {}

const BackgroundComp: FC<BackgroundProps> = () => {
  const { isMobile } = useMobile();

  const variants: Variants = {
    enter: {
      scale: !isMobile ? 0.7 : 1,
      opacity: 0,
    },
    center: {
      opacity: 1,
      scale: !isMobile ? 1 : 1,
    },
    exit: {
      opacity: 0,
      scale: !isMobile ? 1.2 : 1,
    },
  };

  const framerBgProps = {
    variants,
    initial: "enter",
    animate: "center",
    exit: "exit",
    transition: {
      x: { type: "spring", stiffness: 300 },
      opacity: { duration: 0.5 },
    },
  };

  const { data, backgroundImages, setData, isNight, setIsNight } =
    userSettings();

  const [nightMode, setNightMode] = React.useState(isNight);

  // If no selected user background, use the default background (first in current Images array)
  const bg = data.bg ?? backgroundImages[0];

  const initiateUserBgSettings = () => {
    const docElement = document.documentElement;
    const { background_color: bg_color, background_opacity: bg_opacity } = data;

    if (!bg_color) return;
    if (!bg_opacity) return;

    if (bg_color || bg_opacity) {
      docElement.style.setProperty("--background-hue", bg_color);
      docElement.style.setProperty("--background-fade", bg_opacity);
    }
  };

  const updateNightMode = () => {
    setNightMode(checkIfNight());
  };

  useEffect(() => {
    initiateUserBgSettings();
    const interval = setInterval(updateNightMode, 1000);
    return () => clearInterval(interval);
  }, []);

  useDidUpdateEffect(() => {
    setIsNight(nightMode);
    setData({ ...data, bg: backgroundImages[0] });
  }, [nightMode, isNight]);

  return (
    <>
      <AnimatePresence initial={false}>
        <UiImage imgSrc={bg?.src} key={bg?.id} {...framerBgProps} />
      </AnimatePresence>
    </>
  );
};

export const Background = React.memo(BackgroundComp);
