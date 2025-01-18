// 'use client'

// import { useCart } from '@/app/component/cartContext'
// import { FaTimes } from 'react-icons/fa'
// import Link from 'next/link'

// export default function CartPage() {
//   const {
//     cart,
//     removeItem,
//     updateQuantity,
//     clearCart,
//     total
//   } = useCart()

//   const shippingFee = total > 1000 ? 0 : 100
//   const grandTotal = total + shippingFee

//   const handleShippingCalculation = (event: React.FormEvent) => {
//     event.preventDefault()
//     // Implement shipping calculation logic here
//   }

//   if (cart.length === 0) {
//     return (
//       <div className="flex flex-col items-center justify-center py-16 text-[#1D3178]">
//         <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
//         <Link 
//           href="/products" 
//           className="bg-[#FB2E86] text-white px-6 py-2 rounded-md hover:bg-[#E91E63]"
//         >
//           Continue Shopping
//         </Link>
//       </div>
//     )
//   }

//   return (
//     <div className="place-items-center py-16 text-[#1D3178]">
//       <div className="lg:flex gap-4">
//         {/* Cart table on the left */}
//         <div className="lg:w-2/3">
//           <table className="w-full table-auto border-collapse shadow-lg">
//             <thead>
//               <tr className="font-sans text-2xl bg-[#F5F5F5]">
//                 <th className="px-4 py-2 text-left">Product</th>
//                 <th className="px-4 py-2 text-left">Price</th>
//                 <th className="px-4 py-2 text-left">Quantity</th>
//                 <th className="px-4 py-2 text-left">Total</th>
//                 <th className="px-4 py-2 text-left">Action</th>
//               </tr>
//             </thead>
//             <tbody className="text-[#A1A8C1]">
//               {cart.map((item) => (
//                 <tr key={`${item.id}-${item.color}-${item.size}`} className="border-b">
//                   <td className="px-4 py-2">
//                     <div className="flex items-center">
//                       <img src={item.image} alt={item.name} className="w-16 h-16 object-cover mr-4" />
//                       <div>
//                         <h3 className="font-semibold text-slate-700">{item.name}</h3>
//                         {item.color && <p>Color: {item.color}</p>}
//                         {item.size && <p>Size: {item.size}</p>}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-2 text-[#15245E] font-bold">${item.price}</td>
//                   <td className="px-4 py-2">
//                     <input
//                       type="number"
//                       value={item.quantity}
//                       onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
//                       min="1"
//                       className="w-16 text-center border p-1 rounded-md"
//                     />
//                   </td>
//                   <td className="px-4 py-2 text-[#15245E] font-bold">
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </td>
//                   <td className="px-4 py-2">
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="text-red-500 hover:text-red-700"
//                       aria-label={`Remove ${item.name} from cart`}
//                     >
//                       <FaTimes />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
          
//           <div className="flex justify-between py-8">
//             <Link
//               href="/products"
//               className="bg-[#FB2E86] text-white px-4 py-2 rounded-md hover:bg-[#E91E63]"
//             >
//               Continue Shopping
//             </Link>
//             <button
//               onClick={clearCart}
//               className="bg-[#FB2E86] text-white px-4 py-2 rounded-md hover:bg-[#E91E63]"
//             >
//               Clear Cart
//             </button>
//           </div>
//         </div>

//         {/* Cart totals on the right */}
//         <div className="lg:w-1/3">
//           <div className="bg-[#F9FAFB] rounded-lg p-8">
//             <h1 className="font-bold text-2xl text-[#1D3178]">Cart Totals</h1>
            
//             <div className="font-bold flex justify-between py-4">
//               <h2 className="text-xl">Subtotal:</h2>
//               <p className="text-xl">${total.toFixed(2)}</p>
//             </div>

//             <div className="font-bold flex justify-between py-4">
//               <h2 className="text-xl">Shipping Fee:</h2>
//               <p className="text-xl">${shippingFee.toFixed(2)}</p>
//             </div>

//             <hr className="my-4" />

//             <div className="font-bold flex justify-between py-4">
//               <h2 className="text-xl">Total:</h2>
//               <p className="text-xl">${grandTotal.toFixed(2)}</p>
//             </div>

//             <div className="flex items-center gap-2 py-4 text-[#8A91AB]">
//               <input type="checkbox" className="h-4 w-4" />
//               <p>Shipping & taxes calculated at checkout</p>
//             </div>
            
//             <Link
//               href="/checkout"
//               className="bg-[#19D16F] py-4 text-xl text-white rounded-md w-full block text-center"
//             >
//               Proceed To Checkout
//             </Link>
//           </div>

//           {/* Form for shipping calculation */}
//           <div className="bg-[#F9FAFB] rounded-lg p-8 mt-4">
//             <h1 className="font-bold text-2xl text-[#1D3178]">Calculate Shipping</h1>

//             <form onSubmit={handleShippingCalculation}>
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   id="country"
//                   name="country"
//                   className="w-full p-2 border rounded-md text-[#15245E] outline-none"
//                   placeholder="Enter your country"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   id="address"
//                   name="address"
//                   className="w-full p-2 border rounded-md text-[#15245E] outline-none"
//                   placeholder="Enter your address"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <input
//                   type="text"
//                   id="postalCode"
//                   name="postalCode"
//                   className="w-full p-2 border rounded-md text-[#15245E] outline-none"
//                   placeholder="Enter your postal code"
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="bg-[#19D16F] py-4 text-xl text-white rounded-md w-full"
//               >
//                 Calculate Shipping
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

