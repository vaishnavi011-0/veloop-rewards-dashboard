
import "../App.css";

const levels = [
    { level: 1, name: "Starter", xp: 0, reward: 50, icon: "🌱" },
    { level: 2, name: "Explorer", xp: 1000, reward: 75, icon: "⭐" },
    { level: 3, name: "Achiever", xp: 3000, reward: 100, icon: "💎" },
    { level: 4, name: "Champion", xp: 5000, reward: 150, icon: "🛡️" },
    { level: 5, name: "Elite", xp: 8000, reward: 200, icon: "🚀" },
    { level: 6, name: "Master", xp: 12000, reward: 250, icon: "👑" },
    { level: 7, name: "Legend", xp: 18000, reward: 300, icon: "🏆" },
];

export default function LevelRoadmap({ currentLevel = 4 }) {
    return (
        <section className="roadmap-card">
            <div className="roadmap-header">
                <div>
                    <p className="eyebrow">YOUR JOURNEY</p>
                    <h2>Level Roadmap</h2>
                    <p className="muted">
                        Every milestone brings you closer to bigger rewards.
                    </p>
                </div>

                <span className="roadmap-count">
                    {Math.max(0, Math.min(currentLevel, levels.length))}/{levels.length} levels
                </span>
            </div>

            <div className="roadmap-scroll">
                <div className="roadmap-track">
                    {levels.map((item) => {
                        const status =
                            item.level < currentLevel
                                ? "completed"
                                : item.level === currentLevel
                                    ? "current"
                                    : "locked";

                        return (
                            <article
                                className={`roadmap-level ${status}`}
                                key={item.level}
                                aria-current={status === "current" ? "step" : undefined}
                            >
                                <div className="roadmap-level-top">
                                    <span className="roadmap-level-label">
                                        LEVEL {item.level}
                                    </span>

                                    <span className="roadmap-state" aria-label={status}>
                                        {status === "completed"
                                            ? "✓"
                                            : status === "current"
                                                ? "★"
                                                : "🔒"}
                                    </span>
                                </div>

                                <div className="roadmap-level-icon" aria-hidden="true">
                                    {item.icon}
                                </div>

                                <h3>{item.name}</h3>

                                <p className="roadmap-xp">
                                    {item.xp.toLocaleString()} XP
                                </p>

                                <div className="roadmap-reward-chip">
                                    ✦ {item.reward} reward points
                                </div>

                                <span className="roadmap-status">
                                    {status === "completed"
                                        ? "Completed"
                                        : status === "current"
                                            ? "Current level"
                                            : "Locked"}
                                </span>
                            </article>
                        );
                    })}
                </div>
            </div>

            <p className="roadmap-hint">
                ✨ Scroll horizontally to explore every milestone.
            </p>
        </section>
    );
}
