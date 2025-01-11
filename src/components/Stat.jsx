import shortenNumber from "../utils/shortenNumber";

function Stat(props) {
  return (
    <div className="stat">
      <h3>{props.title}</h3>
      <p>{shortenNumber(props.value)}</p>
    </div>
  )
}

export default Stat;
