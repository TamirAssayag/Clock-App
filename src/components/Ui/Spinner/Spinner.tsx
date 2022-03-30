import React from "react";
import "./Spinner.scss";
export const Spinner = () => {
  return (
    <div className="loading">
      <span className="spinner">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </div>
  );
};
