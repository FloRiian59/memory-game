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
