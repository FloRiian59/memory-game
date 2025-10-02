import { useState } from "react";
import "../css/GameCard.css";

const GameCard = ({ theme, frontContent, backContent }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return; // Empêche les clics multiples pendant l'animation
    setIsAnimating(true);
    setIsFlipped((prev) => !prev);

    // Réinitialise l'état d'animation après la durée de la transition CSS (ex: 600ms)
    setTimeout(() => {
      setIsAnimating(false);
    }, 600); // À ajuster selon la durée de ta transition CSS
  };

  // Gestion du clavier pour l'accessibilité
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  };

  return (
    <div className="card-wrapper">
      <div
        className={`card ${isAnimating ? "animating" : ""}`}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        {/* Face avant (dos de la carte) */}
        <div
          className="card-face card-front"
          style={{ transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {frontContent || (
            <img
              src={
                theme === "light"
                  ? "../assets/Cards/BackCardDark.png"
                  : "../assets/Cards/BackCardLight.png"
              }
              alt="Dos de la carte"
              className="game-card-img"
            />
          )}
        </div>

        {/* Face arrière (face de la carte) */}
        <div
          className="card-face card-back"
          style={{ transform: isFlipped ? "rotateY(0deg)" : "rotateY(180deg)" }}
        >
          {backContent || (
            <img alt="Face de la carte" className="game-card-img" />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
