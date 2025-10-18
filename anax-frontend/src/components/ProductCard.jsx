import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'
import { FiShoppingCart, FiHeart } from 'react-icons/fi'

const ProductCard = ({ product }) => {
  const { addToCart, loading } = useCart()
  const { isAuthenticated } = useAuth()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login'
      return
    }

    await addToCart(product.id, 1)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-UG', {
      style: 'currency',
      currency: 'UGX',
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <Link to={`/products/${product.id}`} className="block">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1 bg-gray-200">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0].image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
            {product.label && (
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                product.label === 'new' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.label}
              </span>
            )}
          </div>

          {/* Category */}
          {product.category && (
            <p className="text-sm text-gray-500 mb-3">
              {product.category}
            </p>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <FiShoppingCart className="h-4 w-4" />
              <span>{loading ? 'Adding...' : 'Add to Cart'}</span>
            </button>

            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200">
              <FiHeart className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
