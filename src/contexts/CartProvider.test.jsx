import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useCart } from "./useCart";
import { CartProvider } from "./CartProvider";

// A small test component to interact with CartProvider context
const TestComponent = () => {

    const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, totalQuantity } = useCart()

    return (
        <div>
            <button onClick={() => addToCart({ id: 1, name: "Test Item", price: 10 })}>Add</button>
            <button onClick={() => removeFromCart({ id: 1, name: "Test Item", price: 10 })}>Remove</button>
            <button onClick={() => increaseQuantity({ id: 1, name: "Test Item", price: 10 })}>Increase</button>
            <button onClick={() => decreaseQuantity({ id: 1, name: "Test Item", price: 10 })}>Decrease</button>

            <p data-testid="cart-length">{cart.length}</p>
            <p data-testid="total-quantity">{totalQuantity}</p>
        </div>
    )
}

describe("CartProvider", () => {
    it("adds an item to cart", () => {
        render (
            <CartProvider>
                <TestComponent />
            </CartProvider>
        )

        // Initially should be empty
        expect(screen.getByTestId("cart-length").textContent).toBe("0")
        expect(screen.getByTestId('total-quantity').textContent).toBe("0")

        fireEvent.click(screen.getByText('Add')) // Add item
        expect(screen.getByTestId('cart-length').textContent).toBe("1")
        expect(screen.getByTestId('total-quantity').textContent).toBe("1")

        fireEvent.click(screen.getByText('Add')) // Add same item again
        expect(screen.getByTestId('cart-length').textContent).toBe("1")
        expect(screen.getByTestId('total-quantity').textContent).toBe("2")
    })

    it("removes an item from cart", () => {
        render (
            <CartProvider>
                <TestComponent />
            </CartProvider>
        )

        fireEvent.click(screen.getByText("Remove")) // Remove item
        expect(screen.getByTestId('cart-length').textContent).toBe("0") // No items to remove

        fireEvent.click(screen.getByText('Add')) // Add item
        expect(screen.getByTestId('cart-length').textContent).toBe("1")
        expect(screen.getByTestId('total-quantity').textContent).toBe("1")

        fireEvent.click(screen.getByText("Remove")) // Remove the item
        expect(screen.getByTestId('cart-length').textContent).toBe("0")
        expect(screen.getByTestId('total-quantity').textContent).toBe("0")

        for (let i = 0; i < 10; i++) {
            fireEvent.click(screen.getByText('Add')) // Add 10 of the same item
        }
        expect(screen.getByTestId('cart-length').textContent).toBe("1")
        expect(screen.getByTestId('total-quantity').textContent).toBe("10")
        fireEvent.click(screen.getByText("Remove")) // Remove the item entirely
        expect(screen.getByTestId('cart-length').textContent).toBe("0")
        expect(screen.getByTestId('total-quantity').textContent).toBe("0")

    })

    it("increase and decreases quantity of item", () => {
        render (
            <CartProvider>
                <TestComponent />
            </CartProvider>
        )

        // Initially should be 0 because cart is empty, no products no increase/decrease
        fireEvent.click(screen.getByText("Increase"))
        expect(screen.getByTestId('cart-length').textContent).toBe("0")
        expect(screen.getByTestId('total-quantity').textContent).toBe("0")
        fireEvent.click(screen.getByText("Increase"))
        expect(screen.getByTestId('cart-length').textContent).toBe("0")
        expect(screen.getByTestId('total-quantity').textContent).toBe("0")

        fireEvent.click(screen.getByText('Add')) // Add initial item
        for (let i = 0; i < 10; i++) {
            fireEvent.click(screen.getByText('Increase')) // Increase 10 times
        }
        expect(screen.getByTestId('cart-length').textContent).toBe("1")
        expect(screen.getByTestId('total-quantity').textContent).toBe("11")     
        for (let i = 0; i < 5; i++) {
            fireEvent.click(screen.getByText('Decrease')) // Decrease 5 times
        }
        expect(screen.getByTestId('cart-length').textContent).toBe("1")
        expect(screen.getByTestId('total-quantity').textContent).toBe("6")
    })
})