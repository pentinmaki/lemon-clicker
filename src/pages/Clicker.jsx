import Balance from '../components/Balance';
import Header from '../components/Header';
import Cauldron from '../components/Cauldron';
import MagicEvent from '../components/MagicEvent';
import WorkshopSettings from '../components/WorkshopSettings';
import useGame from '../hooks/useGame';

function Clicker() {
  const { stats, handleClick, magicEvent, soundSettings, updateSoundSettings } = useGame();

  return (
    <div className="container clicker">
      <Header>{"witch's workshop"}</Header>
      <WorkshopSettings
        soundSettings={soundSettings}
        updateSoundSettings={updateSoundSettings}
      />
      <Balance total={stats.balance} />
      <div className="cauldron_area">
        <MagicEvent event={magicEvent} />
        <Cauldron
          onClick={handleClick}
          value={stats.increase}
          isMoonSurgeActive={Boolean(magicEvent)}
        />
      </div>
    </div>
  );
}

export default Clicker;
