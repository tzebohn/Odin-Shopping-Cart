import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CartProvider } from "../contexts/CartProvider"
import { BrowserRouter } from "react-router-dom"
import { MemoryRouter } from "react-router-dom"
import { vi } from "vitest"
import { MenuProvider } from "../contexts/MenuProvider"


// Define mockNavigate *before* mocking the module
const mockNavigate = vi.fn()

// Mock react-router-dom safely
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Import after mocking
import { Cart } from "./Cart"

// Create a mock cart for testing 
const mockCart = [
    {
        "id": 2,
        "title": "Mens Casual Premium Slim Fit T-Shirts",
        "price": 22.3,
        "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
        "rating": {
            "rate": 4.1,
            "count": 259
        },
        "quantity": 1
    },
]

describe("Cart Page", () => {
    it("renders empty cart", () => {
        render(
            <BrowserRouter>
                <MenuProvider>
                    <CartProvider>
                        <Cart />
                    </CartProvider>
                </MenuProvider>
            </BrowserRouter>
        )
        
        expect(screen.getByText(/empty/i)).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /shop now/i })).toBeInTheDocument()
    })

    it("renders order summary", () => {
        render (
            <BrowserRouter>
                <MenuProvider>
                    <CartProvider initialCart={mockCart}>
                        <Cart />
                    </CartProvider>
                </MenuProvider>
            </BrowserRouter>           
        )

        expect(screen.getByText(/shopping cart/i)).toBeInTheDocument()
        expect(screen.getByText(/order summary/i)).toBeInTheDocument()
        expect(screen.getByText(/1 items/i)).toBeInTheDocument()
        expect(screen.getByText(/Mens Casual Premium Slim Fit T-Shirts/i)).toBeInTheDocument()
    })

    it("removes product when 'remove' is clicked", () => {
        render (
            <BrowserRouter>
                <MenuProvider>
                    <CartProvider initialCart={mockCart}>
                        <Cart />
                    </CartProvider>
                </MenuProvider>
            </BrowserRouter>           
        )

        // mockCart initially should have 1 item in cart
        expect(screen.getByText(/1 items/i)).toBeInTheDocument()

        const removeButton = screen.getByRole("button", { name: /remove/i })
        fireEvent.click(removeButton)

        // Empty screen should show after removing last item
        expect(screen.getByText(/empty/i)).toBeInTheDocument()
        expect(screen.getByRole("button", { name: /shop now/i })).toBeInTheDocument()
    })

    it("navigates to products page when 'Continue Shopping is clicked", () => {
        render (
            <MemoryRouter initialEntries={["/cart"]}>
                <MenuProvider>
                    <CartProvider initialCart={mockCart}>
                        <Cart />
                    </CartProvider>
                </MenuProvider>
            </MemoryRouter>
        )

        // Find Continue Shopping button
        const continueShoppingButton = screen.getByRole("button", { name: /continue shopping/i })
        fireEvent.click(continueShoppingButton)

        expect(mockNavigate).toHaveBeenCalledWith("/products")
    })

    it("navigates back to products page when 'SHOP NOW' is clicked", () => {
        render (
            <MemoryRouter initialEntries={["/cart"]}>
                <MenuProvider>
                    <CartProvider>
                        <Cart />
                    </CartProvider>
                </MenuProvider>
            </MemoryRouter>
        )

        // Empty screen when cart is empty
        expect(screen.getByText(/empty/i)).toBeInTheDocument()
        // Find SHOP NOW button
        const shopNowButton = screen.getByRole("button", { name: /shop now/i })
        expect(shopNowButton).toBeInTheDocument()

        fireEvent.click(shopNowButton)
        expect(mockNavigate).toHaveBeenCalledWith("/products")
    })

    // TODO: Tests for navigating to Checkout Page
})