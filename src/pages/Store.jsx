import Header from '../components/Header';
import Item from '../components/Item';

function Store(props) {
      // Muodostetaan renderöitävä tuotelista.
  const items = props.storeitems.map(item => <Item key={item.id} item={item} />);

  return (
    <div className="container">
      <Header balance={props.stats.balance}>store</Header>
      <div className="scrollbox items">
      {items}
      </div>
    </div>
  );
}

export default Store;
