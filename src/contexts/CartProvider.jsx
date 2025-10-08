/**
 * @typedef {Object} Product
 * @property {string} category - Product category.
 * @property {string} description - Product description.
 * @property {number} id - Unique product ID.
 * @property {string} image - Image URL.
 * @property {number} price - Product price.
 * @property {{ rate: number, count: number }} rating - Product rating details.
 * @property {string} title - Product title.
 */

import { useState } from "react"
import CartContext from "./CartContext"

export function CartProvider({ children }) {
    // USESTATES
    const [cart, setCart] = useState([]) // List of items in cart

    /**
     * Adds a new product to the cart by updating the cart state.
     * @param {Product} product - The product to add.
     */
    function addToCart (product) {
        //console.log("Adding to cart")
        setCart(prevCart => {
            // Check if product exists
            const exists = prevCart.find(item => item.id === product.id)
            
            if (exists) {
                return prevCart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
            }
            return [...prevCart, {...product, quantity: 1}]
        })
    }

    /**
     * Removes an existing product by updating the cart state.
     * @param {Product} product - The product to remove. 
     */
    function removeFromCart (product) {
        //console.log("Removing from cart")
        setCart(prevCart => 
            prevCart.filter(item => item.id !== product.id)
        )
    }

    /**
     * Increases the quantity of a given product in the cart by 1.
     * @param {Product} product - The product whose quantity will be increased
     */
    function increaseQuantity (product) {
        //console.log("Increasing quantity")
        setCart(prevCart => 
            prevCart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
        )
    }

    /**
     * Decreases the quantity of a given product in the cart by 1.
     * @param {Product} product - The product whose quantity will be decreased.
     */
    function decreaseQuantity (product) {
        //console.log("Decreasing quantity")
        setCart(prevCart => 
            prevCart.map(item => item.id === product.id ? {...item, quantity: item.quantity - 1} : item)
        )
    }

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity }}>
            {children}
        </CartContext.Provider>
    )
}