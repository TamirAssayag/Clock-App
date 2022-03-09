import React, { FC, useEffect } from "react";
import "./Main.scss";
import classNames from "classnames";
import { userGeoStore, userSettings } from "../../zustand";
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
import { Background } from "../Ui/Background";

export const Main: FC = () => {
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

  const { isNight } = userSettings();

  React.useEffect(() => {
    if (toggleUi) {
      document.body.classList.add("ui-expanded");
    } else {
      if (document.body.classList.contains("ui-expanded")) {
        document.body.classList.remove("ui-expanded");
      }
    }
    if (isNight) {
      document.body.classList.add("night");
    } else {
      if (document.body.classList.contains("night")) {
        document.body.classList.remove("night");
      }
    }
  }, [toggleUi]);

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
        return "Good Morning";
      case currentHour >= 12 && currentHour < 18:
        return "Good Afternoon";
      case currentHour > 17 && currentHour < 21:
        return "Good Evening";
      default:
        return "Good Night";
    }
  };

  const greeting = {
    text: displayGreeting(new Date().getHours()),
    background: isNight ? NightTimeBackground : DayTimeBackground,
    icon: isNight ? MoonIcon : SunIcon,
  };

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
      <div className="main__bg">
        <Background />
      </div>
      <div className="main__wrapper">
        <div className="main__container">
          <Quote />
          <div className="main__bottom">
            <div className="main__bottom-container">
              <div className="main__bottom-container-left">
                <div className="status">
                  <div className="status__icon">
                    <greeting.icon />
                  </div>
                  <p>
                    {greeting.text}
                    {!isMobile ? ", It's Currently" : ""}
                  </p>
                </div>
                <div className="time">
                  <header className="time__wrapper">
                    {/* <span className="time__hours">{new Date().getHours()}</span> */}
                    <h1 className="time__minutes">
                      {dayjs(time).format("HH:mm")}
                    </h1>
                    <span className="time__abbreviation">
                      {data.abbreviation}
                    </span>
                  </header>
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
      <MoreInfo isNightTime={isNight} data={data} toggleUi={toggleUi} />
    </div>
  );
};
