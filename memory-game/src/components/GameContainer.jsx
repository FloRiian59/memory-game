import { useState, useEffect, useRef } from "react";
import GameControls from "./GameControls";
import GameGrid from "./GameGrid";
import GameOptions from "./GameOptions";
import "../css/GameContainer.css";

function GameContainer({ theme, setTheme }) {
  const savedCategories = JSON.parse(
    localStorage.getItem("categories") || "null"
  );

  const [selectedCategories, setSelectedCategories] = useState(
    savedCategories && savedCategories.length > 0 ? savedCategories : ["jedis"]
  );
  const [resetTrigger, setResetTrigger] = useState(0);
  const [moves, setMoves] = useState(0);
  const [errors, setErrors] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  // 🕒 Chronomètre (ascendant)
  const [time, setTime] = useState(0);
  const timerRef = useRef(null);

  // Quand le jeu démarre ou s’arrête
  useEffect(() => {
    if (isStarted) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isStarted]);

  // 🔁 Réinitialiser le jeu
  const handleRestart = () => {
    setResetTrigger((prev) => prev + 1);
    setMoves(0);
    setErrors(0);
    setIsStarted(false);
    setTime(0);
    clearInterval(timerRef.current);
  };

  const handleMovesChange = (newMoves) => setMoves(newMoves);

  // ⏱️ Format du temps en mm:ss
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="game-container">
      <div className="game-grid-container">
        <GameControls
          theme={theme}
          setTheme={setTheme}
          onRestart={handleRestart}
          moves={moves}
          errors={errors}
          time={formatTime(time)} // ⏱️ chrono
        />
        <GameGrid
          theme={theme}
          selectedCategories={selectedCategories}
          resetTrigger={resetTrigger} // pour réinitialiser les cartes
          onMovesChange={handleMovesChange}
          onErrorsChange={setErrors}
          isStarted={isStarted}
          setIsStarted={setIsStarted}
          time={time} // temps actuel
          formatTime={formatTime} // fonction de formatage
        />

        <GameOptions
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
        />
      </div>
    </div>
  );
}

export default GameContainer;
