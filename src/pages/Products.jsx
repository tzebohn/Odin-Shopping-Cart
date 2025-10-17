import { useLoaderData } from "react-router-dom"
import { ProductCard } from "../components/ProductCard";
import { useMenu } from "../contexts/useMenu";
import { MenuOverlay } from "../components/MenuOverlay";
import { useProducts } from "../contexts/useProducts";

export function Products () {

    const products = useLoaderData(); // Array of product objects

    const { menuOpen } = useMenu()
    const { searchTerm } = useProducts()

    // Filter products based on searchTerm
    const filteredProducts = products.filter(p => {
        if (!searchTerm) return true 
        const term = searchTerm.toLowerCase()

        return (
            p.category.toLowerCase().includes(term) || 
            p.description.toLowerCase().includes(term)
        )
    })

    //console.log(filteredProducts)
    //console.log(products)
    return (
        <main className="relative p-8">
            
            {/* Toggle menu over page if menuOpen is true */}
            {menuOpen && <MenuOverlay />}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </main>
    )
}