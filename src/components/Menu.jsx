import { NavLink } from "react-router-dom";
import iconLemon from '../assets/lemon.svg';
import iconPackage from '../assets/package.svg';
import iconSettings from '../assets/settings.svg';

function Menu(props) {

  return (
    <div className="menu">
      <div>
        <NavLink to="/"><img src={iconLemon} alt="main" /></NavLink>
      </div>
      <div>
        <NavLink to="/store">
          <img src={iconPackage} alt="store" />
          { props.items ? <span className="menu_badge">{props.items}</span> : null }
        </NavLink>
      </div>
      <div>
        <NavLink to="/settings"><img src={iconSettings} alt="settings" /></NavLink>
      </div>
    </div>
  );
  
}
  
export default Menu;
