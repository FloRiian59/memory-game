import ThemeSwitch from "./ThemeSwitch";

function GameControls({ theme, setTheme }) {
  return (
    <div className="controls-container">
      <div className="game-controls">
        <div className="game-errors">2 Erreurs</div>
        <div className="game-moves">20 Coups</div>
        <div className="game-chrono">00:30</div>
      </div>
      <ThemeSwitch theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default GameControls;
