import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { cardCategories } from "../data/CardData";

export default function GameGrid({ category = "jedis", theme }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]); // cartes retournées (max 2)
  const [matchedCards, setMatchedCards] = useState([]); // ids trouvés
  const [disabled, setDisabled] = useState(false); // bloque les clics pendant comparaison

  // 🧩 1. Génération des cartes
  useEffect(() => {
    let selected = cardCategories[category]?.slice(0, 10);
    let gameCards = [...selected, ...selected]
      .map((card) => ({ ...card, key: crypto.randomUUID() }))
      .sort(() => Math.random() - 0.5);
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
  }, [category]);

  // ⚙️ 2. Gestion des clics
  const handleCardClick = (card) => {
    if (disabled) return;
    if (flippedCards.some((f) => f.key === card.key)) return; // carte déjà retournée

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);

      if (newFlipped[0].id === newFlipped[1].id) {
        // ✅ Paire trouvée
        setMatchedCards((prev) => [...prev, newFlipped[0].id]);
        setTimeout(() => {
          setFlippedCards([]);
          setDisabled(false);
        }, 800);
      } else {
        // ❌ Pas une paire
        setTimeout(() => {
          setFlippedCards([]);
          setDisabled(false);
        }, 1000);
      }
    }
  };

  // 🪞 3. Rendu
  return (
    <div className="game-grid">
      {cards.map((card) => {
        const isFlipped =
          flippedCards.some((f) => f.key === card.key) ||
          matchedCards.includes(card.id);

        return (
          <GameCard
            key={card.key}
            theme={theme}
            isFlipped={isFlipped}
            onClick={() => handleCardClick(card)}
            backContent={
              <img className="game-card-img" src={card.img} alt={card.id} />
            }
          />
        );
      })}
    </div>
  );
}
