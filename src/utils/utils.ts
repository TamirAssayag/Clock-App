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

export const isMobile = /Mobi/.test(getNavigator()) || windowHasMobileWidth();
