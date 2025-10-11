import { useState } from "react"

export function OrderSummaryForm ({ totalPrice }) {
    const [shipping, setShipping] = useState("standard");
    const [promo, setPromo] = useState("") // Not used

    // Global tailwindcss  
    const buttonStyles = `bg-indigo-600 hover:bg-indigo-700 cursor-pointer p-2 text-white font-semibold`
    const inputStyles = `font-medium bg-white text-gray-500 p-2 focus:outline-none focus:ring-1 focus:ring-indigo-600`
    const labelStyles = `text-sm font-semibold`

    function handleChange (e) {
        const { name, value } = e.target

        if (name === "shippingMethod"){
            setShipping(value)
        } else if (name === "promoCode") {
            setPromo(value)
        }
    }

    const shippingCost = shipping === "standard" ? 5 : shipping === "express" ? 15 : 25

    const finalCost = totalPrice + shippingCost // TODO: Add promo code discount here

    // TODO: Submit form and navigate to checkout page
    function handleSubmit (e) {
        e.preventDefault()
        console.log("submitting checkout")
    }

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-4 mt-6">
                <label className={`${labelStyles}`} htmlFor="shippingMethod">SHIPPING</label>
                <select 
                    name="shippingMethod" 
                    id="shippingMethod"
                    value={shipping}
                    onChange={handleChange}
                    className={`${inputStyles} `}
                >
                    <option value="standard">Standard ($5)</option>
                    <option value="express">Express ($15)</option>
                    <option value="overnight">Overnight ($25)</option>
                </select>
            </div>

            <div className="flex flex-col gap-4">
                <label className={`${labelStyles}`} htmlFor="promoCode">PROMO CODE</label>
                <input 
                    type="text" 
                    id="promoCode" 
                    name="promoCode"
                    value={promo}
                    onChange={handleChange}
                    placeholder="Enter your code"
                    className={`${inputStyles}`}
                />
                <button type="button" onClick={() => console.log("TODO: Validate/Apply promo code")}className={`${buttonStyles} self-start px-6`}>APPLY</button>
            </div>

            <div className="w-full border-b border-gray-400 mt-6"></div>

            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">TOTAL COST</h3>
                <h3 className="text-sm font-semibold">{`$${finalCost.toFixed(2)}`}</h3>
            </div>

            <button type="submit" className={`${buttonStyles} w-full`}>CHECKOUT</button>
        </form>
    )
}