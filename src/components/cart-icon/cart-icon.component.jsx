import {
  CartIconContainer,
  CartIconCount,
  ShoppingIcon,
} from "./cart-icon.styles.jsx";
import { CartContext } from "../../contexts/cart.context";
import { useContext } from "react";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <CartIconCount>{cartCount}</CartIconCount>
    </CartIconContainer>
  );
};

export default CartIcon;
