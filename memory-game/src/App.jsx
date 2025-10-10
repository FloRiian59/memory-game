import { useState, useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import GameContainer from "./components/GameContainer";

function App() {
  // Thème
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Langue
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || "fr"
  );

  useEffect(() => {
    localStorage.setItem("language", language);

    // Appliquer la classe Aurebesh au <body>
    if (language === "aurebesh") {
      document.body.classList.add("aurebesh");
    } else {
      document.body.classList.remove("aurebesh");
    }
  }, [language]);

  return (
    <>
      <Header theme={theme} />
      <GameContainer
        theme={theme}
        setTheme={setTheme}
        language={language}
        setLanguage={setLanguage}
      />
    </>
  );
}

export default App;
