import { useContext } from "react";
import CartContext from "./CartContext";

// Custom hook
export function useCart() {
    return useContext(CartContext)
}