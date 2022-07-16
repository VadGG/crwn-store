import {ItemContainer, ImageContainer, NameField, QuantityField, PriceField, RemoveButton} from "./checkout-item.styles.jsx";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const { subItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext);
   
  const onIncrementHandler = () => addItemToCart(cartItem);
  const onDecrementHandler = () => subItemFromCart(cartItem);
  const onDeleteHandler = () => clearItemFromCart(cartItem);

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
