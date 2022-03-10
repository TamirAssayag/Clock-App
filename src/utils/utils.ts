export const getNavigator = () => {
  try {
    return navigator?.userAgent;
  } catch {
    return undefined;
  }
};
export const windowHasMobileWidth = () => {
  try {
    if (typeof window !== `undefined`) return window.innerWidth <= 920;
    else {
      return false;
    }
  } catch {
    return false;
  }
};

// Convert an hex code to rgba, eg: #ffd200 to [200, 15, 122]
export const hexToRGB = (val: string) => {
  const aRgbHex = val?.replace("#", "")?.match(/.{1,2}/g);
  const aRgb = [
    parseInt(aRgbHex[0], 16),
    parseInt(aRgbHex[1], 16),
    parseInt(aRgbHex[2], 16),
  ];
  return aRgb;
};

export const isMobile = /Mobi/.test(getNavigator()) || windowHasMobileWidth();

export const isNullOrUndefined = (val: any) => {
  return val === null || val === undefined;
};

export const toggleClass = (condition: boolean, className: string) => {
  if (condition) {
    document.body.classList.add(className);
  } else {
    if (document.body.classList.contains(className)) {
      document.body.classList.remove(className);
    }
  }
};
