import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { cardCategories } from "../data/CardData";
import GameResults from "./GameResults";

export default function GameGrid({
  selectedCategories = ["jedis"],
  theme,
  resetTrigger,
  onMovesChange,
  onErrorsChange,
  isStarted,
  setIsStarted,
  onGameEnd,
  formatTime,
  time,
  setResetTrigger,
}) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [errors, setErrors] = useState(0);
  const [seenCards, setSeenCards] = useState(new Set());
  const [isGameOver, setIsGameOver] = useState(false);

  // 🧩 Génération équilibrée des cartes
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

    let allCards = [];
    Object.entries(distribution).forEach(([cat, pairs]) => {
      const available = cardCategories[cat]?.slice(0, pairs) || [];
      const doubled = [...available, ...available].map((card) => ({
        ...card,
        key: crypto.randomUUID(),
      }));
      allCards.push(...doubled);
    });

    return allCards.sort(() => Math.random() - 0.5);
  };

  // 🔄 Réinitialisation du jeu
  useEffect(() => {
    const gameCards = generateBalancedCards(selectedCategories, 10);
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setErrors(0);
    setSeenCards(new Set());
  }, [selectedCategories, resetTrigger]);

  // ⬆️ Remonter les stats vers le parent
  useEffect(() => {
    onMovesChange?.(moves);
  }, [moves, onMovesChange]);

  useEffect(() => {
    onErrorsChange?.(errors);
  }, [errors, onErrorsChange]);

  // 🏁 Détection de fin de partie
  useEffect(() => {
    const totalPairs = cards.length / 2;
    if (matchedCards.length === totalPairs && totalPairs > 0) {
      setIsStarted(false);
      setIsGameOver(true);
      onGameEnd?.({ moves, errors });
    }
  }, [matchedCards, cards.length, moves, errors, setIsStarted, onGameEnd]);

  // 🎴 Clic sur une carte
  const handleCardClick = (card) => {
    if (!isStarted || disabled) return;
    if (flippedCards.some((f) => f.key === card.key)) return;

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves((prev) => prev + 1);

      const [first, second] = newFlipped;
      setSeenCards((prev) => new Set([...prev, first.id, second.id]));

      if (first.id === second.id) {
        // ✅ Bonne paire
        setMatchedCards((prev) => [...prev, first.id]);
        setTimeout(() => {
          setFlippedCards([]);
          setDisabled(false);
        }, 800);
      } else {
        // ❌ Mauvaise paire
        setTimeout(() => {
          setFlippedCards([]);
          setDisabled(false);
        }, 1000);

        setErrors((prevErrors) => {
          const bothSeenBefore =
            seenCards.has(first.id) && seenCards.has(second.id);
          return bothSeenBefore ? prevErrors + 1 : prevErrors;
        });
      }
    }
  };

  // ▶️ Lancer la partie
  const handleGameStart = () => setIsStarted(true);

  return (
    <div className={`game-grid ${!isStarted ? "paused" : ""}`}>
      {!isStarted && !isGameOver && (
        <button className="start-button" onClick={handleGameStart}>
          CoMMENCER
        </button>
      )}

      {isGameOver && (
        <GameResults
          time={formatTime(time)}
          moves={moves}
          errors={errors}
          onRestart={() => {
            setIsGameOver(false);
            setIsStarted(false);
            resetTrigger && setResetTrigger((prev) => prev + 1);
          }}
        />
      )}

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
