import { useLoaderData } from "react-router-dom"
import { ProductCard } from "../components/ProductCard";

export function Products () {

    const products = useLoaderData(); // Array of product objects
    console.log(products)
    return (
        <main>
            <h1>Products Page</h1>

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