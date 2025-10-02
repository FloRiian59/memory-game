import GameCard from "./GameCard";

function GameGrid({ theme }) {
  const cards = Array(20).fill(null);

  return (
    <div className="game-grid">
      {cards.map((_, index) => (
        <GameCard key={index} theme={theme} />
      ))}
    </div>
  );
}

export default GameGrid;
