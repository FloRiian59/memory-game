/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { cardCategories } from "../data/CardData";
import GameResults from "./GameResults";
import "../css/GameGrid.css";

function GameGrid({
  selectedCategories = ["jedis"],
  theme,
  resetTrigger,
  onMovesChange,
  onErrorsChange,
  isStarted,
  setIsStarted,
  isGameOver,
  setIsGameOver,
  setResetTrigger,
  time,
  gridSize,
  displayOptions,
  isMultiplayer,
  activePlayer,
  setActivePlayer,
  scores,
  setScores,
}) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [errors, setErrors] = useState(0);
  const [seenCards, setSeenCards] = useState(new Set());

  const [cols, rows] = gridSize.split("x").map(Number);
  const totalPairs = (rows * cols) / 2;

  const formatGridSizeForClass = (gridSize) => {
    return gridSize.replace(/\s+/g, "").toLowerCase();
  };

  // 🔹 Génération équilibrée des cartes
  const generateBalancedCards = (categories, totalPairs = 10) => {
    if (!categories.length) return [];
    const basePairs = Math.floor(totalPairs / categories.length);
    const remainder = totalPairs % categories.length;
    const shuffledCats = [...categories].sort(() => Math.random() - 0.5);
    const distribution = {};
    categories.forEach((cat) => (distribution[cat] = basePairs));
    for (let i = 0; i < remainder; i++) distribution[shuffledCats[i]]++;

    let allCards = [];
    Object.entries(distribution).forEach(([cat, pairs]) => {
      const availableCards = cardCategories[cat] || [];
      const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, pairs);
      const doubled = [...selected, ...selected].map((card) => ({
        ...card,
        key: crypto.randomUUID(),
      }));
      allCards.push(...doubled);
    });
    return allCards.sort(() => Math.random() - 0.5);
  };

  // 🔹 Réinitialisation
  useEffect(() => {
    const gameCards = generateBalancedCards(selectedCategories, totalPairs);
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setErrors(0);
    setSeenCards(new Set());
  }, [selectedCategories, resetTrigger, gridSize]);

  useEffect(() => {
    onMovesChange?.(moves);
  }, [moves]);

  useEffect(() => {
    onErrorsChange?.(errors);
  }, [errors]);

  // 🔹 Détection de fin
  useEffect(() => {
    const totalPairs = cards.length / 2;
    if (matchedCards.length === totalPairs && totalPairs > 0) {
      setIsStarted(false);
      setIsGameOver(true);
    }
  }, [matchedCards, cards.length]);

  // 🔹 Clic sur une carte
  const handleCardClick = (card) => {
    if (!isStarted || disabled) return;
    if (matchedCards.includes(card.id)) return;
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
        if (isMultiplayer) {
          setScores((prev) => ({
            ...prev,
            [`player${activePlayer}`]: prev[`player${activePlayer}`] + 1,
          }));
        }
        setTimeout(() => {
          setFlippedCards([]);
          setDisabled(false);
        }, 800);
      } else {
        // ❌ Mauvaise paire
        setTimeout(() => {
          setFlippedCards([]);
          setDisabled(false);
          if (isMultiplayer) {
            setActivePlayer(activePlayer === 1 ? 2 : 1);
          }
        }, 800);
        setErrors((prev) => {
          const bothSeenBefore =
            seenCards.has(first.id) && seenCards.has(second.id);
          return bothSeenBefore ? prev + 1 : prev;
        });
      }
    }
  };

  const handleGameStart = () => {
    setScores({ player1: 0, player2: 0 });
    setActivePlayer(1);
    setIsStarted(true);
  };

  return (
    <div
      className={`game-grid game-grid--${formatGridSizeForClass(gridSize)} ${
        !isStarted ? "paused" : ""
      }`}
    >
      {!isStarted && !isGameOver && (
        <div className="start-container">
          <button
            className="start-button"
            onClick={handleGameStart}
            disabled={selectedCategories.length === 0}
          >
            CoMMENCER
          </button>
          {selectedCategories.length === 0 && (
            <p className="start-warning">
              Veuillez choisir au moins une catégorie pour lancer la partie.
            </p>
          )}
        </div>
      )}

      {isGameOver && (
        <GameResults
          time={time}
          moves={moves}
          errors={errors}
          scores={scores}
          isMultiplayer={isMultiplayer}
          onRestart={() => {
            setIsGameOver(false);
            setIsStarted(false);
            setResetTrigger((prev) => prev + 1);
          }}
        />
      )}

      {cards.map((card) => {
        const isFlipped =
          flippedCards.some((f) => f.key === card.key) ||
          matchedCards.includes(card.id);
        const shouldHide =
          displayOptions.hidePairs && matchedCards.includes(card.id);
        return (
          <div
            key={card.key}
            className="game-card"
            style={{
              opacity: shouldHide ? "0" : "1",
              transition: "opacity 0.1s 0.6s",
              pointerEvents: shouldHide ? "none" : "auto",
            }}
          >
            <GameCard
              theme={theme}
              isFlipped={isFlipped}
              onClick={() => handleCardClick(card)}
              backContent={
                <img className="game-card-img" src={card.img} alt={card.id} />
              }
              style={{ width: "100%", height: "100%" }}
              isMatched={matchedCards.includes(card.id)}
            />
          </div>
        );
      })}
    </div>
  );
}

export default GameGrid;
