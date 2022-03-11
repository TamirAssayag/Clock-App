import { Variants } from "framer-motion";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { userSettings } from "../../../zustand";
import { SwiperUI, UiImage } from "../../Ui";

export const MenuSwiper = () => {
  const { setData, backgroundImages } = userSettings((state) => state);
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
  };

  const handleSwiperSlideOnClick = (id: number) => {
    const selected = backgroundImages.find((image) => image.id === id);
    return () => setData({ bg: selected });
  };

  const addToLoadedImages = (id: number) => {
    if (loadedImages.includes(id)) return;

    return () => setLoadedImages([...loadedImages, id]);
  };

  return (
    <SwiperUI {...swiperProps}>
      {backgroundImages.map((img) => (
        <SwiperSlide key={img.id} onClick={handleSwiperSlideOnClick(img.id)}>
          <div className="swiper-img-skeleton">
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
