import { groupBy } from "lodash";
import create from "zustand";
import { persist } from "zustand/middleware";
import { computed } from "zustand-middleware-computed-state";

import SettingsJson from "../components/SettingsMenu/settings.json";
import { ImagesType } from "../types";

type Image = {
  [key: string]: ImagesType[];
};

type UserSettings = {
  data: any;
  setData: (payload: any) => void;
  backgroundImages: () => ImagesType[];
  isNight: boolean;
};

const store = (set, get) =>
  ({
    data: {},
    setData: (payload: any) => {
      set((state) => ({ data: { ...state.data, ...payload } }));
    },
  } as UserSettings);

const computedStore = (state) => {
  function isNight() {
    const currentHour = new Date().getHours();
    return currentHour > 17 || currentHour <= 6;
  }

  function backgroundImages() {
    const imagesByTime: Image = groupBy<ImagesType>(
      SettingsJson.settings[0].options,
      "type"
    );

    return imagesByTime[isNight() ? "night" : "day"];
  }

  return {
    isNight: isNight(),
    backgroundImages: backgroundImages(),
  };
};

export const userSettings = create(
  persist(computed(store, computedStore), {
    name: "user-settings", // name of item in the storage (must be unique)
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  })
);
