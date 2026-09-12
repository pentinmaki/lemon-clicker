import Balance from '../components/Balance';
import Header from '../components/Header';
import Cauldron from '../components/Cauldron';
import useGame from '../hooks/useGame';

function Clicker() {
  const { stats, handleClick } = useGame();

  return (
    <div className="container clicker">
      <Header>{"witch's workshop"}</Header>
      <Balance total={stats.balance} />
      <Cauldron onClick={handleClick} value={stats.increase} />
    </div>
  );
}

export default Clicker;
