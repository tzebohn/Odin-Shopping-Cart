import { useState } from "react";
import ProductContext from "./ProductContext";

export function ProductProvider ({ children }) {

    // USESTATES
    const [searchTerm, setSearchTerm] = useState("") // String of user's searchbar input

    return (
        <ProductContext.Provider value={{ searchTerm, setSearchTerm }}>
            {children}
        </ProductContext.Provider>
    )
}