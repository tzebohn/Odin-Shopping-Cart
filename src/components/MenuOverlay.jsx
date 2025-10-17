import { motion, AnimatePresence } from "framer-motion"
import { useMenu } from "../contexts/useMenu"
import { NavLink, useLocation } from "react-router-dom"
import { IoMdClose } from "react-icons/io";
import { SearchBar } from "./SearchBar";
import { useEffect } from "react";

export function MenuOverlay () {

    const { menuOpen, toggleMenu, closeMenu, setMenuOpen } = useMenu()

    // Locate what url path the user is on currently
    const location = useLocation()
    const showSearch = location.pathname !== "/" && location.pathname !== "/cart"

    // Prevents scrolling when MenuOverlay is on top of page
    useEffect(() => {
        // Lock scroll
        document.body.style.overflow = 'hidden';

        return () => {
            // Restore scroll on unmount
            document.body.style.overflow = '';
        };
    }, []);

    // Automatically closes MenuOverlay on screen widths that are greater or equal to 640px
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 640 && menuOpen) {
            setMenuOpen(false);
            }
        };

        // Close if already resized when component mounts
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [menuOpen, setMenuOpen]);

    if (!menuOpen) return null;
    
    return (
        <AnimatePresence>
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-gray-300/80 backdrop-blur-sm z-50"
                >
                    {/* Close button */}
                    <button 
                        onClick={toggleMenu}
                        className="absolute top-6 right-6 cursor-pointer"
                    >
                        <IoMdClose className="text-2xl"/> 
                    </button>

                    {/* Menu links */}
                    <nav className="flex flex-col items-center justify-center h-full gap-24 text-2xl border">
                        {showSearch && <SearchBar className="text-black text-lg font-medium"/>}
                        <NavLink onClick={closeMenu} to={"/"} className="hover:border-2 border-black">Home</NavLink>
                        <NavLink onClick={closeMenu} to={"/products"} className="hover:border-2 border-black">Products</NavLink>
                        <NavLink onClick={closeMenu} to={"/cart"} className="hover:border-2 border-black">Cart</NavLink>
                    </nav>


                </motion.div>
            )}
        </AnimatePresence>
    )
}