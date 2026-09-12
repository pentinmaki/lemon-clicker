import shortenNumber from "../utils/shortenNumber";

function Stat(props) {
  return (
    <div className="stat">
      <div className="stat_heading">
        <span aria-hidden="true">{props.icon}</span>
        <h3>{props.title}</h3>
      </div>
      <p>{shortenNumber(props.value)}</p>
    </div>    
  )
}

export default Stat;
