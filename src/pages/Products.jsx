import { useLoaderData } from "react-router-dom"
import { ProductCard } from "../components/ProductCard";
import { useMenu } from "../contexts/useMenu";
import { MenuOverlay } from "../components/MenuOverlay";

export function Products () {

    const products = useLoaderData(); // Array of product objects

    const { menuOpen } = useMenu()

    //console.log(products)
    return (
        <main className="px-8 pt-40 pb-8">
            
            {/* Toggle menu over page if menuOpen is true */}
            {menuOpen && <MenuOverlay />}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map(product => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </main>
    )
}