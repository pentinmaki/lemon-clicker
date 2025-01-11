import './App.css'
import { useState } from 'react';
import AppRouter from './components/AppRouter';
import items from './config/items.js';


function App() {
  // Luodaan tilamuuttuja, johon tallennetaan tuotelista.
  const [storeitems,setStoreitems] = useState(items);

      // Luodaan tilamuuttuja, johon tallennetaan pelin laskennalliset tiedot.
  const [stats, setStats] = useState({clicks: 0, balance: 0, increase: 1, itemstobuy: 0});

  const handleClick = () => {
    // Tehdään kopio stats-tilamuuttujasta.
    let newstats = {...stats}
    // Kasvatetaan napautusten lukumäärää yhdellä.
    newstats.clicks = newstats.clicks + 1;
        // Kasvataan sitruunoiden määrää kasvatusarvolla.
        newstats.balance = newstats.balance + newstats.increase;
    // Tallennetaan päivitetty stats-muuttuja.
    setStats(newstats); 
  }

  const handlePurchase = (id) => {
    // Etsitään tunnistetta vastaavan tuotteen indeksi taulukosta.
    const index = storeitems.findIndex(storeitem => storeitem.id == id);
    // Varmistetaan, että käyttäjällä on varaa ostaa tuote.
    if (stats.balance >= storeitems[index].price) {
      // Tehdään kopiot tilamuuttujista.
      let newstoreitems = [...storeitems];
      let newstats = {...stats};
      // Kasvatetaan tuotteiden määrää yhdellä.
      newstoreitems[index].qty++;
      // Vähännetään varoista tuotteen hinta.
      newstats.balance = newstats.balance - newstoreitems[index].price;
      // TODO Uusi tuotehinta
      // Tallennetaan uudet tilamuuttujien arviot.
      setStoreitems(newstoreitems);
      setStats(newstats);
    }
  }
  

  return (
    <AppRouter stats={stats} 
    storeitems={storeitems} 
    handleClick={handleClick} 
    handlePurchase={handlePurchase} />

  )



}

export default App