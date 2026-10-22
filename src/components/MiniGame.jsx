
import { useCallback, useEffect, useRef, useState } from "react";
import "./MiniGame.css";

const SYMBOLS = [
  "⚡", "💎", "🚀", "👾", "🎮", "🌟",
  "🔮", "🪐", "🛸", "💠", "🔥", "🧿",
];

const DIFFICULTIES = {
  Easy: { pairs: 4, seconds: 60 },
  Medium: { pairs: 6, seconds: 50 },
  Hard: { pairs: 8, seconds: 45 },
};

function shuffleCards(pairs) {
  const selected = SYMBOLS.slice(0, pairs);
  const doubled = [...selected, ...selected];

  // Fisher–Yates shuffle
  for (let i = doubled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }

  return doubled.map((symbol, index) => ({
    id: `${index}-${symbol}`,
    symbol,
  }));
}

export default function MiniGame() {
  const [difficulty, setDifficulty] = useState("Medium");
  const [cards, setCards] = useState(() =>
    shuffleCards(DIFFICULTIES.Medium.pairs)
  );
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(DIFFICULTIES.Medium.seconds);
  const [gameState, setGameState] = useState("ready");
  const [combo, setCombo] = useState(0);
  const [bestCombo, setBestCombo] = useState(0);
  const [score, setScore] = useState(0);

  const mismatchTimer = useRef(null);
  const gameStateRef = useRef("ready");

  const changeGameState = useCallback((nextState) => {
    gameStateRef.current = nextState;
    setGameState(nextState);
  }, []);

  const resetGame = useCallback(
    (nextDifficulty = difficulty) => {
      if (mismatchTimer.current) {
        clearTimeout(mismatchTimer.current);
        mismatchTimer.current = null;
      }

      const settings = DIFFICULTIES[nextDifficulty];

      setDifficulty(nextDifficulty);
      setCards(shuffleCards(settings.pairs));
      setFlipped([]);
      setMatched([]);
      setMoves(0);
      setSeconds(settings.seconds);
      setCombo(0);
      setBestCombo(0);
      setScore(0);

      gameStateRef.current = "ready";
      setGameState("ready");
    },
    [difficulty]
  );

  const startGame = () => {
    if (gameStateRef.current !== "ready") return;
    changeGameState("playing");
  };

  // Countdown timer
  useEffect(() => {
    if (gameState !== "playing") return undefined;

    const timer = setInterval(() => {
      setSeconds((previous) => {
        if (previous <= 1) {
          clearInterval(timer);

          if (gameStateRef.current === "playing") {
            gameStateRef.current = "lost";
            setGameState("lost");
          }

          return 0;
        }

        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState]);

  // Clean up any pending mismatch timeout on unmount
  useEffect(() => {
    return () => {
      if (mismatchTimer.current) {
        clearTimeout(mismatchTimer.current);
      }
    };
  }, []);

  // Detect a win when every card is matched
  useEffect(() => {
    if (
      gameState === "playing" &&
      matched.length === cards.length &&
      cards.length > 0
    ) {
      changeGameState("won");
    }
  }, [matched, cards.length, gameState, changeGameState]);

  const handleCardClick = (index) => {
    if (
      gameStateRef.current !== "playing" ||
      flipped.includes(index) ||
      matched.includes(index) ||
      flipped.length === 2
    ) {
      return;
    }

    const nextFlipped = [...flipped, index];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 1) return;

    setMoves((previous) => previous + 1);

    const [firstIndex, secondIndex] = nextFlipped;
    const isMatch =
      cards[firstIndex].symbol === cards[secondIndex].symbol;

    if (isMatch) {
      const nextCombo = combo + 1;
      const points = 100 + combo * 25;

      setMatched((previous) => [
        ...previous,
        firstIndex,
        secondIndex,
      ]);
      setFlipped([]);
      setCombo(nextCombo);
      setBestCombo((previous) =>
        Math.max(previous, nextCombo)
      );
      setScore((previous) => previous + points);
    } else {
      setCombo(0);

      mismatchTimer.current = setTimeout(() => {
        setFlipped([]);
        mismatchTimer.current = null;
      }, 750);
    }
  };

  const settings = DIFFICULTIES[difficulty];
  const totalPairs = settings.pairs;
  const matchedPairs = matched.length / 2;
  const progress = (matchedPairs / totalPairs) * 100;
  const isFinished =
    gameState === "won" || gameState === "lost";

  return (
    <section
      className="memory-game"
      aria-labelledby="memory-title"
    >
      <div className="memory-heading">
        <div>
          <p className="memory-eyebrow">
            THE GAME ZONE / 01
          </p>

          <h2 id="memory-title">
            Neon Memory Match
          </h2>

          <p className="memory-subtitle">
            Flip the tiles. Find the pairs. Beat the clock.
          </p>
        </div>

        <div
          className="memory-game-icon"
          aria-hidden="true"
        >
          🧠
        </div>
      </div>

      <div className="memory-panel">
        <div className="memory-toolbar">
          <label className="memory-difficulty">
            <span>DIFFICULTY</span>

            <select
              value={difficulty}
              disabled={gameState === "playing"}
              onChange={(event) =>
                resetGame(event.target.value)
              }
            >
              <option value="Easy">Easy · 8 tiles</option>
              <option value="Medium">Medium · 12 tiles</option>
              <option value="Hard">Hard · 16 tiles</option>
            </select>
          </label>

          <button
            className="memory-secondary-button"
            type="button"
            onClick={() => resetGame()}
          >
            ↻ Restart
          </button>
        </div>

        <div
          className="memory-stats"
          aria-label="Game statistics"
        >
          <div
            className={`memory-stat ${seconds <= 10 && gameState === "playing"
                ? "memory-stat-warning"
                : ""
              }`}
          >
            <span>TIME LEFT</span>
            <strong>{seconds}s</strong>
          </div>

          <div className="memory-stat">
            <span>YOUR SCORE</span>
            <strong>{score.toLocaleString()}</strong>
          </div>

          <div className="memory-stat">
            <span>MATCHED</span>
            <strong>
              {matchedPairs}/{totalPairs}
            </strong>
          </div>

          <div className="memory-stat">
            <span>MOVES</span>
            <strong>{moves}</strong>
          </div>
        </div>

        <div className="memory-progress-header">
          <span>Memory progress</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div
          className="memory-progress-track"
          role="progressbar"
          aria-label="Matched pairs"
          aria-valuemin={0}
          aria-valuemax={totalPairs}
          aria-valuenow={matchedPairs}
        >
          <div
            className="memory-progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {gameState === "ready" && (
          <div className="memory-intro">
            <div
              className="memory-intro-symbol"
              aria-hidden="true"
            >
              ✦
            </div>

            <p className="memory-eyebrow">
              READY PLAYER ONE?
            </p>

            <h3>Train your memory.</h3>

            <p>
              Match every pair before the countdown reaches
              zero. Consecutive matches build your combo bonus.
            </p>

            <button
              className="memory-primary-button"
              type="button"
              onClick={startGame}
            >
              Start Challenge <span>→</span>
            </button>
          </div>
        )}

        {gameState === "playing" && (
          <>
            <div
              className={`memory-board memory-board-${difficulty.toLowerCase()}`}
              role="group"
              aria-label={`${difficulty} difficulty memory cards`}
            >
              {cards.map((card, index) => {
                const isFlipped = flipped.includes(index);
                const isMatched = matched.includes(index);
                const isVisible = isFlipped || isMatched;

                return (
                  <button
                    key={card.id}
                    type="button"
                    className={[
                      "memory-card",
                      isVisible
                        ? "memory-card-revealed"
                        : "",
                      isMatched
                        ? "memory-card-matched"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleCardClick(index)}
                    disabled={
                      isVisible || flipped.length === 2
                    }
                    aria-label={
                      isVisible
                        ? `Card ${index + 1}: ${card.symbol}${isMatched ? ", matched" : ""
                        }`
                        : `Reveal card ${index + 1}`
                    }
                  >
                    <span className="memory-card-inner">
                      <span
                        className="memory-card-back"
                        aria-hidden="true"
                      >
                        ✦
                      </span>

                      <span
                        className="memory-card-front"
                        aria-hidden="true"
                      >
                        {card.symbol}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              className="memory-live-status"
              aria-live="polite"
            >
              {combo >= 2
                ? `🔥 ${combo}× combo! Keep the streak alive!`
                : "Find a matching pair to earn points."}
            </div>
          </>
        )}

        {isFinished && (
          <div className="memory-result" role="status">
            <div
              className="memory-result-icon"
              aria-hidden="true"
            >
              {gameState === "won" ? "🏆" : "⏱️"}
            </div>

            <p className="memory-eyebrow">
              {gameState === "won"
                ? "MISSION COMPLETE"
                : "TIME'S UP"}
            </p>

            <h3>
              {gameState === "won"
                ? "Memory master!"
                : "The clock got you!"}
            </h3>

            <p>
              {gameState === "won"
                ? `You matched all ${totalPairs} pairs in ${settings.seconds - seconds
                } seconds.`
                : `You found ${matchedPairs} of ${totalPairs} pairs.`}
            </p>

            <div className="memory-result-stats">
              <div>
                <span>FINAL SCORE</span>
                <strong>{score.toLocaleString()}</strong>
              </div>

              <div>
                <span>MOVES</span>
                <strong>{moves}</strong>
              </div>

              <div>
                <span>BEST COMBO</span>
                <strong>{bestCombo}×</strong>
              </div>
            </div>

            <div className="memory-demo-reward">
              <span>⚡ {score} demo XP</span>
              <span>
                ✦ {Math.floor(score / 10)} demo VEs
              </span>
            </div>

            <p className="memory-demo-notice">
              Demo preview only. These scores and rewards
              are not added to your real VELOOP account.
            </p>

            <button
              className="memory-primary-button"
              type="button"
              onClick={() => resetGame()}
            >
              ↻ Play Again
            </button>
          </div>
        )}
      </div>

      <footer className="memory-footer">
        <span>
          ✦ Match = 100 points + combo bonus
        </span>

        <span>BEST COMBO: {bestCombo}×</span>
      </footer>
    </section>
  );
}
