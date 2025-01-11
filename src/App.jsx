import './App.css'
import { useState } from 'react';
import Clicker from './pages/Clicker';
import Menu from './components/Menu';


function App() {
      // Luodaan tilamuuttuja, johon tallennetaan pelin laskennalliset tiedot.
  const [stats, setStats] = useState({clicks: 0, balance: 0, increase: 1, itemstobuy: 0});

  const handleClick = () => {
    // Tehdään kopio stats-tilamuuttujasta.
    let newstats = {...stats}
    // Kasvatetaan napautusten lukumäärää yhdellä.
    newstats.clicks = newstats.clicks + 1;
    // Tallennetaan päivitetty stats-muuttuja.
    setStats(newstats); 
  }
  

  return (
    <div className="root">
      <div className="root_content">
        <Clicker stats={stats} handleClick={handleClick} />
      </div>
      <Menu items={stats.itemstobuy} />
    </div>
  )

}

export default App