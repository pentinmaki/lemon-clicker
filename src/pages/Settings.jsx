import Header from '../components/Header';
import DailyQuest from '../components/DailyQuest';
import Prestige from '../components/Prestige';
import Reset from '../components/Reset';
import Stat from '../components/Stat';
import useGame from '../hooks/useGame';

function Settings() {
  const {
    stats,
    handleReset,
    handleClaimDailyQuest,
    handlePrestige,
    newMoonRequirement,
  } = useGame();

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
            <Stat icon="☾" title="moonstones" value={stats.moonstones} />
          </div>
          <DailyQuest quest={stats.dailyQuest} onClaim={handleClaimDailyQuest} />
          <Prestige
            balance={stats.balance}
            moonstones={stats.moonstones}
            rituals={stats.prestigeCount}
            onPrestige={handlePrestige}
            requirement={newMoonRequirement}
          />
        </div>
        <Reset resetvalue={stats.clicks}
               handleReset={handleReset} />
      </div>
    </div>
  );
}
  
export default Settings;
