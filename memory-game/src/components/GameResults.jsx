export default function GameResults({ time, moves, errors, onRestart }) {
  return (
    <div className="end-overlay">
      <div className="end-box">
        <h2>Partie terminée !</h2>
        <p>⏱ Temps : {time}</p>
        <p>🃏 Coups : {moves}</p>
        <p>❌ Erreurs : {errors}</p>
        <button onClick={onRestart}>Rejouer</button>
      </div>
    </div>
  );
}
