/* eslint-disable no-unused-vars */
import "../css/GameCard.css";

const GameCard = ({ theme, frontContent, backContent, isFlipped, onClick }) => {
  return (
    <div className="card-wrapper">
      <div
        className={`card ${isFlipped ? "flipped" : ""}`}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) =>
          e.key === "Enter" || e.key === " " ? onClick() : null
        }
      >
        <div className="card-face card-front">
          <img
            src={
              theme === "light"
                ? "../assets/Cards/BackCardDark.png"
                : "../assets/Cards/BackCardLight.png"
            }
            alt="Dos de la carte"
            className="game-card-img"
          />
        </div>
        <div className="card-face card-back">
          {backContent || (
            <img alt="Face de la carte" className="game-card-img" />
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard;
