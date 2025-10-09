import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CartProvider } from "../contexts/CartProvider";
import { ProductCard } from "./ProductCard";


const mockProduct = {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts",
    "price": 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
    "rating": {
        "rate": 4.1,
        "count": 259
    }
}

describe("ProductCard", () => {
    it("renders product details", () => {
        render (
            <CartProvider>
                <ProductCard product={mockProduct}/>
            </CartProvider>
        )

        // Expect to display the image, title, and price intitially
        expect(screen.getByText("Mens Casual Premium Slim Fit T-Shirts")).toBeInTheDocument()
        expect(screen.getByText("$22.3")).toBeInTheDocument()
        expect(screen.getByRole("img")).toHaveAttribute("src", "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png")
    })
    
    it("adds product to cart when clicked", () => {
        render (
            <CartProvider>
                <ProductCard product={mockProduct}/>
            </CartProvider>
        )

        const addToCartButton = screen.getByRole("button", { name: /add to cart/i })
        fireEvent.click(addToCartButton)

        expect(screen.getByText("1")).toBeInTheDocument()
    })

    it("removes product from cart when clicked", () => {
        render (
            <CartProvider>
                <ProductCard product={mockProduct}/>
            </CartProvider>
        )

        // Add product first because trashCanButton only appears when there is 1 quantity
        const addToCartButton = screen.getByRole("button", { name: /add to cart/i })
        fireEvent.click(addToCartButton)

        // Click the trashcan button
        const trashCanButton = screen.getByRole("button", { name: /remove item/i })
        fireEvent.click(trashCanButton)

        // Expect the addToCartButton to reappear when quantity is 0
        expect(screen.getByRole("button", {name: /add to cart/i })).toBeInTheDocument()
    })

    it("increases item quantity in cart", () => {
        render (
            <CartProvider>
                <ProductCard product={mockProduct}/>
            </CartProvider>
        )

        // Add product first because increaseQuantityButton only appears when product is already in cart
        const addToCartButton = screen.getByRole("button", { name: /add to cart/i })
        fireEvent.click(addToCartButton) 
        expect(screen.getByText("1")).toBeInTheDocument() // Should display 1 after initial add

        const increaseQuantityButton = screen.getByRole("button", { name: /increase quantity/i })
        fireEvent.click(increaseQuantityButton) // Add 1 
        expect(screen.getByText("2")).toBeInTheDocument()
        
        for (let i = 0; i < 10; i++) {fireEvent.click(increaseQuantityButton)} // Add 10 more items
        expect(screen.getByText("12")).toBeInTheDocument()
    })

    it("decreases item quantity in cart", () => {
        render (
            <CartProvider>
                <ProductCard product={mockProduct}/>
            </CartProvider>
        )
        
        // Add 2 items first because decreaseQuantityButton only appears when product has at least a quantity of 2
        const addToCartButton = screen.getByRole("button", { name: /add to cart/i })
        fireEvent.click(addToCartButton)
        const increaseQuantityButton = screen.getByRole("button", { name: /increase quantity/i })
        fireEvent.click(increaseQuantityButton) // Add 1 
        
        // Once product quantity is at least 2, the decreaseQuantityButton should appear
        expect(screen.getByRole("button", {name: /decrease quantity/i })).toBeInTheDocument()
        expect(screen.getByText("2")).toBeInTheDocument() 

        const decreaseQuantityButton = screen.getByRole("button", { name: /decrease quantity/i })
        fireEvent.click(decreaseQuantityButton) // Remove 1
        expect(screen.getByText("1")).toBeInTheDocument()

        // Add 10 more items
        for (let i = 0; i < 10; i++) {fireEvent.click(increaseQuantityButton)}
        expect(screen.getByText("11")).toBeInTheDocument()

        // Remove 6 items
        for (let i = 0; i < 6; i++) {fireEvent.click(decreaseQuantityButton)}
        expect(screen.getByText("5")).toBeInTheDocument()
    })
})