import { motion, AnimatePresence } from "framer-motion"
import { useMenu } from "../contexts/useMenu"
import { NavLink } from "react-router-dom"
import { IoMdClose } from "react-icons/io";

export function MenuOverlay () {

    const { menuOpen, toggleMenu, closeMenu } = useMenu()

    return (
        <AnimatePresence>
            {menuOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 h-[calc(100vh-8rem)] bg-gray-300/80 backdrop-blur-sm z-50"
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
                        <NavLink onClick={closeMenu} to={"/"} className="hover:border-2 border-gray-200">Home</NavLink>
                        <NavLink onClick={closeMenu} to={"/products"} className="hover:border-2 border-gray-200">Products</NavLink>
                        <NavLink onClick={closeMenu} to={"/cart"} className="hover:border-2 border-gray-200">Cart</NavLink>
                    </nav>


                </motion.div>
            )}
        </AnimatePresence>
    )
}