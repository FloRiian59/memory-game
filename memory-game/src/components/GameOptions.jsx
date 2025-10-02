function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function GameOptions({ setCategory }) {
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
        <button key={category} onClick={() => setCategory(category)}>
          {capitalizeFirst(category)}
        </button>
      ))}
    </div>
  );
}

export default GameOptions;
