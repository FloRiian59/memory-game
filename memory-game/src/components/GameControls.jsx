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
  displayOptions,
  scores,
  activePlayer,
  isMultiplayer,
}) {
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <div className="controls-container">
      {isMultiplayer ? (
        <div className="players-container">
          <div
            className={`player-one ${
              activePlayer === 1 ? "active-player" : ""
            }`}
          >
            <div className="player-text">
              <h2 className="player-name">joueur 1</h2>
              <p className="player-score"> Paires: {scores.player1}</p>
            </div>
            <img
              className="player-logo"
              src={
                activePlayer === 1
                  ? "../../assets/Logo/Faction/EmpireActive.png"
                  : "../../assets/Logo/Faction/Empire.png"
              }
              alt="Logo Faction"
            />
          </div>
          <div
            className={`player-two ${
              activePlayer === 2 ? "active-player" : ""
            }`}
          >
            <img
              className="player-logo"
              src={
                activePlayer === 2
                  ? "../../assets/Logo/Faction/RepublicActive.png"
                  : "../../assets/Logo/Faction/Republic.png"
              }
              alt="Logo Faction"
            />
            <div className="player-text">
              <h2 className="player-name">joueur 2</h2>
              <p className="player-score"> Paires: {scores.player2}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="game-controls">
          {!displayOptions.hideErrors && (
            <div className="game-errors">{errors} Erreurs</div>
          )}
          {!displayOptions.hideMoves && (
            <div className="game-moves">{moves} Coups</div>
          )}
          {!displayOptions.timer && (
            <Timer
              isRunning={isStarted}
              resetTrigger={resetTrigger}
              onTimeChange={onTimeChange}
            />
          )}
        </div>
      )}

      <div className="options-container">
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
    </div>
  );
}

export default GameControls;
