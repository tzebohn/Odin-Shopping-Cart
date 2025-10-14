/**
 * @typedef {Object} Product
 * @property {string} category - Product category.
 * @property {string} description - Product description.
 * @property {number} id - Unique product ID.
 * @property {string} image - Image URL.
 * @property {number} price - Product price.
 * @property {{ rate: number, count: number }} rating - Product rating details.
 * @property {string} title - Product title.
 */

import { useCart } from "../contexts/useCart"
import { IoMdAdd, IoIosArrowRoundBack } from "react-icons/io";
import { FaMinus } from "react-icons/fa";
import { TbMoodEmpty } from "react-icons/tb";
import { TfiBag } from "react-icons/tfi";
import React from "react";
import { OrderSummaryForm } from "../components/OrderSummaryForm";
import { useNavigate } from "react-router-dom";

export function Cart () {
    // USE CUSTOM HOOK
    const { cart, totalQuantity, increaseQuantity, decreaseQuantity, totalCost, removeFromCart } = useCart()

    // Used to navigate back to the products page
    const navigate = useNavigate();

    // Tailwind global css styling
    const iconStyles = `cursor-pointer text-[12px]`
    const header2Styles = `text-xs font-semibold text-gray-400`

    // Called when user clicks remove button
    function handleRemove (product) {
        removeFromCart(product)
    }

    return (
        <>
            {totalQuantity === 0 ? (
                <main className="h-[calc(100vh-8rem)] flex justify-center items-center">
                    <div className="flex flex-col items-center gap-6 p-4">
                    <div className="relative">
                        <TfiBag className="text-[200px] text-gray-800" />
                        <TbMoodEmpty className="absolute top-[55%] left-1/2 transform -translate-x-1/2 -translate-y-1 text-6xl text-gray-800" />
                    </div>
                        <h1 className="text-3xl font-semibold">Your Cart is <strong className="text-red-800 font-semibold">Empty!</strong></h1>
                        <p className="text-base font-medium text-gray-600">Looks like you haven't made your choice yet...</p>
                        <button 
                            onClick={() => navigate("/products")}
                            className="rounded-full text-white text-xl font-semibold bg-indigo-600 hover:bg-indigo-700 cursor-pointer p-2 px-6"
                        >
                            SHOP NOW
                        </button>
                    </div>
                </main>
            ) : (
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
                                            <button onClick={() => handleRemove(item)} className="self-start p-0 text-xs md:text-sm font-semibold text-gray-400 cursor-pointer">Remove</button>
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

                    <button onClick={() => navigate("/products")} className="flex items-center gap-1 mt-8 cursor-pointer text-indigo-600 hover:text-indigo-700">
                        <IoIosArrowRoundBack className={`text-3xl`}/>
                        <span className="font-semibold text-sm">Continue Shopping</span>
                    </button>
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
            )}
        </>
    )
}