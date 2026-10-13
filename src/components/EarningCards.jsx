
import { useState } from 'react';
import '../App.css';

const opportunities = [
    {
        id: 1,
        icon: '🧩',
        title: 'Complete a Quiz',
        description: 'Test your knowledge and complete a fun challenge.',
        xp: 150,
        ves: 25,
        category: 'QUICK CHALLENGE',
    },
    {
        id: 2,
        icon: '🎯',
        title: 'Daily Check-in',
        description: 'Build your streak by checking in every day.',
        xp: 50,
        ves: 10,
        category: 'DAILY TASK',
    },
    {
        id: 3,
        icon: '🎮',
        title: 'Play a Mini-Game',
        description: 'Play a quick game and aim for a high score.',
        xp: 200,
        ves: 40,
        category: 'GAME ZONE',
    },
];

export default function EarningCards() {
    const [selectedTask, setSelectedTask] = useState(null);

    return (
        <section className="earning-section">
            <div className="earning-heading">
                <div>
                    <p className="eyebrow">EARN MORE REWARDS</p>
                    <h2>Opportunities for you</h2>
                    <p className="muted">
                        Small actions. New milestones. More reasons to play.
                    </p>
                </div>
                <span className="earning-heading-icon">✦</span>
            </div>

            <div className="earning-grid">
                {opportunities.map((task) => (
                    <article className="earning-card" key={task.id}>
                        <div className="earning-card-top">
                            <span className="earning-icon" aria-hidden="true">
                                {task.icon}
                            </span>
                            <span className="earning-category">
                                {task.category}
                            </span>
                        </div>

                        <h3>{task.title}</h3>
                        <p className="muted earning-description">
                            {task.description}
                        </p>

                        <div className="earning-rewards">
                            <span>⚡ {task.xp} XP</span>
                            <span>✦ {task.ves} VEs</span>
                        </div>

                        <button
                            className="earning-button"
                            type="button"
                            onClick={() => setSelectedTask(task)}
                        >
                            Explore opportunity <span aria-hidden="true">→</span>
                        </button>
                    </article>
                ))}
            </div>

            {selectedTask && (
                <div className="task-message" role="status">
                    <div>
                        <strong>{selectedTask.title}</strong>
                        <p>
                            This is a demo opportunity. Rewards are previews only;
                            no XP or VEs have been added.
                        </p>
                    </div>
                    <button
                        type="button"
                        className="task-close"
                        onClick={() => setSelectedTask(null)}
                        aria-label="Close opportunity details"
                    >
                        ✕
                    </button>
                </div>
            )}
        </section>
    );
}