import {
  CartIconContainer,
  CartIconCount,
  ShoppingIcon,
} from "./cart-icon.styles.jsx";

import { useSelector, useDispatch } from "react-redux";

import {
  selectIsCartOpen,
  selectCartCount,
} from "../../store/cart/cart.selector.js";
import { setIsCartOpen } from "../../store/cart/cart.action.js";

const CartIcon = () => {
  const dispatch = useDispatch();

  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon />
      <CartIconCount>{cartCount}</CartIconCount>
    </CartIconContainer>
  );
};

export default CartIcon;
