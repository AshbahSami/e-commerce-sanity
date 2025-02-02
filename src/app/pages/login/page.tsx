// import { Divide } from "lucide-react";

// export default function Login(){
//  return(
//     <div>
//     <div className="w-full md:w-3/4">
//           {loading ? (
//             <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
//           ) : selectedProduct ? (
//             <div className="flex flex-col md:flex-row gap-8">
//               {/* Product Image */}
//               <div className="w-full md:w-1/2">
//                 <img
//                   src={selectedProduct.image.asset?.url || "/placeholder.svg"}
//                   alt={selectedProduct.name}
//                   className="w-full max-w-md"
//                 />
//               </div>

//               {/* Product Info */}
//               <div className="w-full md:w-1/2">
//                 <h1 className="font-bold text-3xl text-[#0D134E]">{selectedProduct.name}</h1>
//                 <div className="flex gap-4 mt-2">
//                   <p className="text-[#151875] text-sm line-through">
//                     ${(selectedProduct.price * 1.2).toFixed(2)}
//                   </p>
//                   <p className="text-sm text-pink-900">${selectedProduct.price}</p>
//                 </div>
//                 <h3 className="text-[#0D134E] text-xl mt-4">Color</h3>
//                 <p>{selectedProduct.code}</p>
//                 <div className="flex gap-4 mt-4">
//                   <button
//                     className="underline text-lg py-1 px-2 text-[#151875] hover:bg-slate-200 border"
//                   >
//                     Add to cart
//                   </button>
//                   <FaHeart className="text-[#535399] hover:text-pink-800 text-2xl cursor-pointer" />
//                 </div>
//                 <h3 className="text-lg mt-4">Categories: {selectedProduct.category}</h3>
//                 <h3 className="text-lg">Tags:</h3>
//                 <div className="flex gap-2">
//                   <h3 className="text-lg">Shares:</h3>
//                   <div className="flex gap-2 py-2">
//                     <FaFacebook className="text-blue-900" />
//                     <FaInstagram className="text-pink-600" />
//                     <FaTwitter className="text-blue-900" />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="text-center text-gray-500">Select a product to view details</div>
//           )}

//           {/* Tabs */}
//           <div className="tabs flex gap-8 text-lg text-[#535399] p-4 mt-8">
//             {Object.keys(content).map((tab) => (
//               <div
//                 key={tab}
//                 className={`hover:text-blue-900 cursor-pointer ${activeTab === tab ? 'font-bold text-blue-900' : ''}`}
//                 onClick={() => handleTabClick(tab)}
//               >
//                 {tab.charAt(0).toUpperCase() + tab.slice(1)}
//               </div>
//             ))}
//           </div>

//           {/* Active Tab Content */}
//           <div className="tab-content text-[#535399] p-4">
//             {content[activeTab as keyof typeof content]}
//           </div>
//         </div>
//       </div></div>
//  )   
// }