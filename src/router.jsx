import { createHashRouter } from "react-router-dom";
import App from "./App";
import { Products } from "./pages/Products";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";
import productsLoader from "./pages/productsLoader";
import { ErrorPage } from "./pages/ErrorPage";

const router = createHashRouter([
    {
        path: "/",
        element: <App />, // App acts as layout
        errorElement: <ErrorPage />,
        children: [
            {index: true, element: <Home />},
            {
                path: "products", 
                element: <Products />,
                loader: productsLoader,
                errorElement: <ErrorPage />,
                shouldRevalidate: ({ currentUrl, nextUrl }) => ( // Prevent from refetching if already on same path
                    currentUrl.pathname !== nextUrl.pathname
                )
            }, 
            {path: "cart", element: <Cart />} 
        ]
    }, 
])

export default router;