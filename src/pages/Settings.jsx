import Header from '../components/Header';
import Reset from '../components/Reset';
import Stat from '../components/Stat';
import useGame from '../hooks/useGame';

function Settings() {
  const { stats, handleReset } = useGame();

  return (
    <div className="container">   
      <Header balance={stats.balance}>grimoire</Header>
      <div className="scrollbox settings_scroll">
        <div className="settings">
          <div className="settings_intro">
            <span aria-hidden="true">✦</span>
            <div>
              <h2>workshop records</h2>
              <p>Your arcane progress, gathered in one place.</p>
            </div>
          </div>
          <div className="stats_grid">
            <Stat icon="✦" title="stored essence" value={stats.balance} />
            <Stat icon="⚗" title="per brew" value={stats.increase} />
            <Stat icon="☾" title="essence brewed" value={stats.collected} />
            <Stat icon="✧" title="brews" value={stats.clicks} />
            <Stat icon="📜" title="arcane tools" value={stats.upgrades} />
          </div>
        </div>
        <Reset resetvalue={stats.clicks}
               handleReset={handleReset} />
      </div>
    </div>
  );
}
  
export default Settings;
