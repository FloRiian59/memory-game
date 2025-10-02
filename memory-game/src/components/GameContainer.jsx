import "../css/GameContainer.css";
import GameControls from "./GameControls";
import GameGrid from "./GameGrid";

function GameContainer({ theme, setTheme }) {
  return (
    <div className="game-container">
      <div className="game-grid-container">
        <GameControls theme={theme} setTheme={setTheme} />
        <GameGrid theme={theme} />
      </div>
    </div>
  );
}

export default GameContainer;
