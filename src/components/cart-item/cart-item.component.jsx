import {CartItemContainer, CartItemImg, CartItemDetails, CartItemName, CartItemPrice} from "./cart-item.styles.jsx";

const CartItem = ({ cartItem }) => {
  const { name, imageUrl, quantity, price } = cartItem;
  return (
    <CartItemContainer>
      <CartItemImg src={imageUrl} alt={`${name}`} />
      <CartItemDetails className="item-details">
        <CartItemName>{name}</CartItemName>
        <CartItemPrice >{quantity} x ${price}</CartItemPrice>
      </CartItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
