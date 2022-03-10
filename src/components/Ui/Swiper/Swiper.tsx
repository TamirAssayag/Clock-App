import React, { FC } from "react";
import { Mousewheel } from "swiper";
import { Swiper } from "swiper/react";
import "swiper/css";

interface SwiperProps {
  children?: any;
  spaceBetween?: number;
  slidesPerView?: number;
  slidesOffsetAfter?: number;
  slidesOffsetBefore?: number;
}

export const SwiperUI: FC<SwiperProps> = ({
  children,
  spaceBetween,
  slidesPerView,
  slidesOffsetAfter,
  slidesOffsetBefore,
}) => {
  return (
    <Swiper
      modules={[Mousewheel]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      slidesOffsetAfter={slidesOffsetAfter || 16}
      slidesOffsetBefore={slidesOffsetBefore || 16}
      slideToClickedSlide
      freeMode={{
        enabled: false,
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
      {children}
    </Swiper>
  );
};
