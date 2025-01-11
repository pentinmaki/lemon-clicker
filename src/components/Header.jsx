import iconLemon from '../assets/lemon.svg';

function Header(props) {

    if (props.hasOwnProperty("balance")) {
        return (
          <div className="header header_sub">
            <h1>{props.children}</h1>
            <div>{props.balance} <img src={iconLemon}/></div>
          </div>
        );
      } else {
        return (
          <div className="header">
            <h1>{props.children}</h1>
          </div>
        );
      }
    }
  
  export default Header;
  