import "./checkout-item.styles.scss";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { subItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext);
   
  const onIncrementHandler = () => addItemToCart(cartItem);
  const onDecrementHandler = () => subItemFromCart(cartItem);
  const onDeleteHandler = () => clearItemFromCart(cartItem);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <div className="quantity">
        <div className="arrow" onClick={onDecrementHandler}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={onIncrementHandler}>&#10095;</div>
      </div>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={onDeleteHandler}>&#10005;</div>
    </div>
  );
};

export default CheckoutItem;
