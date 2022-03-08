import axios from "axios";
import create from "zustand";
import { persist } from "zustand/middleware";

export type GeoIpState = {
  ip: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  time_zone: string;
  region_name: string;
  region_code: string;
  country_code: string;
  country_name: string;
};

export type WorldTimeState = {
  abbreviation: string;
  client_ip: string;
  datetime: string;
  day_of_week: number;
  day_of_year: number;
  dst: boolean;
  dst_from: any;
  dst_offset: number;
  dst_until: any;
  raw_offset: number;
  timezone: string;
  unixtime: number;
  utc_datetime: string;
  utc_offset: string;
  week_number: number;
};

type UserGeoStore = {
  data: GeoIpState & WorldTimeState;
  setData: (userGeo: Partial<GeoIpState & WorldTimeState>) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  fetchGeoApi: () => Promise<GeoIpState>;
  fetchWorldTimeApi: (ip: GeoIpState["ip"]) => Promise<WorldTimeState>;

  lastUpdated: number;
};
// prettier-ignore
// write store function here
const store = (set, get) => ({
    lastUpdated: null,

    data: {},
    setData: (geo: any) => set(() => ({ data: geo, lastUpdated: Date.now() })),

    isLoading: false,
    setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),

    fetchGeoApi: async () => {
      const API_KEY: string = process.env.REACT_APP_GEO_IP_KEY;
      const { data } = await axios.get<GeoIpState>(
        `https://api.freegeoip.app/json/?apikey=${API_KEY}`
      );
      return data;
    },

    fetchWorldTimeApi: async (ip: GeoIpState["ip"]) => {
      const { data } = await axios.get<WorldTimeState>(
        `https://worldtimeapi.org/api/ip/${ip}`
      );

      return data;
    },
  } as UserGeoStore);

export const userGeoStore = create(
  persist(store, {
    name: "user-geo", // name of item in the storage (must be unique)
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  })
);
