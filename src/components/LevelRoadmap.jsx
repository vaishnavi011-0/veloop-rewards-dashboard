
import "../App.css";

const levels = [
    { level: 1, name: "Starter", xp: 0, reward: 50 },
    { level: 2, name: "Explorer", xp: 1000, reward: 75 },
    { level: 3, name: "Achiever", xp: 3000, reward: 100 },
    { level: 4, name: "Champion", xp: 5000, reward: 150 },
    { level: 5, name: "Elite", xp: 8000, reward: 200 },
    { level: 6, name: "Master", xp: 12000, reward: 250 },
    { level: 7, name: "Legend", xp: 18000, reward: 300 },
];

function BadgeEmblem({ level }) {
    const name = String(level).toLowerCase();

    const badgeColors = {
        starter: ["#8B4D27", "#FFD0A0"],
        explorer: ["#327EAD", "#D9F7FF"],
        achiever: ["#126BB3", "#9BEAFF"],
        champion: ["#A96A0A", "#FFE99A"],
        elite: ["#7760B8", "#F1E7FF"],
        master: ["#54249A", "#D4A6FF"],
        legend: ["#B87508", "#FFF3AD"],
    };

    const [dark, light] = badgeColors[name] || badgeColors.starter;
    const gradientId = `badge-metal-${name}`;

    const designs = {
        starter: (
            <>
                <path d="M32 5 53 15 49 42 32 57 15 42 11 15Z"
                    fill={`url(#${gradientId})`} stroke={light} strokeWidth="2" />
                <path d="M32 14 45 21 42 39 32 49 22 39 19 21Z"
                    fill={dark} stroke={light} strokeWidth="1.5" />
                <path d="M32 19 43 39 32 35 21 39Z" fill={light} />
                <path d="M26 42 32 36 38 42 32 49Z" fill="#FFFFFF" />
            </>
        ),

        explorer: (
            <>
                <circle cx="32" cy="32" r="26"
                    fill={`url(#${gradientId})`} stroke={light} strokeWidth="2" />
                <circle cx="32" cy="32" r="19"
                    fill={dark} stroke={light} strokeWidth="1.5" />
                <path d="M32 13 37 27 51 32 37 37 32 51 27 37 13 32 27 27Z"
                    fill={light} />
                <path d="M32 20 36 32 32 44 28 32Z" fill="#55DFFF" />
                <circle cx="32" cy="32" r="4" fill="#FFFFFF" />
            </>
        ),

        achiever: (
            <>
                <path d="M32 5 53 18 49 43 32 57 15 43 11 18Z"
                    fill={`url(#${gradientId})`} stroke={light} strokeWidth="2" />
                <path d="M32 13 45 22 42 40 32 49 22 40 19 22Z"
                    fill={dark} stroke={light} strokeWidth="1.5" />
                <path d="M36 15 23 34H31L27 48 42 27H34Z"
                    fill={light} />
                <path d="M36 15 31 31H37L27 48 42 27H34Z"
                    fill="#FFFFFF" fillOpacity=".55" />
            </>
        ),

        champion: (
            <>
                <path d="M32 4 54 16 51 43 32 58 13 43 10 16Z"
                    fill={`url(#${gradientId})`} stroke={light} strokeWidth="2" />
                <path d="M32 12 45 20 43 39 32 49 21 39 19 20Z"
                    fill={dark} stroke={light} strokeWidth="1.5" />
                <path d="M32 16 37 27 49 28 40 36 43 47 32 41 21 47 24 36 15 28 27 27Z"
                    fill={light} />
                <circle cx="32" cy="32" r="4" fill="#FFFFFF" />
            </>
        ),

        elite: (
            <>
                <path d="M32 4 54 16 50 43 32 58 14 43 10 16Z"
                    fill={`url(#${gradientId})`} stroke={light} strokeWidth="2" />
                <path d="M15 23 25 30 32 17 39 30 49 23 45 42H19Z"
                    fill={light} stroke="#FFFFFF" strokeWidth="1.5" />
                <path d="M20 45H44V49H20Z" fill="#FFFFFF" />
                <circle cx="15" cy="21" r="3" fill="#FFFFFF" />
                <circle cx="32" cy="15" r="3.5" fill="#FFFFFF" />
                <circle cx="49" cy="21" r="3" fill="#FFFFFF" />
            </>
        ),

        master: (
            <>
                <path d="M32 4 55 18 49 44 32 59 15 44 9 18Z"
                    fill={`url(#${gradientId})`} stroke={light} strokeWidth="2" />
                <path d="M32 12 45 22 42 40 32 50 22 40 19 22Z"
                    fill={dark} stroke={light} strokeWidth="1.5" />
                <path d="M32 17 43 32 32 47 21 32Z"
                    fill={light} stroke="#FFFFFF" strokeWidth="1.5" />
                <path d="M32 22 39 32 32 42 25 32Z" fill="#8E53D9" />
                <circle cx="32" cy="32" r="3" fill="#FFFFFF" />
            </>
        ),

        legend: (
            <>
                <path d="M32 3 39 15 53 11 49 26 59 35 44 40 44 54 32 47 20 54 20 40 5 35 15 26 11 11 25 15Z"
                    fill={`url(#${gradientId})`} stroke={light} strokeWidth="2" />
                <path d="M32 13 37 25 49 26 40 34 43 46 32 40 21 46 24 34 15 26 27 25Z"
                    fill={light} stroke="#FFFFFF" strokeWidth="1.5" />
                <path d="M32 20 36 31 32 38 28 31Z" fill="#FFFFFF" />
                <circle cx="32" cy="31" r="3" fill="#FFFFFF" />
            </>
        ),
    };

    return (
        <span className={`cyber-badge cyber-badge--${name}`}>
            <svg
                viewBox="0 0 64 64"
                className="cyber-badge__symbol"
                role="img"
                aria-label={`${level} achievement badge`}
            >
                <defs>
                    <linearGradient
                        id={gradientId}
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="1"
                    >
                        <stop offset="0%" stopColor={light} />
                        <stop offset="48%" stopColor={dark} />
                        <stop offset="100%" stopColor={light} />
                    </linearGradient>
                </defs>
                {designs[name] || designs.starter}
            </svg>
        </span>
    );
}

export default function LevelRoadmap({ currentLevel = 4 }) {
    const safeCurrentLevel = Math.max(
        1,
        Math.min(currentLevel, levels.length)
    );

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
                    {safeCurrentLevel}/{levels.length} levels
                </span>
            </div>

            <div className="roadmap-scroll">
                <div className="roadmap-track">
                    {levels.map((item) => {
                        const status =
                            item.level < safeCurrentLevel
                                ? "completed"
                                : item.level === safeCurrentLevel
                                    ? "current"
                                    : "locked";

                        return (
                            <article
                                className={`roadmap-level ${status}`}
                                key={item.level}
                                aria-current={
                                    status === "current" ? "step" : undefined
                                }
                            >
                                <div className="roadmap-level-top">
                                    <span className="roadmap-level-label">
                                        LEVEL {item.level}
                                    </span>

                                    <span
                                        className="roadmap-state"
                                        aria-label={status}
                                    >
                                        {status === "completed"
                                            ? "✓"
                                            : status === "current"
                                                ? "★"
                                                : "🔒"}
                                    </span>
                                </div>

                                <div className="roadmap-level-icon">
                                    <BadgeEmblem level={item.name} />
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
