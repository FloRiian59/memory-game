function GameControls({ theme, setTheme }) {
  return (
    <div className="controls-container">
      <div className="game-controls">
        <div className="game-errors">2 Erreurs</div>
        <div className="game-moves">20 Coups</div>
        <div className="game-chrono">00:30</div>
      </div>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        {theme === "light" ? (
          <i className="fa-solid fa-moon"></i>
        ) : (
          <i className="fa-solid fa-sun"></i>
        )}
      </button>
    </div>
  );
}

export default GameControls;
