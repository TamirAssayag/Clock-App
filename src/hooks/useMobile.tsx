import { useState, useLayoutEffect, useEffect } from "react";
import throttle from "lodash/throttle";

const checkMaxWidth = (width) => {
  if (width > 1920) {
    return true;
  } else if (width <= 1920) {
    return false;
  }
};

const checkWidth = (width) => {
  if (width < 920) {
    return true;
  } else if (width >= 920) {
    return false;
  }
};

const useMobile = () => {
  const [isMobile, setIsMd] = useState(() => checkWidth(window.innerWidth));
  const [isMax, setIsMax] = useState(() => checkMaxWidth(window.innerWidth));

  useEffect((): ReturnType<any> => {
    if (typeof window === "undefined")
      return { isMobile: checkWidth(1200), isMax: checkWidth(1200) };
  }, []);

  useLayoutEffect(() => {
    const calcInnerWidth = throttle(function () {
      setIsMd(checkWidth(window.innerWidth));
      setIsMax(checkMaxWidth(window.innerWidth));
    }, 200);
    window.addEventListener("resize", calcInnerWidth);
    return () => window.removeEventListener("resize", calcInnerWidth);
  }, []);

  return { isMobile, isMax };
};

export default useMobile;
