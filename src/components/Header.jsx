import shortenNumber from '../utils/shortenNumber';

function Header(props) {

  if (Object.hasOwn(props, "balance")) {
    return (
      <div className="header header_sub">
        <h1>{props.children}</h1>
        <div>{shortenNumber(props.balance)} <span aria-hidden="true">✦</span></div>
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
