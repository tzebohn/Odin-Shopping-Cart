import { useCart } from "../contexts/useCart"
import { IoMdAdd, IoIosArrowRoundBack } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import React from "react";
import { OrderSummaryForm } from "../components/OrderSummaryForm";

export function Cart () {
    // USE CUSTOM HOOK
    const { cart, totalQuantity, increaseQuantity, decreaseQuantity, totalCost } = useCart()

    // Tailwind global css styling
    const iconStyles = `cursor-pointer text-[12px]`
    const header2Styles = `text-xs font-semibold text-gray-400`

    return (
        <main className="grid grid-cols-1 md:grid-cols-[2fr_1fr] h-[calc(100vh-8rem)]">
            {/* Left Column */}
            <section className="p-10">
                <div className="flex flex-col items-center">
                    <div className="w-full flex items-center justify-between">
                        <h1 className="font-bold text-xl sm:text-2xl">Shopping Cart</h1>
                        <h1 className="font-bold text-xl sm:text-2xl">{`${totalQuantity} Items`}</h1>
                    </div>

                    <div className="w-full border-b border-gray-300 mt-6"></div>

                    {/* Product details container */}
                    <div className="w-full grid grid-cols-[2fr_1fr_1fr_1fr] place-items-center gap-6 overflow-hidden pt-10">
                        <h2 className={header2Styles}>PRODUCT DETAILS</h2>
                        <h2 className={header2Styles}>QUANTITY</h2>
                        <h2 className={header2Styles}>PRICE</h2>
                        <h2 className={header2Styles}>TOTAL</h2>
                        
                        {/* Display each item */}
                        {cart.map(item => (
                            <React.Fragment key={item.id}>
                                <div className="w-full flex items-center">
                                    <img src={item.image} alt={item.image} className="w-full object-contain h-10 sm:h-20"/>
                                    <div className="w-full flex flex-col gap-1">
                                        <h3 className="text-xs md:text-sm font-semibold">{item.title}</h3>
                                        <p className="text-xs md:text-sm font-semibold text-gray-400">{item.category}</p>
                                        <button onClick={() => console.log("remove item", item)} className="self-start p-0 text-xs md:text-sm font-semibold text-gray-400 cursor-pointer">Remove</button>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-evenly">
                                    <button onClick={() => decreaseQuantity(item)}>
                                        <FaMinus className={`${iconStyles} scale-[0.85]`}/>
                                    </button>
                                    <p className="border-2 border-gray-300 px-2 text-xs sm:text-sm">{item.quantity}</p>
                                    <button onClick={() => increaseQuantity(item)}>
                                        <IoMdAdd className={`${iconStyles}`}/>
                                    </button>
                                </div>
                                <p className="text-xs sm:text-sm font-semibold">{`$${item.price.toFixed(2)}`}</p>
                                <p className="text-xs sm:text-sm font-semibold">{`$${(item.price * item.quantity).toFixed(2)}`}</p>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div onClick={() => console.log("go back to products page")}className="inline-flex items-center gap-1 mt-8 cursor-pointer">
                    <IoIosArrowRoundBack className={`text-3xl text-blue-700`}/>
                    <span className="font-semibold text-sm text-blue-700">Continue Shopping</span>
                </div>
            </section>

            {/* Right Column */}
            <section className="bg-gray-200 flex flex-col items-center p-10">
                <h1 className="w-full text-xl font-bold">Order Summary</h1>

                <div className="w-full border-b border-gray-400 mt-6"></div>
                
                <div className="w-full flex items-center justify-between mt-10">
                    <h3 className="text-sm font-semibold">{`ITEMS ${cart.length}`}</h3>
                    <h3 className="text-sm font-semibold">{`$${totalCost.toFixed(2)}`}</h3>
                </div>

                <OrderSummaryForm totalPrice={totalCost}/>
            </section>
        </main>
    )
}