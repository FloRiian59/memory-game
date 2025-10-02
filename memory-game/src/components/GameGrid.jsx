import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { cardCategories } from "../data/CardData";

export default function GameGrid({ category = "droids", theme }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // On prend les cartes de la catégorie choisie
    let selectedCards = cardCategories[category];

    // ⚠️ Optionnel : limiter le nombre (ex: 6 paires max)
    selectedCards = selectedCards.slice(0, 10);

    // Duplique les cartes pour avoir les paires
    let gameCards = [...selectedCards, ...selectedCards];

    // Mélange façon Fisher-Yates
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
