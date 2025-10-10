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
  language,
  setLanguage,
}) {
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

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

      <select
        className="language-select"
        value={language}
        onChange={handleLanguageChange}
      >
        <option value="fr">Français</option>
        <option value="aurebesh">Aurebesh</option>
      </select>

      <button className="reload-btn" type="button" onClick={onRestart}>
        <i className="fa-solid fa-rotate-right"></i>
      </button>

      <ThemeSwitch
        theme={theme}
        setTheme={setTheme}
        isAurebesh={language === "aurebesh"}
      />
    </div>
  );
}

export default GameControls;
