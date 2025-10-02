import { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import GameContainer from "./components/GameContainer";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  return (
    <>
      <Header theme={theme} />
      <GameContainer theme={theme} setTheme={setTheme} />
    </>
  );
}

export default App;
