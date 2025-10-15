import "../css/GameResults.css";

export default function GameResults({
  time,
  moves,
  errors,
  onRestart,
  scores,
  isMultiplayer,
}) {
  const getWinner = () => {
    if (scores.player1 > scores.player2) return "player1";
    if (scores.player2 > scores.player1) return "player2";
    return "tie";
  };

  const winner = getWinner();

  return (
    <div className="results-overlay">
      <div className="results-container">
        <h2 className="results-title">Partie terminée</h2>

        {isMultiplayer ? (
          <>
            <p
              className={`player-score ${winner === "player1" ? "winner" : ""}`}
            >
              Joueur 1 : {scores.player1} paires
            </p>

            <p
              className={`player-score ${winner === "player2" ? "winner" : ""}`}
            >
              Joueur 2 : {scores.player2} paires
            </p>

            {winner === "tie" ? (
              <p className="results-tie">Égalité !</p>
            ) : (
              <p className="results-winner">
                🏆 Gagnant :{" "}
                <span className="winner-name">
                  {winner === "player1" ? "Joueur 1" : "Joueur 2"}
                </span>
              </p>
            )}
          </>
        ) : (
          <>
            <p className="results-time">⏱ Temps : {time}</p>
            <p className="results-moves">🃏 Coups : {moves}</p>
            <p className="results-errors">❌ Erreurs : {errors}</p>
          </>
        )}

        <button onClick={onRestart} className="results-btn">
          Rejouer
        </button>
      </div>
    </div>
  );
}
