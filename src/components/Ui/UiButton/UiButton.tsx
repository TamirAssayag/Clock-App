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
      <span className="ui-button__wrapper">
        <span className="ui-button__text">{text}</span>
        <span className="ui-button__icon">{icon}</span>
      </span>
    </button>
  );
};
