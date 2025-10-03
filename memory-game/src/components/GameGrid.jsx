import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { cardCategories } from "../data/CardData";

export default function GameGrid({ category = "jedis", theme }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let selectedCards = cardCategories[category];
    selectedCards = selectedCards.slice(0, 10);
    let gameCards = [...selectedCards, ...selectedCards];

    gameCards = gameCards
      .map((card) => ({ ...card, key: crypto.randomUUID() }))
      .sort(() => Math.random() - 0.5);

    setCards(gameCards);
  }, [category]);

  return (
    <div className="game-grid">
      {cards.map((card) => (
        <GameCard
          key={card.key}
          theme={theme}
          backContent={
            <img className="game-card-img" src={card.img} alt={card.id} />
          }
        />
      ))}
    </div>
  );
}
