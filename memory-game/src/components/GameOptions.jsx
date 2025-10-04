function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function GameOptions({ selectedCategories, setSelectedCategories }) {
  const handleCategoryChange = (category) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));
  };

  const allCategories = [
    "droids",
    "clones",
    "bountyHunters",
    "jedis",
    "siths",
    "rebels",
    "troopers",
  ];

  return (
    <div className="game-options">
      {allCategories.map((category) => (
        <label key={category}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(category)}
            onChange={() => handleCategoryChange(category)}
          />
          {capitalizeFirst(category)}
        </label>
      ))}
    </div>
  );
}

export default GameOptions;
