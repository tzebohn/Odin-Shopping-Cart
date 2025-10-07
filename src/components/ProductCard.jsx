import { useCart } from "../contexts/useCart"
import { SlTrash } from "react-icons/sl";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa";

export function ProductCard ({ product }) {
    // CUSTOM HOOKS
    const { cart, addToCart } = useCart()

    // Check if product exists in the cart
    const inCart = cart.find(item => item.id === product.id) // Returns the item object or undefined

    // Tailwind global css styling
    const iconStyles = `cursor-pointer`

    // Called when user presses Add to cart button
    function handleAdd () {
        addToCart(product)
    }

    return (
        <article className="bg-white shadow-sm rounded-xl overflow-hidden transition-shadow hover:shadow-lg">
            <img src={`${product.image}`} alt={`${product.image}`} className="object-contain h-48 w-full" loading="lazy"/>

            <div className="flex flex-col p-4 gap-2">
                <h2 className="truncate font-semibold md:text-lg lg:text-xl">{product.title}</h2>
                <p className="font-medium text-gray-700">{`$${product.price}`}</p>
                {!inCart ? (
                    <button onClick={handleAdd} className="bg-yellow-300 hover:bg-yellow-400 rounded-full cursor-pointer p-2 px-4 md:self-start md:w-auto">Add to cart</button>
                ) : (
                    <div className="flex items-center justify-between gap-4 border-2 border-yellow-300 rounded-full p-2 px-4 md:self-start md:w-auto">
                        <button>{inCart.quantity === 1 ? <SlTrash className={`${iconStyles} scale-[0.90]`}/> : <FaMinus className={`${iconStyles} scale-[0.85]`}/>}</button>
                        <p>{inCart.quantity}</p>
                        <button onClick={handleAdd}><IoMdAdd className={`${iconStyles}`}/></button>
                    </div>
                )}
            </div>
        </article>
    )
}