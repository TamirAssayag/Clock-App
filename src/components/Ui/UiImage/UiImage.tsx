import { motion } from "framer-motion";
import React, { FC } from "react";
import { getImageUrl } from "../../../utils";

interface IProps {
  imgSrc: string;

  // Optional
  id?: string;
  onLoad?: () => void;
  variants?: {} | undefined;
  animate?: string;
  initial?: string;
  exit?: string;
  transition?: {};
}

export const UiImage: FC<IProps> = ({
  id,
  animate,
  variants,
  imgSrc,
  onLoad,
  initial,
  exit,
  transition,
}) => {
  return (
    <motion.img
      src={getImageUrl(imgSrc)}
      onLoad={onLoad}
      alt=""
      variants={variants}
      animate={animate}
      initial={initial}
      exit={exit}
      transition={transition}
      whileHover={{ scale: 1.1 }}
      id={id}
    />
  );
};
