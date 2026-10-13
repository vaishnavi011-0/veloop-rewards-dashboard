import { useEffect, useState } from 'react';
import '../App.css';

const GAME_DURATION = 15;

export default function MiniGame() {
  const [gameState, setGameState] = useState('ready');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timeLeft <= 0) {
      setGameState('finished');
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  function startGame() {
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setGameState('playing');
  }

  function hitTarget() {
    if (gameState === 'playing') {
      setScore((currentScore) => currentScore + 1);
    }
  }

  const demoXP = score * 10;
  const demoVEs = score * 2;

  return (
    <section className="minigame-section">
      <div className="minigame-heading">
        <div>
          <p className="eyebrow">THE GAME ZONE</p>
          <h2>Gold Rush</h2>
          <p className="muted">
            Catch the gold! Click the target as many times as you can
            in 15 seconds.
          </p>
        </div>
        <span className="minigame-heading-icon" aria-hidden="true">
          🎮
        </span>
      </div>

      <div className="minigame-card">
        <div className="game-stats">
          <div className="game-stat">
            <span className="muted">TIME LEFT</span>
            <strong>{timeLeft}s</strong>
          </div>
          <div className="game-stat">
            <span className="muted">YOUR SCORE</span>
            <strong>{score}</strong>
          </div>
          <div className="game-stat">
            <span className="muted">DEMO XP</span>
            <strong>+{demoXP}</strong>
          </div>
        </div>

        <div
          className={`game-arena ${gameState === 'playing' ? 'game-active' : ''}`}
          aria-label="Gold Rush game area"
        >
          {gameState === 'ready' && (
            <div className="game-overlay">
              <span className="game-big-icon">🌟</span>
              <h3>Ready for the rush?</h3>
              <p>Hit the gold target to build your score.</p>
              <button className="game-button" onClick={startGame}>
                Start Game →
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <button
              type="button"
              className="gold-target"
              onClick={hitTarget}
              aria-label="Hit gold target"
            >
              ✦
            </button>
          )}

          {gameState === 'finished' && (
            <div className="game-overlay">
              <span className="game-big-icon">
                {score > 10 ? '🏆' : '✨'}
              </span>
              <h3>Time's up!</h3>
              <p>You scored {score} {score === 1 ? 'hit' : 'hits'}.</p>
              <div className="game-result-reward">
                <span>⚡ {demoXP} demo XP</span>
                <span>✦ {demoVEs} demo VEs</span>
              </div>
              <p className="game-disclaimer">
                Preview only — no real rewards were credited.
              </p>
              <button className="game-button" onClick={startGame}>
                ↻ Play Again
              </button>
            </div>
          )}
        </div>

        <div className="game-footer">
          <span>⚡ Every hit = 10 demo XP</span>
          <button
            type="button"
            className="game-reset"
            onClick={() => {
              setGameState('ready');
              setTimeLeft(GAME_DURATION);
              setScore(0);
            }}
          >
            Reset game
          </button>
        </div>
      </div>
    </section>
  );
}
