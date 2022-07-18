import {ItemContainer, ImageContainer, NameField, QuantityField, PriceField, RemoveButton} from "./checkout-item.styles.jsx";

import { useSelector, useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart, clearItemFromCart } from "../../store/cart/cart.action.js";
import { selectCartItems } from "../../store/cart/cart.selector.js";

const CheckoutItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const { name, imageUrl, price, quantity } = cartItem;
   
  const onIncrementHandler = () => dispatch( addItemToCart(cartItems, cartItem) ) ;
  const onDecrementHandler = () => dispatch( removeItemFromCart(cartItems, cartItem) );
  const onDeleteHandler = () => dispatch( clearItemFromCart(cartItems, cartItem));

  return (
    <ItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <NameField>{name}</NameField>
      <QuantityField>
        <div className="arrow" onClick={onDecrementHandler}>&#10094;</div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={onIncrementHandler}>&#10095;</div>
      </QuantityField>
      <PriceField>{price}</PriceField>
      <RemoveButton onClick={onDeleteHandler}>&#10005;</RemoveButton>
    </ItemContainer>
  );
};

export default CheckoutItem;
