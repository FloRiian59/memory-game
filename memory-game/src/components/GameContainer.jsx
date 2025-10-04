import { useState } from "react";
import GameControls from "./GameControls";
import GameGrid from "./GameGrid";
import GameOptions from "./GameOptions";
import "../css/GameContainer.css";

function GameContainer({ theme, setTheme }) {
  const savedCategories = JSON.parse(
    localStorage.getItem("categories") || "null"
  );
  const [selectedCategories, setSelectedCategories] = useState(
    savedCategories && savedCategories.length > 0 ? savedCategories : ["jedis"]
  );

  const [resetTrigger, setResetTrigger] = useState(0);

  const handleRestart = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div className="game-container">
      <div className="game-grid-container">
        <GameControls
          theme={theme}
          setTheme={setTheme}
          onRestart={handleRestart}
        />
        <GameGrid
          theme={theme}
          selectedCategories={selectedCategories}
          resetTrigger={resetTrigger}
        />
        <GameOptions
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
    </div>
  );
}

export default GameContainer;
