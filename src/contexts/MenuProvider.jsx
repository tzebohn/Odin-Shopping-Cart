import { useState } from "react";
import MenuContext from "./MenuContext";

export function MenuProvider ({ children }) {

    // USESTATES
    const [menuOpen, setMenuOpen] = useState(false) // Used to toggle menu
    
    // Function updates menuOpen state
    function toggleMenu () {
        setMenuOpen(prev => !prev)
    }

    /**
     * Closes menu after user clicks a NavLink in menu
     */
    function closeMenu () {
        setMenuOpen(false)
    }

    return (
        <MenuContext.Provider value={{ menuOpen, toggleMenu, closeMenu, setMenuOpen }}>
            {children}
        </MenuContext.Provider>
    )
}