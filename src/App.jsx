import './App.css'
import Lemon from './components/Lemon';
import Balance from './components/Balance';


function App() {

  return (
    <>
      <div>
        <Balance total="157" />
        <Lemon />
      </div>  
    </>
  )
}

export default App