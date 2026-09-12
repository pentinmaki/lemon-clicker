function Lemon(props) {
  return (
    <div className="cauldron">
      <button type="button" onClick={props.onClick} aria-label="Brew essence">
        <span aria-hidden="true">⚗️</span>
      </button>
    </div>
  );
}
  
export default Lemon;
