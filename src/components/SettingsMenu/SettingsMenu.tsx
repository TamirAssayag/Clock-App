import React, { FC } from "react";
import { Mousewheel } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { userSettings } from "../../zustand";
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

const imgVariants: Variants = {
  active: {
    opacity: 1,
  },
  inactive: {
    opacity: 0,
  },
};

const variants: Variants = {
  enter: {
    opacity: 0,
    y: "-115%",
  },
  center: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: "-115%",
  },
};

export const SettingsMenu: FC<ISettingsMenu> = ({ expanded }) => {
  const { setData, backgroundImages } = userSettings((state) => state);
  const [loadedImages, setLoadedImages] = React.useState([]);
  const [menuAnimDone, setMenuAnimDone] = React.useState(false);

  const handleBackgroundChange = (id: number) => {
    const selectedBg = backgroundImages.find((image) => image.id === id);
    return () => setData({ bg: selectedBg });
  };

  const addToLoadedImages = (id: number) => {
    if (loadedImages.includes(id)) return;
    return () => setLoadedImages([...loadedImages, id]);
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
          onAnimationComplete={() => setMenuAnimDone(true)}
        >
          <motion.div className="settings-menu-title">
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
          </motion.div>
          <motion.div className="settings-menu__item">
            {menuAnimDone && (
              <motion.div className="settings-menu__item-content">
                <Swiper
                  modules={[Mousewheel]}
                  spaceBetween={10}
                  slidesPerView={3.5}
                  slidesOffsetAfter={16}
                  slidesOffsetBefore={16}
                  slideToClickedSlide
                  freeMode={{
                    enabled: true,
                    sticky: true,
                  }}
                  mousewheel
                  breakpoints={{
                    390: {
                      slidesPerView: 2.2,
                    },
                    768: {
                      slidesPerView: 3.5,
                    },
                  }}
                >
                  {backgroundImages.map((img) => (
                    <SwiperSlide
                      key={img.id}
                      onClick={handleBackgroundChange(img.id)}
                    >
                      <div className="swiper-img-skeleton">
                        <motion.img
                          animate={
                            loadedImages.includes(img.id)
                              ? "active"
                              : "inactive"
                          }
                          variants={imgVariants}
                          src={require("../../assets/images/" + img.src)}
                          onLoad={addToLoadedImages(img.id)}
                          alt=""
                          id="swiper-img"
                          whileHover={{ scale: 1.1 }}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
