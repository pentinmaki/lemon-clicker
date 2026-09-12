import { NavLink } from "react-router-dom";

function Menu(props) {

  return (
    <div className="menu">
      <div>
        <NavLink to="/" aria-label="Workshop"><span className="menu_symbol" aria-hidden="true">⚗️</span></NavLink>
      </div>
      <div>
        <NavLink to="/store" aria-label="Arcane market">
          <span className="menu_symbol" aria-hidden="true">🪄</span>
          { props.items ? <span className="menu_badge">{props.items}</span> : null }
        </NavLink>
      </div>
      <div>
        <NavLink to="/settings" aria-label="Grimoire"><span className="menu_symbol" aria-hidden="true">📜</span></NavLink>
      </div>
    </div>
  );
  
}
  
export default Menu;
