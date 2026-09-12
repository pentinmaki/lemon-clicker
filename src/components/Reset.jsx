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
        <h2>Erase your grimoire</h2>
        <p>Warning! This will erase all essence, tools, and workshop records.
           Your new apprenticeship will begin from the start.</p>
        <p>Type <span>{props.resetvalue}</span> below to continue.</p>
        <div>
          <input type="text"
                 value={value}
                 onChange={(e) => {setValue(e.target.value)}} />
        </div>
        <button disabled={props.resetvalue==value?false:true}
                onClick={handleReset}>Erase workshop records</button>
      </div>
    );
  } else { 
    return (
      <div className="reset">
        <button onClick={()=>{setShowForm(true)}}>Erase workshop records</button>
      </div>
    );
  }

}  
  
export default Reset;
