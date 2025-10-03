import { useState } from "react";
import GameControls from "./GameControls";
import GameGrid from "./GameGrid";
import GameOptions from "./GameOptions";
import "../css/GameContainer.css";

function GameContainer({ theme, setTheme }) {
  const [category, setCategory] = useState(() => {
    return localStorage.getItem("category") || "jedis";
  });
  return (
    <div className="game-container">
      <div className="game-grid-container">
        <GameControls theme={theme} setTheme={setTheme} />
        <GameGrid theme={theme} category={category} />{" "}
        <GameOptions setCategory={setCategory} />{" "}
      </div>
    </div>
  );
}

export default GameContainer;
