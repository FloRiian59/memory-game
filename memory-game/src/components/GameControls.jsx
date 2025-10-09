import ThemeSwitch from "./ThemeSwitch";
import Timer from "./Timer";

function GameControls({
  theme,
  setTheme,
  onRestart,
  moves,
  errors,
  isStarted,
  resetTrigger,
  onTimeChange,
}) {
  return (
    <div className="controls-container">
      <div className="game-controls">
        <div className="game-errors">{errors} Erreurs</div>
        <div className="game-moves">{moves} Coups</div>
        <Timer
          isRunning={isStarted}
          resetTrigger={resetTrigger}
          onTimeChange={onTimeChange}
        />
      </div>
      <button className="reload-btn" type="button" onClick={onRestart}>
        <i className="fa-solid fa-rotate-right"></i>
      </button>
      <ThemeSwitch theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default GameControls;
