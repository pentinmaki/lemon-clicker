import './App.css'
import { useState } from 'react';
import Lemon from './components/Lemon';
import Balance from './components/Balance';
import Booster from './components/Booster';
import Header from './components/Header';
import Menu from './components/Menu';


function App() {
    // Luodaan tilamuuttuja, jossa tallennetaan napautusten määrä.
    const [clicks, setClicks] = useState(0);

    const handleClick = () => {
      // Kasvatetaan napautusten määrää yhdellä.
      setClicks(clicks + 1);
    }
  


    return (
      <div className="root">
        <div className="root_content">
          <div className="container clicker">
            <Header>lemon clicker</Header>
            <Balance total={clicks} />
            <Lemon onClick={handleClick} />
            <Booster value="3.2" />
          </div>
        </div>
        <Menu items={2} />
      </div>  
    )  
}

export default App