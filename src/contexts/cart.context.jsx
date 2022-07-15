import { createContext, useEffect, useState } from "react"

const addCartItem = (cartItems, productToAdd) => {
    let foundItem = cartItems.find( (p) => p.id === productToAdd.id );
    if (foundItem) {

        foundItem.quantity = foundItem.quantity + 1;
        return cartItems.map( (p) => 
            p.id === productToAdd.id
            ? { ...p, quantity: p.quantity + 1 }
            : p
         );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
});

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect( () => {
        setCartCount(cartItems.reduce((sum, cartItem) => (sum += cartItem.quantity), 0));
    }, [cartItems] );

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    
    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount};


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

