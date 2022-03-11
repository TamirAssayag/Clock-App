import React, { FC, useEffect } from "react";
import { userSettings } from "../../../zustand";
import { AnimatePresence, Variants } from "framer-motion";
import "./Background.scss";
import { UiImage } from "../UiImage";
import { useMobile } from "../../../hooks";
import useDidUpdateEffect from "../../../hooks/useDidUpdateEffect";

interface BackgroundProps {}

export const Background: FC<BackgroundProps> = () => {
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
      x: { type: "spring", stiffness: 300, damping: 30 },
      opacity: { duration: 0.5 },
    },
  };

  const { data, backgroundImages, setData, isNight } = userSettings();

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

  useEffect(() => {
    initiateUserBgSettings();
  }, []);

  useDidUpdateEffect(() => {
    setData({ ...data, bg: backgroundImages[0] });
  }, [isNight]);

  return (
    <>
      <AnimatePresence initial={false}>
        <UiImage imgSrc={bg?.src} key={bg?.id} {...framerBgProps} />
      </AnimatePresence>
    </>
  );
};
