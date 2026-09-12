import Balance from '../components/Balance';
import Booster from '../components/Booster';
import Header from '../components/Header';
import Lemon from '../components/Lemon';
import useGame from '../hooks/useGame';

function Clicker() {
  const { stats, handleClick } = useGame();

  return (
    <div className="container clicker">
      <Header>{"witch's workshop"}</Header>
      <Balance total={stats.balance} />
      <Lemon onClick={handleClick} />
      <Booster value={stats.increase} />
    </div>
  );
}

export default Clicker;
