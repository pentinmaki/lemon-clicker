import Balance from '../components/Balance';
import Booster from '../components/Booster';
import Header from '../components/Header';
import Lemon from '../components/Lemon';

function Clicker(props) {
  return (
    <div className="container clicker">
      <Header>lemon clicker</Header>
      <Balance total={props.stats.balance} />
      <Lemon onClick={props.handleClick} />
      <Booster value={props.stats.increase} />
    </div>
  );
}

export default Clicker;
