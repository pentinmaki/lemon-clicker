import { useEffect } from 'react';
import AppRouter from './components/AppRouter';
import items from './config/items.js';
import getPurchasableItems from './utils/getPurchasableItems';
import round from './utils/round';
import useLocalStorage from './utils/useLocalStorage';
import './App.css'

const saveVersion = 2;

const initialstats = {
  clicks: 0,
  balance: 0,
  increase: 1,
  itemstobuy: 0,
  upgrades: 0,
  collected: 0,
  version: saveVersion
};

const isValidNumber = (value) => Number.isFinite(value) && value >= 0;

const getItemPrice = (item, qty) =>
  Math.floor(item.baseprice * Math.pow(1.15, qty));

const countBuyableItems = (items, balance) => {
  let total = 0;
  getPurchasableItems(items).forEach(item => {
    if (item.price <= balance) total++;
  });
  return total;
};

const addDerivedStats = (currentStats, currentItems) => {
  const upgrades = currentItems.reduce((total, item) => total + item.qty, 0);
  const increase = round(
    1 + currentItems.reduce((total, item) => total + item.multiplier * item.qty, 0),
    1
  );

  return {
    ...currentStats,
    version: saveVersion,
    increase,
    upgrades,
    itemstobuy: countBuyableItems(currentItems, currentStats.balance),
  };
};

function App() {

  // Esitellään pelin laskennalliset alkuarvot.

  const migrateStats = (savedStats) => {
    if (!savedStats || typeof savedStats !== 'object') return initialstats;

    return {
      ...initialstats,
      clicks: isValidNumber(savedStats.clicks) ? savedStats.clicks : 0,
      balance: isValidNumber(savedStats.balance) ? savedStats.balance : 0,
      collected: isValidNumber(savedStats.collected) ? savedStats.collected : 0,
    };
  };

  const migrateItems = (savedItems) => {
    if (!Array.isArray(savedItems)) return items;

    return items.map((item, index) => {
      // Aiemmat tallennukset käyttivät eri tunnisteita,
      // mutta samassa järjestyksessä olevat rakennukset voidaan säilyttää.
      const savedItem = savedItems.find((candidate) => candidate?.id === item.id)
        ?? savedItems[index];
      const qty = Number.isInteger(savedItem?.qty) && savedItem.qty >= 0
        ? savedItem.qty
        : 0;

      return { ...item, qty, price: getItemPrice(item, qty) };
    });
  };

  // Luodaan taltio, johon tallennetaan pelin laskennalliset tiedot.
  const [stats, setStats, resetStats] = useLocalStorage(
    'lemon-stats', initialstats, migrateStats
  );

  // Luodaan taltio, johon tallennetaan tuotelista.
  const [storeitems, setStoreitems, resetStoreitems] = useLocalStorage(
    'lemon-items', items, migrateItems
  );

  // Korjaa myös vanhat tallennukset, joissa tuotanto jäi ostoksen verran jälkeen.
  useEffect(() => {
    setStats((currentStats) => addDerivedStats(currentStats, storeitems));
  }, [storeitems, setStats]);

  const handleClick = () => {
    setStats((currentStats) => {
      const newStats = {
        ...currentStats,
        clicks: currentStats.clicks + 1,
        balance: round(currentStats.balance + currentStats.increase, 1),
        collected: round(currentStats.collected + currentStats.increase, 1),
      };

      return addDerivedStats(newStats, storeitems);
    });
  }

  const handlePurchase = (id) => {
    // Etsitään tunnistetta vastaavan tuotteen indeksi taulukosta.
    const index = storeitems.findIndex(storeitem => storeitem.id === id);
    const item = storeitems[index];
    // Varmistetaan, että käyttäjällä on varaa ostaa tuote.
    if (item && stats.balance >= item.price) {
      const newstoreitems = storeitems.map((storeitem, itemIndex) => {
        if (itemIndex !== index) return storeitem;

        const qty = storeitem.qty + 1;
        return { ...storeitem, qty, price: getItemPrice(storeitem, qty) };
      });

      let newstats = {...stats};
      // Vähännetään varoista tuotteen hinta.
      newstats.balance = round(newstats.balance - item.price,1);
      newstats = addDerivedStats(newstats, newstoreitems);
      // Tallennetaan uudet tilamuuttujien arviot.
      setStoreitems(newstoreitems);
      setStats(newstats);
    }
  }

  const handleReset = () => {
    // Palautetaan taltiot alkuarvoihin.
    resetStats();
    resetStoreitems();
  }

  return (
    <AppRouter stats={stats}
               storeitems={storeitems}
               handleClick={handleClick}
               handlePurchase={handlePurchase}
               handleReset={handleReset} />
  )
}

export default App
