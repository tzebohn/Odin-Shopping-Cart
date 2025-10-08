import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { CartProvider } from "../contexts/CartProvider";
import { Header } from "./Header";

describe("Header", () => {
    it("renders all main elements", () => {
        render(
            <BrowserRouter>
                <CartProvider>
                    <Header />
                </CartProvider>
            </BrowserRouter>
        )

        //screen.debug()
        expect(screen.getByText("hopEasy")).toBeInTheDocument()
        expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Products/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /Cart/i })).toBeInTheDocument();
    })

    it("displays correct badge count when cart has items", () => {

        const mockCart = [
            {
                "id": 1,
                "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                "price": 109.95,
                "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                "category": "men's clothing",
                "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
                "rating": {
                    "rate": 3.9,
                    "count": 120
                },
                "quantity": 1
            },
            {
                "id": 7,
                "title": "White Gold Plated Princess",
                "price": 9.99,
                "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
                "category": "jewelery",
                "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png",
                "rating": {
                    "rate": 3,
                    "count": 400
                },
                quantity: 13
            }
        ]

        render (
            <BrowserRouter>
                <CartProvider initialCart={mockCart}>
                    <Header />
                </CartProvider>
            </BrowserRouter>           
        )

        expect(screen.getByText("14")).toBeInTheDocument();
    })
})