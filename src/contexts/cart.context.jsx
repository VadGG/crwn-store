import { createContext, useEffect, useState } from "react";

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
    return cartItems.filter( (p) => p.id !== productToClear.id );
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

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce((sum, cartItem) => (sum += cartItem.quantity), 0)
    );
  }, [cartItems]);

  useEffect(() => {
    setTotalCost(
        cartItems.reduce( (sum, cartItem) => (sum += cartItem.price * cartItem.quantity), 0 )
    );
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const subItemFromCart = (productToSub) => {
    setCartItems(subCartItem(cartItems, productToSub));
  };

  const clearItemFromCart = (productToClear) => {
    setCartItems(clearCartItem(cartItems, productToClear));
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
