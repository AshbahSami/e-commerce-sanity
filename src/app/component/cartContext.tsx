'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { CartItem } from '@/app/index'

interface CartContextType {
  cart: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  itemCount: number
  total: number
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  total: 0
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addItem = (item: CartItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i => 
        i.id === item.id && 
        i.color === item.color && 
        i.size === item.size
      )

      if (existingItem) {
        return prevCart.map(i =>
          i.id === item.id && i.color === item.color && i.size === item.size
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        )
      }

      return [...prevCart, item]
    })
  }

  const removeItem = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart')
  }

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      total
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
