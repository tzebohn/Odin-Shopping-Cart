import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]) // List of items in cart

    // TODO: addToCart, removeFromCart, increaseQuantity, decreaseQuantity functions

    return (
        <CartContext.Provider value={{ cart, setCart }}>
            {children}
        </CartContext.Provider>
    )
}
