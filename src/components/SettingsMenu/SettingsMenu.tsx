import React, { FC } from "react";
import { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Day1, Day2, Day3, Day4, Day5 } from "../Images";
import { userGeoStore, userSettings } from "../../zustand";
import { ImagesType } from "../../types";
import classNames from "classnames";
import "./SettingsMenu.scss";
import "swiper/css";
import { AnimatePresence, motion, Variants } from "framer-motion";

interface ISettingsMenu {
  expanded?: boolean;
}

const transition = {
  duration: 0.5,
  ease: [0.43, 0.13, 0.23, 0.96],
  transition: {
    delayChildren: 0.1,
    staggerChildren: 0.3,
  },
};

const variants: Variants = {
  enter: {
    opacity: 0,
    x: 400,
  },
  center: {
    opacity: 1,
    x: 0,
  },
  exit: {
    opacity: 0,
    x: 400,
  },
};

export const SettingsMenu: FC<ISettingsMenu> = ({ expanded }) => {
  const images: ImagesType[] = [
    { id: 1, src: Day1, type: "day" },
    { id: 2, src: Day2, type: "day" },
    { id: 3, src: Day3, type: "day" },
    { id: 4, src: Day4, type: "day" },
    { id: 5, src: Day5, type: "day" },
    { id: 6, src: Day5, type: "night" },
  ];

  const { setData } = userSettings((state) => state);
  const { getIsNight } = userGeoStore((state) => state);

  const getImagesArray = () => {
    return images.filter(
      (image) => image.type === (getIsNight() ? "night" : "day")
    );
  };

  const handleBackgroundChange = (id: number) => {
    const selectedBg = getImagesArray().find((image) => image.id === id);
    return () => setData({ bg: selectedBg });
  };

  return (
    <AnimatePresence>
      {expanded && (
        <motion.div
          variants={variants}
          transition={transition}
          initial="enter"
          animate="center"
          exit="exit"
          className={classNames("settings-menu", {
            "settings-expanded": expanded,
          })}
        >
          <motion.h3 variants={variants} transition={transition}>
            Settings
          </motion.h3>
          <motion.p
            variants={variants}
            className="uppercase letter-spacing"
            transition={{ ...transition, delay: 0.1 }}
          >
            Change background
          </motion.p>
          <div className="settings-menu__item">
            <div className="settings-menu__item-content">
              <Swiper
                modules={[Mousewheel]}
                spaceBetween={10}
                slidesPerView={3.5}
                slideToClickedSlide
                mousewheel
              >
                {getImagesArray().map((day) => (
                  <SwiperSlide
                    key={day.id}
                    onClick={handleBackgroundChange(day.id)}
                  >
                    <motion.img src={day.src} alt="" id="swiper-img" />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
