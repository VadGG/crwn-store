import { createAction } from "../../utils/reducer/reducer.utils";

import { CART_ACTION_TYPES } from "./cart.types";


const _addCartItem = (cartItems, productToAdd) => {
    let foundItem = cartItems.find((p) => p.id === productToAdd.id);
    if (foundItem) {
      return cartItems.map((p) =>
        p.id === productToAdd.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    }
  
    return [...cartItems, { ...productToAdd, quantity: 1 }];
  };
  
  const _clearCartItem = (cartItems, productToClear) => {
    return cartItems.filter((p) => p.id !== productToClear.id);
  };
  
  const _subCartItem = (cartItems, productToSub) => {
    let foundItem = cartItems.find((p) => p.id === productToSub.id);
    if (!foundItem) {
      return cartItems;
    }
  
    if (foundItem.quantity === 1) {
      return _clearCartItem(cartItems, productToSub);
    }
  
    return cartItems.map((p) =>
      p.id === productToSub.id ? { ...p, quantity: p.quantity - 1 } : p
    );
  };
  
export const setCartItems = (cartItems) =>
  createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);

export const addItemToCart = (cartItems, productToAdd) => 
  setCartItems( _addCartItem(cartItems, productToAdd) );

export const removeItemFromCart = (cartItems, productToAdd) => 
  setCartItems( _subCartItem(cartItems, productToAdd) );

export const clearItemFromCart = (cartItems, productToAdd) => 
  setCartItems( _clearCartItem(cartItems, productToAdd) );

export const setIsCartOpen = (isCartOpen) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);

