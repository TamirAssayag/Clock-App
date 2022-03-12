import classNames from "classnames";
import { Variants } from "framer-motion";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { userSettings } from "../../../zustand";
import { SwiperUI, UiImage } from "../../Ui";

export const MenuSwiper = () => {
  const { data, setData, backgroundImages } = userSettings((state) => state);
  const [loadedImages, setLoadedImages] = React.useState([]);

  const imgVariants: Variants = {
    active: {
      opacity: 1,
    },
    inactive: {
      opacity: 0,
    },
  };

  const swiperProps = {
    spaceBetween: 10,
    slidesPerView: 35,
    slidesOffsetAfter: 16,
    slidesOffsetBefore: 16,
    get activeSlideIndex() {
      const activeIndex = backgroundImages.findIndex(
        (image) => image.id === data.bg?.id
      );
      return activeIndex === -1 ? 0 : activeIndex;
    },
    get initialSlide() {
      return this.activeSlideIndex;
    },
  };

  const handleSwiperSlideOnClick = (id: number) => () => {
    setData({ bg: backgroundImages.find((image) => image.id === id) });
  };

  const addToLoadedImages = (id: number) => {
    if (loadedImages.includes(id)) return;

    return () => setLoadedImages([...loadedImages, id]);
  };

  return (
    <SwiperUI {...swiperProps}>
      {backgroundImages.map((img, i) => (
        <SwiperSlide key={img.id} onClick={handleSwiperSlideOnClick(img.id)}>
          {/* prettier-ignore */}
          <div className={classNames(["swiper-img-skeleton",{ active: swiperProps.activeSlideIndex === i }])}>
            <UiImage
              variants={imgVariants}
              animate={loadedImages.includes(img.id) ? "active" : "inactive"}
              id="swiper-img"
              imgSrc={img.src}
              onLoad={addToLoadedImages(img.id)}
            />
          </div>
        </SwiperSlide>
      ))}
    </SwiperUI>
  );
};
