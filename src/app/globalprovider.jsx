import { CartProvider } from "./component/Cart";
export function GlobalProvider ({children}){
    return(
        <CartProvider>
        {children}
        </CartProvider>
    )
}