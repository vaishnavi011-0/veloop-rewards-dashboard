
import '../App.css';

export default function LevelHero({ data }) {
    const progress = Math.min(
        100,
        (data.currentXP / data.nextLevelXP) * 100
    );

    const remainingXP = Math.max(
        0,
        data.nextLevelXP - data.currentXP
    );

    return (
        <section className="hero-card">
            <div className="hero-top">
                <div>
                    <p className="eyebrow">YOUR REWARDS JOURNEY</p>
                    <h1>Every action moves you forward.</h1>
                    <p className="muted">
                        Keep earning XP and unlock your next milestone.
                    </p>
                </div>

                <div className="level-badge" aria-label={`Level ${data.currentLevel}`}>
                    <span style={{ fontSize: '34px' }}>🏆</span>
                    <span>LEVEL {data.currentLevel}</span>
                </div>
            </div>

            <div className="xp-summary">
                <div>
                    <p className="muted">Your XP</p>
                    <h2>{data.currentXP.toLocaleString()} XP</h2>
                </div>

                <div className="next-level-label">
                    <p className="muted">Next milestone</p>
                    <h3>Level {data.currentLevel + 1}</h3>
                </div>
            </div>

            <div
                className="progress-track"
                role="progressbar"
                aria-label="XP progress toward the next level"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
            >
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="progress-labels">
                <span>{Math.round(progress)}% progress</span>
                <span>{remainingXP.toLocaleString()} XP remaining</span>
            </div>

            <div className="reward-panel">
                <div className="reward-icon">
                    <span style={{ fontSize: '24px' }}>✨</span>
                </div>

                <div className="reward-copy">
                    <p className="eyebrow">NEXT LEVEL REWARD</p>
                    <h3>{data.nextReward} {data.currency}</h3>
                    <p className="muted">
                        Demo reward preview for Level {data.currentLevel + 1}
                    </p>
                </div>

                <span className="reward-lock" aria-label="Locked">🔒</span>
            </div>
        </section>
    );
}