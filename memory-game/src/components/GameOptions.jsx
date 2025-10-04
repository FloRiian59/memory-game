function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function GameOptions({ selectedCategories, setSelectedCategories }) {
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
      {allCategories.map(({ key, img }) => (
        <label
          key={key}
          className="custom-checkbox"
          style={{ "--check-color": categoryColors[key] }}
        >
          <input
            type="checkbox"
            checked={selectedCategories.includes(key)}
            onChange={() => handleCategoryChange(key)}
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
  );
}

export default GameOptions;
