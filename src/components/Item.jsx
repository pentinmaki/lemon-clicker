import shortenNumber from '../utils/shortenNumber';

function Item(props) {

  return (
    <button className={ props.disabled ? "item item-disabled" : "item" }
            type="button"
            disabled={props.disabled}
            onClick={() => { props.handlePurchase(props.item.id) }}
            aria-label={`Buy ${props.item.name}`}>
      <div className="item_icon" aria-hidden="true">{props.item.icon}</div>
      <div className="item_desc">
        {props.item.name}<br/>
        {shortenNumber(props.item.price)} essence
      </div>
      <div className="item_qty">{props.item.qty}</div>
    </button>
  );

}

export default Item;
