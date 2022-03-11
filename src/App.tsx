import React, { useEffect } from "react";
import { Header, Main } from "./components";

const App: React.FunctionComponent = () => {
  const [expandedSettings, setExpandedSettings] = React.useState(false);

  const handleExpandSettings = () => {
    setExpandedSettings(() => !expandedSettings);
  };

  const handleCloseSettings = () => {
    if (!expandedSettings) return;
    setExpandedSettings(false);
  };

  useEffect(() => {
    const clockAppEl = document.querySelector(".clock-app") as HTMLElement;
    clockAppEl.style.setProperty("--height", `${window.innerHeight}px`);

    window.addEventListener("resize", () => {
      clockAppEl.style.setProperty("--height", `${window.innerHeight}px`);
    });
  }, []);

  return (
    <div className="clock-app">
      <Header expanded={expandedSettings} onClick={handleExpandSettings} />
      <Main onClose={handleCloseSettings} />
    </div>
  );
};

export default App;
