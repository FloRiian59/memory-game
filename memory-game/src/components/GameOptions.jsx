function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function GameOptions({ selectedCategories, setSelectedCategories, isStarted }) {
  const categoryColors = {
    droids: "blue",
    clones: "orange",
    bountyHunters: "cyan",
    jedis: "green",
    siths: "red",
    rebels: "purple",
    troopers: "darkgrey",
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
    { key: "droids", img: "../../assets/Cards/Droids/FactionLogo.png" },
    { key: "clones", img: "../../assets/Cards/Clone/FactionLogo.png" },
    {
      key: "bountyHunters",
      img: "../../assets/Cards/BountyHunters/FactionLogo.png",
    },
    { key: "jedis", img: "../../assets/Cards/Jedi/FactionLogo.png" },
    { key: "siths", img: "../../assets/Cards/Sith/FactionLogo.png" },
    { key: "rebels", img: "../../assets/Cards/Rebelles/FactionLogo.png" },
    { key: "troopers", img: "../../assets/Cards/Trooper/FactionLogo.png" },
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
              alt={capitalizeFirst(key)}
              style={{ width: "24px", height: "24px", objectFit: "contain" }}
            />
            {capitalizeFirst(key)}
          </label>
        ))}
      </div>

      <div className="options-column game-settings">
        <h2 className="options-title">Paramètres de jeu</h2>
        <label className="custom-checkbox">
          <input type="checkbox" disabled />
          <span className="checkmark"></span>
          Taille de la grille : <span className="setting-value">5x4</span>
        </label>
        <label className="custom-checkbox">
          <input type="checkbox" disabled />
          <span className="checkmark"></span>
          Mode : <span className="setting-value">1 joueur</span>
        </label>
      </div>

      <div className="options-column display-settings">
        <h2 className="options-title">Affichage / interface</h2>
        <label className="custom-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          Cacher les paires trouvées
        </label>
        <label className="custom-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          Masquer le nombre de coups
        </label>
        <label className="custom-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          Masquer les erreurs
        </label>
        <label className="custom-checkbox">
          <input type="checkbox" />
          <span className="checkmark"></span>
          Masquer le chrono
        </label>
      </div>
    </div>
  );
}

export default GameOptions;
