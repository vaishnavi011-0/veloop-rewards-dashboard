import MiniGame from './components/MiniGame';
import { levelData } from './data/levels';
import LevelHero from './components/LevelHero';
import LevelRoadmap from './components/LevelRoadmap';
import EarningCards from './components/EarningCards';
import './App.css';


export default function App() {
  return (
    <main className="app-shell">
      <div className="dashboard-container">

        <header>
          <p className="eyebrow">VELOOP REWARDS</p>
          <h1>Your Rewards Dashboard</h1>
          <p className="muted">
            Track your progress and unlock new milestones.
          </p>
        </header>

        {/* Add the components below the header */}
        <LevelHero data={levelData} />

        <LevelRoadmap
          currentLevel={levelData.currentLevel}
        />

        <EarningCards />

        <MiniGame />

      </div>
    </main>

  );
}
