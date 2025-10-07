export function ProductCard ({ product }) {
    return (
        <article className="bg-white shadow-sm rounded-xl overflow-hidden transition-shadow hover:shadow-lg">
            <img src={`${product.image}`} alt={`${product.image}`} className="object-contain h-48 w-full" loading="lazy"/>

            <div className="flex flex-col p-4 gap-2">
                <h2 className="truncate font-semibold md:text-lg lg:text-xl">{product.title}</h2>
                <p className="font-medium text-gray-700">{`$${product.price}`}</p>
                <button className="bg-yellow-300 hover:bg-yellow-400 rounded-full cursor-pointer p-2 px-4 md:self-start md:w-auto">Add to cart</button>
            </div>
        </article>
    )
}