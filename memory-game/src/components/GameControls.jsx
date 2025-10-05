import ThemeSwitch from "./ThemeSwitch";

function GameControls({ theme, setTheme, onRestart, moves, errors }) {
  return (
    <div className="controls-container">
      <div className="game-controls">
        <div className="game-errors">{errors} Erreurs</div>
        <div className="game-moves">{moves} Coups</div>
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
