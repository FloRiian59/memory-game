function GameOptions({ selectedCategories, setSelectedCategories, isStarted }) {
  const categoryColors = {
    droids: "blue",
    heros: "orange",
    bountyHunters: "cyan",
    jedis: "green",
    siths: "red",
    rebels: "purple",
    villains: "darkgrey",
  };

  const handleCategoryChange = (category) => {
    if (isStarted) return; // Empêche le changement si une partie est en cours

    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
  };

  const allCategories = [
    { key: "droids", img: "../../assets/Logo/Faction/FactionDroid.png" },
    { key: "heros", img: "../../assets/Logo/Faction/FactionHero.png" },
    {
      key: "bountyHunters",
      img: "../../assets/Logo/Faction/FactionBounty.png",
    },
    { key: "jedis", img: "../../assets/Logo/Faction/FactionJedi.png" },
    { key: "siths", img: "../../assets/Logo/Faction/FactionSith.png" },
    { key: "rebels", img: "../../assets/Logo/Faction/FactionRebel.png" },
    { key: "villains", img: "../../assets/Logo/Faction/FactionVillain.png" },
  ];

  return (
    <div className="game-options">
      <div className="options-column categories-container">
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

      <div className="options-column game-settings">
        <h2 className="options-title">Paramètres de jeu</h2>
        <p>Taille de la grille :</p>
        <button>4x4</button>
        <button>5x4</button>
        <button>6x5</button>
        <button>6x6</button>
        <h2 className="options-title">mode de jeu</h2>
        <button>Solo</button>
        <button>2 jouer local</button>
      </div>

      <div className="options-column display-settings">
        <h2 className="options-title">Affichage / interface</h2>
      </div>
    </div>
  );
}

export default GameOptions;
