import './App.css'
import { useState } from 'react';
import AppRouter from './components/AppRouter';
import items from './config/items.js';
import round from './utils/round';
import getPurchasableItems from './utils/getPurchasableItems';

function App() {

  // Luodaan tilamuuttuja, johon tallennetaan tuotelista.
  const [storeitems,setStoreitems] = useState(items);

      // Esitellään pelin laskennalliset alkuarvot.
  const initialstats = {
    clicks: 0,
    balance: 0,
    increase: 1,
    itemstobuy: 0,
    upgrades: 0,
    collected: 0
  }

  // Luodaan tilamuuttuja, johon tallennetaan pelin laskennalliset tiedot.
  const [stats, setStats] = useState(initialstats);
  const handleClick = () => {
    // Tehdään kopio stats-tilamuuttujasta.
    let newstats = {...stats}
    // Kasvatetaan napautusten lukumäärää yhdellä.
    newstats.clicks = newstats.clicks + 1;
        // Kasvataan sitruunoiden määrää kasvatusarvolla.
        newstats.balance = round(newstats.balance + newstats.increase,1);

          // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
  newstats.itemstobuy = countBuyableItems(storeitems,newstats.balance);
    // Kasvatetaan sitruunoiden keräysmäärää.
    newstats.collected = round(newstats.collected + newstats.increase,1);

    // Tallennetaan päivitetty stats-muuttuja.
    setStats(newstats); 
  }

  const handlePurchase = (id) => {
    // Etsitään tunnistetta vastaavan tuotteen indeksi taulukosta.
    const index = storeitems.findIndex(storeitem => storeitem.id == id);
    // Varmistetaan, että käyttäjällä on varaa ostaa tuote.
    newstats.balance = round(newstats.balance - newstoreitems[index].price,1);
    {

          // Lasketaan ostettavissa olevien tuotteiden lukumäärä.
          newstats.itemstobuy = countBuyableItems(newstoreitems,newstats.balance);

      // Tehdään kopiot tilamuuttujista.
      let newstoreitems = [...storeitems];
      let newstats = {...stats};
      // Kasvatetaan tuotteiden määrää yhdellä.
      newstoreitems[index].qty++;
      // Vähännetään varoista tuotteen hinta.
      newstats.balance = newstats.balance - newstoreitems[index].price;
            // Lasketaan tuotteen uusi hinta.
            newstoreitems[index].price =
            Math.floor(newstoreitems[index].baseprice * Math.pow(1.15,newstoreitems[index].qty));
                // Koostemuuttujien esittely.
      let increase = 1;
      let upgrades = 0;
      // Käydään tuotteet yksitellen lävitse.
      for (let i=0; i<storeitems.length; i++) {
        // Lisätään tuotteiden määrä kokonaismäärään.
        upgrades = upgrades + storeitems[i].qty;
        // Lisätään tuotteen vaikutus kasvatusarvoon.
        increase = increase + storeitems[i].multiplier*storeitems[i].qty;
      }
      // Tallennetaan lasketut koostearvot.
      newstats.increase = increase;
      newstats.upgrades = upgrades;

    
      // Tallennetaan uudet tilamuuttujien arviot.
      setStoreitems(newstoreitems);
      setStats(newstats);
    }
  }

    // Laskee niiden tuotteiden lukumäärän, joiden ostamiseen on varaa.
    const countBuyableItems = (items, balance) => {
      let total = 0;
      getPurchasableItems(items).forEach(item => {
        if (item.price <= balance) total++;
      });
      return total;
    }
  
  

  return (
    <AppRouter stats={stats} 
    storeitems={storeitems} 
    handleClick={handleClick} 
    handlePurchase={handlePurchase} />

  )



}

export default App