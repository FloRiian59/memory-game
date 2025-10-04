import { useState } from "react";
import GameControls from "./GameControls";
import GameGrid from "./GameGrid";
import GameOptions from "./GameOptions";
import "../css/GameContainer.css";

function GameContainer({ theme, setTheme }) {
  const [selectedCategories, setSelectedCategories] = useState(
    JSON.parse(localStorage.getItem("categories")) || []
  );
  return (
    <div className="game-container">
      <div className="game-grid-container">
        <GameControls theme={theme} setTheme={setTheme} />
        <GameGrid theme={theme} selectedCategories={selectedCategories} />{" "}
        <GameOptions
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />{" "}
      </div>
    </div>
  );
}

export default GameContainer;
