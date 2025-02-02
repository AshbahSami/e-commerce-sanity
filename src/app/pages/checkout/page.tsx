"use client"

import { getCartItems } from "@/app/actions/action"
import type { Product } from "@/type/product"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"

export default function CheckoutForm() {
  const [cartItems, setCartItems] = useState<Product[]>([])

  useEffect(() => {
    setCartItems(getCartItems())
  }, [])

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.stockLevel, 0)
  }

  const subtotal = calculateTotal()
  const shipping = 25 // Example shipping cost
  const total = subtotal + shipping

  return (
    <div className="container mx-auto py-12 grid lg:grid-cols-2 gap-12">
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
          <div className="space-y-4">
            <Input type="text" placeholder="Email or mobile phone number" className="w-full p-3 border rounded-md" />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="updates"
                className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
              />
              <span className="text-sm text-gray-600">Keep me up to date on news and exclusive offers</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Input type="text" placeholder="First name" className="w-full p-3 border rounded-md" />
              <Input type="text" placeholder="Last name" className="w-full p-3 border rounded-md" />
            </div>
            <Input type="text" placeholder="Address" className="w-full p-3 border rounded-md" />
            <Input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              className="w-full p-3 border rounded-md"
            />
            <Input type="text" placeholder="City" className="w-full p-3 border rounded-md" />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Country"
                className="w-full p-3 border rounded-md"
              />
              <Input type="text" placeholder="Postal Code" className="w-full p-3 border rounded-md" />
            </div>
          </div>
        </div>

       <Link href="/pages/home">
       <Button className="w-full bg-pink-500 hover:bg-pink-600">Continue Shopping</Button>
       </Link>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
        <div className="divide-y">
          {cartItems.map((item) => (
            <div key={item._id} className="py-4 flex items-center gap-4">
              <div className="relative">
                <Image
                  src={urlFor(item.image).width(80).height(80).url() || "/placeholder.svg"}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-lg"
                />
                <span className="absolute -top-2 -right-2 bg-gray-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                  {item.stockLevel}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  ${item.price} x {item.stockLevel}
                </p>
              </div>
              <p className="font-medium">${(item.price * item.stockLevel)}</p>
            </div>
          ))}
        </div>

        <div className="border-t mt-6 pt-6 space-y-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>${shipping}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${total}</span>
          </div>
         <Link href ="/pages/order">
         <Button className="w-full bg-green-500 hover:bg-green-600">Proceed To Checkout</Button></Link>
        </div>
      </div>
    </div>
  )
}

