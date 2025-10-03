function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function GameOptions({ setCategory }) {
  const handleCategoryChange = (category) => {
    setCategory(category);
    localStorage.setItem("category", category);
  };

  return (
    <div className="game-options">
      {[
        "droids",
        "clones",
        "bountyHunters",
        "jedis",
        "siths",
        "rebels",
        "troopers",
      ].map((category) => (
        <button key={category} onClick={() => handleCategoryChange(category)}>
          {capitalizeFirst(category)}
        </button>
      ))}
    </div>
  );
}

export default GameOptions;
