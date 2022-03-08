import React, { FC } from "react";
import "./UiButton.scss";

type UiButtonProps = {
  text: string;
  icon?: any;
  onClick?: () => void;
};

export const UiButton: FC<UiButtonProps> = ({ text, icon, onClick }) => {
  return (
    <button className="ui-button" onClick={onClick}>
      <div className="ui-button__wrapper">
        <div className="ui-button__text">{text}</div>
        <div className="ui-button__icon">{icon}</div>
      </div>
    </button>
  );
};
