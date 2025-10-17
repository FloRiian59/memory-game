import { useEffect } from "react";
import "../css/GameOptions.css";

function GameOptions({
  selectedCategories,
  setSelectedCategories,
  isStarted,
  gridSize,
  setGridSize,
  displayOptions,
  setDisplayOptions,
  isMultiplayer,
  setIsMultiplayer,
}) {
  const categoryColors = {
    droids: "blue",
    heros: "orange",
    bountyHunters: "cyan",
    jedis: "green",
    siths: "red",
    rebels: "purple",
    villains: "darkgrey",
  };

  useEffect(() => {
    const savedGridSize = localStorage.getItem("gridSize");
    if (savedGridSize) {
      setGridSize(savedGridSize);
    }
  }, [setGridSize]);

  const handleCategoryChange = (category) => {
    if (isStarted) return;
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
  };

  const allCategories = [
    { key: "droids", img: "public/assets/Logo/Faction/FactionDroid.png" },
    { key: "heros", img: "public/assets/Logo/Faction/FactionHero.png" },
    {
      key: "bountyHunters",
      img: "public/assets/Logo/Faction/FactionBounty.png",
    },
    { key: "jedis", img: "public/assets/Logo/Faction/FactionJedi.png" },
    { key: "siths", img: "public/assets/Logo/Faction/FactionSith.png" },
    { key: "rebels", img: "public/assets/Logo/Faction/FactionRebel.png" },
    { key: "villains", img: "public/assets/Logo/Faction/FactionVillain.png" },
  ];

  return (
    <div className="game-options">
      {/* --- Catégories --- */}
      <div className="options-column options-box categories-container">
        <h2 className="options-title">Catégories</h2>
        {allCategories.map(({ key, img }) => (
          <label
            key={key}
            className={`custom-checkbox ${isStarted ? "disabled" : ""}`}
            style={{ "--check-color": categoryColors[key] }}
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(key)}
              onChange={() => handleCategoryChange(key)}
              disabled={isStarted}
            />
            <span className="checkmark"></span>
            <img
              src={img}
              alt={key}
              style={{ width: "24px", height: "24px", objectFit: "contain" }}
            />
            {key}
          </label>
        ))}
      </div>

      {/* --- Paramètres de jeu --- */}
      <div className="options-column options-box game-settings">
        <h2 className="options-title">Paramètres de jeu</h2>
        <div className="grid-size-selector">
          <p className="option-subtitle">Taille de la grille</p>
          <div className="btn-container">
            {["4 x 4", "5 x 4", "6 x 5", "6 x 6"].map((size) => (
              <button
                key={size}
                className={`option-button ${
                  gridSize === size ? "active" : ""
                } ${isStarted ? "disabled" : ""}`}
                onClick={() => {
                  if (isStarted) return;
                  setGridSize(size);
                  localStorage.setItem("gridSize", size);
                }}
                disabled={isStarted}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <p className="option-subtitle">Mode de jeu</p>
        <div className="btn-container">
          <button
            className={`option-button ${isStarted ? "disabled" : ""} ${
              !isMultiplayer ? "active" : ""
            }`}
            disabled={isStarted}
            onClick={() => {
              setIsMultiplayer(false);
              localStorage.setItem("gameMode", "solo");
            }}
          >
            Solo
          </button>

          <button
            className={`option-button ${isStarted ? "disabled" : ""} ${
              isMultiplayer ? "active" : ""
            }`}
            disabled={isStarted}
            onClick={() => {
              setIsMultiplayer(true);
              localStorage.setItem("gameMode", "multiplayer");
            }}
          >
            2 joueurs local
          </button>
        </div>
      </div>

      {/* --- Affichage / Interface --- */}
      <div className="options-column options-box display-settings">
        <h2 className="options-title">Affichage / Interface</h2>
        <div className="display-container">
          {[
            { label: "Chronomètre", key: "timer" },
            { label: "Cacher les coups", key: "hideMoves" },
            { label: "Cacher les erreurs", key: "hideErrors" },
            { label: "Cacher les paires", key: "hidePairs" },
          ].map((option) => {
            const isActive = displayOptions[option.key];
            return (
              <div
                key={option.key}
                className={`display-option ${isStarted ? "disabled" : ""}`}
              >
                <span className="display-label">{option.label}</span>
                <div className="display-buttons">
                  <button
                    className={`toggle-btn ${isActive ? "active" : ""}`}
                    onClick={() => {
                      if (isStarted) return;
                      setDisplayOptions((prev) => ({
                        ...prev,
                        [option.key]: true,
                      }));
                    }}
                    disabled={isStarted}
                  >
                    oN
                  </button>
                  <button
                    className={`toggle-btn ${!isActive ? "active" : ""}`}
                    onClick={() => {
                      if (isStarted) return;
                      setDisplayOptions((prev) => ({
                        ...prev,
                        [option.key]: false,
                      }));
                    }}
                    disabled={isStarted}
                  >
                    oFF
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GameOptions;
