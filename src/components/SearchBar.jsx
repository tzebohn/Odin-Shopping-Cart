export function SearchBar ({ className = ""}) {
    return (
        <form className={`${className}`}>
            <input 
                type="text" 
                placeholder="Search ShopEasy"
                className="outline-none p-2 px-4 bg-[#C0C0C0] rounded-full text-black placeholder-black text-semibold lg:w-md"
            />
        </form>
    )
}