import Header from '../components/Header';
import Reset from '../components/Reset';
import Stat from '../components/Stat';
import useGame from '../hooks/useGame';

function Settings() {
  const { stats, handleReset } = useGame();

  return (
    <div className="container">   
      <Header balance={stats.balance}>grimoire</Header>
      <div className="scrollbox">
        <div className="settings">
          <h2>workshop records</h2>
          <div>
            <Stat title="stored essence" value={stats.balance} />
            <Stat title="per brew" value={stats.increase} />
            <Stat title="essence brewed" value={stats.collected} />
            <Stat title="brews" value={stats.clicks} />
            <Stat title="arcane tools" value={stats.upgrades} />
          </div>
        </div>
        <Reset resetvalue={stats.clicks}
               handleReset={handleReset} />
      </div>
    </div>
  );
}
  
export default Settings;
