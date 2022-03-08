import React from "react";
import "./styles/global.scss";
import { Time } from "./components";

const App: React.FunctionComponent = () => {
  return (
    <div className="clock-app">
      <Time />
    </div>
  );
};

export default App;
