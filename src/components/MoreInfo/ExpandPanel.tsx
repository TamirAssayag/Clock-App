import classNames from "classnames";
import React, { FC } from "react";
import "./ExpandPanel.scss";

type MoreInfoProps = {
  isNightTime: boolean;
  data: any;
};

export const MoreInfo: FC<MoreInfoProps> = ({ isNightTime, data }) => {
  const expandData = [
    { title: "Current Time Zone", value: data.time_zone },
    { title: "Day of the year", value: data.day_of_year },
    { title: "Day of the week", value: data.day_of_week },
    { title: "Week Number", value: data.week_number },
  ];

  return (
    <div className={classNames("expand-panel", { night: isNightTime })}>
      <div className="expand-panel__wrapper">
        <div className="expand-panel__data">
          {expandData.map((item, index) => (
            <div className="expand-panel__data-item" key={index}>
              <div className="expand-panel__data-item-title">{item.title}</div>
              <div className="expand-panel__data-item-value">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
