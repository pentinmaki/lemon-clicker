import { useState } from 'react';

function Reset(props) {
    const [showForm, setShowForm] = useState(false);
    const [value, setValue] = useState("");
    const handleReset = () => {
        // Nollataan pelin tiedot ja tyhjennetään tekstikenttä.
        props.handleReset();
        setValue("");
      }
    


    if (showForm) {
        return (
            <div className="reset reset_box">
              <h2>Suoritustietojen poistaminen</h2>
              <p>Varoitus! Olet poistamassa kaikki,
                 mitä olet tähän mennessä kerännyt.
                 Jatkamalla tiedot nollautuvat ja peli alkaa
                 alusta.</p>
              <p>Kirjoita teksti <span>{props.resetvalue}</span> alla olevaan kenttään.</p>
              <div>
          <input type="text"
                 value={value}
                 onChange={(e) => {setValue(e.target.value)}} />
        </div>
        <button disabled={props.resetvalue==value?false:true}
                onClick={handleReset}>Poista suoritustiedot</button>

            </div>
          );
      
      } else { 
        return (
          <div className="reset">
            <button onClick={()=>{setShowForm(true)}}>Poista suoritustiedot</button>
          </div>
        );
      }
}    
  
  export default Reset;
  