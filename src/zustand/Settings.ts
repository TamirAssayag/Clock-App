import create from "zustand";
import { persist } from "zustand/middleware";

type UserSettings = {
  data: any;
  setData: (payload: any) => void;
};

const store = (set, get) =>
  ({
    data: {},
    setData: (payload: any) =>
      set((state) => ({ data: { ...state.data, ...payload } })),
  } as UserSettings);

export const userSettings = create(
  persist(store, {
    name: "user-settings", // name of item in the storage (must be unique)
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  })
);
