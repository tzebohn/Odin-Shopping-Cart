import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { Products } from "./pages/Products";
import { Cart } from "./pages/Cart";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, // App acts as layout
        children: [
            {index: true, element: <Home />},
            {path: "products", element: <Products />}, 
            {path: "cart", element: <Cart />} 
        ]
    }, 
])

export default router;