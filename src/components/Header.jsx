import { FaShopify } from "react-icons/fa";
import { NavLink } from "react-router-dom";
export function Header () {
    return (
        <div className="bg-[#1f0d33] text-[#e8e8e8] flex items-center justify-between px-8 py-8">
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
                <FaShopify className="text-6xl"/>
                <h1>EasyCart</h1>
            </div>

            {/* Middle: Search bar */}
            <form>
                <input type="text" placeholder="Search EasyCart"/>
            </form>

            {/* Right: Navigation */}
            <nav className="flex gap-6">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/products"}>Products</NavLink>
                <NavLink to={"/cart"}>Cart</NavLink>
            </nav>
        </div>
    )
}