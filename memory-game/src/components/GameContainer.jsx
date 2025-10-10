import { useState } from "react";
import GameControls from "./GameControls";
import GameGrid from "./GameGrid";
import GameOptions from "./GameOptions";
import "../css/GameContainer.css";

function GameContainer({ theme, setTheme, language, setLanguage }) {
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
  const [isGameOver, setIsGameOver] = useState(false);
  const [gridSize, setGridSize] = useState("5x4");
  const [time, setTime] = useState(0); // État pour stocker le temps

  const handleRestart = () => {
    setResetTrigger((prev) => prev + 1);
    setMoves(0);
    setErrors(0);
    setIsStarted(false);
    setIsGameOver(false);
    setTime(0);
  };

  const handleMovesChange = (newMoves) => setMoves(newMoves);
  const handleTimeChange = (newTime) => setTime(newTime); // Fonction pour mettre à jour le temps

  console.log(selectedCategories);
  return (
    <div className="game-container">
      <div className="game-grid-container">
        <GameControls
          theme={theme}
          setTheme={setTheme}
          language={language}
          setLanguage={setLanguage}
          onRestart={handleRestart}
          moves={moves}
          errors={errors}
          isStarted={isStarted}
          resetTrigger={resetTrigger}
          onTimeChange={handleTimeChange} // Passe la fonction pour remonter le temps
        />
        <GameGrid
          theme={theme}
          selectedCategories={selectedCategories}
          resetTrigger={resetTrigger}
          setResetTrigger={setResetTrigger}
          onMovesChange={handleMovesChange}
          onErrorsChange={setErrors}
          isStarted={isStarted}
          setIsStarted={setIsStarted}
          isGameOver={isGameOver}
          setIsGameOver={setIsGameOver}
          gridSize={gridSize}
          time={time} // Passe le temps à GameGrid
        />
        <GameOptions
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          isStarted={isStarted}
          gridSize={gridSize}
          setGridSize={setGridSize}
        />
      </div>
    </div>
  );
}

export default GameContainer;
