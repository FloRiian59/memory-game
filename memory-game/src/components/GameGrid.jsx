/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { cardCategories } from "../data/CardData";
import GameResults from "./GameResults";

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

  const gridWidth = 960; // largeur souhaitée de la grille
  const gap = 10; // gap en px
  const padding = 10; // padding appliqué autour de la grille
  const totalGaps = (cols - 1) * gap + 2 * padding;
  const cardSize = Math.floor((gridWidth - totalGaps) / cols);

  // calcule la hauteur de la grille
  const gridHeight = rows * cardSize + (rows - 1) * gap + 2 * padding;

  // Génération équilibrée des cartes
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
      const availableCards = cardCategories[cat] || [];
      // Mélange aléatoire des cartes de la catégorie
      const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
      // Sélectionne aléatoirement "pairs" cartes
      const selected = shuffled.slice(0, pairs);

      // Double les cartes pour faire les paires
      const doubled = [...selected, ...selected].map((card) => ({
        ...card,
        key: crypto.randomUUID(),
      }));
      allCards.push(...doubled);
    });
    return allCards.sort(() => Math.random() - 0.5);
  };

  // Réinitialisation du jeu
  useEffect(() => {
    const gameCards = generateBalancedCards(selectedCategories, totalPairs);
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setErrors(0);
    setSeenCards(new Set());
  }, [selectedCategories, resetTrigger, gridSize]);

  // Remonter les stats vers le parent
  useEffect(() => {
    onMovesChange?.(moves);
  }, [moves, onMovesChange]);

  useEffect(() => {
    onErrorsChange?.(errors);
  }, [errors, onErrorsChange]);

  // Détection de fin de partie
  useEffect(() => {
    const totalPairs = cards.length / 2;
    if (matchedCards.length === totalPairs && totalPairs > 0) {
      setIsStarted(false);
      setIsGameOver(true);
    }
  }, [matchedCards, cards.length, setIsStarted, setIsGameOver]);

  // Gestion du clic sur une carte
  const handleCardClick = (card) => {
    // 🚫 Vérifications préliminaires (jeu démarré, carte pas déjà trouvée/retournée, etc.)
    if (!isStarted || disabled) return;
    if (matchedCards.includes(card.id)) return;
    if (flippedCards.some((f) => f.key === card.key)) return;

    // Ajout de la carte cliquée à la liste des cartes retournées
    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    // Si 2 cartes sont retournées
    if (newFlipped.length === 2) {
      setDisabled(true);
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;
      setSeenCards((prev) => new Set([...prev, first.id, second.id]));

      if (first.id === second.id) {
        // ✅ Bonne paire
        setMatchedCards((prev) => [...prev, first.id]);

        if (isMultiplayer) {
          setScores((prevScores) => ({
            ...prevScores,
            [`player${activePlayer}`]: prevScores[`player${activePlayer}`] + 1,
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

          // Changement de joueur si mode 2 joueurs
          if (isMultiplayer) {
            setActivePlayer(activePlayer === 1 ? 2 : 1);
          }
        }, 800);

        setErrors((prevErrors) => {
          const bothSeenBefore =
            seenCards.has(first.id) && seenCards.has(second.id);
          return bothSeenBefore ? prevErrors + 1 : prevErrors;
        });
      }
    }
  };

  // Lancer la partie
  const handleGameStart = () => {
    setScores({ player1: 0, player2: 0 });
    setActivePlayer(1);
    setIsStarted(true);
  };
  return (
    <div
      className={`game-grid ${!isStarted ? "paused" : ""}`}
      style={{
        width: `${gridWidth}px`,
        gridTemplateColumns: `repeat(${cols}, ${cardSize}px)`,
        gridAutoRows: `${cardSize}px`,
        gap: `${gap}px`,
        padding: `${padding}px`,
        minHeight: `${gridHeight}px`,
      }}
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
              veuillez choisir au moins une catégorie pour lancer la partie.
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
            style={{
              width: `${cardSize}px`,
              height: `${cardSize}px`,
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
