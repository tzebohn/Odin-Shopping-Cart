import { FaShopify } from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import { useCart } from "../contexts/useCart";
import { IoCartOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useMenu } from "../contexts/useMenu";

export function Header () {

    // Locate what url path the user is on currently
    const location = useLocation()
    const showSearch = location.pathname !== "/" && location.pathname !== "/cart" // Only show search bar in products tab

    // CUSTOM HOOKS
    const { cart, totalQuantity } = useCart() 
    const { menuOpen, toggleMenu } = useMenu()

    /**
     * Gets called when user clicks Hamburger Icon.
     * Function updates menuOpen state. 
     */
    function handleMenu () {
        toggleMenu()
    }

    return (
        <div className="relative bg-[#1f0d33] text-[#e8e8e8] flex items-center justify-between px-8 py-8 h-32">
            {/* Left: Logo */}
            <div className="flex items-center">
                <FaShopify className="text-6xl"/>
                <h1 className="text-2xl font-semibold">hopEasy</h1>
            </div>

            {/* Middle: Conditional search bar */}
            {showSearch && 
            <form className="hidden sm:block">
                <input type="text" placeholder="Search ShopEasy"/>
            </form>
            }

            {/* Right: Navigation */}
            <nav className="hidden sm:flex items-center sm:gap-6 md:gap-8 lg:gap-12">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/products"}>Products</NavLink>
                <div className="flex items-center gap-4">
                    <NavLink to={"/cart"} className="relative">
                        <IoCartOutline className="cursor-pointer text-[30px]"/>
                        <span className="absolute -top-2 -right-3 bg-yellow-500 text-black text-xs font-bold rounded-full px-[6px] py-[2px]">{totalQuantity}</span>
                    </NavLink>
                    <NavLink to={"/cart"}>Cart</NavLink>
                </div>
            </nav>
            {/* Show Hamburger navigation icon when screen is small */}
            <button
                onClick={handleMenu}
                className="sm:hidden"
            >
                {menuOpen ? <IoMdClose className="text-[30px] cursor-pointer"/> : <RxHamburgerMenu className="text-[30px] cursor-pointer"/>}
            </button>


        </div>
    )
}