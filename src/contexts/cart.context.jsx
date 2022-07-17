import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

const addCartItem = (cartItems, productToAdd) => {
  let foundItem = cartItems.find((p) => p.id === productToAdd.id);
  if (foundItem) {
    return cartItems.map((p) =>
      p.id === productToAdd.id ? { ...p, quantity: p.quantity + 1 } : p
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const clearCartItem = (cartItems, productToClear) => {
  return cartItems.filter((p) => p.id !== productToClear.id);
};

const subCartItem = (cartItems, productToSub) => {
  let foundItem = cartItems.find((p) => p.id === productToSub.id);
  if (!foundItem) {
    return cartItems;
  }

  if (foundItem.quantity === 1) {
    return clearCartItem(cartItems, productToSub);
  }

  return cartItems.map((p) =>
    p.id === productToSub.id ? { ...p, quantity: p.quantity - 1 } : p
  );
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  subItemFromCart: () => {},
  cartCount: 0,
  clearItemFromCart: () => {},
  totalCost: 0,
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  totalCost: 0,
};

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in the cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, totalCost } = state;

  const updateCartItemReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (sum, cartItem) => (sum += cartItem.quantity),
      0
    );

    const newTotalCost = newCartItems.reduce(
      (sum, cartItem) => (sum += cartItem.price * cartItem.quantity),
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        totalCost: newTotalCost,
      })
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems);
  };

  const subItemFromCart = (productToSub) => {
    const newCartItems = subCartItem(cartItems, productToSub);
    updateCartItemReducer(newCartItems);
  };

  const clearItemFromCart = (productToClear) => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    updateCartItemReducer(newCartItems);
  };

  const setIsCartOpen = (newIsCartOpen) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, newIsCartOpen));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    subItemFromCart,
    cartCount,
    clearItemFromCart,
    totalCost,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
