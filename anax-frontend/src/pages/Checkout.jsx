import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { ordersAPI } from '../services/api'
import Loader from '../components/Loader'
import { FiCreditCard, FiTruck, FiCheck } from 'react-icons/fi'

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    delivery_address: '',
    payment_method: 'mobile_money',
    delivery_fee: 5000,
    discount_applied: 0
  })

  useEffect(() => {
    if (!cart || !cart.items || cart.items.length === 0) {
      navigate('/cart')
    }
  }, [cart, navigate])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await ordersAPI.createOrder(formData)
      await clearCart()
      setOrderPlaced(true)
    } catch (error) {
      console.error('Order creation failed:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const subtotal = getCartTotal()
  const deliveryFee = formData.delivery_fee
  const discount = formData.discount_applied
  const total = subtotal + deliveryFee - discount

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <FiCheck className="h-6 w-6 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-primary"
            >
              View Orders
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" text="Loading checkout..." />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiTruck className="h-5 w-5 mr-2" />
              Delivery Information
            </h2>
            
            <div>
              <label htmlFor="delivery_address" className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address *
              </label>
              <textarea
                id="delivery_address"
                name="delivery_address"
                required
                value={formData.delivery_address}
                onChange={handleChange}
                rows={3}
                className="input-field"
                placeholder="Enter your complete delivery address"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FiCreditCard className="h-5 w-5 mr-2" />
              Payment Method
            </h2>
            
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment_method"
                  value="mobile_money"
                  checked={formData.payment_method === 'mobile_money'}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">Mobile Money</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment_method"
                  value="bank_transfer"
                  checked={formData.payment_method === 'bank_transfer'}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">Bank Transfer</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="payment_method"
                  value="cash_on_delivery"
                  checked={formData.payment_method === 'cash_on_delivery'}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <span className="ml-3 text-sm text-gray-700">Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* Additional Options */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Additional Options</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="delivery_fee" className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Fee
                </label>
                <input
                  type="number"
                  id="delivery_fee"
                  name="delivery_fee"
                  value={formData.delivery_fee}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              
              <div>
                <label htmlFor="discount_applied" className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Applied
                </label>
                <input
                  type="number"
                  id="discount_applied"
                  name="discount_applied"
                  value={formData.discount_applied}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-3 mb-6">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  {item.product.images && item.product.images.length > 0 ? (
                    <img
                      src={item.product.images[0].image}
                      alt={item.product.name}
                      className="h-12 w-12 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs">No Image</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {formatPrice(item.total_price)}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="text-gray-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="text-gray-900">{formatPrice(deliveryFee)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-primary-600">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
