import Header from '../components/Header';
import Reset from '../components/Reset';
import Stat from '../components/Stat';

function Settings(props) {
  return (
    <div className="container">   
      <Header balance={props.stats.balance}>settings</Header>
      <div className="scrollbox">
        <div className="settings">
          <h2>lemon stats</h2>
          <div>
            <Stat title="in bank" value={props.stats.balance} />
            <Stat title="per click" value={props.stats.increase} />
            <Stat title="collected" value={props.stats.collected} />
            <Stat title="clicks" value={props.stats.clicks} />
            <Stat title="upgrades" value={props.stats.upgrades} />
          </div>
        </div>
        <Reset resetvalue={props.stats.clicks}
               handleReset={props.handleReset} />
      </div>
    </div>
  );
}
  
export default Settings;