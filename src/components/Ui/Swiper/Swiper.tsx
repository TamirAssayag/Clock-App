import React, { FC } from "react";
import { Mousewheel } from "swiper";
import { Swiper, SwiperProps } from "swiper/react";
import "swiper/css";

type SwiperUiProps = {
  children?: any;
  spaceBetween?: number;
  slidesPerView?: number;
  slidesOffsetAfter?: number;
  slidesOffsetBefore?: number;
} & SwiperProps;

export const SwiperUI: FC<SwiperUiProps> = ({
  children,
  spaceBetween,
  slidesPerView,
  slidesOffsetAfter,
  slidesOffsetBefore,
  ...otherProps
}) => {
  return (
    <Swiper
      modules={[Mousewheel]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      slidesOffsetAfter={slidesOffsetAfter || 16}
      slidesOffsetBefore={slidesOffsetBefore || 16}
      slideToClickedSlide
      {...(otherProps as SwiperProps)}
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
