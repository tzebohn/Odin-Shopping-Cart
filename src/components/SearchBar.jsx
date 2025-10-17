import { useMenu } from "../contexts/useMenu"
import { useProducts } from "../contexts/useProducts"

export function SearchBar ({ className = ""}) {

    const { searchTerm, setSearchTerm } = useProducts()
    const { setMenuOpen } = useMenu()

    function handleSubmit (e) {
        e.preventDefault()
        setMenuOpen(false)
    }
    return (
        <form className={`${className}`} onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ShopEasy"
                className="outline-none p-2 px-4 bg-[#C0C0C0] rounded-full text-black placeholder-black text-semibold lg:w-md"
            />
        </form>
    )
}