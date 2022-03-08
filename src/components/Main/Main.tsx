import React, { FC, useEffect } from "react";
import "./Main.scss";
import classNames from "classnames";
import { userGeoStore } from "../../zustand";
import dayjs from "dayjs";
import {
  UiButton,
  Quote,
  MoreInfo,
  DayTimeBackground,
  NightTimeBackground,
  ArrowDownIcon,
  ArrowUpIcon,
  MoonIcon,
  SunIcon,
} from "../";
import { useMobile } from "../../hooks";

type GreetingType = {
  text: string;
  icon: any;
  background: string;
  isNight: boolean;
};

export const Time: FC = () => {
  const [toggleUi, setToggleUi] = React.useState(false);
  const [time, setTime] = React.useState(new Date().getTime());

  const { isMobile } = useMobile();

  const {
    lastUpdated,
    data,
    setData,
    fetchGeoApi,
    fetchWorldTimeApi,
    setIsLoading,
  } = userGeoStore((state) => state);

  const checkForRefresh = () => {
    return lastUpdated !== null
      ? dayjs(lastUpdated).isBefore(dayjs().subtract(1, "minute"))
      : true;
  };

  const startProcedure = async () => {
    if (!checkForRefresh()) return;

    setIsLoading(true);

    try {
      const geoIp = await fetchGeoApi();
      const worldTime = await fetchWorldTimeApi(geoIp.ip);
      setData({ ...geoIp, ...worldTime });
    } catch {
      console.log("Sorry");
    } finally {
      setIsLoading(false);
    }
  };

  const displayGreeting = (currentHour) => {
    switch (true) {
      case currentHour > 6 && currentHour < 12:
        return {
          text: "Good Morning",
          icon: <SunIcon />,
          background: background.day,
          isNight: false,
        };
      case currentHour >= 12 && currentHour < 18:
        return {
          text: "Good Afternoon",
          icon: <SunIcon />,
          background: background.day,
          isNight: false,
        };
      case currentHour > 17 && currentHour < 21:
        return {
          text: "Good Evening",
          icon: <MoonIcon />,
          background: background.night,
          isNight: true,
        };
      default:
        return {
          text: "Good Night",
          icon: <MoonIcon />,
          background: background.night,
          isNight: true,
        };
    }
  };

  const background = {
    day: DayTimeBackground,
    night: NightTimeBackground,
  };

  const greeting: GreetingType = displayGreeting(new Date().getHours());

  const handleToggleUi = () => {
    setToggleUi(() => !toggleUi);
  };

  useEffect(() => {
    startProcedure();

    const intervalId = setInterval(() => {
      setTime(new Date().getTime());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={classNames("main", { "main__toggled-ui": toggleUi })}>
      <div
        className="main__bg"
        style={{ backgroundImage: `url(${greeting.background})` }}
      ></div>
      <div className="main__wrapper">
        <div className="main__container">
          {!toggleUi && <Quote />}

          <div className="main__bottom">
            <div className="main__bottom-container">
              <div className="main__bottom-container-left">
                <div className="status">
                  <div className="status__icon">{greeting.icon}</div>
                  <p>
                    {greeting.text}
                    {!isMobile ? ", It's Currently" : ""}
                  </p>
                </div>
                <div className="time">
                  <div className="time__wrapper">
                    {/* <span className="time__hours">{new Date().getHours()}</span> */}
                    <h1 className="time__minutes">
                      {dayjs(time).format("HH:mm")}
                    </h1>
                    <span className="time__abbreviation">IST</span>
                  </div>
                  <span className="time__city">
                    IN {data.city}, {data.country_code}
                  </span>
                </div>
              </div>
              <div className="main__bottom-container-right">
                <UiButton
                  text={toggleUi ? "Less" : "More"}
                  icon={toggleUi ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  onClick={handleToggleUi}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <MoreInfo isNightTime={greeting.isNight} data={data} />
    </div>
  );
};
