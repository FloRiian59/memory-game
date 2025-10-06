import "../css/GameResults.css";

export default function GameResults({ time, moves, errors, onRestart }) {
  return (
    <div className="results-overlay">
      <div className="results-container">
        <h2 className="results-title">Partie terminée </h2>
        <p className="results-time">⏱ Temps : {time}</p>
        <p className="results-moves">🃏 Coups : {moves}</p>
        <p className="results-errors">❌ Erreurs : {errors}</p>
        <button onClick={onRestart} className="results-btn">
          Rejouer
        </button>
      </div>
    </div>
  );
}
