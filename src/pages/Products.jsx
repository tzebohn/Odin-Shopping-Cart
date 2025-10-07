import { useLoaderData } from "react-router-dom"

export function Products () {

    const products = useLoaderData();
    console.log(products)
    return (
        <main>
            <h1>Products Page</h1>
        </main>
    )
}