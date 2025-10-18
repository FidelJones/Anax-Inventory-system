import { createContext, useContext, useState, useEffect } from 'react'
import { cartAPI } from '../services/api'
import { toast } from 'react-toastify'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchCart = async () => {
    try {
      setLoading(true)
      const response = await cartAPI.getCart()
      setCart(response.data)
    } catch (error) {
      console.error('Failed to fetch cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true)
      await cartAPI.addToCart({ product_id: productId, quantity })
      await fetchCart()
      toast.success('Product added to cart!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to add to cart'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const updateCartItem = async (itemId, quantity) => {
    try {
      setLoading(true)
      await cartAPI.updateCartItem(itemId, { quantity })
      await fetchCart()
      toast.success('Cart updated!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to update cart'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true)
      await cartAPI.removeCartItem(itemId)
      await fetchCart()
      toast.success('Product removed from cart!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to remove from cart'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setLoading(true)
      await cartAPI.clearCart()
      setCart(null)
      toast.success('Cart cleared!')
      return { success: true }
    } catch (error) {
      const message = error.response?.data?.detail || 'Failed to clear cart'
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setLoading(false)
    }
  }

  const getCartItemCount = () => {
    if (!cart || !cart.items) return 0
    return cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = () => {
    if (!cart) return 0
    return cart.total_price || 0
  }

  useEffect(() => {
    // Fetch cart on mount if user is authenticated
    const token = localStorage.getItem('access_token')
    if (token) {
      fetchCart()
    }
  }, [])

  const value = {
    cart,
    loading,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
    getCartItemCount,
    getCartTotal,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
