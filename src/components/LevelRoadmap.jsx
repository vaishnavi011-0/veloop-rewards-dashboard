import '../App.css';

const levels = [
    { level: 1, name: 'Starter', xp: 0 },
    { level: 2, name: 'Explorer', xp: 1000 },
    { level: 3, name: 'Achiever', xp: 3000 },
    { level: 4, name: 'Champion', xp: 5000 },
    { level: 5, name: 'Elite', xp: 8000 },
    { level: 6, name: 'Master', xp: 12000 },
    { level: 7, name: 'Legend', xp: 18000 },
];

export default function LevelRoadmap({ currentLevel = 4 }) {
    return (
        <section className="roadmap-card">
            <p className="eyebrow">YOUR JOURNEY</p>
            <h2>Level Roadmap</h2>
            <p className="muted">
                Every milestone brings you closer to bigger rewards.
            </p>

            <div className="roadmap-list">
                {levels.map((item) => (
                    <div className="roadmap-item" key={item.level}>
                        <div className={`roadmap-number ${item.level <= currentLevel ? 'completed' : ''
                            }`}>
                            {item.level <= currentLevel ? '✓' : '🔒'}
                        </div>

                        <div className="roadmap-info">
                            <h3>Level {item.level} — {item.name}</h3>
                            <p className="muted">{item.xp.toLocaleString()} XP required</p>
                        </div>

                        <span className="roadmap-status">
                            {item.level < currentLevel
                                ? 'Completed'
                                : item.level === currentLevel
                                    ? 'Current'
                                    : 'Locked'}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}