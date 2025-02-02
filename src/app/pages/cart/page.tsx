"use client"

import { getCartItems, removeFromCart, updateCartQuantity } from "@/app/actions/action"
import type { Product } from "@/type/product"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([])

  useEffect(() => {
    setCartItems(getCartItems())
  }, [])

  const handleRemove = (_id: string) => {
    Swal.fire({
      position: "center",
      icon: "warning",
      title: `Are you sure?`,
      text: "You will not be able to recover this item!",
      showCancelButton: true,
      confirmButtonColor: "#FB2E86",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(_id)
        setCartItems(getCartItems())
        Swal.fire("Removed!", "Item has been removed", "success")
      }
    })
  }

  const handleQuantityChange = (id: string, quantity: number) => {
    updateCartQuantity(id, quantity)
    setCartItems(getCartItems())
  }

  const handleIncrement = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, stockLevel: item.stockLevel + 1 } : item)),
    )
    updateCartQuantity(id, cartItems.find((item) => item._id === id)!.stockLevel + 1)
  }

  const handleDecrement = (id: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.stockLevel > 1 ? { ...item, stockLevel: item.stockLevel - 1 } : item,
      ),
    )
    const newQuantity = cartItems.find((item) => item._id === id)!.stockLevel - 1
    if (newQuantity >= 1) {
      updateCartQuantity(id, newQuantity)
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.stockLevel, 0)
  }

  const subtotal = calculateTotal()
  const shipping = 25 // Example shipping cost
  const total = subtotal + shipping

  return (
    <main className="container mx-auto py-12 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4">Product</th>
              <th className="text-left py-4">Price</th>
              <th className="text-left py-4">Quantity</th>
              <th className="text-left py-4">Total</th>
              <th className="text-left py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={urlFor(item.image).width(100).height(100).url() || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-lg"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                    </div>
                  </div>
                </td>
                <td className="py-4">${item.price}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDecrement(item._id)}
                      disabled={item.stockLevel <= 1}
                    >
                      -
                    </Button>
                    <span>{item.stockLevel}</span>
                    <Button variant="outline" size="sm" onClick={() => handleIncrement(item._id)}>
                      +
                    </Button>
                  </div>
                </td>
                <td className="py-4">${(item.price * item.stockLevel)}</td>
                <td className="py-4">
                  <Button variant="destructive" size="sm" onClick={() => handleRemove(item._id)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-6">
          <Link href="/pages/home">
            <Button variant="outline" onClick={() => setCartItems(getCartItems())}>
              Update Cart
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={() => {
              removeFromCart("all")
              setCartItems([])
            }}
          >
            Clear Cart
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Cart Totals</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotals:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Totals:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <p className="text-sm text-gray-500">* Shipping & taxes calculated at checkout</p>
            <Link href="/pages/checkout">
            <Button className="w-full bg-green-500 hover:bg-green-600">Proceed To Checkout</Button>
            </Link>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Calculate Shopping</h2>
          <div className="space-y-4">
            <Input placeholder="Bangladesh" />
            <Input placeholder="Mirpur Dhaka - 1200" />
            <Input placeholder="Postal Code" />
            <Button className="w-full bg-pink-500 hover:bg-pink-600">Calculate Shipping</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

