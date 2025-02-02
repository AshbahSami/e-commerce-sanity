
import { Product } from "@/type/product";
import { addToCart } from "./action";
import Swal from "sweetalert2";


export const handleAddToCart = async (e: React.MouseEvent, product: Product) => {
  e.preventDefault();
  Swal.fire({
    position: 'center',
    icon: "success",
    title: `${product.name} added to cart`,
    showConfirmButton:false,
    timer: 1000
  })
   await addToCart(product)
   console.log(handleAddToCart)
};

