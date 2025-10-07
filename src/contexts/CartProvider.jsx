import { useState } from "react"
import CartContext from "./CartContext"

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]) // List of items in cart

    // TODO: addToCart, removeFromCart, increaseQuantity, decreaseQuantity functions
    function addToCart (product) {
        console.log("Adding to cart")
        setCart(prevCart => {
            // Check if product exists
            const exists = prevCart.find(item => item.id === product.id)
            
            if (exists) {
                return prevCart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
            }
            return [...prevCart, {...product, quantity: 1}]
        })
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}