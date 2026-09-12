import Header from '../components/Header';
import Item from '../components/Item';
import getPurchasableItems from '../utils/getPurchasableItems';
import useGame from '../hooks/useGame';

function Store() {
  const { stats, storeitems, handlePurchase } = useGame();

  // Muodostetaan renderöitävä tuotelista.
  const items = getPurchasableItems(storeitems).map(item => (
    <Item key={item.id}
          item={item}
          handlePurchase={handlePurchase}
          disabled={stats.balance < item.price} />
  ));

  return (
    <div className="container">
      <Header balance={stats.balance}>arcane market</Header>
      <div className="scrollbox items">
        {items}
      </div>
    </div>
  );
}

export default Store;
