import React, { useEffect } from "react";
import "./styles/global.scss";
import { Main } from "./components";

const App: React.FunctionComponent = () => {
  useEffect(() => {
    const clockAppEl = document.querySelector(".clock-app") as HTMLElement;
    clockAppEl.style.setProperty("--height", `${window.innerHeight}px`);

    window.addEventListener("resize", () => {
      clockAppEl.style.setProperty("--height", `${window.innerHeight}px`);
    });
  }, []);

  return (
    <div className="clock-app">
      <Main />
    </div>
  );
};

export default App;
