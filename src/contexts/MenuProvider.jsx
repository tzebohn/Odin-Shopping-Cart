import { useState } from "react";
import MenuContext from "./MenuContext";

export function MenuProvider ({ children }) {

    // USESTATES
    const [menuOpen, setMenuOpen] = useState(false) // Used to toggle menu
    
    // Function updates menuOpen state
    function toggleMenu () {
        setMenuOpen(prev => !prev)
    }

    return (
        <MenuContext.Provider value={{ menuOpen, toggleMenu }}>
            {children}
        </MenuContext.Provider>
    )
}