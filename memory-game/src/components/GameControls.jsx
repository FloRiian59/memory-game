import ThemeSwitch from "./ThemeSwitch";

function GameControls({ theme, setTheme, onRestart }) {
  return (
    <div className="controls-container">
      <div className="game-controls">
        <div className="game-errors">2 Erreurs</div>
        <div className="game-moves">20 Coups</div>
        <div className="game-chrono">00:30</div>
      </div>
      <button className="reload-btn" type="button" onClick={onRestart}>
        <i className="fa-solid fa-rotate-right"></i>
      </button>
      <ThemeSwitch theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default GameControls;
