import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { cardCategories } from "../data/CardData";

export default function GameGrid({ selectedCategories = ["jedis"], theme }) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);

  // ⚙️ Fonction pour générer une répartition équilibrée
  const generateBalancedCards = (categories, totalPairs = 10) => {
    if (!categories.length) return [];

    const basePairs = Math.floor(totalPairs / categories.length);
    const remainder = totalPairs % categories.length;

    const shuffledCats = [...categories].sort(() => Math.random() - 0.5);
    const distribution = {};

    categories.forEach((cat) => (distribution[cat] = basePairs));
    for (let i = 0; i < remainder; i++) {
      distribution[shuffledCats[i]]++;
    }

    // On sélectionne les cartes selon la distribution
    let allCards = [];
    Object.entries(distribution).forEach(([cat, pairs]) => {
      const available = cardCategories[cat]?.slice(0, pairs) || [];
      const doubled = [...available, ...available].map((card) => ({
        ...card,
        key: crypto.randomUUID(),
      }));
      allCards.push(...doubled);
    });

    // Mélange final
    return allCards.sort(() => Math.random() - 0.5);
  };

  // 🧩 Génération des cartes quand les catégories changent
  useEffect(() => {
    const gameCards = generateBalancedCards(selectedCategories, 10);
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
  }, [selectedCategories]);

  // 🕹️ Gestion des clics
  const handleCardClick = (card) => {
    if (disabled) return;
    if (flippedCards.some((f) => f.key === card.key)) return;

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
